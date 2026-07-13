'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
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

interface HudSceneProps {
  quality: WorldQuality
  projects: ProjectCaseStudy[]
  experiences: ExperienceRecord[]
}

/**
 * The heavy WebGL scene, split into its own chunk (loaded via next/dynamic in
 * hud-backdrop) so three/drei/postprocessing never touch the critical bundle.
 *
 * Performance is self-tuning:
 * - PerformanceMonitor scales DPR to the device (retina/weak-GPU safe) and, if
 *   it still can't hold frame rate, drops to "lite" mode (no DepthOfField /
 *   Scanline / Noise — the fill-rate-hungry passes).
 * - The frameloop is paused entirely while the tab is hidden.
 */
export default function HudScene({
  quality,
  projects,
  experiences,
}: HudSceneProps) {
  // Stable Vector2 for chromatic-aberration offset (the effect mutates in place).
  const caOffset = useMemo(() => new Vector2(0.0006, 0.0012), [])
  const [dpr, setDpr] = useState(quality === 'high' ? 1.4 : 1)
  const [lite, setLite] = useState(false)
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

  // Stop rendering while the tab is backgrounded — no GPU/CPU/battery burn.
  useEffect(() => {
    const onVis = () => setFrameloop(document.hidden ? 'never' : 'always')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const high = quality === 'high'

  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-0 z-0'>
      <Canvas
        frameloop={frameloop}
        dpr={dpr}
        camera={{ position: STATIONS[0].camera, fov: 42 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor
          bounds={() => [48, 60]}
          flipflops={3}
          onChange={({ factor }) => {
            // Snap DPR to coarse 0.25 steps and only commit real changes — a
            // continuously-varying DPR reallocates the GL buffers every tick,
            // which is itself the jank. Discrete steps settle fast and stay put.
            const raw = high ? 1 + factor * 0.7 : 0.75 + factor * 0.45
            const next = Math.round(raw * 4) / 4
            setDpr((d) => (d === next ? d : next))
          }}
          onFallback={() => {
            setLite(true)
            setDpr(1)
          }}
        />
        <Suspense fallback={null}>
          <ScrollCamera stations={STATIONS} />
          <HudWorld
            quality={quality}
            projects={projects}
            experiences={experiences}
          />
          {high ? (
            <EffectComposer multisampling={0}>
              {[
                <Bloom
                  key='bloom'
                  intensity={1.35}
                  luminanceThreshold={0.12}
                  luminanceSmoothing={0.85}
                  mipmapBlur
                  radius={0.85}
                />,
                ...(lite
                  ? []
                  : [
                      <DepthOfField
                        key='dof'
                        focusDistance={0.012}
                        focalLength={0.045}
                        bokehScale={3.2}
                        height={480}
                      />,
                    ]),
                <ChromaticAberration
                  key='ca'
                  blendFunction={BlendFunction.NORMAL}
                  offset={caOffset}
                  radialModulation
                  modulationOffset={0.35}
                />,
                ...(lite
                  ? []
                  : [
                      <Scanline
                        key='scan'
                        blendFunction={BlendFunction.OVERLAY}
                        density={1.15}
                        opacity={0.055}
                      />,
                      <Noise
                        key='noise'
                        blendFunction={BlendFunction.OVERLAY}
                        opacity={0.14}
                      />,
                    ]),
                <Vignette
                  key='vignette'
                  offset={0.28}
                  darkness={0.95}
                  eskil={false}
                />,
              ]}
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
