'use client'

import { useEffect, useMemo, useState } from 'react'
import type React from 'react'
import { useTranslations } from 'next-intl'
import { Languages, Moon, Palette, Sun } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { useTheme } from '@/hooks/use-theme'
import { routing, Link, usePathname } from '@/i18n/routing'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { useLenis } from 'lenis/react'
import { ThemeSelector } from '@/components/molecules/theme-selector'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home-top')
  const tHeader = useTranslations('header')
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

  const navLinks = useMemo(
    () => [
      { name: 'Home', href: '/#home-top', key: 'home-top' },
      { name: tHeader('nav.about'), href: '/#about', key: 'about' },
      { name: 'Skills', href: '/#skills', key: 'skills' },
      {
        name: tHeader('nav.experience'),
        href: '/#experience',
        key: 'experience',
      },
      { name: tHeader('nav.projects'), href: '/#projects', key: 'projects' },
      {
        name: tHeader('nav.collaborate'),
        href: '/#collaborate',
        key: 'collaborate',
      },
    ],
    [tHeader]
  )

  useEffect(() => {
    if (!mounted) return

    const sections = navLinks
      .map((link) => document.getElementById(link.key))
      .filter((section): section is HTMLElement => Boolean(section))

    let frame = 0

    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.34
      const current =
        sections.findLast((section) => section.offsetTop <= marker) ??
        sections[0]

      if (current?.id) {
        setActiveSection(current.id)
      }
    }

    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mounted, navLinks])

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

  useEffect(() => {
    if (!lenis) return
    if (isMobileMenuOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
    return () => lenis.start()
  }, [isMobileMenuOpen, lenis])

  const displayIsDark = mounted ? isDark : false

  return (
    <>
      <header
        className='fixed left-0 right-0 top-0 z-40 px-3 pt-4 md:px-6 md:pt-5'
        style={{ height: 'var(--header-height)' }}
      >
        <nav className='mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-4 rounded-full border border-white/10 bg-background/72 px-3 shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl supports-backdrop-filter:bg-background/62 md:h-16 md:px-4'>
          <ScrollProgress className='top-[calc(var(--header-height)-1px)] h-px' />

          <Link href={homePath} className='group min-w-0'>
            <div className='min-w-0'>
              <span className='block truncate font-display text-base font-semibold tracking-normal text-foreground transition-colors group-hover:text-primary md:text-lg'>
                Minh Hieu
              </span>
              <span className='hidden truncate text-xs text-foreground/55 sm:block'>
                {tContact('location')} · {tHeader('developer')}
              </span>
            </div>
          </Link>

          <div className='hidden items-center rounded-full border border-white/[0.06] bg-white/[0.035] p-1 lg:flex'>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                scroll={!link.href.includes('#')}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeSection === link.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/62 hover:bg-white/[0.06] hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className='flex shrink-0 items-center gap-2 md:gap-3'>
            <a
              href={`mailto:${tContact('email')}`}
                className='hidden items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-foreground/72 transition-colors hover:border-primary/30 hover:text-foreground xl:inline-flex'
            >
              {tContact('email')}
            </a>

            <div className='relative hidden md:block'>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/70 transition-all duration-300 hover:border-primary/30 hover:bg-card'
                aria-label={tHeader('changeLanguage')}
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

            {/* Direct Theme Toggle button */}
            <div className='hidden md:block'>
              <AnimatedThemeToggler
                theme={displayIsDark ? 'dark' : 'light'}
                onThemeChange={toggleMode}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/70 transition-all duration-300 hover:border-primary/30 hover:bg-card'
                aria-label={tHeader('toggleTheme')}
              >
                {displayIsDark ? (
                  <Moon className='h-4 w-4 text-primary' />
                ) : (
                  <Sun className='h-4 w-4 text-primary' />
                )}
              </AnimatedThemeToggler>
            </div>

            {/* Accent Color picker button */}
            <div className='relative hidden md:block'>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/70 transition-all duration-300 hover:border-primary/30 hover:bg-card'
                aria-label={tHeader('openThemeSettings')}
              >
                <Palette className='h-4 w-4 text-foreground' />
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
                      accentTheme={accentTheme}
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
        <DrawerContent className='max-h-[92vh] rounded-t-[28px] border-white/10 bg-card/95 backdrop-blur-2xl'>
          <div 
            className='flex-1 min-h-0 overflow-y-auto px-2 pb-12 pt-6' 
            data-vaul-no-drag 
            data-lenis-prevent
            style={{ overscrollBehavior: 'contain' }}
          >
            <nav className='flex flex-col'>
              <div className='px-4'>
                <span className='section-kicker'>navigation</span>
              </div>

              <div className='mt-6 flex flex-col gap-1'>
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

              <div className='mt-8 space-y-4 border-t border-white/10 p-4 pt-6'>
                <div className='relative'>
                  <button
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    className='flex w-full items-center justify-between rounded-2xl border border-white/10 bg-background/60 px-4 py-4 transition-colors'
                    aria-label={tHeader('changeLanguage')}
                  >
                    <span className='text-base font-medium text-foreground'>
                      {tHeader('language')}
                    </span>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-primary uppercase font-bold'>{locale}</span>
                      <Languages className='h-5 w-5 text-foreground' />
                    </div>
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

                <div className='flex items-center justify-between rounded-2xl border border-white/10 bg-background/60 px-4 py-3.5'>
                  <span className='text-base font-medium text-foreground'>
                    {tHeader('themeMode')}
                  </span>
                  <AnimatedThemeToggler
                    theme={displayIsDark ? 'dark' : 'light'}
                    onThemeChange={toggleMode}
                    className='inline-flex h-10 px-4 items-center gap-2 rounded-full border border-white/10 bg-card/70 transition-all duration-300 hover:border-primary/30 hover:bg-card'
                    aria-label={tHeader('toggleTheme')}
                  >
                    {displayIsDark ? (
                      <>
                        <Moon className='h-4 w-4 text-primary' />
                        <span className='text-sm font-medium'>{tHeader('dark')}</span>
                      </>
                    ) : (
                      <>
                        <Sun className='h-4 w-4 text-primary' />
                        <span className='text-sm font-medium'>{tHeader('light')}</span>
                      </>
                    )}
                  </AnimatedThemeToggler>
                </div>

                <div className='pt-2'>
                  <ThemeSelector
                    accentTheme={accentTheme}
                    onAccentThemeChange={setAccentTheme}
                  />
                </div>
              </div>
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
