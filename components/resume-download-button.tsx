"use client"

import { useTranslations } from "next-intl"
import { Download } from "lucide-react"

export function ResumeDownloadButton() {
  const t = useTranslations('header')

  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = `Nguyen-Minh-Hieu-Resume.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
      aria-label={t('downloadResume')}
    >
      <Download className="w-5 h-5" />
      <span>{t('downloadResume')}</span>
    </button>
  )
}
