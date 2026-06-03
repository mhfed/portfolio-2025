'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export function GlobalSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const spotlight = spotlightRef.current
    if (!spotlight) return

    // QuickTo for max performance tracking
    const xTo = gsap.quickTo(spotlight, 'x', { duration: 0.8, ease: 'power3.out' })
    const yTo = gsap.quickTo(spotlight, 'y', { duration: 0.8, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div
      ref={spotlightRef}
      className='pointer-events-none fixed left-0 top-0 z-[0] h-[100vw] w-[100vw] md:h-[1000px] md:w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 transition-opacity duration-1000'
      style={{
        background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, rgba(167,139,250,0.15) 30%, rgba(56,189,248,0.05) 50%, rgba(0,0,0,0) 70%)',
      }}
    />
  )
}
