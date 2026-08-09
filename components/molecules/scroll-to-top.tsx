'use client'

import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Floating scroll-to-top control. Fades in after the first viewport and glides
 * back to the top via Lenis (falling back to native smooth scroll).
 */
export function ScrollToTop() {
  const lenis = useLenis()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(window.scrollY > window.innerHeight * 0.65)
  }, [])

  useLenis((instance) => {
    const nextVisible = instance.scroll > window.innerHeight * 0.65
    setVisible((current) => current === nextVisible ? current : nextVisible)
  })

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
      className={`duo-scroll-top ${visible ? 'is-visible' : ''}`}
    >
      <span className='text-lg' aria-hidden='true'>
        ↑
      </span>
    </button>
  )
}
