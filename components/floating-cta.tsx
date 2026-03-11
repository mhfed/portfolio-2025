'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'

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
    const link = document.createElement('a')
    link.href = '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
    link.download = `CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isVisible) return null

  return (
    <div className='fixed bottom-6 left-6 z-50'>
      <button
        onClick={handleDownload}
        aria-label={t('downloadResume')}
        className='bg-primary text-white px-6 py-3 font-bold mono-text text-sm shadow-neo-dark transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none inline-flex items-center gap-2 border-2 border-foreground'
      >
        <Download className='w-5 h-5' />
        <span className='hidden sm:inline'>RESUME.PDF</span>
      </button>
    </div>
  )
}
