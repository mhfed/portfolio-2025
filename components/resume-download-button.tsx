'use client'

import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import { ShinyButton } from './ui/shiny-button'

export function ResumeDownloadButton() {
  const t = useTranslations('header')

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf' // Update with actual resume path
    link.download = 'CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ShinyButton onClick={handleDownload} variant='default' size='lg'>
      <Download className='w-4 h-4' />
      {t('downloadResume')}
    </ShinyButton>
  )
}
