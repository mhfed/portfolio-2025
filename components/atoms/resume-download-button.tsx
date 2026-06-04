'use client'

import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    <Button
      onClick={handleDownload}
      variant='default'
      size='lg'
      className='min-h-12 rounded-full px-5 font-semibold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5'
    >
      <Download className='w-4 h-4' />
      {t('downloadResume')}
    </Button>
  )
}
