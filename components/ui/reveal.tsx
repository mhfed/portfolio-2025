'use client'

import type { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'left' | 'right' | 'scale'
  once?: boolean
}

const variantMap = {
  up: 'reveal-up',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
} as const

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
  once = true,
}: RevealProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.14,
    rootMargin: '0px 0px -8% 0px',
    triggerOnce: once,
  })

  return (
    <div
      ref={ref}
      className={cn(
        'reveal-base',
        variantMap[variant],
        isVisible && 'reveal-visible',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
