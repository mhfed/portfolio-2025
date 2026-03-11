'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Sun, Moon, Languages } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { routing, Link, usePathname } from '@/i18n/routing'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { ScrollProgress } from './ui/scroll-progress'
import { useLenis } from 'lenis/react'

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const t = useTranslations('header.nav')
  const tContact = useTranslations('hero.contact')
  const { locale, setLocale, isLoading } = useLocale()
  const lenis = useLenis()
  const pathname = usePathname()

  // Home path - next-intl Link handles locale automatically
  const homePath = '/'

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
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

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

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
        className='sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b-2 border-primary/20'
        style={{ height: 'var(--header-height)' }}
      >
        <nav className='max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between gap-4'>
          <ScrollProgress className='h-0.5 top-(--header-height)' />

          {/* Logo */}
          <Link
            href={homePath}
            className='flex items-center gap-3'
          >
            <div className='size-10 bg-primary flex items-center justify-center rounded shadow-neo-sm'>
              <span className='text-white font-bold mono-text text-lg'>&gt;_</span>
            </div>
            <div>
              <h2 className='text-xl font-bold leading-tight tracking-tight uppercase'>Minh Hieu</h2>
              <p className='text-xs mono-text text-primary font-bold'>v3.0.4-stable</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className='hidden md:flex items-center gap-8 mono-text text-sm'>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                scroll={!link.href.includes('#')}
                onClick={(e) => handleNavClick(e, link.href)}
                className='hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary'
              >
                ~/{link.name.toLowerCase()}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center gap-3 md:gap-4 shrink-0'>
            {/* Language Switcher - Desktop only */}
            <div className='hidden md:block relative'>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className='p-2 hover:bg-primary/10 transition-all duration-300 ease-in-out hover:scale-110 touch-manipulation cursor-pointer'
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
                  <div className='absolute right-0 top-full mt-2 bg-background border-2 border-foreground shadow-neo-dark z-50 min-w-[120px] overflow-hidden'>
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={`w-full px-4 py-2 text-left text-sm mono-text font-bold hover:bg-primary hover:text-white transition-all cursor-pointer ${
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
            <button
              onClick={toggleTheme}
              className='hidden md:flex p-2 hover:bg-primary/10 transition-all duration-300 ease-in-out hover:scale-110 touch-manipulation cursor-pointer'
              aria-label='Toggle theme'
            >
              {displayIsDark ? (
                <Sun className='w-4 h-4 text-foreground transition-transform duration-300' />
              ) : (
                <Moon className='w-4 h-4 text-foreground transition-transform duration-300' />
              )}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
                link.download = 'CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className='hidden md:block bg-foreground text-background px-5 py-2 font-bold mono-text text-sm shadow-neo transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none'
            >
              RESUME.PDF
            </button>

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
                  className='text-foreground hover:text-primary transition-all duration-300 ease-in-out text-base font-bold uppercase py-4 px-4 mono-text hover:bg-primary/10 active:bg-primary/20 touch-manipulation border-b-2 border-border/10'
                >
                  ~/{link.name.toLowerCase()}
                </Link>
              ))}
            </div>

            {/* Mobile Actions - Language & Theme */}
            <div className='border-t-2 border-foreground p-4 space-y-3'>
              {/* Language Switcher */}
              <div className='relative'>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className='w-full flex items-center justify-between px-4 py-3 hover:bg-primary/10 transition-colors touch-manipulation cursor-pointer'
                  aria-label='Change language'
                >
                  <span className='text-sm font-bold mono-text text-foreground'>
                    LANGUAGE
                  </span>
                  <Languages className='w-5 h-5 text-foreground' />
                </button>

                {isLanguageMenuOpen && (
                  <>
                    <div
                      className='fixed inset-0 z-40'
                      onClick={() => setIsLanguageMenuOpen(false)}
                    />
                    <div className='absolute left-0 right-0 bottom-full mb-2 bg-background border-2 border-foreground shadow-neo-dark z-50'>
                      {routing.locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={`w-full px-4 py-3 text-left text-sm mono-text font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer ${
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
              <button
                onClick={toggleTheme}
                className='w-full flex items-center justify-between px-4 py-3 hover:bg-primary/10 transition-colors touch-manipulation cursor-pointer'
                aria-label='Toggle theme'
              >
                <span className='text-sm font-bold mono-text text-foreground'>
                  THEME
                </span>
                {displayIsDark ? (
                  <Sun className='w-5 h-5 text-foreground' />
                ) : (
                  <Moon className='w-5 h-5 text-foreground' />
                )}
              </button>

              {/* Resume Download */}
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
                  link.download = 'CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className='w-full bg-foreground text-background px-4 py-3 font-bold mono-text text-sm shadow-neo transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none text-center'
              >
                RESUME.PDF
              </button>
            </div>
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  )
}
