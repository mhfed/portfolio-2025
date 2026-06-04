'use client'

import { useRef, useEffect, ReactElement, cloneElement } from 'react'

interface MagneticWrapperProps {
  children: ReactElement
  range?: number
  strength?: number
}

export function MagneticWrapper({
  children,
  range = 35,
  strength = 0.35,
}: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const container = containerRef.current
    if (!container) return

    let gsapInstance: any

    import('gsap').then(({ gsap }) => {
      gsapInstance = gsap

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        // Center of the element
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        
        // Distance from cursor to center
        const dx = e.clientX - x
        const dy = e.clientY - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < range) {
          // Attract element
          gsap.to(container, {
            x: dx * strength,
            y: dy * strength,
            duration: 0.3,
            ease: 'power2.out',
          })
        } else {
          // Snap back
          gsap.to(container, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          })
        }
      }

      const handleMouseLeave = () => {
        // Snap back with smooth ease
        gsap.to(container, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'elastic.out(1, 0.45)',
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [range, strength])

  // Wrap the children in a block div that handles positioning refs
  return (
    <div ref={containerRef} className='inline-block'>
      {children}
    </div>
  )
}
