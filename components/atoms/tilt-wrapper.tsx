'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface TiltWrapperProps {
  children: ReactNode
  className?: string
  maxRotate?: number
  scale?: number
  spotlight?: boolean
  spotlightColor?: string
}

export function TiltWrapper({
  children,
  className = '',
  maxRotate = 10,
  scale = 1.02,
  spotlight = true,
  spotlightColor = 'rgba(255, 255, 255, 0.08)',
}: TiltWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const container = containerRef.current
    const inner = innerRef.current
    const spotlightEl = spotlightRef.current

    if (!container || !inner) return

    let gsapInstance: any

    import('gsap').then(({ gsap }) => {
      gsapInstance = gsap

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const width = rect.width
        const height = rect.height

        const rotateX = -((y - height / 2) / height) * maxRotate
        const rotateY = ((x - width / 2) / width) * maxRotate

        gsap.to(inner, {
          rotateX,
          rotateY,
          scale,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        if (spotlight && spotlightEl) {
          gsap.to(spotlightEl, {
            left: `${x}px`,
            top: `${y}px`,
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      }

      const handleMouseLeave = () => {
        gsap.to(inner, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        if (spotlight && spotlightEl) {
          gsap.to(spotlightEl, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      }

      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [maxRotate, scale, spotlight])

  return (
    <div
      ref={containerRef}
      className={`perspective-1000 transform-style-3d relative ${spotlight ? 'overflow-hidden' : ''} ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {spotlight && (
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300"
          style={{
            width: '350px',
            height: '350px',
            background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
            zIndex: 1,
          }}
        />
      )}
      <div ref={innerRef} className="w-full h-full transform-style-3d relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}
