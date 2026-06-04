'use client'

import type React from 'react'
import { useEffect, useRef } from 'react'

export function BackgroundScene() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    let frame = 0

    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100

        scene.style.setProperty('--scene-x', `${x}%`)
        scene.style.setProperty('--scene-y', `${y}%`)
      })
    }

    scene.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      scene.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <div
      ref={sceneRef}
      className='hero-scene'
      aria-hidden='true'
      style={{
        '--scene-x': '62%',
        '--scene-y': '42%',
      } as React.CSSProperties}
    >
      <div className='hero-scene__grid' />
      <div className='hero-scene__aurora hero-scene__aurora--one' />
      <div className='hero-scene__aurora hero-scene__aurora--two' />
      <div className='hero-scene__orb' />
      <div className='hero-scene__scan' />
    </div>
  )
}
