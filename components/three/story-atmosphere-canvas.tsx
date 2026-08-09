'use client'

import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import type { ScenePerformanceTier } from '@/hooks/use-client-capabilities'
import { getStoryBeatIndex } from '@/lib/storytelling'
import type { StoryBeatId } from '@/types/storytelling'

export interface StoryAtmosphereCanvasProps {
  activeBeatId: StoryBeatId
  tier: ScenePerformanceTier
}

const TONES: Record<StoryBeatId, [string, string]> = {
  top: ['#83d95b', '#ffd06d'],
  about: ['#69c83d', '#b6e879'],
  work: ['#f1b85b', '#7bcf51'],
  experience: ['#58aa36', '#f2ca6c'],
  skills: ['#75ce4d', '#a9e473'],
  contact: ['#4b9f28', '#ffd37d'],
}

function AtmosphereWorld({ activeBeatId }: { activeBeatId: StoryBeatId }) {
  const beatIndex = getStoryBeatIndex(activeBeatId)
  const [primary, secondary] = TONES[activeBeatId]
  const particlePositions = useMemo(() => {
    const count = 32
    const positions = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const angle = index * 2.399963
      const radius = 0.8 + (index % 9) * 0.18
      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = Math.sin(angle) * radius * 1.15
      positions[index * 3 + 2] = -1.2 + (index % 7) * 0.22
    }

    return positions
  }, [])

  return (
    <group rotation={[0.08, beatIndex * 0.07, beatIndex * 0.025]}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />

      <points position={[0.15, 0, -1.2]}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={secondary}
          opacity={0.42}
          size={0.045}
          sizeAttenuation
          transparent
          depthWrite={false}
        />
      </points>

      <mesh position={[1.18, 1.05, -0.4]} rotation={[0.3, 0.4, 0.2]}>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial
          color={primary}
          emissive={primary}
          emissiveIntensity={0.12}
          metalness={0.08}
          roughness={0.64}
          transparent
          opacity={0.24}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[-1.25, -1.1, -0.7]} rotation={[0.6, 0.2, -0.4]}>
        <torusGeometry args={[0.52, 0.1, 12, 48]} />
        <meshStandardMaterial
          color={secondary}
          emissive={secondary}
          emissiveIntensity={0.08}
          metalness={0.12}
          roughness={0.58}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default function StoryAtmosphereCanvas({
  activeBeatId,
  tier,
}: StoryAtmosphereCanvasProps) {
  const dpr = tier === 'high' ? 0.8 : tier === 'balanced' ? 0.68 : 0.55

  return (
    <Canvas
      frameloop='demand'
      dpr={dpr}
      camera={{ position: [0, 0, 5.4], fov: 46, near: 0.1, far: 20 }}
      gl={{
        alpha: true,
        antialias: false,
        failIfMajorPerformanceCaveat: true,
        powerPreference: 'low-power',
        stencil: false,
      }}
    >
      <AtmosphereWorld activeBeatId={activeBeatId} />
    </Canvas>
  )
}
