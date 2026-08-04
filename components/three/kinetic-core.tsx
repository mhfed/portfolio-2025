'use client'

import type { ScenePerformanceTier } from '@/hooks/use-client-capabilities'
import { SCENE_PALETTE } from './scene-palette'
import type { SceneQuality } from './scene-waypoints'

export interface KineticCoreProps {
  performanceTier: ScenePerformanceTier
  quality: SceneQuality
}

/**
 * A deliberately static sculpture. The camera creates the motion while
 * scrolling, so the hero remains spatial without keeping a GPU animation loop
 * alive on every device.
 */
export function KineticCore({ performanceTier, quality }: KineticCoreProps) {
  const detail =
    performanceTier === 'high' ? 3 : performanceTier === 'balanced' ? 2 : 1
  const tubularSegments =
    performanceTier === 'high' ? 72 : performanceTier === 'balanced' ? 52 : 36
  const radialSegments = performanceTier === 'high' ? 10 : 7
  const ringSegments = performanceTier === 'high' ? 72 : 40

  return (
    <group scale={quality === 'high' ? 1 : 0.56} rotation={[0.1, -0.26, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.08, detail]} />
        <meshStandardMaterial
          color={SCENE_PALETTE.white}
          emissive={SCENE_PALETTE.accentSoft}
          emissiveIntensity={0.06}
          metalness={0.35}
          roughness={0.2}
        />
      </mesh>

      <mesh scale={0.7} rotation={[0.45, 0.2, -0.32]}>
        <torusKnotGeometry
          args={[0.72, 0.16, tubularSegments, radialSegments, 2, 3]}
        />
        <meshStandardMaterial
          color={SCENE_PALETTE.graphite}
          emissive={SCENE_PALETTE.accent}
          emissiveIntensity={0.12}
          metalness={0.82}
          roughness={0.2}
        />
      </mesh>

      <mesh rotation={[1.1, 0.2, 0.45]}>
        <torusGeometry args={[1.42, 0.024, 8, ringSegments]} />
        <meshStandardMaterial
          color={SCENE_PALETTE.chrome}
          metalness={0.84}
          roughness={0.22}
        />
      </mesh>
      <mesh rotation={[0.2, 1.15, -0.35]}>
        <torusGeometry args={[1.63, 0.018, 7, ringSegments]} />
        <meshStandardMaterial
          color={SCENE_PALETTE.accent}
          emissive={SCENE_PALETTE.accent}
          emissiveIntensity={0.24}
          metalness={0.56}
          roughness={0.22}
        />
      </mesh>
    </group>
  )
}
