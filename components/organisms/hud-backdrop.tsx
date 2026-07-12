'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { HudWorld } from '@/components/three/hud-world'
import { ScrollCamera } from '@/components/three/scroll-camera'
import { STATIONS } from '@/components/three/hud-stations'
import {
  usePrefersReducedMotion,
  useIsMobile,
} from '@/hooks/use-client-capabilities'

/**
 * Fixed, full-viewport WebGL backdrop for the whole portfolio. A single scene
 * whose camera flies from station to station as the page scrolls. Rendered
 * client-only; falls back to a static grid under reduced-motion or before mount
 * so it never blocks first paint / LCP.
 */
export function HudBackdrop() {
  const reduced = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted || reduced) {
    return (
      <div
        aria-hidden='true'
        className='hud-grid-fallback pointer-events-none fixed inset-0 z-0'
      />
    )
  }

  const quality = isMobile ? 'low' : 'high'

  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-0 z-0'>
      <Canvas
        dpr={quality === 'high' ? [1, 1.7] : [1, 1.2]}
        camera={{ position: STATIONS[0].camera, fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ScrollCamera stations={STATIONS} />
          <HudWorld quality={quality} />
          {quality === 'high' && (
            <EffectComposer>
              <Bloom
                intensity={0.9}
                luminanceThreshold={0.15}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette offset={0.3} darkness={0.92} eskil={false} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
