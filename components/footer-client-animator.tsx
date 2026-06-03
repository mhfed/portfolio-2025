'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function FooterClientAnimator() {
  useLayoutEffect(() => {
    // 1. Curtain Footer Height Setup
    const setFooterHeight = () => {
      const footer = document.querySelector('footer') as HTMLElement
      const main = document.querySelector('main') as HTMLElement
      
      if (footer && main) {
        // Apply the footer height as bottom margin to the main content
        main.style.marginBottom = `${footer.offsetHeight}px`
      }
    }

    // Initial setup and on window resize
    setFooterHeight()
    window.addEventListener('resize', setFooterHeight)

    // 2. Parallax Animations
    const ctx = gsap.context(() => {
      const footer = document.querySelector('footer') as HTMLElement
      const massiveText = document.querySelector('.massive-footer-text') as HTMLElement
      
      if (!footer) return

      // We still want parallax inside the footer when the curtain opens
      // But since footer is fixed, scrollTrigger needs to hook into the page scroll
      if (massiveText) {
        gsap.fromTo(massiveText, 
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0,
            opacity: 0.1, // Subtle watermark effect
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'bottom-=' + (footer.offsetHeight * 0.8) + ' bottom',
              end: 'bottom bottom',
              scrub: true,
            }
          }
        )
      }
    })

    return () => {
      window.removeEventListener('resize', setFooterHeight)
      ctx.revert()
    }
  }, [])

  return null
}
