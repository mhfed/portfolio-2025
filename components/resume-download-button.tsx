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
      className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors cursor-pointer"
      aria-label={t('downloadResume')}
    >
      <Download className="w-4 h-4" />
      <span className="text-sm">{t('downloadResume')}</span>
    </button>
  )
}
