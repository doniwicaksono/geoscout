'use client'

import Link from 'next/link'
import { Compass } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/lib/i18n'
import LanguageSelector from '@/components/LanguageSelector'

export default function Navbar() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-base/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Compass
            className="text-primary group-hover:rotate-12 transition-transform duration-300"
            size={18}
            strokeWidth={2.5}
          />
          <span className="text-[12.8px] font-bold tracking-[0.08em] uppercase text-on-surface group-hover:text-primary transition-colors">
            GeoScout
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <LanguageSelector />
        </nav>
      </div>
    </header>
  )
}
