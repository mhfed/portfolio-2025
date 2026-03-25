'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Languages, Moon, Palette, Sun } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { useTheme } from '@/hooks/use-theme'
import { routing, Link, usePathname } from '@/i18n/routing'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { ScrollProgress } from './ui/scroll-progress'
import { useLenis } from 'lenis/react'
import { ThemeSelector } from './theme-selector'

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const t = useTranslations('header.nav')
  const tContact = useTranslations('hero.contact')
  const { locale, setLocale } = useLocale()
  const { isDark, accentTheme, toggleMode, setAccentTheme } = useTheme()
  const lenis = useLenis()
  const pathname = usePathname()

  const homePath = '/'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const hash = window.location.hash
    if (hash && lenis) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash) as HTMLElement | null
        if (element) {
          const headerHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              '--header-height'
            ) || '60'
          )

          lenis.scrollTo(element, {
            offset: -headerHeight,
            duration: 1.2,
          })
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [mounted, lenis])

  const handleLanguageChange = (newLocale: 'en' | 'vi' | 'zh-TW') => {
    setLocale(newLocale)
    setIsLanguageMenuOpen(false)
  }

  const navLinks = [
    { name: t('about'), href: '/#about', key: 'about' },
    { name: t('experience'), href: '/#experience', key: 'experience' },
    { name: t('projects'), href: '/#projects', key: 'projects' },
    { name: t('collaborate'), href: '/#collaborate', key: 'collaborate' },
    { name: t('blog'), href: '/blog', key: 'blog' },
  ]

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsMobileMenuOpen(false)

    if (!href.includes('#')) {
      return
    }

    const anchorMatch = href.match(/#[\w-]+$/)
    const anchor = anchorMatch ? anchorMatch[0] : null

    if (!anchor) return

    const isHomePage = pathname === '/'

    if (isHomePage) {
      e.preventDefault()
      e.stopPropagation()

      window.history.pushState(null, '', anchor)

      const element = document.querySelector(anchor) as HTMLElement | null

      if (element && lenis) {
        const headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--header-height'
          ) || '60'
        )

        lenis.scrollTo(element, {
          offset: -headerHeight,
          duration: 1.2,
        })
      } else if (element) {
        const headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--header-height'
          ) || '60'
        )
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY

        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: 'smooth',
        })
      }
    }
  }

  const displayIsDark = mounted ? isDark : false
  const isBlogPage = pathname.startsWith('/blog')

  return (
    <>
      <header
        className='sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/60'
        style={{ height: 'var(--header-height)' }}
      >
        <nav className='mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 md:px-6'>
          <ScrollProgress className='top-[calc(var(--header-height)-1px)] h-px' />

          <Link href={homePath} className='group min-w-0'>
            <div className='min-w-0'>
              <span className='block truncate font-display text-lg font-semibold tracking-[-0.06em] text-foreground transition-colors group-hover:text-primary md:text-xl'>
                Nguyen Minh Hieu
              </span>
              <span className='block truncate text-xs text-foreground/55 md:text-sm'>
                {tContact('location')} · Frontend Developer
              </span>
            </div>
          </Link>

          <div className='hidden lg:flex items-center gap-7'>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                scroll={!link.href.includes('#')}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  link.key === 'blog' && isBlogPage
                    ? 'text-primary'
                    : 'text-foreground/68 hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className='flex shrink-0 items-center gap-2 md:gap-3'>
            <a
              href={`mailto:${tContact('email')}`}
              className='hidden items-center rounded-full border border-white/10 bg-card/70 px-4 py-2 text-sm text-foreground/72 transition-colors hover:border-primary/30 hover:text-foreground xl:inline-flex'
            >
              {tContact('email')}
            </a>

            <div className='relative hidden md:block'>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/70 transition-all duration-300 hover:border-primary/30 hover:bg-card'
                aria-label='Change language'
              >
                <Languages className='h-4 w-4 text-foreground' />
              </button>

              {isLanguageMenuOpen && (
                <>
                  <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  <div className='absolute right-0 top-full z-50 mt-3 min-w-[140px] overflow-hidden rounded-[22px] border border-white/10 bg-card/95 p-2 shadow-2xl backdrop-blur-xl'>
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={`w-full rounded-2xl px-4 py-2.5 text-left text-sm transition-all duration-300 ${
                          locale === loc
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground/72 hover:bg-primary/10 hover:text-foreground'
                        }`}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className='relative hidden md:block'>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className='inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-card/70 px-3 transition-all duration-300 hover:border-primary/30 hover:bg-card'
                aria-label='Open theme settings'
              >
                <Palette className='h-4 w-4 text-foreground' />
                {displayIsDark ? (
                  <Moon className='h-4 w-4 text-primary' />
                ) : (
                  <Sun className='h-4 w-4 text-primary' />
                )}
              </button>

              {isThemeMenuOpen && (
                <>
                  <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsThemeMenuOpen(false)}
                  />
                  <div className='absolute right-0 top-full z-50 mt-3'>
                    <ThemeSelector
                      compact
                      isDark={displayIsDark}
                      accentTheme={accentTheme}
                      onToggleMode={toggleMode}
                      onAccentThemeChange={setAccentTheme}
                    />
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className='flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-card/70 p-1 transition-all duration-300 hover:border-primary/30 hover:bg-card md:hidden'
              aria-label='Toggle menu'
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerContent className='max-h-[85vh] rounded-t-[28px] border-white/10 bg-card/95 px-2 pb-4 pt-6 backdrop-blur-2xl'>
          <nav className='flex h-full flex-col'>
            <div className='px-4'>
              <span className='section-kicker'>navigation</span>
            </div>

            <div className='mt-6 flex flex-1 flex-col gap-1 overflow-y-auto px-2'>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  scroll={!link.href.includes('#')}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className='rounded-2xl px-4 py-4 text-lg font-medium text-foreground transition-all duration-300 hover:bg-primary/10'
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className='space-y-3 border-t border-white/10 p-3 pt-4'>
              <div className='relative'>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className='flex w-full items-center justify-between rounded-2xl border border-white/10 bg-background/60 px-4 py-3 transition-colors'
                  aria-label='Change language'
                >
                  <span className='text-sm font-medium text-foreground'>
                    Language
                  </span>
                  <Languages className='h-5 w-5 text-foreground' />
                </button>

                {isLanguageMenuOpen && (
                  <>
                    <div
                      className='fixed inset-0 z-40'
                      onClick={() => setIsLanguageMenuOpen(false)}
                    />
                    <div className='absolute bottom-full left-0 right-0 z-50 mb-2 rounded-2xl border border-white/10 bg-card/95 p-2 shadow-lg'>
                      {routing.locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={`w-full rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                            locale === loc
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground/72 hover:bg-primary/10 hover:text-foreground'
                          }`}
                        >
                          {loc.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className='px-1 pt-1'>
                <ThemeSelector
                  isDark={displayIsDark}
                  accentTheme={accentTheme}
                  onToggleMode={toggleMode}
                  onAccentThemeChange={setAccentTheme}
                />
              </div>
            </div>
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  )
}
