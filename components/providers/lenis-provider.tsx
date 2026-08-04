'use client'

import { type ReactNode, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

const LENIS_OPTIONS = {
  autoRaf: true,
  duration: 1,
  easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
  smoothWheel: true,
  touchMultiplier: 1.2,
}

function ScrollVelocityTracker() {
  const lastSkewRef = useRef(0)

  useLenis((lenis) => {
    const velocity = lenis.velocity || 0
    const rawSkew = Math.min(Math.max(velocity * 0.008, -3.5), 3.5)
    const skew = Math.abs(rawSkew) < 0.08 ? 0 : rawSkew
    const delta = Math.abs(skew - lastSkewRef.current)

    if (skew === 0 ? lastSkewRef.current !== 0 : delta >= 0.08) {
      lastSkewRef.current = skew
      document.documentElement.style.setProperty(
        '--scroll-skew',
        `${skew.toFixed(3)}deg`
      )
    }
  })

  return null
}

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <ScrollVelocityTracker />
      {children}
    </ReactLenis>
  )
}
