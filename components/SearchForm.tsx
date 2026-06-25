"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, Settings } from "lucide-react";
import { EXAMPLE_CITIES } from "@/lib/cities";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/i18n";

export { EXAMPLE_CITIES };

interface SearchFormProps {
  autoFocus?: boolean;
  initialCity?: string;
  detectedCity?: string | null;
  isDetecting?: boolean;
  onDetectedCityChange?: (city: string | null) => void;
}

export default function SearchForm({
  autoFocus = false,
  initialCity = "",
  detectedCity = null,
  isDetecting = false,
  onDetectedCityChange,
}: SearchFormProps) {
  const [city, setCity] = useState(initialCity);
  const [showSettings, setShowSettings] = useState(false);
  const [currentCityInput, setCurrentCityInput] = useState(detectedCity || "");
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    setCurrentCityInput(detectedCity || "");
  }, [detectedCity]);

  const handleCurrentCityChange = (val: string) => {
    setCurrentCityInput(val);
    if (typeof window !== "undefined") {
      if (val.trim()) {
        localStorage.setItem("geoscout_user_city", val.trim());
        onDetectedCityChange?.(val.trim());
      } else {
        localStorage.removeItem("geoscout_user_city");
        onDetectedCityChange?.(null);
      }
    }
  };

  const handleClearLocation = () => {
    setCurrentCityInput("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("geoscout_user_city");
      localStorage.setItem("geoscout_location_denied", "true");
      onDetectedCityChange?.(null);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      let url = `/research?city=${encodeURIComponent(trimmed)}`;
      if (typeof window !== "undefined") {
        const savedLoc = localStorage.getItem("geoscout_user_city");
        if (savedLoc) {
          url += `&currentLocation=${encodeURIComponent(savedLoc)}`;
        }
      }
      router.push(url);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
            size={15}
            strokeWidth={2}
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t.placeholder}
            autoFocus={autoFocus}
            className="w-full bg-surface border border-white/[0.07] rounded-sm pl-10 pr-4 py-3 text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all text-[16.8px] leading-[28.6px] h-[43px]"
          />
        </div>
        <button
          type="submit"
          disabled={!city.trim()}
          className="bg-primary text-base font-bold text-[12.8px] tracking-[0.08em] uppercase rounded-sm px-7 h-[43px] hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
        >
          {t.scout}
        </button>
      </form>

      {/* Geolocation feedback & optional manual configuration */}
      <div className="w-full text-left">
        {isDetecting ? (
          <div className="flex items-center gap-2 text-[12px] text-secondary mt-3 select-none animate-pulse">
            <Loader2 size={12} className="animate-spin text-primary" />
            <span>Detecting current location for comparison...</span>
          </div>
        ) : (
          <div className="flex flex-col items-start w-full">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="mt-3 text-[11px] text-secondary hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-wider font-semibold focus:outline-none select-none"
            >
              <Settings size={12} />
              <span>Comparison Settings</span>
              {detectedCity && (
                <span className="text-primary font-bold normal-case">({detectedCity})</span>
              )}
            </button>

            {showSettings && (
              <div className="mt-3 p-4 bg-surface border border-white/[0.07] rounded-lg text-left w-full animate-slide-up">
                <label className="block text-[11px] font-semibold text-secondary uppercase tracking-[0.06em] mb-2 select-none">
                  {t.currentLocationLabel}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentCityInput}
                    onChange={(e) => handleCurrentCityChange(e.target.value)}
                    placeholder={t.currentLocationPlaceholder}
                    className="flex-1 bg-base border border-white/[0.07] rounded-sm px-3.5 py-2 text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-[14px] h-[36px]"
                  />
                  {currentCityInput && (
                    <button
                      type="button"
                      onClick={handleClearLocation}
                      className="px-3 bg-surface hover:bg-white/[0.05] border border-white/[0.07] rounded-sm text-[12px] text-secondary hover:text-on-surface transition-colors h-[36px] font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-[11px] leading-[1.6] text-secondary/60 italic mt-3 select-none">
                  {t.locationDisclaimer}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Clickable city chip — navigates to the research page. */
export function CityChip({ city }: { city: string }) {
  const router = useRouter();
  const handleChipClick = () => {
    let url = `/research?city=${encodeURIComponent(city)}`;
    if (typeof window !== "undefined") {
      const savedLoc = localStorage.getItem("geoscout_user_city");
      if (savedLoc) {
        url += `&currentLocation=${encodeURIComponent(savedLoc)}`;
      }
    }
    router.push(url);
  };

  return (
    <button
      onClick={handleChipClick}
      className="bg-surface text-primary text-[11px] font-semibold tracking-[0.06em] rounded-full px-3 py-1.5 border border-white/[0.07] hover:border-primary/30 hover:bg-primary/5 transition-all"
    >
      {city}
    </button>
  );
}
