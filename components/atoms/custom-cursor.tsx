'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isEnabled, setIsEnabled] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches

    if (!canUseCustomCursor) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    setIsEnabled(true)
    document.documentElement.classList.add('custom-cursor-enabled')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const dotPosition = { ...mouse }
    const ringPosition = { ...mouse }
    let animationFrameId = 0

    const render = () => {
      dotPosition.x += (mouse.x - dotPosition.x) * 0.28
      dotPosition.y += (mouse.y - dotPosition.y) * 0.28
      ringPosition.x += (mouse.x - ringPosition.x) * 0.14
      ringPosition.y += (mouse.y - ringPosition.y) * 0.14

      dot.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%)`

      animationFrameId = requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const interactiveElement = target?.closest(
        '[data-cursor], a, button, [role="button"]'
      ) as HTMLElement | null

      if (!interactiveElement) return

      const nextText = interactiveElement.getAttribute('data-cursor') ?? ''
      setIsActive(true)
      setCursorText(nextText === 'pointer' ? '' : nextText)
    }

    const handlePointerOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const interactiveElement = target?.closest(
        '[data-cursor], a, button, [role="button"]'
      )

      if (!interactiveElement) return

      setIsActive(false)
      setCursorText('')
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      document.documentElement.classList.remove('custom-cursor-enabled')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isEnabled ? 'custom-cursor-visible' : ''}`}
        aria-hidden='true'
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isEnabled ? 'custom-cursor-visible' : ''} ${isActive ? 'custom-cursor-ring--active' : ''} ${
          cursorText ? 'custom-cursor-ring--label' : ''
        }`}
        aria-hidden='true'
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </>
  )
}
