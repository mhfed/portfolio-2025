'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function FooterClientAnimator() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const footer = document.querySelector('footer') as HTMLElement
      const massiveText = document.querySelector('.massive-footer-text') as HTMLElement
      
      if (!footer || !massiveText) return

      gsap.fromTo(massiveText, 
        { yPercent: 50, scale: 0.8, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 0.1, // Subtle watermark effect
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return null
}
