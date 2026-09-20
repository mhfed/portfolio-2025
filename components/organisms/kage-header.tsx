'use client'

import { useEffect, useState } from 'react'
import { Download, Globe2, Moon, Sun, X } from 'lucide-react'
import { Link, routing } from '@/i18n/routing'
import { getAppliedThemeMode, toggleThemeMode } from '@/lib/theme'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface KageHeaderProps {
  content: Pick<
    PortfolioContent,
    'fullName' | 'locale' | 'navigation' | 'contact'
  >
}

const KANJI_MAP: Record<string, string> = {
  about: '山門',
  work: '庭園',
  experience: '手業',
  skills: '術',
  contact: '残光',
}

const localeLabels: Record<PortfolioContent['locale'], string> = {
  en: 'EN',
  vi: 'VI',
  'zh-TW': '繁中',
}

export function KageHeader({ content }: KageHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [localeOpen, setLocaleOpen] = useState(false)

  const resume = content.contact.links.find((link) => link.download)

  useEffect(() => {
    setTheme(getAppliedThemeMode())

    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setLocaleOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const switchTheme = () => setTheme(toggleThemeMode())

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[84px] px-[var(--pad)] flex items-center transition-all duration-500 ${
          scrolled
            ? 'bg-[#05070a]/80 backdrop-blur-md border-b border-[var(--line-soft)]'
            : 'bg-transparent'
        }`}
      >
        {/* Brand */}
        <a
          href='#top'
          className='flex items-center gap-3 text-inherit group'
          data-cursor
          aria-label={content.fullName}
        >
          <div className='w-9 h-9 relative flex items-center justify-center'>
            <svg viewBox='0 0 44 44' fill='none' className='w-full h-full'>
              <circle
                cx='22'
                cy='25'
                r='8.6'
                fill='var(--vermilion)'
                fillOpacity='0.95'
                className='group-hover:scale-110 transition-transform duration-500 origin-center'
              />
              <path
                d='M5 13h34M9 18.4h26M22 8.5v27'
                stroke='var(--bone)'
                strokeWidth='1.5'
              />
              <path
                d='M14 35.5h16'
                stroke='var(--bone)'
                strokeWidth='1.2'
                strokeOpacity='0.6'
              />
            </svg>
          </div>
          <div className='flex flex-col leading-none gap-1'>
            <b className='text-[12px] font-medium tracking-[0.26em] text-[var(--bone)]'>
              MINH HIEU
            </b>
            <i className='not-italic text-[8px] tracking-[0.34em] text-[var(--muted)] uppercase'>
              FRONTEND ARCHITECT
            </i>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className='hidden md:flex items-center gap-8 ml-auto mr-6'
          aria-label={content.navigation.primaryNavigationLabel}
        >
          {content.navigation.items.map((item) => {
            const kanji = KANJI_MAP[item.id] || '道'
            return (
              <a
                key={item.id}
                href={item.href}
                className='relative block h-[18px] overflow-hidden text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--bone-dim)] hover:text-[var(--bone)] transition-colors group'
                data-cursor
              >
                <span className='block transition-transform duration-500 group-hover:-translate-y-full'>
                  {item.label}
                </span>
                <span className='absolute inset-0 block text-[var(--vermilion)] tracking-[0.3em] translate-y-full transition-transform duration-500 group-hover:translate-y-0 jp text-[11px] font-normal'>
                  {kanji}
                </span>
              </a>
            )
          })}
        </nav>

        {/* Actions (Lang, Theme, Resume) */}
        <div className='flex items-center gap-3 ml-auto md:ml-0'>
          {/* Language dropdown */}
          <div className='relative'>
            <button
              type='button'
              onClick={() => setLocaleOpen(!localeOpen)}
              className='flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase text-[var(--bone-dim)] border border-[var(--line)] rounded-full hover:border-[var(--bone)] transition-colors'
              data-cursor
              aria-label={content.navigation.language.changeLabel}
            >
              <Globe2 size={12} />
              <span>{localeLabels[content.locale]}</span>
            </button>

            {localeOpen && (
              <div
                className='absolute right-0 top-full mt-2 py-1.5 min-w-[120px] bg-[#0a0e12] border border-[var(--line)] rounded-md shadow-2xl z-50'
                role='menu'
              >
                {routing.locales.map((loc) => (
                  <Link
                    key={loc}
                    href='/'
                    locale={loc}
                    onClick={() => setLocaleOpen(false)}
                    className={`block px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase hover:bg-[var(--line-soft)] transition-colors ${
                      loc === content.locale
                        ? 'text-[var(--vermilion)] font-medium'
                        : 'text-[var(--bone-dim)]'
                    }`}
                  >
                    {localeLabels[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            type='button'
            onClick={switchTheme}
            className='w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--bone-dim)] hover:text-[var(--bone)] hover:border-[var(--bone)] transition-colors'
            aria-label={content.navigation.theme.toggleLabel}
            data-cursor
          >
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          {/* Resume link */}
          {resume && (
            <a
              href={resume.href}
              download
              className='hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--bone)] hover:bg-[var(--bone)] hover:text-[#05070a] transition-all'
              data-cursor
            >
              <Download size={11} />
              <span>CV</span>
            </a>
          )}

          {/* Mobile hamburger */}
          <button
            type='button'
            onClick={() => setMenuOpen(!menuOpen)}
            className='md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1.5 p-1'
            aria-label='Toggle menu'
            data-cursor
          >
            <span
              className={`block h-[1.5px] bg-[var(--bone)] transition-all duration-300 ${
                menuOpen ? 'w-6 rotate-45 translate-y-[4.5px]' : 'w-6'
              }`}
            />
            <span
              className={`block h-[1.5px] bg-[var(--bone)] transition-all duration-300 ${
                menuOpen ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-4'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile slide-in sheet */}
      {menuOpen && (
        <div
          className='fixed inset-0 z-40 bg-[#05070a]/95 backdrop-blur-xl md:hidden flex flex-col pt-28 px-8 pb-10'
          role='dialog'
          aria-modal='true'
        >
          <button
            type='button'
            onClick={() => setMenuOpen(false)}
            className='absolute top-6 right-6 p-2 text-[var(--bone-dim)] hover:text-[var(--bone)]'
            aria-label='Close menu'
          >
            <X size={20} />
          </button>

          <nav className='flex flex-col gap-5 my-auto'>
            {content.navigation.items.map((item) => {
              const kanji = KANJI_MAP[item.id] || ''
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className='flex items-baseline justify-between py-3 border-b border-[var(--line-soft)] text-lg tracking-[0.16em] uppercase text-[var(--bone)]'
                >
                  <span>{item.label}</span>
                  <span className='jp text-[var(--vermilion)] text-sm tracking-[0.3em] font-normal'>
                    {kanji}
                  </span>
                </a>
              )
            })}
          </nav>

          {resume && (
            <div className='mt-auto pt-6 border-t border-[var(--line-soft)]'>
              <a
                href={resume.href}
                download
                className='flex items-center justify-center gap-2 w-full py-3 rounded-full border border-[var(--line)] text-xs tracking-[0.2em] uppercase text-[var(--bone)]'
              >
                <Download size={14} />
                <span>{resume.label}</span>
              </a>
            </div>
          )}
        </div>
      )}
    </>
  )
}
