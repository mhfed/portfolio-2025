'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function CoreSkillsList({ title, items }: any) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Check if we are on desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches

    const ctx = gsap.context(() => {
      if (isDesktop && leftColRef.current && containerRef.current) {
        // Pin the left column title
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 20%',
          end: 'bottom 80%',
          pin: leftColRef.current,
          pinSpacing: false,
        })
      }

      // Animate each skill block as it scrolls into view
      itemsRef.current.forEach((item) => {
        if (!item) return
        
        // Initial state
        gsap.set(item, { opacity: 0.1, filter: 'blur(10px)', y: 50 })
        
        // Animation
        gsap.to(item, { 
            opacity: 1, 
            filter: 'blur(0px)',
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            }
          }
        )
      })

      // Text Fill Animation
      const textFills = gsap.utils.toArray('.scroll-text-fill')
      textFills.forEach((el: any) => {
        gsap.to(el, {
          backgroundPositionX: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 1,
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className='w-full mt-24 pt-16 border-t border-black/10 relative flex flex-col md:flex-row gap-12'>
      <div className='w-full md:w-1/3 z-10' ref={leftColRef}>
        <h3 className='font-serif italic font-light text-5xl md:text-7xl text-zinc-900 leading-[0.9] tracking-[-0.02em]'>
          {title}
        </h3>
      </div>
      
      <div className='w-full md:w-2/3 flex flex-col gap-24 md:gap-40 pb-24 md:pb-48 pt-12 md:pt-0'>
        {items.map((item: any, idx: number) => (
          <div 
            key={item.id} 
            ref={(el) => { itemsRef.current[idx] = el }}
            className='flex flex-col gap-4 md:gap-6 will-change-transform'
          >
             <span className='font-serif italic text-zinc-300 text-5xl md:text-7xl'>0{idx + 1}</span>
             <h4 className='font-sans font-light uppercase tracking-[0.15em] text-zinc-900 text-2xl md:text-4xl'>
               {item.label}
             </h4>
             <p 
               className='scroll-text-fill font-light text-lg md:text-2xl leading-relaxed max-w-xl'
               style={{
                 backgroundImage: 'linear-gradient(to right, #111827 50%, #d4d4d8 50%)',
                 backgroundSize: '200% 100%',
                 backgroundPositionX: '100%',
                 WebkitBackgroundClip: 'text',
                 color: 'transparent'
               }}
             >
               {item.value}
             </p>
          </div>
        ))}
      </div>
    </div>
  )
}
