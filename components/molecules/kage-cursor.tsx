'use client'

import { useEffect, useRef } from 'react'

export function KageCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Don't run on touch devices or reduced motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let mouseX = -100
    let mouseY = -100
    let curX = -100
    let curY = -100
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor]') ||
        target.closest('.card') ||
        target.closest('.les') ||
        target.closest('.chip')

      if (isInteractive) {
        cursor.classList.add('act')
      } else {
        cursor.classList.remove('act')
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })

    const render = () => {
      // Smooth lerp
      curX += (mouseX - curX) * 0.22
      curY += (mouseY - curY) * 0.22

      cursor.style.setProperty('--cx', `${curX}px`)
      cursor.style.setProperty('--cy', `${curY}px`)

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  return <div className='cur-dot' ref={cursorRef} aria-hidden='true' />
}
