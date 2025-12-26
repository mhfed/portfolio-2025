'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useLenis } from '@/components/providers/lenis-provider'

interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleScroll = ({
      progress: scrollProgress,
    }: {
      progress: number
    }) => {
      setProgress(scrollProgress)
    }

    lenis.on('scroll', handleScroll)
    // Set initial progress
    setProgress(lenis.progress)

    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis])

  return (
    <div
      ref={ref}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92] transition-transform duration-75 ease-out',
        className
      )}
      style={{
        transform: `scaleX(${progress})`,
      }}
      {...props}
    />
  )
}
