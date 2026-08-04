'use client'

import { useEffect, useRef, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import type { Group } from 'three'
import type {
  PortfolioSceneContent,
  SceneCapability,
  SceneLocale,
} from '@/types/scene-content'
import { SCENE_PALETTE } from './scene-palette'
import { useScenePerformanceTier } from './scene-runtime'
import type { SceneQuality } from './scene-waypoints'
import {
  SceneBadge,
  ScenePanel,
  SceneRule,
  SceneText,
} from './spatial-primitives'

const SENTENCE_BOUNDARY = /[.。!?]\s/

function firstSentence(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  const sentenceEnd = clean.search(SENTENCE_BOUNDARY)
  return sentenceEnd === -1 ? clean : clean.slice(0, sentenceEnd + 1)
}

interface CapabilityNodeProps {
  capability: SceneCapability
  index: number
  onSelect: (index: number) => void
  position: [number, number, number]
  selected: boolean
}

function CapabilityNode({
  capability,
  index,
  onSelect,
  position,
  selected,
}: CapabilityNodeProps) {
  const group = useRef<Group>(null)
  const hovered = useRef(false)
  const performanceTier = useScenePerformanceTier()

  useEffect(() => {
    group.current?.scale.setScalar(selected ? 1.18 : 1)
    return () => {
      if (hovered.current) document.body.style.cursor = ''
    }
  }, [selected])

  const setHoverState = (nextHovered: boolean) => {
    hovered.current = nextHovered
    group.current?.scale.setScalar(nextHovered || selected ? 1.18 : 1)
  }

  const select = (event: ThreeEvent<PointerEvent | MouseEvent>) => {
    event.stopPropagation()
    onSelect(index)
  }

  return (
    <group ref={group} position={position}>
      <mesh
        onPointerOver={(event) => {
          setHoverState(true)
          document.body.style.cursor = 'pointer'
          select(event)
        }}
        onPointerOut={(event) => {
          event.stopPropagation()
          setHoverState(false)
          document.body.style.cursor = ''
        }}
        onClick={select}
      >
        <sphereGeometry
          args={[
            selected ? 0.105 : 0.08,
            performanceTier === 'high' ? 16 : 10,
            performanceTier === 'high' ? 16 : 10,
          ]}
        />
        <meshStandardMaterial
          color={selected ? SCENE_PALETTE.accent : SCENE_PALETTE.graphite}
          emissive={SCENE_PALETTE.accent}
          emissiveIntensity={selected ? 0.42 : 0.06}
          metalness={0.74}
          roughness={0.2}
        />
      </mesh>
      <SceneText
        position={[0, -0.18, 0.02]}
        anchorX='center'
        anchorY='top'
        textAlign='center'
        fontSize={0.105}
        fontWeight={620}
        maxWidth={1.15}
        lineHeight={1.15}
        color={selected ? SCENE_PALETTE.accent : SCENE_PALETTE.smoke}
      >
        {capability.label}
      </SceneText>
    </group>
  )
}

interface CapabilityOrbitProps {
  capabilities: SceneCapability[]
  quality: SceneQuality
}

function CapabilityOrbit({ capabilities, quality }: CapabilityOrbitProps) {
  const performanceTier = useScenePerformanceTier()
  const visibleCapabilities = capabilities.slice(0, quality === 'high' ? 6 : 4)
  const [selected, setSelected] = useState(0)
  const active = visibleCapabilities[selected] ?? visibleCapabilities[0]
  const radius = quality === 'high' ? 1.3 : 0.88

  if (!active) return null

  return (
    <group>
      <group rotation={[0.045, 0, 0.08]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry
            args={[radius, 0.018, 8, performanceTier === 'high' ? 72 : 40]}
          />
          <meshStandardMaterial
            color={SCENE_PALETTE.chrome}
            emissive={SCENE_PALETTE.accentSoft}
            emissiveIntensity={0.08}
            metalness={0.86}
            roughness={0.16}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.4, 0.2]}>
          <torusGeometry
            args={[
              radius * 0.72,
              0.012,
              8,
              performanceTier === 'high' ? 56 : 32,
            ]}
          />
          <meshStandardMaterial
            color={SCENE_PALETTE.accent}
            emissive={SCENE_PALETTE.accent}
            emissiveIntensity={0.18}
            metalness={0.62}
            roughness={0.2}
          />
        </mesh>
        {visibleCapabilities.map((capability, index) => {
          const angle = (index / visibleCapabilities.length) * Math.PI * 2
          return (
            <CapabilityNode
              key={capability.label}
              capability={capability}
              index={index}
              selected={index === selected}
              onSelect={setSelected}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0.08,
              ]}
            />
          )
        })}
      </group>

      <ScenePanel
        position={[0, quality === 'high' ? -1.75 : -1.32, -0.02]}
        size={quality === 'high' ? [3.35, 0.82, 0.08] : [2.45, 0.76, 0.08]}
        tone='light'
      />
      <SceneText
        position={[
          quality === 'high' ? -1.45 : -1.04,
          quality === 'high' ? -1.49 : -1.08,
          0.05,
        ]}
        fontSize={quality === 'high' ? 0.115 : 0.098}
        fontWeight={470}
        maxWidth={quality === 'high' ? 2.9 : 2.08}
        lineHeight={1.3}
        color={SCENE_PALETTE.smoke}
      >
        {firstSentence(active.value)}
      </SceneText>
    </group>
  )
}

export interface AboutStationProps {
  content: PortfolioSceneContent['about']
  locale: SceneLocale
  quality: SceneQuality
}

export function AboutStation({ content, locale, quality }: AboutStationProps) {
  const high = quality === 'high'
  const statementSize =
    locale === 'vi' ? 0.34 : locale === 'zh-TW' ? 0.39 : 0.45

  if (!high) {
    return (
      <group>
        <SceneText
          position={[-1.2, 2.68, 0.1]}
          fontSize={0.14}
          fontWeight={680}
          letterSpacing={0.06}
          color={SCENE_PALETTE.smoke}
        >
          {content.title}
        </SceneText>
        <SceneText
          position={[-1.2, 2.38, 0.14]}
          fontSize={0.23}
          fontWeight={650}
          maxWidth={2.4}
          lineHeight={1.05}
          letterSpacing={-0.03}
        >
          {firstSentence(content.statement)}
        </SceneText>
        <group position={[0, -0.15, 0.08]}>
          <CapabilityOrbit
            capabilities={content.capabilities}
            quality={quality}
          />
        </group>
        <SceneText
          position={[-1.04, -2.35, 0.12]}
          fontSize={0.42}
          fontWeight={720}
          color={SCENE_PALETTE.accent}
        >
          {content.yearsValue}
        </SceneText>
        <SceneText
          position={[-1.04, -2.82, 0.12]}
          fontSize={0.095}
          fontWeight={620}
          maxWidth={0.9}
          lineHeight={1.2}
          color={SCENE_PALETTE.smoke}
        >
          {content.yearsLabel.toUpperCase()}
        </SceneText>
        <SceneText
          position={[0.38, -2.35, 0.12]}
          fontSize={0.42}
          fontWeight={720}
          color={SCENE_PALETTE.graphite}
        >
          {content.deliveryValue}
        </SceneText>
        <SceneText
          position={[0.38, -2.82, 0.12]}
          fontSize={0.095}
          fontWeight={620}
          maxWidth={0.92}
          lineHeight={1.2}
          color={SCENE_PALETTE.smoke}
        >
          {content.deliveryLabel.toUpperCase()}
        </SceneText>
      </group>
    )
  }

  return (
    <group>
      <SceneText
        position={[-3.82, 2.65, 0.08]}
        fontSize={0.2}
        fontWeight={680}
        letterSpacing={0.06}
        color={SCENE_PALETTE.smoke}
      >
        {content.title}
      </SceneText>
      <SceneRule
        position={[-2.36, 2.61, 0.05]}
        length={1.1}
        color={SCENE_PALETTE.accent}
      />

      <SceneText
        position={[-3.8, 1.98, 0.14]}
        fontSize={statementSize}
        fontWeight={660}
        maxWidth={3.85}
        lineHeight={1.03}
        letterSpacing={-0.035}
      >
        {firstSentence(content.statement)}
      </SceneText>
      <SceneText
        position={[-3.8, 0.02, 0.12]}
        fontSize={0.145}
        fontWeight={450}
        maxWidth={3.55}
        lineHeight={1.42}
        color={SCENE_PALETTE.smoke}
      >
        {firstSentence(content.description)}
      </SceneText>

      <SceneText
        position={[-3.75, -1.24, 0.14]}
        fontSize={0.7}
        fontWeight={720}
        color={SCENE_PALETTE.accent}
      >
        {content.yearsValue}
      </SceneText>
      <SceneText
        position={[-3.75, -1.94, 0.14]}
        fontSize={0.095}
        fontWeight={620}
        maxWidth={1.18}
        lineHeight={1.2}
        letterSpacing={0.025}
        color={SCENE_PALETTE.smoke}
      >
        {content.yearsLabel.toUpperCase()}
      </SceneText>
      <SceneText position={[-2.1, -1.24, 0.14]} fontSize={0.7} fontWeight={720}>
        {content.deliveryValue}
      </SceneText>
      <SceneText
        position={[-2.1, -1.94, 0.14]}
        fontSize={0.095}
        fontWeight={620}
        maxWidth={1.35}
        lineHeight={1.2}
        letterSpacing={0.025}
        color={SCENE_PALETTE.smoke}
      >
        {content.deliveryLabel.toUpperCase()}
      </SceneText>

      <group position={[2.15, 0.25, 0.02]}>
        <SceneText
          position={[-1.62, 2.12, 0.05]}
          fontSize={0.11}
          fontWeight={650}
          letterSpacing={0.05}
          color={SCENE_PALETTE.accent}
        >
          {content.capabilitiesLabel.toUpperCase()}
        </SceneText>
        <CapabilityOrbit
          capabilities={content.capabilities}
          quality={quality}
        />
      </group>

      {content.badges.slice(0, 3).map((badge, index) => (
        <SceneBadge
          key={badge}
          label={badge}
          position={[1.05 + index * 1.2, -2.25, 0.12]}
          tone={index === 0 ? 'accent' : 'light'}
        />
      ))}
    </group>
  )
}
