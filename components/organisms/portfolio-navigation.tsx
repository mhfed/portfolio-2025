'use client'

import { useState } from 'react'
import { Menu, SunMoon, X } from 'lucide-react'
import { Link, routing } from '@/i18n/routing'
import { toggleThemeMode } from '@/lib/theme'

type PortfolioLocale = (typeof routing.locales)[number]

export interface PortfolioNavigationItem {
  href: string
  label: string
}

export interface PortfolioNavigationProps {
  name: string
  locale: PortfolioLocale
  items: PortfolioNavigationItem[]
  contactLabel: string
  resumeLabel: string
  languageLabel: string
  skipToContentLabel: string
  primaryNavigationLabel: string
  mobileNavigationLabel: string
  themeLabel: string
  openMenuLabel: string
  closeMenuLabel: string
}

const localeLabels: Record<PortfolioLocale, string> = {
  en: 'EN',
  vi: 'VI',
  'zh-TW': '繁中',
}

export function PortfolioNavigation({
  name,
  locale,
  items,
  contactLabel,
  resumeLabel,
  languageLabel,
  skipToContentLabel,
  primaryNavigationLabel,
  mobileNavigationLabel,
  themeLabel,
  openMenuLabel,
  closeMenuLabel,
}: PortfolioNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className='portfolio-header'>
      <a className='skip-link' href='#main-content'>
        {skipToContentLabel}
      </a>
      <div className='portfolio-shell portfolio-header__inner'>
        <a className='portfolio-wordmark' href='#top' aria-label={name}>
          MH
        </a>

        <nav className='portfolio-nav' aria-label={primaryNavigationLabel}>
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className='portfolio-header__actions'>
          <nav className='locale-switcher' aria-label={languageLabel}>
            {routing.locales.map((option) => (
              <Link
                key={option}
                href='/'
                locale={option}
                aria-current={option === locale ? 'page' : undefined}
              >
                {localeLabels[option]}
              </Link>
            ))}
          </nav>

          <button
            className='icon-button'
            type='button'
            onClick={toggleThemeMode}
            aria-label={themeLabel}
          >
            <SunMoon aria-hidden='true' size={17} strokeWidth={1.7} />
          </button>

          <a className='header-contact' href='#contact'>
            {contactLabel}
          </a>

          <button
            className='menu-button'
            type='button'
            aria-label={menuOpen ? closeMenuLabel : openMenuLabel}
            aria-expanded={menuOpen}
            aria-controls='mobile-navigation'
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X aria-hidden='true' size={20} strokeWidth={1.7} />
            ) : (
              <Menu aria-hidden='true' size={20} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id='mobile-navigation' className='mobile-navigation'>
          <nav className='portfolio-shell' aria-label={mobileNavigationLabel}>
            {items.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a
              href='/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
              target='_blank'
              rel='noreferrer'
              onClick={closeMenu}
            >
              {resumeLabel}
            </a>
            <a href='#contact' onClick={closeMenu}>
              {contactLabel}
            </a>
            <nav className='mobile-locale-switcher' aria-label={languageLabel}>
              {routing.locales.map((option) => (
                <Link
                  key={option}
                  href='/'
                  locale={option}
                  aria-current={option === locale ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {localeLabels[option]}
                </Link>
              ))}
            </nav>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
