'use client'

import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useSceneValue } from '@/lib/sceneStore'
import { cn } from '@/lib/utils'

/**
 * Floating scroll-to-top control. Fades in after the first viewport and glides
 * back to the top via Lenis (falling back to native smooth scroll).
 */
export function ScrollToTop() {
  const lenis = useLenis()
  const [visible, setVisible] = useState(false)
  const ready = useSceneValue('ready')

  useEffect(() => {
    const hero = document.querySelector('#top')
    if (!(hero instanceof HTMLElement)) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const toTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (ready) return null

  return (
    <button
      type='button'
      onClick={toTop}
      aria-label='Scroll to top'
      title='Scroll to top'
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-creative-line bg-creative-panel/76 text-creative-muted shadow-[0_18px_60px_rgba(25,35,52,0.12),inset_0_1px_0_rgba(255,255,255,0.76)] backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-creative-accent/45 hover:text-creative-ink active:scale-[0.98] max-sm:bottom-4 max-sm:right-4',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      <span className='text-lg' aria-hidden='true'>
        ↑
      </span>
    </button>
  )
}
