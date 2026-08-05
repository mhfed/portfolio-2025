import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface EditorialRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function EditorialReveal({
  children,
  className,
  delay = 0,
}: EditorialRevealProps) {
  return (
    <div
      className={cn('editorial-reveal', className)}
      data-editorial-reveal
      data-reveal-delay={delay}
    >
      {children}
    </div>
  )
}
