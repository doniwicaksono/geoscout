'use client'

import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/i18n";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="border-t border-white/[0.07] bg-base py-8 mt-auto">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
        <p className="text-[11px] leading-[18px] text-secondary max-w-xl">
          {t.locationDisclaimer}
        </p>
        <p className="text-[11px] text-secondary/60">
          © {new Date().getFullYear()} GeoScout. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
