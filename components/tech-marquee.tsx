'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const marqueeText = "REACT — NEXT.JS — TYPESCRIPT — GSAP — WEBGL — TAILWIND — "

export function TechMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let xPercent = 0
      let direction = -1

      const animate = () => {
        if (xPercent < -100) {
          xPercent = 0
        } else if (xPercent > 0) {
          xPercent = -100
        }
        gsap.set(text1Ref.current, { xPercent: xPercent })
        gsap.set(text2Ref.current, { xPercent: xPercent })
        xPercent += 0.05 * direction
        animRef.current = requestAnimationFrame(animate)
      }
      
      animRef.current = requestAnimationFrame(animate)

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          direction = self.direction === 1 ? -1 : 1
          const velocity = self.getVelocity()
          // Clamp skew between -15 and 15 degrees
          const skewAmount = gsap.utils.clamp(-15, 15, velocity / 100)
          
          gsap.to([text1Ref.current, text2Ref.current], {
            skewX: skewAmount,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto'
          })
          
          // Boost speed briefly based on scroll velocity
          xPercent += (velocity / 500) * direction
        }
      })
    }, containerRef)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      ctx.revert()
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 md:py-16 border-y border-white/20 bg-background z-10"
    >
      <div className="relative flex whitespace-nowrap">
        <div ref={text1Ref} className="flex whitespace-nowrap font-sans text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-teal-400 to-rose-500 pr-4">
          {marqueeText}
        </div>
        <div ref={text2Ref} className="absolute left-[100%] flex whitespace-nowrap font-sans text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-teal-400 to-rose-500 pr-4">
          {marqueeText}
        </div>
      </div>
    </div>
  )
}
