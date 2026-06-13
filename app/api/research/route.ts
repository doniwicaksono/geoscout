import { GoogleGenAI } from "@google/genai";
import { RESEARCH_SYSTEM_PROMPT, buildResearchPrompt } from "@/lib/prompt";
import { NextRequest } from "next/server";

export const runtime = "edge";

const GEMINI_MODEL = "gemini-2.5-flash";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const city: string = (body.city ?? "").trim();
    const lang: string = (body.lang ?? "en").trim();

    if (!city) {
      return Response.json(
        { error: "City name is required." },
        { status: 400 },
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return Response.json(
        {
          error:
            "GEMINI_API_KEY is not set. Copy .env.local.example → .env.local and add your Gemini API key from https://aistudio.google.com/",
        },
        { status: 500 },
      );
    }

    // Initialize the client
    const ai = new GoogleGenAI({ apiKey: geminiKey });

    // Stream from Gemini with Google Search grounding enabled
    const responseStream = await ai.models.generateContentStream({
      model: GEMINI_MODEL,
      contents: buildResearchPrompt(city, lang),
      config: {
        systemInstruction: RESEARCH_SYSTEM_PROMPT,
        temperature: 0.3,
        tools: [{ googleSearch: {} }],
      },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (streamErr: any) {
          console.error("Error during streaming:", streamErr);
          // Let the stream know an error occurred
          controller.error(streamErr);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error.";
    return Response.json({ error: message }, { status: 500 });
  }
}

