'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'

export function HeroClientAnimator() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. SVG Stroke Draw Animation
      const heroText = document.querySelector('.hero-svg-text') as SVGTextElement
      if (heroText) {
        gsap.set(heroText, { strokeDasharray: 2000, strokeDashoffset: 2000, opacity: 1 })
        
        // Draw the stroke
        gsap.to(heroText, {
          strokeDashoffset: 0,
          duration: 3.5,
          ease: 'power3.inOut',
          delay: 1.5
        })

        // Fill the text
        gsap.to(heroText, {
          fill: '#09090B',
          duration: 1.5,
          ease: 'power2.out',
          delay: 4
        })
      }

      gsap.to('.hero-subtitle', {
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 2.6
      })

      // 2. GSAP Image Trail Effect
      const trailItems = gsap.utils.toArray('.trail-item') as HTMLElement[]
      
      if (trailItems.length > 0) {
        let currentIndex = 0
        let lastPos = { x: 0, y: 0 }
        let isFirstMove = true

        const onMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e
          
          if (isFirstMove) {
            lastPos = { x: clientX, y: clientY }
            isFirstMove = false
            return
          }

          // Calculate distance from last position
          const dx = clientX - lastPos.x
          const dy = clientY - lastPos.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only trigger a new image if moved far enough (e.g., 60px)
          if (distance > 60) {
            lastPos = { x: clientX, y: clientY }
            const currentItem = trailItems[currentIndex]

            // Instantly move to cursor and show
            gsap.set(currentItem, {
              x: clientX - currentItem.offsetWidth / 2,
              y: clientY - currentItem.offsetHeight / 2,
              opacity: 1,
              scale: 1,
              zIndex: 10 + currentIndex,
            })

            // Animate it fading out and scaling down slowly
            gsap.to(currentItem, {
              opacity: 0,
              scale: 0.5,
              duration: 1.5,
              ease: 'power3.out',
              delay: 0.1
            })

            // Cycle index
            currentIndex = (currentIndex + 1) % trailItems.length
          }
        }

        window.addEventListener('mousemove', onMouseMove)

        return () => {
          window.removeEventListener('mousemove', onMouseMove)
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return null
}
