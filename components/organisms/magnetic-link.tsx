'use client'

import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from 'motion/react'
import { cn } from '@/lib/utils'

export interface MagneticLinkProps extends Omit<
  HTMLMotionProps<'a'>,
  'children'
> {
  children: ReactNode
  variant?: 'light' | 'dark'
  showArrow?: boolean
}

export function MagneticLink({
  href,
  children,
  variant = 'light',
  showArrow = true,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.25 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.25 })
  const isLight = variant === 'light'

  return (
    <motion.a
      href={href}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onPointerMove={(event) => {
        if (!reduceMotion) {
          const rect = event.currentTarget.getBoundingClientRect()
          x.set((event.clientX - (rect.left + rect.width / 2)) * 0.12)
          y.set((event.clientY - (rect.top + rect.height / 2)) * 0.12)
        }
        onPointerMove?.(event)
      }}
      onPointerLeave={(event) => {
        x.set(0)
        y.set(0)
        onPointerLeave?.(event)
      }}
      className={cn(
        'group inline-flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold no-underline transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.98]',
        isLight
          ? 'bg-portfolio-ink text-portfolio-bg'
          : 'border border-portfolio-line bg-white/[0.035] text-portfolio-ink hover:bg-white/[0.07]',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowUpRight
          size={16}
          className='transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
          aria-hidden='true'
        />
      ) : null}
    </motion.a>
  )
}
