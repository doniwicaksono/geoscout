'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language } from '@/lib/i18n'

interface LanguageContextProps {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('geoscout-lang') as Language
    if (saved && ['en', 'id', 'zh', 'ja'].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('geoscout-lang', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return { language: 'en' as Language, setLanguage: () => {} }
  }
  return context
}
