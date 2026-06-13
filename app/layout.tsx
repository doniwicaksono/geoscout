import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'GeoScout — Scout Your Next City',
  description:
    'AI-powered city relocation research. Deep analysis across cost of living, safety, public services, culture, and economy — so you can decide with confidence.',
  keywords: ['city research', 'relocation', 'cost of living', 'expat', 'moving abroad'],
}

import { LanguageProvider } from '@/components/LanguageContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-base text-on-surface antialiased min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
