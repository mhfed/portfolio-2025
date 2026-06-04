'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode, useEffect } from 'react'

function ScrollVelocityTracker() {
  useLenis((lenis) => {
    const velocity = lenis.velocity || 0
    // Limit skew between -3.5 and 3.5 deg for premium subtle effect
    const skew = Math.min(Math.max(velocity * 0.008, -3.5), 3.5)
    document.documentElement.style.setProperty('--scroll-skew', `${skew}deg`)
  })

  useEffect(() => {
    let timeout: any
    const handleScroll = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        document.documentElement.style.setProperty('--scroll-skew', '0deg')
      }, 120)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [])

  return null
}

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        smoothWheel: true,
        touchMultiplier: 2,
      }}
    >
      <ScrollVelocityTracker />
      {children}
    </ReactLenis>
  )
}
