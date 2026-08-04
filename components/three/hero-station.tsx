'use client'

import type { ScenePerformanceTier } from '@/hooks/use-client-capabilities'
import type { PortfolioSceneContent } from '@/types/scene-content'
import { KineticCore } from './kinetic-core'
import { SCENE_PALETTE } from './scene-palette'
import type { SceneQuality } from './scene-waypoints'
import { SceneButton, SceneRule, SceneText } from './spatial-primitives'

export interface HeroStationProps {
  content: PortfolioSceneContent['hero']
  email: string
  performanceTier: ScenePerformanceTier
  quality: SceneQuality
}

export function HeroStation({
  content,
  email,
  performanceTier,
  quality,
}: HeroStationProps) {
  const high = quality === 'high'
  const compactDescription = content.description.length > 112

  if (!high) {
    return (
      <group>
        <group position={[0.55, 0.42, -0.42]}>
          <KineticCore quality={quality} performanceTier={performanceTier} />
        </group>

        <SceneText
          position={[-1.18, 2.58, 0.16]}
          fontSize={0.13}
          fontWeight={650}
          letterSpacing={0.055}
          color={SCENE_PALETTE.smoke}
        >
          {content.role.toUpperCase()}
        </SceneText>
        <SceneText
          position={[-1.18, 2.08, 0.18]}
          fontSize={0.51}
          fontWeight={700}
          letterSpacing={-0.045}
          maxWidth={2.35}
          lineHeight={0.9}
        >
          {content.namePrimary}
        </SceneText>
        <SceneText
          position={[-1.18, 1.08, 0.2]}
          fontSize={0.82}
          fontWeight={720}
          letterSpacing={-0.055}
          color={SCENE_PALETTE.accent}
        >
          {content.nameAccent}
        </SceneText>

        <SceneText
          position={[-1.18, -1.02, 0.22]}
          fontSize={0.135}
          fontWeight={450}
          maxWidth={2.25}
          lineHeight={1.42}
          color={SCENE_PALETTE.smoke}
        >
          {content.description}
        </SceneText>
        <SceneButton
          position={[-0.62, -2.4, 0.2]}
          targetId='hero-work'
          href='#work'
          label={content.viewWorkLabel}
          tone='dark'
          width={1.18}
        />
        <SceneButton
          position={[0.7, -2.4, 0.2]}
          targetId='hero-contact'
          href={`mailto:${email}`}
          label={content.contactLabel}
          tone='light'
          width={1.18}
        />
      </group>
    )
  }

  return (
    <group>
      <SceneText
        position={[-3.7, 2.3, 0.14]}
        fontSize={0.16}
        fontWeight={650}
        letterSpacing={0.06}
        color={SCENE_PALETTE.smoke}
      >
        {content.role.toUpperCase()}
      </SceneText>
      <SceneRule
        position={[-2.05, 2.27, 0.1]}
        length={1.35}
        color={SCENE_PALETTE.accent}
      />

      <SceneText
        position={[-3.78, 1.78, -0.08]}
        fontSize={1.12}
        fontWeight={720}
        letterSpacing={-0.055}
        fillOpacity={0}
        outlineColor={SCENE_PALETTE.chrome}
        outlineWidth='1.4%'
      >
        {content.namePrimary}
      </SceneText>
      <SceneText
        position={[-3.72, 1.84, 0.2]}
        fontSize={1.12}
        fontWeight={720}
        letterSpacing={-0.055}
      >
        {content.namePrimary}
      </SceneText>
      <SceneText
        position={[-3.72, 0.68, 0.24]}
        fontSize={1.45}
        fontWeight={740}
        letterSpacing={-0.065}
        color={SCENE_PALETTE.accent}
      >
        {content.nameAccent}
      </SceneText>

      <SceneText
        position={[-3.64, -1.02, 0.24]}
        fontSize={compactDescription ? 0.17 : 0.2}
        fontWeight={450}
        maxWidth={4.15}
        lineHeight={1.46}
        color={SCENE_PALETTE.smoke}
      >
        {content.description}
      </SceneText>
      <SceneButton
        position={[-2.75, -2.32, 0.24]}
        targetId='hero-work'
        href='#work'
        label={content.viewWorkLabel}
        tone='dark'
      />
      <SceneButton
        position={[-0.9, -2.32, 0.24]}
        targetId='hero-contact'
        href={`mailto:${email}`}
        label={content.contactLabel}
        tone='light'
      />

      <group position={[2.45, 0.15, -0.25]} scale={1.02}>
        <KineticCore quality={quality} performanceTier={performanceTier} />
      </group>
    </group>
  )
}
