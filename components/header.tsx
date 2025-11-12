"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Sun, Moon, Languages } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { routing } from "@/i18n/routing"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const t = useTranslations('header.nav')
  const tContact = useTranslations('hero.contact')
  const { locale, setLocale, isLoading } = useLocale()

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleLanguageChange = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale)
    setIsLanguageMenuOpen(false)
  }

  const navLinks = [
    { name: t('about'), href: "#about", key: 'about' },
    { name: t('experience'), href: "#experience", key: 'experience' },
    { name: t('projects'), href: "#projects", key: 'projects' },
    { name: t('collaborate'), href: "#collaborate", key: 'collaborate' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute("href")
    if (!href) return

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  // Render header immediately to prevent layout shift, use default values until mounted
  const displayIsDark = mounted ? isDark : false

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/10" style={{ height: 'var(--header-height)' }}>
        <nav className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          {/* Contact Info - Left Side (2 columns) */}
          <div className="flex flex-row gap-6 md:gap-8 flex-shrink-0 min-w-0">
            {/* Based in */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] md:text-xs text-foreground/60 font-medium uppercase tracking-wider">
                {tContact('basedIn')}
              </span>
              <span className="text-xs md:text-sm text-foreground/80 font-semibold truncate">
                {tContact('location')}
              </span>
            </div>

            {/* Say hello */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] md:text-xs text-foreground/60 font-medium uppercase tracking-wider">
                {tContact('sayHello')}
              </span>
              <a
                href={`mailto:${tContact('email')}`}
                className="text-xs md:text-sm text-foreground/80 font-semibold underline hover:text-primary transition-colors truncate"
              >
                {tContact('email')}
              </a>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={handleNavClick}
                className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors touch-manipulation cursor-pointer"
                aria-label="Change language"
              >
                <Languages className="w-5 h-5 md:w-4 md:h-4 text-foreground" />
              </button>
              
              {isLanguageMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-background border border-border/30 rounded-lg shadow-lg z-50 min-w-[120px]">
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg cursor-pointer ${
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
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors touch-manipulation cursor-pointer"
              aria-label="Toggle theme"
            >
              {displayIsDark ? (
                <Sun className="w-5 h-5 md:w-4 md:h-4 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 md:w-4 md:h-4 text-foreground" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-7 h-7 justify-center items-center touch-manipulation p-1 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[var(--header-height)] right-0 z-40 h-[calc(100vh-var(--header-height))] w-[280px] sm:w-80 bg-background border-l border-border/30 shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 pt-8 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={handleNavClick}
              className="text-foreground hover:text-foreground transition-colors text-base font-semibold uppercase py-4 px-4 rounded-lg hover:bg-primary/10 active:bg-primary/20 touch-manipulation"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
