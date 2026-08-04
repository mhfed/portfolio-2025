'use client'

import type { ScenePerformanceTier } from '@/hooks/use-client-capabilities'
import type { PortfolioSceneContent, SceneLocale } from '@/types/scene-content'
import { SCENE_PALETTE } from './scene-palette'
import type { SceneQuality } from './scene-waypoints'
import { SceneButton, SceneRule, SceneText } from './spatial-primitives'

interface SignalPortalProps {
  performanceTier: ScenePerformanceTier
  quality: SceneQuality
}

function SignalPortal({ performanceTier, quality }: SignalPortalProps) {
  const high = quality === 'high'

  return (
    <group rotation={[0.06, 0.16, 0.16]} scale={high ? 1 : 0.72}>
      <mesh>
        <torusGeometry
          args={[
            1.42,
            0.075,
            performanceTier === 'high' ? 10 : 7,
            performanceTier === 'high' ? 64 : 36,
          ]}
        />
        <meshStandardMaterial
          color={SCENE_PALETTE.accent}
          emissive={SCENE_PALETTE.accent}
          emissiveIntensity={0.34}
          metalness={0.76}
          roughness={0.18}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.35, 0.2]}>
        <torusGeometry
          args={[
            1.08,
            0.028,
            performanceTier === 'high' ? 8 : 6,
            performanceTier === 'high' ? 48 : 28,
          ]}
        />
        <meshStandardMaterial
          color={SCENE_PALETTE.chrome}
          emissive={SCENE_PALETTE.accentSoft}
          emissiveIntensity={0.12}
          metalness={0.9}
          roughness={0.14}
        />
      </mesh>
      <mesh rotation={[0.24, -0.28, 0]}>
        <icosahedronGeometry
          args={[
            0.66,
            performanceTier === 'high'
              ? 3
              : performanceTier === 'balanced'
                ? 2
                : 1,
          ]}
        />
        <meshStandardMaterial
          color={SCENE_PALETTE.white}
          emissive={SCENE_PALETTE.accentSoft}
          emissiveIntensity={0.1}
          metalness={0.28}
          roughness={0.22}
        />
      </mesh>
    </group>
  )
}

export interface ContactStationProps {
  content: PortfolioSceneContent['contact']
  email: string
  locale: SceneLocale
  performanceTier: ScenePerformanceTier
  quality: SceneQuality
}

export function ContactStation({
  content,
  email,
  locale,
  performanceTier,
  quality,
}: ContactStationProps) {
  const high = quality === 'high'
  const headlineSize = locale === 'zh-TW' ? 0.52 : locale === 'vi' ? 0.56 : 0.64
  const mobileHeadlineSize = locale === 'zh-TW' ? 0.32 : 0.4

  if (!high) {
    return (
      <group>
        <group position={[0.58, 1.55, -0.38]}>
          <SignalPortal quality={quality} performanceTier={performanceTier} />
        </group>
        <SceneText
          position={[-1.18, 2.62, 0.12]}
          fontSize={0.13}
          fontWeight={650}
          letterSpacing={0.05}
          color={SCENE_PALETTE.smoke}
        >
          {content.availability.toUpperCase()}
        </SceneText>
        <SceneText
          position={[-1.18, 1.05, 0.15]}
          fontSize={mobileHeadlineSize}
          fontWeight={710}
          maxWidth={2.35}
          lineHeight={0.94}
          letterSpacing={-0.04}
        >
          {content.headline}
        </SceneText>
        <SceneText
          position={[-1.18, -0.35, 0.15]}
          fontSize={0.13}
          fontWeight={450}
          maxWidth={2.3}
          lineHeight={1.4}
          color={SCENE_PALETTE.smoke}
        >
          {content.description}
        </SceneText>
        <SceneButton
          position={[0, -1.45, 0.16]}
          targetId='contact-email'
          href={`mailto:${email}`}
          label={email}
          tone='dark'
          width={2.35}
        />
        <group position={[-0.75, -2.15, 0.15]}>
          {content.links.slice(0, 3).map((link, index) => (
            <SceneButton
              key={link.href}
              position={[index * 0.76, 0, 0]}
              targetId={`contact-${link.label}`}
              href={link.href}
              label={link.label}
              tone={index === 0 ? 'accent' : 'light'}
              width={0.7}
            />
          ))}
        </group>
        <SceneText
          position={[-1.18, -2.72, 0.14]}
          fontSize={0.095}
          fontWeight={560}
          maxWidth={2.3}
          color={SCENE_PALETTE.smoke}
        >
          {content.location}
        </SceneText>
      </group>
    )
  }

  return (
    <group>
      <SceneText
        position={[-3.72, 2.28, 0.1]}
        fontSize={0.135}
        fontWeight={650}
        letterSpacing={0.05}
        color={SCENE_PALETTE.accent}
      >
        {content.availability.toUpperCase()}
      </SceneText>
      <SceneRule
        position={[-1.26, 2.24, 0.06]}
        length={1.18}
        color={SCENE_PALETTE.accent}
      />
      <SceneText
        position={[-3.72, 1.68, 0.15]}
        fontSize={headlineSize}
        fontWeight={720}
        maxWidth={4.55}
        lineHeight={0.9}
        letterSpacing={-0.05}
      >
        {content.headline}
      </SceneText>
      <SceneText
        position={[-3.65, 0.12, 0.15]}
        fontSize={0.16}
        fontWeight={450}
        maxWidth={3.95}
        lineHeight={1.42}
        color={SCENE_PALETTE.smoke}
      >
        {content.description}
      </SceneText>
      <SceneText
        position={[-3.65, -0.82, 0.15]}
        fontSize={0.11}
        fontWeight={620}
        letterSpacing={0.04}
        color={SCENE_PALETTE.smoke}
      >
        {content.emailLabel.toUpperCase()}
      </SceneText>
      <SceneButton
        position={[-2.35, -1.34, 0.17]}
        targetId='contact-email'
        href={`mailto:${email}`}
        label={email}
        tone='dark'
        width={2.65}
      />
      <group position={[-3.15, -2.1, 0.14]}>
        {content.links.map((link, index) => (
          <SceneButton
            key={link.href}
            position={[index * 1.28, 0, 0]}
            targetId={`contact-${link.label}`}
            href={link.href}
            label={link.label}
            tone={index === 0 ? 'accent' : 'light'}
            width={1.14}
          />
        ))}
      </group>
      <SceneText
        position={[-3.65, -2.62, 0.12]}
        fontSize={0.1}
        fontWeight={560}
        color={SCENE_PALETTE.smoke}
      >
        {content.location}
      </SceneText>

      <group position={[2.55, 0.12, -0.2]}>
        <SignalPortal quality={quality} performanceTier={performanceTier} />
      </group>
    </group>
  )
}
