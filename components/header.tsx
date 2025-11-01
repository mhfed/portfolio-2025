"use client"

import type React from "react"

import { useState, useEffect } from "react"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Collaborate", href: "#collaborate" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute("href")
    if (!href) return

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wider">
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            NGUYEN MINH HIEU
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isDark ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </nav>
    </header>
  )
}
