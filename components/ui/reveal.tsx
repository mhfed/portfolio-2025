'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'left' | 'right' | 'scale'
  once?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let fromVars: gsap.TweenVars = { opacity: 0 }
    
    if (variant === 'up') fromVars = { opacity: 0, y: 30, rotationX: 0, filter: 'blur(8px)' }
    if (variant === 'left') fromVars = { opacity: 0, x: -30, filter: 'blur(8px)' }
    if (variant === 'right') fromVars = { opacity: 0, x: 30, filter: 'blur(8px)' }
    if (variant === 'scale') fromVars = { opacity: 0, scale: 0.95, filter: 'blur(8px)' }

    const anim = gsap.fromTo(
      el,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 1.4,
        delay: delay / 1000,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        }
      }
    )

    return () => {
      anim.kill()
      ScrollTrigger.getById(el.id)?.kill()
    }
  }, [variant, delay, once])

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}
