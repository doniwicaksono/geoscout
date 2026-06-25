'use client'

import { useEffect, useState } from "react";
import SearchForm, { CityChip } from "./SearchForm";
import { EXAMPLE_CITIES } from "@/lib/cities";
import { BarChart3, Check, Globe, Zap } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/i18n";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const [detectedCity, setDetectedCity] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedCity = localStorage.getItem("geoscout_user_city");
    if (savedCity) {
      setDetectedCity(savedCity);
      return;
    }

    const locationDenied = localStorage.getItem("geoscout_location_denied");
    if (locationDenied) return;

    if (navigator.geolocation) {
      setIsDetecting(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&accept-language=${language}`
            );
            const data = await res.json();
            const detected =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.state ||
              data.address?.country;
            if (detected) {
              localStorage.setItem("geoscout_user_city", detected);
              setDetectedCity(detected);
            }
          } catch (err) {
            console.error("Failed to reverse geocode user location:", err);
          } finally {
            setIsDetecting(false);
          }
        },
        (err) => {
          console.warn("Geolocation permission denied or failed:", err);
          localStorage.setItem("geoscout_location_denied", "true");
          setIsDetecting(false);
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
        <SearchForm
          detectedCity={detectedCity}
          isDetecting={isDetecting}
          onDetectedCityChange={(city) => setDetectedCity(city)}
        />
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

      {/* Feature cards section */}
      <div className="relative z-10 max-w-4xl w-full px-6 pb-24 text-center">
        <h2 className="text-[20px] font-bold text-on-surface mb-8 text-center tracking-[-0.01em] select-none">
          {t.howItWorks}
        </h2>
        <div
          id="how-it-works-grid"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left"
        >
          {/* Card 1: 7 Research Domains (spans 2 cols) */}
          <div className="sm:col-span-2 bg-surface border border-white/[0.07] rounded-lg p-6 flex flex-col justify-between hover:border-white/[0.12] transition-colors group">
            <div>
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md mb-4 group-hover:bg-primary/20 transition-colors">
                <Globe className="text-primary" size={16} strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-semibold text-on-surface mb-3">
                {t.feature1Title}
              </h3>
              <p className="text-[13.8px] leading-[22px] text-secondary mb-4">
                {t.feature1Desc}
              </p>
            </div>
            {/* Visual list of domains */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-white/[0.05] text-[11.8px] text-secondary/80 select-none">
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> Cost of Living</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> Safety & Crime</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> Public Services</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> Accessibility</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> Environment</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> Culture & Life</span>
            </div>
          </div>

          {/* Card 2: Scored Analysis (spans 1 col) */}
          <div className="sm:col-span-1 bg-base border border-white/[0.07] rounded-lg p-6 flex flex-col justify-between hover:border-white/[0.12] transition-colors group">
            <div>
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md mb-4 group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="text-primary" size={16} strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-semibold text-on-surface mb-3">
                {t.feature2Title}
              </h3>
              <p className="text-[13.8px] leading-[22px] text-secondary">
                {t.feature2Desc}
              </p>
            </div>
            {/* Score visual helper */}
            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between select-none">
              <span className="text-[11.8px] text-secondary">Domain Score:</span>
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-bold text-primary">8.5</span>
                <span className="text-[10px] text-secondary/60">/ 10</span>
              </div>
            </div>
          </div>

          {/* Card 3: Instant Report (spans 3 cols) */}
          <div className="sm:col-span-3 bg-surface/50 border border-primary/20 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary/45 transition-colors group">
            <div className="flex-1">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="text-primary" size={16} strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-semibold text-on-surface mb-2">
                {t.feature3Title}
              </h3>
              <p className="text-[13.8px] leading-[22px] text-secondary max-w-2xl">
                {t.feature3Desc}
              </p>
            </div>
            {/* Action text or badge */}
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/25 rounded px-3 py-1.5 shrink-0 self-start sm:self-center select-none">
              <Check className="text-primary" size={12} strokeWidth={3} />
              <span className="text-primary text-[10.8px] font-bold tracking-[0.06em] uppercase">
                Actionable PDF & Print
              </span>
            </div>
          </div>
        </div>
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
