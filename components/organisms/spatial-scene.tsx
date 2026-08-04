'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { ScrollCamera } from '@/components/three/scroll-camera'
import {
  DESKTOP_WAYPOINTS,
  MOBILE_WAYPOINTS,
  type SceneQuality,
} from '@/components/three/scene-waypoints'
import { SpatialWorld } from '@/components/three/spatial-world'
import type { ScenePerformanceTier } from '@/hooks/use-client-capabilities'
import type { PortfolioSceneContent } from '@/types/scene-content'

export interface SpatialSceneProps {
  content: PortfolioSceneContent
  onReady: () => void
  onTierChange: (tier: ScenePerformanceTier) => void
  performanceTier: ScenePerformanceTier
  quality: SceneQuality
}

function initialDpr(tier: ScenePerformanceTier, quality: SceneQuality): number {
  if (tier === 'low') return 0.55
  if (tier === 'balanced') return quality === 'high' ? 0.7 : 0.6
  return quality === 'high' ? 0.85 : 0.7
}

function lowerTier(tier: ScenePerformanceTier): ScenePerformanceTier {
  if (tier === 'high') return 'balanced'
  return 'low'
}

function SceneReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady()
  }, [onReady])

  return null
}

export default function SpatialScene({
  content,
  onReady,
  onTierChange,
  performanceTier,
  quality,
}: SpatialSceneProps) {
  const [runtimeTier, setRuntimeTier] =
    useState<ScenePerformanceTier>(performanceTier)
  const [dpr, setDpr] = useState(() => initialDpr(performanceTier, quality))
  const [isScrolling, setIsScrolling] = useState(false)
  const waypoints = useMemo(
    () => (quality === 'high' ? DESKTOP_WAYPOINTS : MOBILE_WAYPOINTS),
    [quality]
  )
  const high = quality === 'high'

  useEffect(() => {
    setRuntimeTier(performanceTier)
    setDpr(initialDpr(performanceTier, quality))
  }, [performanceTier, quality])

  useEffect(() => {
    onTierChange(runtimeTier)
  }, [onTierChange, runtimeTier])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const setScrollState = () => {
      setIsScrolling(true)
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsScrolling(false), 140)
    }

    window.addEventListener('scroll', setScrollState, { passive: true })
    return () => {
      window.removeEventListener('scroll', setScrollState)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <Canvas
      frameloop='demand'
      dpr={isScrolling ? Math.min(dpr, 0.5) : dpr}
      camera={{
        position: waypoints[0].camera,
        fov: high ? 39 : 43,
        near: 0.1,
        far: 30,
      }}
      performance={{ min: 0.5, max: 1, debounce: 300 }}
      resize={{ debounce: { resize: 100, scroll: 200 } }}
      gl={{
        alpha: false,
        antialias: false,
        depth: true,
        failIfMajorPerformanceCaveat: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.02
      }}
    >
      <PerformanceMonitor
        bounds={() =>
          runtimeTier === 'high'
            ? [50, 60]
            : runtimeTier === 'balanced'
              ? [38, 55]
              : [27, 45]
        }
        flipflops={2}
        onChange={({ factor }) => {
          const floor = runtimeTier === 'low' ? 0.5 : 0.55
          const ceiling = initialDpr(runtimeTier, quality)
          const raw = floor + factor * (ceiling - floor)
          const next = Math.round(raw * 8) / 8
          setDpr((current) => (current === next ? current : next))
        }}
        onDecline={() => setRuntimeTier((current) => lowerTier(current))}
        onFallback={() => {
          setRuntimeTier('low')
          setDpr(0.5)
        }}
      />
      <Suspense fallback={null}>
        <ScrollCamera waypoints={waypoints} quality={quality} />
        <SpatialWorld
          content={content}
          performanceTier={runtimeTier}
          quality={quality}
          waypoints={waypoints}
        />

        <SceneReadySignal onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}
