'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
  ChromaticAberration,
  Scanline,
  Noise,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { HudWorld, type WorldQuality } from '@/components/three/hud-world'
import { ScrollCamera } from '@/components/three/scroll-camera'
import { STATIONS } from '@/components/three/hud-stations'
import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'
import {
  usePrefersReducedMotion,
  useIsMobile,
} from '@/hooks/use-client-capabilities'

interface HudBackdropProps {
  projects: ProjectCaseStudy[]
  experiences: ExperienceRecord[]
}

/**
 * Fixed, full-viewport WebGL backdrop for the whole portfolio. A single scene
 * whose camera flies from station to station as the page scrolls. Rendered
 * client-only; falls back to a static grid under reduced-motion or before mount
 * so it never blocks first paint / LCP.
 */
export function HudBackdrop({ projects, experiences }: HudBackdropProps) {
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
    <HudCanvas quality={quality} projects={projects} experiences={experiences} />
  )
}

function HudCanvas({
  quality,
  projects,
  experiences,
}: {
  quality: WorldQuality
  projects: ProjectCaseStudy[]
  experiences: ExperienceRecord[]
}) {
  // Stable Vector2 for chromatic-aberration offset (the effect mutates in place).
  const caOffset = useMemo(() => new Vector2(0.0006, 0.0012), [])

  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-0 z-0'>
      <Canvas
        dpr={quality === 'high' ? [1, 1.7] : [1, 1.2]}
        camera={{ position: STATIONS[0].camera, fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ScrollCamera stations={STATIONS} />
          <HudWorld
            quality={quality}
            projects={projects}
            experiences={experiences}
          />
          {quality === 'high' ? (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={1.35}
                luminanceThreshold={0.12}
                luminanceSmoothing={0.85}
                mipmapBlur
                radius={0.85}
              />
              <DepthOfField
                focusDistance={0.012}
                focalLength={0.045}
                bokehScale={3.2}
                height={480}
              />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={caOffset}
                radialModulation
                modulationOffset={0.35}
              />
              <Scanline
                blendFunction={BlendFunction.OVERLAY}
                density={1.15}
                opacity={0.055}
              />
              <Noise blendFunction={BlendFunction.OVERLAY} opacity={0.14} />
              <Vignette offset={0.28} darkness={0.95} eskil={false} />
            </EffectComposer>
          ) : (
            <EffectComposer>
              <Bloom
                intensity={0.9}
                luminanceThreshold={0.15}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette offset={0.32} darkness={0.9} eskil={false} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
