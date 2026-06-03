'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Lock scrolling
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          setIsLoaded(true)
        },
      })

      // 0. Initial Reveal
      tl.fromTo([textRef.current, percentRef.current], 
        { yPercent: 100 },
        { yPercent: 0, duration: 1.5, ease: 'power4.out', stagger: 0.1 },
        0
      )
      tl.fromTo(progressRef.current?.parentElement,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        0.5
      )

      // 1. Counter and Progress Line
      let counterObj = { value: 0 }
      tl.to(counterObj, {
        value: 100,
        duration: 2.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.innerText = Math.round(counterObj.value).toString() + '%'
          }
        }
      }, 0)
      
      tl.to(progressRef.current, {
        width: '100%',
        duration: 2.5,
        ease: 'power3.inOut'
      }, 0)

      // 2. Hide texts
      tl.to([textRef.current, percentRef.current], {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.inOut',
        stagger: 0.1
      }, "+=0.2")

      // 3. Cinematic slide up with curved edge
      tl.to(containerRef.current, {
        yPercent: -100,
        borderBottomLeftRadius: '40vw',
        borderBottomRightRadius: '40vw',
        duration: 1.2,
        ease: 'power4.inOut'
      }, "-=0.6")
    })

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [])

  if (isLoaded) return null

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 z-[10000] flex flex-col justify-end bg-white text-zinc-900 pointer-events-none origin-top overflow-hidden'
    >
      <div className='w-full px-8 md:px-16 pb-12 md:pb-24 flex flex-col justify-end h-full'>
        <div className='flex justify-between items-end mb-6 overflow-hidden'>
          <div ref={textRef} className='font-serif italic text-2xl md:text-5xl text-zinc-500 pb-2'>
            Nguyen Minh Hieu
          </div>
          <div ref={percentRef} className='font-sans font-black text-6xl md:text-[10vw] tracking-tighter leading-none'>
            0%
          </div>
        </div>
        
        {/* Progress Line */}
        <div className='w-full h-[3px] bg-zinc-100 overflow-hidden relative opacity-0'>
          <div 
            ref={progressRef} 
            className='absolute top-0 left-0 h-full w-0 bg-[#FDB94B]'
          />
        </div>
      </div>
    </div>
  )
}
