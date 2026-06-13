"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { EXAMPLE_CITIES } from "@/lib/cities";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/i18n";

export { EXAMPLE_CITIES };

interface SearchFormProps {
  autoFocus?: boolean;
  initialCity?: string;
}

export default function SearchForm({
  autoFocus = false,
  initialCity = "",
}: SearchFormProps) {
  const [city, setCity] = useState(initialCity);
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

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
