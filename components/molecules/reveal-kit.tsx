'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion-presets'

export interface ScanRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScanReveal({
  children,
  className,
  delay = 0,
}: ScanRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={
        reduceMotion ? false : { opacity: 0, y: 20, filter: 'blur(8px)' }
      }
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: MOTION_DURATION.reveal,
        delay: delay / 1000,
        ease: MOTION_EASE,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export interface SectionHeaderProps {
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function SectionHeader({
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <ScanReveal className={cn('mb-12 max-w-[46rem] md:mb-16', className)}>
      <h2 className='font-display text-[clamp(2.6rem,5.4vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-portfolio-ink'>
        {title}
      </h2>
      {description ? (
        <p className='mt-5 max-w-[38rem] text-[1.02rem] leading-relaxed text-portfolio-muted'>
          {description}
        </p>
      ) : null}
    </ScanReveal>
  )
}
