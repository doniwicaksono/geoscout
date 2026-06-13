'use client'

import { useEffect } from "react";
import SearchForm, { CityChip } from "./SearchForm";
import { EXAMPLE_CITIES } from "@/lib/cities";
import { BarChart3, Globe, Zap } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/i18n";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedCity = localStorage.getItem("geoscout_user_city");
    const locationDenied = localStorage.getItem("geoscout_location_denied");

    if (!savedCity && !locationDenied && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&accept-language=${language}`
            );
            const data = await res.json();
            const detectedCity =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.state ||
              data.address?.country;
            if (detectedCity) {
              localStorage.setItem("geoscout_user_city", detectedCity);
            }
          } catch (err) {
            console.error("Failed to reverse geocode user location:", err);
          }
        },
        (err) => {
          console.warn("Geolocation permission denied or failed:", err);
          localStorage.setItem("geoscout_location_denied", "true");
        },
        { timeout: 10000 }
      );
    }
  }, [language]);

  const FEATURES = [
    {
      icon: Globe,
      title: t.feature1Title,
      description: t.feature1Desc,
    },
    {
      icon: BarChart3,
      title: t.feature2Title,
      description: t.feature2Desc,
    },
    {
      icon: Zap,
      title: t.feature3Title,
      description: t.feature3Desc,
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen dot-grid overflow-hidden">
      {/* Hero glow — subtle primary radial from top-center */}
      <div
        className="hero-glow absolute inset-0 pointer-events-none"
        aria-hidden
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-16 max-w-4xl mx-auto w-full">
        {/* Beta badge */}
        <div className="mb-8 inline-flex items-center gap-2 bg-surface border border-white/[0.07] rounded-full px-3.5 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-[11px] font-semibold tracking-[0.06em] uppercase">
            {t.alpha}
          </span>
        </div>

        {/* Headline — display style from DESIGN.md */}
        <h1 className="text-[48px] font-bold leading-[1.1] tracking-[-0.04em] text-on-surface max-w-2xl mb-6 text-balance">
          {t.titleMain}
          <br />
          <span className="text-primary">{t.titleSub}</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-[18px] leading-[30px] text-secondary max-w-xl mb-10">
          {t.description}
        </p>

        {/* Search form */}
        <SearchForm />

        {/* Example city chips */}
        <div
          id="examples"
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {EXAMPLE_CITIES.map((city) => (
            <CityChip key={city} city={city} />
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div
        id="how-it-works"
        className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full px-6 pb-24"
      >
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-base border border-white/[0.07] rounded-lg p-5 text-left hover:border-white/[0.12] transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md mb-4">
              <Icon className="text-primary" size={16} strokeWidth={2} />
            </div>
            <h3 className="text-[14px] font-semibold text-on-surface mb-2">
              {title}
            </h3>
            <p className="text-[13px] leading-[20px] text-secondary">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(8,8,8,0.8), transparent)",
        }}
        aria-hidden
      />
    </section>
  );
}
