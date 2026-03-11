'use client'

import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'

export function ResumeDownloadButton() {
  const t = useTranslations('header')

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
    link.download = 'CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className='bg-foreground text-background px-6 py-3 font-bold mono-text text-sm shadow-neo transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none inline-flex items-center gap-2'
    >
      <Download className='w-4 h-4' />
      RESUME.PDF
    </button>
  )
}
