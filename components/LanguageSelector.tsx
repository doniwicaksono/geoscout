'use client'

import { useLanguage } from '@/components/LanguageContext'
import { LANGUAGES } from '@/lib/i18n'
import { Globe } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLangName = language.toUpperCase()

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-secondary hover:text-on-surface transition-colors text-[12.8px] font-semibold tracking-[0.04em] focus:outline-none"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe size={14} className="text-secondary shrink-0" />
        <span>{currentLangName}</span>
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 py-1.5 w-20 bg-surface border border-white/[0.07] rounded shadow-lg shadow-black/80 z-50 animate-fade-in list-none">
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => {
                  setLanguage(lang.code)
                  setOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-[12.8px] transition-colors focus:outline-none hover:bg-white/[0.05] ${
                  language === lang.code ? 'text-primary font-semibold' : 'text-on-surface'
                }`}
              >
                {lang.code.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
