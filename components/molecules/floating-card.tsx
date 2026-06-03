'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface FloatingCardProps {
  children: ReactNode
  className?: string
}

export function FloatingCard({ children, className }: FloatingCardProps) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        y: -12,
        boxShadow: '0 24px 50px rgba(0, 0, 0, 0.25)',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
