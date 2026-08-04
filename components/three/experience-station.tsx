'use client'

import { useEffect, useMemo, useRef } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { MathUtils } from 'three'
import type { Group } from 'three'
import type { ExperienceRecord } from '@/types/experience'
import { scrollToSceneRecord, useSceneValue } from '@/lib/sceneStore'
import type { PortfolioSceneContent } from '@/types/scene-content'
import { SCENE_PALETTE } from './scene-palette'
import { useScenePerformanceTier } from './scene-runtime'
import type { SceneQuality } from './scene-waypoints'
import {
  SceneBadge,
  SceneButton,
  ScenePanel,
  SceneRule,
  SceneText,
} from './spatial-primitives'

const SENTENCE_BOUNDARY = /[.。!?]\s/

function summarize(text: string, limit: number): string {
  const clean = text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const sentenceEnd = clean.search(SENTENCE_BOUNDARY)
  const sentence = sentenceEnd === -1 ? clean : clean.slice(0, sentenceEnd + 1)
  return sentence.length > limit
    ? `${sentence.slice(0, limit).trim()}...`
    : sentence
}

interface TimelineNodeProps {
  active: boolean
  index: number
  label: string
  position: [number, number, number]
}

function TimelineNode({ active, index, label, position }: TimelineNodeProps) {
  const group = useRef<Group>(null)
  const hovered = useRef(false)
  const performanceTier = useScenePerformanceTier()

  useEffect(() => {
    group.current?.scale.setScalar(active ? 1.22 : 0.92)
    return () => {
      if (hovered.current) document.body.style.cursor = ''
    }
  }, [active])

  const setHoverState = (nextHovered: boolean) => {
    hovered.current = nextHovered
    group.current?.scale.setScalar(nextHovered || active ? 1.22 : 0.92)
  }

  const select = (event: ThreeEvent<PointerEvent | MouseEvent>) => {
    event.stopPropagation()
    scrollToSceneRecord('experience', index)
  }

  return (
    <group ref={group} position={position}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation()
          setHoverState(true)
          document.body.style.cursor = 'pointer'
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
            active ? 0.12 : 0.075,
            performanceTier === 'high' ? 18 : 10,
            performanceTier === 'high' ? 18 : 10,
          ]}
        />
        <meshStandardMaterial
          color={active ? SCENE_PALETTE.accent : SCENE_PALETTE.graphite}
          emissive={SCENE_PALETTE.accent}
          emissiveIntensity={active ? 0.46 : 0.06}
          metalness={0.74}
          roughness={0.2}
        />
      </mesh>
      <SceneText
        position={[0.22, 0.06, 0.02]}
        anchorY='middle'
        fontSize={0.105}
        fontWeight={620}
        maxWidth={1.25}
        lineHeight={1.15}
        color={active ? SCENE_PALETTE.accent : SCENE_PALETTE.smoke}
      >
        {label}
      </SceneText>
    </group>
  )
}

export interface ExperienceStationProps {
  content: PortfolioSceneContent['experience']
  experiences: ExperienceRecord[]
  quality: SceneQuality
}

export function ExperienceStation({
  content,
  experiences,
  quality,
}: ExperienceStationProps) {
  const records = useMemo(() => [...experiences].reverse(), [experiences])
  const experienceIndex = useSceneValue('experienceIndex')
  const activeIndex = MathUtils.clamp(
    experienceIndex,
    0,
    Math.max(0, records.length - 1)
  )
  const role = records[activeIndex]
  const high = quality === 'high'

  if (!role) {
    return (
      <SceneText
        position={[-1.5, 0.2, 0]}
        fontSize={high ? 0.42 : 0.24}
        maxWidth={3}
      >
        {content.emptyLabel}
      </SceneText>
    )
  }

  const previous = Math.max(0, activeIndex - 1)
  const next = Math.min(records.length - 1, activeIndex + 1)
  const skills = role.skills.slice(0, high ? 5 : 3)

  if (!high) {
    return (
      <group>
        <SceneText
          position={[-1.22, 2.62, 0.1]}
          fontSize={0.14}
          fontWeight={680}
          letterSpacing={0.05}
          color={SCENE_PALETTE.smoke}
        >
          {content.title.replace('\n', ' ')}
        </SceneText>
        <ScenePanel
          position={[0, -0.02, 0]}
          size={[2.72, 4.8, 0.12]}
          tone='dark'
        />
        <SceneText
          position={[-1.08, 1.95, 0.1]}
          fontSize={0.105}
          fontWeight={640}
          letterSpacing={0.035}
          color={SCENE_PALETTE.accentSoft}
        >
          {role.period}
        </SceneText>
        <SceneText
          position={[-1.08, 1.58, 0.11]}
          fontSize={role.company.length > 16 ? 0.27 : 0.38}
          fontWeight={710}
          maxWidth={2.18}
          lineHeight={0.95}
          color={SCENE_PALETTE.white}
        >
          {role.company}
        </SceneText>
        <SceneText
          position={[-1.08, 0.68, 0.11]}
          fontSize={0.11}
          fontWeight={640}
          maxWidth={2.1}
          letterSpacing={0.025}
          color={SCENE_PALETTE.accentSoft}
        >
          {role.position.toUpperCase()}
        </SceneText>
        <SceneText
          position={[-1.08, 0.25, 0.11]}
          fontSize={0.125}
          fontWeight={450}
          maxWidth={2.14}
          lineHeight={1.38}
          color={SCENE_PALETTE.chrome}
        >
          {summarize(role.description, 160)}
        </SceneText>
        {skills.map((skill, index) => (
          <SceneBadge
            key={skill}
            label={skill}
            position={[-0.7 + index * 0.72, -1.35, 0.12]}
            tone={index === 0 ? 'accent' : 'light'}
          />
        ))}
        <SceneText
          position={[-1.08, -1.82, 0.11]}
          fontSize={0.095}
          fontWeight={550}
          color={SCENE_PALETTE.chrome}
        >
          {role.location}
        </SceneText>
      </group>
    )
  }

  return (
    <group>
      <SceneText
        position={[-3.82, 2.42, 0.08]}
        fontSize={0.2}
        fontWeight={680}
        letterSpacing={0.05}
        color={SCENE_PALETTE.smoke}
      >
        {content.title.replace('\n', ' ')}
      </SceneText>
      <SceneRule
        position={[-1.78, 2.38, 0.05]}
        length={1.2}
        color={SCENE_PALETTE.accent}
      />

      <group position={[-3.45, 0.05, 0.04]}>
        <SceneRule
          position={[0, 0, -0.02]}
          length={3.65}
          vertical
          color={SCENE_PALETTE.chrome}
        />
        {records.map((record, index) => {
          const y =
            records.length === 1
              ? 0
              : 1.7 - (index / (records.length - 1)) * 3.4
          return (
            <TimelineNode
              key={record.id}
              index={index}
              label={record.company}
              active={index === activeIndex}
              position={[0, y, 0.06]}
            />
          )
        })}
      </group>

      <ScenePanel
        position={[1.05, 0, 0]}
        size={[5.15, 4.5, 0.13]}
        tone='dark'
      />
      <SceneText
        position={[-1.18, 1.82, 0.1]}
        fontSize={0.115}
        fontWeight={650}
        letterSpacing={0.04}
        color={SCENE_PALETTE.accentSoft}
      >
        {role.period}
      </SceneText>
      <SceneText
        position={[-1.18, 1.42, 0.11]}
        fontSize={role.company.length > 18 ? 0.4 : 0.54}
        fontWeight={715}
        maxWidth={4.3}
        lineHeight={0.94}
        letterSpacing={-0.04}
        color={SCENE_PALETTE.white}
      >
        {role.company}
      </SceneText>
      <SceneText
        position={[-1.18, 0.45, 0.11]}
        fontSize={0.125}
        fontWeight={640}
        maxWidth={4.15}
        letterSpacing={0.025}
        color={SCENE_PALETTE.accentSoft}
      >
        {role.position.toUpperCase()}
      </SceneText>
      <SceneText
        position={[-1.18, 0.05, 0.11]}
        fontSize={0.15}
        fontWeight={450}
        maxWidth={4.05}
        lineHeight={1.42}
        color={SCENE_PALETTE.chrome}
      >
        {summarize(role.description, 220)}
      </SceneText>
      {skills.map((skill, index) => (
        <SceneBadge
          key={skill}
          label={skill}
          position={[-0.78 + index * 0.9, -1.15, 0.12]}
          tone={index === 0 ? 'accent' : 'light'}
        />
      ))}
      <SceneText
        position={[-1.18, -1.62, 0.11]}
        fontSize={0.1}
        fontWeight={550}
        color={SCENE_PALETTE.chrome}
      >
        {role.location}
      </SceneText>
      <SceneButton
        position={[1.02, -1.78, 0.12]}
        targetId='experience-previous'
        label='PREV'
        tone='light'
        width={1.12}
        onActivate={() => scrollToSceneRecord('experience', previous)}
      />
      <SceneButton
        position={[2.36, -1.78, 0.12]}
        targetId='experience-next'
        label='NEXT'
        tone='accent'
        width={1.12}
        onActivate={() => scrollToSceneRecord('experience', next)}
      />
    </group>
  )
}
