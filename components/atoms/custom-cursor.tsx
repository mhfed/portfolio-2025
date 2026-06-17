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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!canUseCustomCursor || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const checkCursorSettings = () => {
      const disabled = localStorage.getItem('disable-cursor') === 'true'
      if (disabled) {
        setIsEnabled(false)
        document.documentElement.classList.remove('custom-cursor-enabled')
      } else {
        setIsEnabled(true)
        document.documentElement.classList.add('custom-cursor-enabled')
      }
    }

    checkCursorSettings()

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const dotPosition = { ...mouse }
    const ringPosition = { ...mouse }
    let animationFrameId = 0
    let visible = document.visibilityState === 'visible'

    const render = () => {
      if (!visible) {
        animationFrameId = 0
        return
      }

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

    const handleVisibilityChange = () => {
      visible = document.visibilityState === 'visible'
      if (visible && animationFrameId === 0) {
        animationFrameId = requestAnimationFrame(render)
      }
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
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('settings-updated', checkCursorSettings)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('settings-updated', checkCursorSettings)
      document.documentElement.classList.remove('custom-cursor-enabled')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot fixed left-0 top-0 z-[70] pointer-events-none [will-change:transform] transition-[opacity,transform,background-color] duration-[220ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] h-2 w-2 rounded-full bg-[rgba(180,220,240,0.86)] mix-blend-screen motion-reduce:hidden ${
          isEnabled ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden='true'
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed left-0 top-0 z-[70] pointer-events-none [will-change:transform] transition-[width,height,background-color,border-color,opacity,transform] duration-[360ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] grid place-items-center rounded-full border text-[#020617] motion-reduce:hidden ${
          isEnabled ? 'opacity-100' : 'opacity-0'
        } ${
          cursorText
            ? 'h-[78px] w-[78px] border-transparent bg-white/94 mix-blend-difference'
            : isActive
              ? 'h-[54px] w-[54px] border-white/34 bg-white/10'
              : 'h-[34px] w-[34px] border-[rgba(180,220,240,0.42)]'
        }`}
        aria-hidden='true'
      >
        {cursorText && (
          <span className="max-w-[56px] font-mono text-[9px] font-bold tracking-wider leading-[1.05] text-center uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  )
}

