'use client'

import Image from 'next/image'
import { useEffect, useState, type CSSProperties } from 'react'
import { Check, ChevronDown, Download, Globe2, Menu, Moon, Sun, X } from 'lucide-react'
import { Link, routing } from '@/i18n/routing'
import { getAppliedThemeMode, toggleThemeMode } from '@/lib/theme'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface DuoHeaderProps {
  content: Pick<
    PortfolioContent,
    'fullName' | 'locale' | 'navigation' | 'contact'
  >
}

const localeLabels: Record<PortfolioContent['locale'], string> = {
  en: 'EN',
  vi: 'VI',
  'zh-TW': '繁中',
}

const localeNames: Record<PortfolioContent['locale'], string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  'zh-TW': '繁體中文',
}

export function DuoHeader({ content }: DuoHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const resume = content.contact.links.find((link) => link.download)

  useEffect(() => {
    setTheme(getAppliedThemeMode())
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const switchTheme = () => setTheme(toggleThemeMode())
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className='duo-header'>
      <a className='duo-skip' href='#main-content'>
        {content.navigation.skipToContentLabel}
      </a>
      <a className='duo-brand' href='#top' aria-label={content.fullName}>
        <span className='duo-brand__mark' aria-hidden='true'>
          <Image
            src='/images/mascot-skills.png'
            alt=''
            width={900}
            height={900}
            className='duo-brand__mascot'
          />
        </span>
        <span className='duo-brand__wordmark'>
          HIEU<span className='duo-brand__dot'>.</span>
        </span>
      </a>

      <nav className='duo-nav' aria-label={content.navigation.primaryNavigationLabel}>
        {content.navigation.items.map((item) => (
          <a key={item.id} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className='duo-header__actions'>
        <details className='duo-locale'>
          <summary
            className='duo-locale__trigger'
            aria-label={content.navigation.language.changeLabel}
          >
            <Globe2 aria-hidden='true' size={15} />
            <span>{localeLabels[content.locale]}</span>
            <ChevronDown aria-hidden='true' size={14} />
          </summary>
          <div
            className='duo-locale__menu'
            aria-label={content.navigation.language.label}
          >
            {routing.locales.map((locale) => {
              const isCurrentLocale = locale === content.locale

              return (
                <Link
                  key={locale}
                  href='/'
                  locale={locale}
                  aria-current={isCurrentLocale ? 'page' : undefined}
                >
                  <span className='duo-locale__code'>{localeLabels[locale]}</span>
                  <span>{localeNames[locale]}</span>
                  {isCurrentLocale ? <Check aria-hidden='true' size={14} /> : null}
                </Link>
              )
            })}
          </div>
        </details>
        <button
          className='duo-icon-button'
          type='button'
          onClick={switchTheme}
          aria-label={content.navigation.theme.toggleLabel}
          title={content.navigation.theme.toggleLabel}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        {resume ? (
          <a className='duo-button duo-button--nav' href={resume.href} download>
            <Download size={15} /> {resume.label}
          </a>
        ) : null}
        <button
          className='duo-menu'
          type='button'
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? content.navigation.menu.closeLabel : content.navigation.menu.openLabel}
          aria-expanded={menuOpen}
          aria-controls='duo-mobile-navigation'
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id='duo-mobile-navigation'
        className={`duo-mobile-navigation${menuOpen ? ' is-open' : ''}`}
      >
        <nav aria-label={content.navigation.mobileNavigationLabel}>
          {content.navigation.items.map((item, index) => (
            <a key={item.id} href={item.href} onClick={closeMenu} style={{ '--duo-item-index': index } as CSSProperties}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
          {resume ? (
            <a href={resume.href} download onClick={closeMenu} style={{ '--duo-item-index': content.navigation.items.length } as CSSProperties}>
              <span>↗</span>
              {resume.label}
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
