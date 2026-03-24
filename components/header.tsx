'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Sun, Moon, Languages, Palette, Search } from 'lucide-react'
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
  const { locale, setLocale, isLoading } = useLocale()
  const { isDark, accentTheme, toggleMode, setAccentTheme } = useTheme()
  const lenis = useLenis()
  const pathname = usePathname()

  // Home path - next-intl Link handles locale automatically
  const homePath = '/'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll to hash on initial page load or when URL has hash
  useEffect(() => {
    if (!mounted) return

    const hash = window.location.hash
    if (hash && lenis) {
      // Small delay to ensure DOM is ready and Lenis is initialized
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
    {
      name: t('experience'),
      href: '/#experience',
      key: 'experience',
    },
    { name: t('projects'), href: '/#projects', key: 'projects' },
    {
      name: t('collaborate'),
      href: '/#collaborate',
      key: 'collaborate',
    },
    { name: t('blog'), href: '/blog', key: 'blog' },
  ]

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Close mobile menu
    setIsMobileMenuOpen(false)

    // If it's a route link (no #), let Next.js handle it normally
    if (!href.includes('#')) {
      return
    }

    // Extract the anchor from href (e.g., "/#about" -> "#about" or "/vi#about" -> "#about")
    const anchorMatch = href.match(/#[\w-]+$/)
    const anchor = anchorMatch ? anchorMatch[0] : null

    if (!anchor) return

    // Check if we're on the home page
    // usePathname from next-intl returns path WITHOUT locale prefix
    // So home page is always '/' regardless of locale
    const isHomePage = pathname === '/'

    if (isHomePage) {
      // On home page, prevent default navigation and use smooth scroll
      e.preventDefault()
      e.stopPropagation()

      // Update URL hash immediately
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
        // Fallback: use native smooth scroll if Lenis is not available
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
    // If not on home page, let Next.js navigate to the page with anchor
  }

  // Render header immediately to prevent layout shift, use default values until mounted
  const displayIsDark = mounted ? isDark : false
  const isBlogPage = pathname.startsWith('/blog')

  return (
    <>
      <header
        className='sticky top-0 z-50 border-b border-primary/15 bg-background/80 backdrop-blur-2xl supports-backdrop-filter:bg-background/55'
        style={{ height: 'var(--header-height)' }}
      >
        <nav className='mx-auto flex h-full max-w-[1600px] items-center justify-between gap-3 px-4 md:px-6 lg:px-8'>
          <ScrollProgress className='top-[calc(var(--header-height)-1px)] h-px' />

          <Link
            href={homePath}
            className='group flex min-w-0 items-center gap-3'
          >
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 font-mono text-xs font-semibold tracking-[0.3em] text-primary'>
              OS
            </span>
            <div className='min-w-0'>
              <span className='block font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70'>
                architect node
              </span>
              <span className='block truncate font-display text-base font-semibold tracking-[0.18em] text-foreground transition-colors group-hover:text-primary md:text-lg'>
                HIEU_OS
              </span>
            </div>
          </Link>

          <div className='hidden xl:flex min-w-0 items-center gap-3 rounded-full border border-primary/15 bg-card/60 px-4 py-2'>
            <Search className='h-4 w-4 shrink-0 text-primary' />
            <div className='truncate font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/65'>
              {tContact('basedIn')}: {tContact('location')}
            </div>
          </div>

          <div className='hidden md:flex items-center gap-1 rounded-full border border-primary/15 bg-card/60 p-1.5'>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                scroll={!link.href.includes('#')}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.26em] transition-all duration-300 ${
                  link.key === 'blog' && isBlogPage
                    ? 'bg-primary/12 text-primary shadow-[0_0_20px_rgba(34,211,153,0.1)]'
                    : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className='flex items-center gap-2 md:gap-3 shrink-0'>
            <a
              href={`mailto:${tContact('email')}`}
              className='hidden lg:flex items-center rounded-full border border-primary/15 bg-card/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/75 transition-colors hover:border-primary/40 hover:text-primary'
            >
              {tContact('sayHello')}: {tContact('email')}
            </a>

            <div className='hidden md:block relative'>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/15 bg-card/60 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary'
                aria-label='Change language'
              >
                <Languages className='h-4 w-4 text-foreground transition-transform duration-300' />
              </button>

              {isLanguageMenuOpen && (
                <>
                  <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  <div className='absolute right-0 top-full z-50 mt-3 min-w-[140px] overflow-hidden rounded-2xl border border-primary/15 bg-card/95 p-2 shadow-2xl backdrop-blur-xl'>
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={`w-full rounded-xl px-4 py-2.5 text-left font-mono text-xs uppercase tracking-[0.24em] transition-all duration-300 ${
                          locale === loc
                            ? 'bg-primary/15 text-primary'
                            : 'text-foreground/75 hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle - Desktop only */}
            <div className='relative hidden md:block'>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className='inline-flex h-10 items-center gap-2 rounded-2xl border border-primary/15 bg-card/60 px-3 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10'
                aria-label='Open theme settings'
              >
                <Palette className='h-4 w-4 text-foreground transition-transform duration-300' />
                {displayIsDark ? (
                  <Moon className='h-4 w-4 text-primary transition-transform duration-300' />
                ) : (
                  <Sun className='h-4 w-4 text-primary transition-transform duration-300' />
                )}
              </button>

              {isThemeMenuOpen && (
                <>
                  <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsThemeMenuOpen(false)}
                  />
                  <div className='absolute right-0 top-full z-50 mt-2'>
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className='flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-2xl border border-primary/15 bg-card/60 p-1 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 md:hidden'
              aria-label='Toggle menu'
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerContent className='max-h-[85vh] border-primary/15 bg-card/95 backdrop-blur-2xl'>
          <nav className='flex flex-col h-full'>
            <div className='px-6 pt-6'>
              <span className='terminal-label'>system menu</span>
            </div>

            <div className='flex flex-1 flex-col gap-1 overflow-y-auto p-6'>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  scroll={!link.href.includes('#')}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className='rounded-2xl border border-transparent px-4 py-4 font-mono text-sm uppercase tracking-[0.24em] text-foreground transition-all duration-300 hover:border-primary/20 hover:bg-primary/10 hover:text-primary'
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className='space-y-3 border-t border-primary/15 p-4'>
              <div className='relative'>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className='flex w-full items-center justify-between rounded-2xl border border-primary/15 bg-background/60 px-4 py-3 transition-colors'
                  aria-label='Change language'
                >
                  <span className='font-mono text-xs uppercase tracking-[0.24em] text-foreground'>
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
                    <div className='absolute bottom-full left-0 right-0 z-50 mb-2 rounded-2xl border border-primary/15 bg-card/95 p-2 shadow-lg'>
                      {routing.locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={`w-full rounded-xl px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.24em] transition-colors ${
                            locale === loc
                              ? 'bg-primary/15 text-primary'
                              : 'text-foreground/75 hover:bg-primary/10 hover:text-primary'
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
