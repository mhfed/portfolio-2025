'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutClientAnimator() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.about-word')
      
      gsap.to(words, {
        color: '#FFFFFF',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-reveal-text',
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true,
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
