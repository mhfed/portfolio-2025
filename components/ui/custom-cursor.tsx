'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // QuickTo for max performance
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3' })

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onMouseEnter = () => setIsHovered(true)
    const onMouseLeave = () => setIsHovered(false)

    window.addEventListener('mousemove', onMouseMove)

    // MutationObserver to attach to dynamically rendered elements
    const attachHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .magnetic'
      )
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
      return interactiveElements
    }

    let elements = attachHoverListeners()

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
      elements = attachHoverListeners()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[99999] hidden -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-white md:flex transition-all duration-300 ease-out mix-blend-difference ${
        isHovered ? 'w-24 h-24 bg-white text-black' : 'w-6 h-6 bg-transparent text-transparent'
      }`}
    >
      <span className={`font-sans text-[10px] tracking-widest font-bold transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        VIEW
      </span>
    </div>
  )
}
