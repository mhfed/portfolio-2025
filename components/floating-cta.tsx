'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import { ShinyButton } from './ui/shiny-button'

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
      <ShinyButton
        onClick={handleDownload}
        variant='gradient'
        size='lg'
        aria-label={t('downloadResume')}
        className='rounded-full'
      >
        <Download className='w-5 h-5' />
        <span className='hidden sm:inline'>{t('downloadResume')}</span>
      </ShinyButton>
    </div>
  )
}
