'use client'

import React, { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { ArrowLeft, AlertCircle, Compass, Loader2, Check, ArrowUp, RotateCcw } from 'lucide-react'
import type { Components } from 'react-markdown'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/lib/i18n'

// Helper to extract text content from children elements for slug generation
const getInnerText = (node: any): string => {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getInnerText).join('')
  if (node.props && node.props.children) return getInnerText(node.props.children)
  return ''
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    // Remove variation selectors first
    .replace(/[\uFE00-\uFE0F]/g, '')
    // Remove emojis
    .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '')
    // Remove standard English punctuation (keeps letters of any language, numbers, spaces, hyphens)
    .replace(/[\[\]!"#$%&'()*+,./:;<=>?@\\^_{|}~]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const processDataSources = (markdownText: string, lang: string): string => {
  // Matches "## 📚 " followed by any heading text
  const headingRegex = /^##\s+📚\s+(.+)$/m;
  const match = markdownText.match(headingRegex);
  if (!match) return markdownText;

  const headingIndex = markdownText.indexOf(match[0]);
  const beforeHeading = markdownText.substring(0, headingIndex + match[0].length);
  const afterHeading = markdownText.substring(headingIndex + match[0].length);

  const lines = afterHeading.split('\n');
  const processedLines: string[] = [];
  let sourceCount = 0;
  let hasTruncated = false;
  let insertedDisclaimer = false;

  // Verbose localized disclaimer
  let disclaimer = "Note: To optimize rendering performance and maintain report readability, only the first 25 primary data sources used in this research session are listed above. Gemini continues to analyze all available reference points to ensure accurate results.";
  if (lang === 'id') {
    disclaimer = "Catatan: Untuk mengoptimalkan kinerja pemuatan halaman dan menjaga keterbacaan laporan, hanya 25 sumber data utama pertama yang digunakan dalam sesi penelitian ini yang dicantumkan di atas. Gemini tetap menganalisis seluruh data referensi yang tersedia untuk memastikan keakuratan hasil.";
  } else if (lang === 'zh') {
    disclaimer = "注意：为了性能和效率，最多显示 25 个数据来源。";
  } else if (lang === 'ja') {
    disclaimer = "注意：ページのレンダリングパフォーマンスを最適化し、レポートの読みやすさを維持するため、この調査セッションで使用された上位25件の主要データソースのみを上記にリストしています。Geminiは、正確な結果を保証するために、利用可能なすべての参照データを分析し続けています。";
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isListItem = /^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line);

    if (isListItem) {
      if (sourceCount < 25) {
        processedLines.push(line);
        sourceCount++;
      } else {
        hasTruncated = true;
        if (!insertedDisclaimer) {
          processedLines.push(`\n${disclaimer}\n`);
          insertedDisclaimer = true;
        }
      }
    } else {
      processedLines.push(line);
    }
  }

  return beforeHeading + '\n' + processedLines.join('\n');
}

// ─── Markdown component map (Ludora Dark Signal theme) ───────────────────────

const mdComponents: Components = {
  a: ({ href, children }) => {
    const isAnchor = href && href.startsWith('#')
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isAnchor) {
        e.preventDefault()
        const targetId = href.substring(1)
        
        // Try to find the element by the exact ID first
        let targetElement = document.getElementById(targetId)
        
        // If not found, try to find a heading by matching normalized text
        if (!targetElement) {
          const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          const normalize = (str: string) =>
            str
              .toLowerCase()
              .replace(/[\uFE00-\uFE0F]/g, '') // remove variation selectors
              .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '') // remove emojis
              .replace(/[^\p{L}\p{N}]+/gu, '') // keep only letters and numbers
              .trim()

          try {
            const decodedTargetId = decodeURIComponent(targetId)
            const normalizedTarget = normalize(decodedTargetId)
            
            for (const heading of Array.from(headings)) {
              const normalizedHeading = normalize(heading.textContent || '')
              if (normalizedHeading && (normalizedHeading === normalizedTarget || normalizedHeading.includes(normalizedTarget) || normalizedTarget.includes(normalizedHeading))) {
                targetElement = heading as HTMLElement
                break
              }
            }
          } catch (err) {
            console.error('Failed to decode targetId:', targetId, err)
          }
        }
        
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - 80 // 80px offset for sticky header
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          
          // Update the URL hash without triggering default jump
          window.history.pushState(null, '', href)
        }
      }
    }

    return (
      <a
        href={href}
        onClick={handleClick}
        className="text-primary font-medium hover:underline transition-all"
      >
        {children}
      </a>
    )
  },
  h1: ({ children }) => {
    const id = slugify(getInnerText(children))
    return (
      <h1 id={id} className="text-[32px] font-bold leading-[1.25] tracking-[-0.02em] text-on-surface mt-10 mb-5 first:mt-0 scroll-mt-20">
        {children}
      </h1>
    )
  },
  h2: ({ children }) => {
    const id = slugify(getInnerText(children))
    return (
      <h2 id={id} className="text-[23px] font-semibold leading-[1.25] text-on-surface mt-10 mb-4 pb-2 border-b border-white/[0.07] scroll-mt-20">
        {children}
      </h2>
    )
  },
  h3: ({ children }) => {
    const id = slugify(getInnerText(children))
    return (
      <h3 id={id} className="text-[18px] font-semibold leading-[1.25] text-on-surface mt-7 mb-3 scroll-mt-20">
        {children}
      </h3>
    )
  },
  p: ({ children }) => {
    const text = getInnerText(children)
    const isDisclaimer = text.startsWith('Note:') || text.startsWith('Catatan:') || text.startsWith('注意:') || text.startsWith('*Note:') || text.startsWith('*Catatan:') || text.startsWith('*注意:')
    if (isDisclaimer) {
      return (
        <p className="text-[11px] leading-[1.6] text-secondary/60 italic mt-3 select-none">
          {children}
        </p>
      )
    }
    return <p className="text-[16.8px] leading-[28.6px] text-on-surface mb-4">{children}</p>
  },
  ul: ({ children }) => (
    <ul className="mb-4 space-y-1.5 list-disc pl-6 marker:text-primary">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-1.5 list-decimal pl-6 marker:text-primary">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[16.8px] leading-[28.6px] text-on-surface pl-1">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-on-surface">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-secondary">{children}</em>
  ),
  hr: () => (
    <hr className="border-white/[0.07] my-8" />
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary pl-5 my-4 text-secondary italic">
      {children}
    </blockquote>
  ),
  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-lg border border-white/[0.07]">
      <table className="w-full border-collapse text-[15px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-surface/60">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-white/[0.05] last:border-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="text-left px-4 py-2.5 text-[11px] font-bold tracking-[0.06em] uppercase text-secondary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-on-surface leading-[1.5]">{children}</td>
  ),
  // Inline code
  code: ({ children }) => (
    <code className="bg-surface text-primary text-[13px] px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  ),
}

// ─── Loading skeleton ────────────────────────────────────────────────────────

function LoadingDots() {
  return (
    <span className="inline-flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  )
}

// ─── Core research component ─────────────────────────────────────────────────

function ResearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const city = searchParams.get('city') ?? ''
  const { language } = useLanguage()
  const t = translations[language]
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'loading' | 'streaming' | 'done' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!city.trim()) {
      router.replace('/')
      return
    }

    const abort = new AbortController()
    abortRef.current = abort

    const doResearch = async () => {
      try {
        setContent('')
        setErrorMsg('')
        setStatus('loading')
        const response = await fetch('/api/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city, lang: language }),
          signal: abort.signal,
        })

        // Handle non-streaming error responses
        const contentType = response.headers.get('Content-Type') ?? ''
        if (!response.ok || contentType.includes('application/json')) {
          const data = await response.json()
          throw new Error(data.error ?? `Request failed (${response.status})`)
        }

        setStatus('streaming')

        const reader = response.body!.getReader()
        const decoder = new TextDecoder()
        let receivedText = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          receivedText += chunk
          setContent(receivedText)
        }

        if (!receivedText.trim()) {
          throw new Error(t.emptyError || 'No content was generated. Please try again.')
        }

        setStatus('done')
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return
        setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
        setStatus('error')
      }
    }

    doResearch()
    return () => abort.abort()
  }, [city, router, language, retryCount, t.emptyError])

  // Scroll to bottom while streaming
  useEffect(() => {
    if (status === 'streaming') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [content, status])

  return (
    <div className="min-h-screen bg-base">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 border-b border-white/[0.07] bg-base/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-secondary hover:text-on-surface transition-colors text-[11px] font-semibold tracking-[0.04em] shrink-0"
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            {t.newSearch}
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <Compass size={13} className="text-primary" strokeWidth={2.5} />
            <span className="text-[12.8px] font-bold tracking-[0.08em] uppercase text-on-surface">
              GeoScout
            </span>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 shrink-0">
            {status === 'loading' && (
              <span className="flex items-center gap-1.5 text-secondary text-[11px] font-semibold tracking-[0.04em]">
                <Loader2 size={12} className="animate-spin text-secondary shrink-0" />
                {t.preparing}
              </span>
            )}
            {status === 'streaming' && (
              <span className="flex items-center gap-1.5 text-primary text-[11px] font-semibold tracking-[0.04em]">
                <Loader2 size={12} className="animate-spin text-primary shrink-0" />
                {t.researching}
              </span>
            )}
            {status === 'done' && (
              <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold tracking-[0.04em]">
                <Check size={12} className="text-emerald-400 shrink-0" />
                {t.done}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* City heading */}
        <div className="mb-8">
          <p className="text-[12.8px] font-semibold tracking-[0.08em] uppercase text-secondary mb-2">
            {t.reportTitle}
          </p>
          <h1 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface">
            {city}
          </h1>
        </div>

        {/* Loading state */}
        {(status === 'loading' || (status === 'streaming' && !content)) && (
          <div className="flex flex-col items-start gap-3 py-8">
            <div className="flex items-center gap-3 text-secondary">
              <LoadingDots />
              <span className="text-[14px]">
                {status === 'loading'
                  ? t.gathering.replace('{city}', city)
                  : t.composing}
              </span>
            </div>
            <div className="space-y-2 w-full mt-4">
              {[70, 90, 65, 80, 55].map((w, i) => (
                <div
                  key={i}
                  className="h-3 bg-surface rounded animate-pulse"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="bg-surface border border-error/30 rounded-lg p-6 max-w-lg animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="text-error shrink-0" size={18} strokeWidth={2} />
              <h2 className="text-[16px] font-semibold text-on-surface">{t.failed}</h2>
            </div>
            <p className="text-[14px] leading-[22px] text-secondary mb-5">{errorMsg}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setRetryCount((c) => c + 1)}
                className="bg-primary text-base font-bold text-[12px] tracking-[0.08em] uppercase rounded-sm px-4 py-2 hover:bg-primary/90 transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-primary/10"
              >
                <RotateCcw size={12} strokeWidth={2.5} />
                {t.retry}
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-secondary hover:text-on-surface text-[12px] font-semibold tracking-[0.04em] transition-colors"
              >
                <ArrowLeft size={12} strokeWidth={2.5} />
                {t.backToSearch}
              </Link>
            </div>
          </div>
        )}

        {/* Streamed / complete report */}
        {content && (
          <article className="animate-fade-in">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {processDataSources(content, language)}
            </ReactMarkdown>
            {/* Streaming cursor */}
            {status === 'streaming' && (
              <span
                className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-0.5 align-middle"
                aria-hidden
              />
            )}
          </article>
        )}

        <div ref={bottomRef} className="h-24" />
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-surface border border-white/[0.07] text-primary hover:text-on-surface hover:bg-surface/80 hover:border-primary/30 active:scale-95 transition-all shadow-lg shadow-black/50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </button>
      )}
    </div>
  )
}

// ─── Page export (Suspense boundary for useSearchParams) ─────────────────────

function ResearchFallback() {
  const { language } = useLanguage()
  const t = translations[language]
  return (
    <div className="min-h-screen bg-base flex items-center justify-center">
      <div className="flex items-center gap-3 text-secondary">
        <Compass size={16} className="text-primary animate-spin" />
        <span className="text-[14px]">{t.loading}</span>
      </div>
    </div>
  )
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<ResearchFallback />}>
      <ResearchContent />
    </Suspense>
  )
}
