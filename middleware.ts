import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, css, etc. (files with extensions)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};

let cache: { alive: boolean; expiresAt: number } | null = null;
const CACHE_DURATION_MS = process.env.HEALTH_CACHE_MS ? parseInt(process.env.HEALTH_CACHE_MS, 10) : 5 * 60 * 1000; // 5 minutes

async function checkMainDomainAlive(): Promise<boolean> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return cache.alive;
  }

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1500); // 1.5 seconds timeout

    // We fetch a health check route on the main domain
    const mainDomain = process.env.MAIN_DOMAIN || "geoscout.web.id";
    const protocol = mainDomain.startsWith("localhost") || mainDomain.startsWith("127.0.0.1") ? "http:" : "https:";
    const res = await fetch(`${protocol}//${mainDomain}/api/health`, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "x-geoscout-ping": "1",
      },
    });

    clearTimeout(id);

    // If the server responds with a 2xx or 3xx status, it is alive and working
    const alive = res.status >= 200 && res.status < 400;

    cache = {
      alive,
      expiresAt: now + (alive ? CACHE_DURATION_MS : 30 * 1000), // 5 min cache if alive, 30s if down
    };

    return alive;
  } catch (err) {
    console.error("Geoscout main domain health check failed:", err);
    cache = {
      alive: false,
      expiresAt: now + 30 * 1000, // cache failure for 30 seconds
    };
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const hostHeader = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const hostname = hostHeader.split(":")[0].toLowerCase();

  // Bypass local development
  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".local");

  // Bypass canonical domain
  const mainDomain = process.env.MAIN_DOMAIN || "geoscout.web.id";
  const mainDomainHost = mainDomain.split(":")[0];
  const isCanonical =
    hostname === mainDomainHost ||
    hostname === `www.${mainDomainHost}`;

  if (isLocal || isCanonical) {
    return NextResponse.next();
  }

  // Bypass API and static paths (double check)
  const pathname = req.nextUrl.pathname;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if main domain is alive
  const isAlive = await checkMainDomainAlive();

  if (isAlive) {
    // Redirect to main domain with the same pathname and search params
    const targetUrl = new URL(req.nextUrl.href);
    if (mainDomain.startsWith("localhost") || mainDomain.startsWith("127.0.0.1")) {
      const [host, port] = mainDomain.split(":");
      targetUrl.hostname = host;
      targetUrl.protocol = "http:";
      if (port) {
        targetUrl.port = port;
      } else {
        targetUrl.port = "";
      }
    } else {
      targetUrl.hostname = mainDomain;
      targetUrl.protocol = "https:";
      targetUrl.port = ""; // Clear port if any
    }

    // Use 307 (Temporary Redirect) so the browser doesn't cache it forever
    // This allows fallback to vercel.app if geoscout.web.id expires/goes down.
    return NextResponse.redirect(targetUrl, 307);
  }

  // If not alive, fallback and serve from current domain (geoscout-weld.vercel.app)
  return NextResponse.next();
}
