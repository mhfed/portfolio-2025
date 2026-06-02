'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MagneticProps {
  children: React.ReactElement
  intensity?: number
}

export function Magnetic({ children, intensity = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Find the actual interactive child
    const child = element.firstElementChild as HTMLElement
    if (!child) return

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = element.getBoundingClientRect()
      
      const x = (clientX - (left + width / 2)) * intensity
      const y = (clientY - (top + height / 2)) * intensity

      gsap.to(child, {
        x,
        y,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    const onMouseLeave = () => {
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    element.addEventListener('mousemove', onMouseMove)
    element.addEventListener('mouseleave', onMouseLeave)

    return () => {
      element.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [intensity])

  return React.cloneElement(children, {
    ref,
    className: `${children.props.className || ''} inline-block`,
  })
}
