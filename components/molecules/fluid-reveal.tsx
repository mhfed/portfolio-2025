'use client'

import { useEffect, useRef } from 'react'

interface FluidRevealProps {
  text: string
  className?: string
  delay?: number
  triggerHook?: boolean // If true, triggers when visible. Otherwise triggers on mount.
}

export function FluidReveal({
  text,
  className = '',
  delay = 0,
  triggerHook = false,
}: FluidRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chars = container.querySelectorAll('.char-item')
    if (chars.length === 0) return

    let gsapInstance: any
    let scrollTriggerInstance: any

    // Import GSAP
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsapInstance = gsap
      scrollTriggerInstance = ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // Set initial state
      gsap.set(chars, {
        y: '110%',
        rotateX: -35,
        filter: 'blur(10px)',
        opacity: 0,
      })

      const animateChars = () => {
        gsap.to(chars, {
          y: '0%',
          rotateX: 0,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.25,
          ease: 'power4.out',
          stagger: 0.035,
          delay: delay,
          clearProps: 'transform,filter,opacity',
        })
      }

      if (triggerHook) {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 88%',
          onEnter: () => {
            animateChars()
          },
          once: true, // Only play once
        })
      } else {
        // Trigger immediately
        animateChars()
      }
    })

    return () => {
      if (scrollTriggerInstance) {
        const triggers = scrollTriggerInstance.getAll()
        triggers.forEach((t: any) => {
          if (t.trigger === container) {
            t.kill()
          }
        })
      }
    }
  }, [text, delay, triggerHook])

  // Split text by characters, keeping spaces intact
  const words = text.split(' ')

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap items-center overflow-hidden perspective-1000 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className='inline-flex mr-[0.28em] whitespace-nowrap overflow-hidden py-1'>
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className='char-item inline-block origin-bottom transform-style-3d will-change-transform char-text'
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}
