'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Sun, Moon, Languages, Palette } from 'lucide-react'
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

  return (
    <>
      <header
        className='sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border/10'
        style={{ height: 'var(--header-height)' }}
      >
        <nav className='max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4'>
          <ScrollProgress className='h-0.5 top-(--header-height)' />

          {/* Logo - Left Side on Desktop, Center on Mobile */}
          <Link
            href={homePath}
            className='text-primary font-mono text-lg md:text-xl font-bold hover:opacity-80 transition-opacity md:order-first order-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0'
          >
            &lt;Hieu /&gt;
          </Link>

          {/* Contact Info - Left Side (2 columns) - Hidden on Mobile */}
          <div className='hidden md:flex flex-row gap-6 md:gap-8 shrink-0 min-w-0'>
            {/* Based in */}
            <div className='flex flex-col gap-0.5'>
              <span className='text-[10px] md:text-xs text-foreground/60 font-medium uppercase tracking-wider'>
                {tContact('basedIn')}
              </span>
              <span className='text-xs md:text-sm text-foreground/80 font-semibold truncate'>
                {tContact('location')}
              </span>
            </div>

            {/* Say hello */}
            <div className='flex flex-col gap-0.5'>
              <span className='text-[10px] md:text-xs text-foreground/60 font-medium uppercase tracking-wider'>
                {tContact('sayHello')}
              </span>
              <a
                href={`mailto:${tContact('email')}`}
                className='text-xs md:text-sm text-foreground/80 font-semibold underline hover:text-primary transition-colors truncate'
              >
                {tContact('email')}
              </a>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className='hidden md:flex gap-8 items-center'>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                scroll={!link.href.includes('#')}
                onClick={(e) => handleNavClick(e, link.href)}
                className='text-foreground/80 hover:text-primary transition-all duration-300 ease-in-out text-sm font-medium uppercase relative group'
              >
                {link.name}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full'></span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center gap-3 md:gap-4 shrink-0'>
            {/* Language Switcher - Desktop only */}
            <div className='hidden md:block relative'>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className='p-2 rounded-md hover:bg-primary/10 transition-all duration-300 ease-in-out hover:scale-110 touch-manipulation cursor-pointer'
                aria-label='Change language'
              >
                <Languages className='w-4 h-4 text-foreground transition-transform duration-300' />
              </button>

              {isLanguageMenuOpen && (
                <>
                  <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  <div className='absolute right-0 top-full mt-2 bg-background border border-border/30 rounded-lg shadow-lg z-50 min-w-[120px] overflow-hidden'>
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-md cursor-pointer hover:scale-[1.02] ${
                          locale === loc ? 'bg-primary/20 font-semibold' : ''
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
                className='flex items-center gap-2 rounded-lg p-2 hover:bg-primary/10 transition-all duration-300 ease-in-out hover:scale-105 touch-manipulation cursor-pointer'
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
              className='md:hidden flex flex-col gap-1.5 w-7 h-7 justify-center items-center touch-manipulation p-1 cursor-pointer'
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

      {/* Mobile Menu - Bottom Sheet */}
      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerContent className='max-h-[85vh]'>
          <nav className='flex flex-col h-full'>
            {/* Navigation Links */}
            <div className='flex flex-col p-6 gap-1 flex-1 overflow-y-auto'>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  scroll={!link.href.includes('#')}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className='text-foreground hover:text-primary transition-all duration-300 ease-in-out text-base font-semibold uppercase py-4 px-4 rounded-md hover:bg-primary/10 active:bg-primary/20 touch-manipulation hover:scale-[1.02]'
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Actions - Language & Theme */}
            <div className='border-t border-border/30 p-4 space-y-3'>
              {/* Language Switcher */}
              <div className='relative'>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className='w-full flex items-center justify-between px-4 py-3 rounded-md hover:bg-primary/10 transition-colors touch-manipulation cursor-pointer'
                  aria-label='Change language'
                >
                  <span className='text-sm font-medium text-foreground'>
                    Language
                  </span>
                  <Languages className='w-5 h-5 text-foreground' />
                </button>

                {isLanguageMenuOpen && (
                  <>
                    <div
                      className='fixed inset-0 z-40'
                      onClick={() => setIsLanguageMenuOpen(false)}
                    />
                    <div className='absolute left-0 right-0 bottom-full mb-2 bg-background border border-border/30 rounded-lg shadow-lg z-50'>
                      {routing.locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-primary/10 transition-colors rounded-md cursor-pointer ${
                            locale === loc ? 'bg-primary/20 font-semibold' : ''
                          }`}
                        >
                          {loc.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Theme Toggle */}
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
