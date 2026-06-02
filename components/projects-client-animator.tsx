'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ProjectsClientAnimator() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = document.querySelector('.projects-wrapper')
      const container = document.querySelector('.projects-horizontal-container')
      const cards = gsap.utils.toArray('.project-card-anim')
      
      if (!wrapper || !container) return

      // GSAP Horizontal Scroll with Skew on Scroll
      const proxy = { skew: 0 }
      const skewSetter = gsap.quickSetter(cards, 'skewX', 'deg') // fast
      const clamp = gsap.utils.clamp(-15, 15) // Limit maximum skew

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${container.scrollWidth}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        animation: gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth),
          ease: 'none',
        }),
        onUpdate: (self) => {
          // Calculate skew based on velocity
          const skew = clamp(self.getVelocity() / -100)
          
          // Only animate if there's a significant change to prevent jitters
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: 'power3',
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            })
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
