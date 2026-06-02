'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

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

      // 1. Smoothly animate counter
      let counterObj = { value: 0 }
      tl.to(counterObj, {
        value: 100,
        duration: 2.2,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.round(counterObj.value).toString()
          }
        }
      })

      // 2. Cinematic slide up
      tl.to(counterRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut'
      }, "+=0.2")

      // 3. Fade out overlay
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      }, "-=0.4")
    })

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [])

  if (isLoaded) return null

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-[10000] flex items-center justify-center bg-black pointer-events-none'
    >
      <div className='overflow-hidden'>
        <div 
          ref={counterRef}
          className='font-serif italic text-[15vw] leading-none text-white tracking-tighter'
        >
          0
        </div>
      </div>
    </div>
  )
}
