'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { cn } from '@/lib/utils'

/**
 * Floating scroll-to-top control. Fades in after the first viewport and glides
 * back to the top via Lenis (falling back to native smooth scroll).
 */
export function ScrollToTop() {
  const lenis = useLenis()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      type='button'
      onClick={toTop}
      aria-label='Scroll to top'
      title='Scroll to top'
      className={cn(
        'fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-creative-line bg-[#080907]/80 text-creative-muted backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-creative-green/50 hover:text-creative-green max-sm:bottom-4 max-sm:right-4',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      <ArrowUp className='h-5 w-5' aria-hidden='true' />
    </button>
  )
}
