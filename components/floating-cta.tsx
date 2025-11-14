"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Download } from "lucide-react"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations('header')

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = `Nguyen-Minh-Hieu-Resume.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold rounded-none transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
        aria-label={t('downloadResume')}
      >
        <Download className="w-5 h-5" />
        <span className="hidden sm:inline">{t('downloadResume')}</span>
      </button>
    </div>
  )
}

