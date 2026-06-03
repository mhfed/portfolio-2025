'use client'

import type React from 'react'

import { useEffect, useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Languages } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { routing, Link, usePathname } from '@/i18n/routing'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { ScrollProgress } from './ui/scroll-progress'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Magnetic } from './ui/magnetic'

gsap.registerPlugin(ScrollTrigger)

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const t = useTranslations('header.nav')
  const tContact = useTranslations('hero.contact')
  const { locale, setLocale } = useLocale()
  const lenis = useLenis()
  const pathname = usePathname()

  const homePath = '/'

  const headerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setMounted(true)
    
    // Header Scroll Reveal
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3
    }).progress(1)
    
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    })
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

  useEffect(() => {
    if (!lenis) return
    if (isMobileMenuOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
    return () => lenis.start()
  }, [isMobileMenuOpen, lenis])

  const isBlogPage = pathname.startsWith('/blog')

  return (
    <>
      <header
        ref={headerRef}
        className='fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 mix-blend-difference'
      >
        <nav className='mx-auto flex w-full items-center justify-between'>

          <Link href={homePath} className='group min-w-0'>
            <div className='min-w-0'>
              <span className='block truncate font-display text-lg font-semibold tracking-[-0.06em] text-white transition-colors group-hover:text-white/80 md:text-xl'>
                Nguyen Minh Hieu
              </span>
              <span className='block truncate text-xs text-white/55 md:text-sm'>
                {tContact('location')} · Frontend Developer
              </span>
            </div>
          </Link>

          <div className='hidden lg:flex items-center gap-7'>
            {navLinks.map((link) => (
              <Magnetic key={link.key}>
                <Link
                  href={link.href}
                  scroll={!link.href.includes('#')}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors duration-300 block ${
                    link.key === 'blog' && isBlogPage
                      ? 'text-white/80'
                      : 'text-white/68 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </Magnetic>
            ))}
          </div>

          <div className='flex shrink-0 items-center gap-2 md:gap-3'>
            <a
              href={`mailto:${tContact('email')}`}
              className='cinematic-link hidden xl:inline-flex'
            >
              {tContact('email')}
            </a>

            <div className='relative hidden md:block'>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className='cinematic-link'
                aria-label='Change language'
              >
                <Languages className='h-4 w-4 text-white' />
              </button>

              {isLanguageMenuOpen && (
                <>
                  <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  <div className='absolute right-0 top-full z-50 mt-3 min-w-[140px] overflow-hidden rounded-[22px] border border-white/20 bg-card/95 p-2 shadow-2xl backdrop-blur-xl'>
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={`w-full rounded-2xl px-4 py-2.5 text-left text-sm transition-all duration-300 ${
                          locale === loc
                            ? 'bg-primary/10 text-white/80'
                            : 'text-white/72 hover:bg-primary/10 hover:text-white'
                        }`}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className='cinematic-link md:hidden'
              aria-label='Toggle menu'
              aria-expanded={isMobileMenuOpen}
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerContent className='max-h-[92vh] rounded-t-[28px] border-white/20 bg-card/95 backdrop-blur-2xl'>
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
                    className='rounded-2xl px-4 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-primary/10'
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className='mt-8 space-y-4 border-t border-white/20 p-4 pt-6'>
                <div className='relative'>
                  <button
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    className='flex w-full items-center justify-between rounded-2xl border border-white/20 bg-background/60 px-4 py-4 transition-colors'
                    aria-label='Change language'
                  >
                    <span className='text-base font-medium text-white'>
                      Language
                    </span>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-white/80 uppercase font-bold'>{locale}</span>
                      <Languages className='h-5 w-5 text-white' />
                    </div>
                  </button>

                  {isLanguageMenuOpen && (
                    <>
                      <div
                        className='fixed inset-0 z-40'
                        onClick={() => setIsLanguageMenuOpen(false)}
                      />
                      <div className='absolute bottom-full left-0 right-0 z-50 mb-2 rounded-2xl border border-white/20 bg-card/95 p-2 shadow-lg'>
                        {routing.locales.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => handleLanguageChange(loc)}
                            className={`w-full rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                              locale === loc
                                ? 'bg-primary/10 text-white/80'
                                : 'text-white/72 hover:bg-primary/10 hover:text-white'
                            }`}
                          >
                            {loc.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
