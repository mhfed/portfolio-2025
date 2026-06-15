'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode, useEffect, useRef } from 'react'

function ScrollVelocityTracker() {
  const lastSkewRef = useRef(0)
  const lastMarqueeRef = useRef(1)

  useLenis((lenis) => {
    const velocity = lenis.velocity || 0
    const skew = Math.min(Math.max(velocity * 0.008, -3.5), 3.5)

    if (Math.abs(skew - lastSkewRef.current) >= 0.08) {
      lastSkewRef.current = skew
      document.documentElement.style.setProperty('--scroll-skew', `${skew}deg`)
    }

    // Sync marquee speed with scroll velocity
    const absVelocity = Math.abs(velocity)
    const speedMultiplier = Math.min(3, Math.max(0.5, 1 + absVelocity * 0.005))
    if (Math.abs(speedMultiplier - lastMarqueeRef.current) >= 0.05) {
      lastMarqueeRef.current = speedMultiplier
      document.documentElement.style.setProperty('--marquee-speed', String(speedMultiplier))
    }
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
