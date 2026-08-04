'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { Image, RoundedBox, Text } from '@react-three/drei'
import { MathUtils } from 'three'
import type { Group, MeshStandardMaterial } from 'three'
import { SCENE_PALETTE } from './scene-palette'
import { useScenePerformanceTier } from './scene-runtime'

type Position = [number, number, number]

export interface SceneTextProps {
  children: string
  color?: string
  fillOpacity?: number
  fontSize: number
  fontWeight?: number | string
  letterSpacing?: number
  lineHeight?: number
  maxWidth?: number
  outlineColor?: string
  outlineWidth?: number | string
  position?: Position
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  anchorX?: number | 'left' | 'center' | 'right'
  anchorY?:
    | number
    | 'top'
    | 'top-baseline'
    | 'middle'
    | 'bottom-baseline'
    | 'bottom'
}

export function SceneText({
  children,
  color = SCENE_PALETTE.graphite,
  fillOpacity = 1,
  fontSize,
  fontWeight = 500,
  letterSpacing = -0.025,
  lineHeight = 1.05,
  maxWidth,
  outlineColor,
  outlineWidth,
  position = [0, 0, 0],
  textAlign = 'left',
  anchorX = 'left',
  anchorY = 'top',
}: SceneTextProps) {
  const performanceTier = useScenePerformanceTier()

  return (
    <Text
      position={position}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      fillOpacity={fillOpacity}
      maxWidth={maxWidth}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      textAlign={textAlign}
      anchorX={anchorX}
      anchorY={anchorY}
      outlineColor={outlineColor}
      outlineWidth={outlineWidth}
      overflowWrap='break-word'
      sdfGlyphSize={performanceTier === 'high' ? 48 : 32}
    >
      {children}
    </Text>
  )
}

export type ScenePanelTone = 'light' | 'dark' | 'accent' | 'glass'

export interface ScenePanelProps {
  children?: ReactNode
  position?: Position
  rotation?: Position
  size: [number, number, number]
  tone?: ScenePanelTone
}

export function ScenePanel({
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size,
  tone = 'light',
}: ScenePanelProps) {
  const performanceTier = useScenePerformanceTier()
  const glassOpacity = performanceTier === 'high' ? 0.9 : 1
  const material = {
    light: {
      color: SCENE_PALETTE.white,
      emissive: SCENE_PALETTE.white,
      emissiveIntensity: 0.035,
      metalness: 0.08,
      opacity: 0.96,
      roughness: 0.3,
    },
    dark: {
      color: SCENE_PALETTE.graphite,
      emissive: SCENE_PALETTE.accent,
      emissiveIntensity: 0.06,
      metalness: 0.72,
      opacity: 0.98,
      roughness: 0.2,
    },
    accent: {
      color: SCENE_PALETTE.accent,
      emissive: SCENE_PALETTE.accent,
      emissiveIntensity: 0.2,
      metalness: 0.48,
      opacity: 0.98,
      roughness: 0.24,
    },
    glass: {
      color: SCENE_PALETTE.frost,
      emissive: SCENE_PALETTE.white,
      emissiveIntensity: 0.05,
      metalness: 0.16,
      opacity: glassOpacity,
      roughness: performanceTier === 'high' ? 0.18 : 0.26,
    },
  }[tone]

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox
        args={size}
        radius={0.1}
        smoothness={performanceTier === 'high' ? 2 : 1}
      >
        <meshStandardMaterial
          {...material}
          transparent={material.opacity < 1}
        />
      </RoundedBox>
      {children}
    </group>
  )
}

export interface SceneMediaProps {
  grayscale?: number
  position?: Position
  scale: [number, number]
  url: string
}

export function SceneMedia({
  grayscale = 0.08,
  position = [0, 0, 0],
  scale,
  url,
}: SceneMediaProps) {
  const performanceTier = useScenePerformanceTier()

  if (!url) {
    return (
      <ScenePanel
        position={position}
        size={[scale[0], scale[1], 0.06]}
        tone='glass'
      />
    )
  }

  return (
    <group position={position}>
      <RoundedBox
        args={[scale[0] + 0.08, scale[1] + 0.08, 0.08]}
        radius={0.1}
        smoothness={performanceTier === 'high' ? 2 : 1}
        position={[0, 0, -0.06]}
      >
        <meshStandardMaterial
          color={SCENE_PALETTE.graphite}
          metalness={0.7}
          roughness={0.22}
        />
      </RoundedBox>
      <Image
        url={url}
        scale={scale}
        radius={0.08}
        grayscale={grayscale}
        toneMapped={false}
      />
    </group>
  )
}

export interface SceneBadgeProps {
  label: string
  position?: Position
  tone?: 'light' | 'dark' | 'accent'
}

export function SceneBadge({
  label,
  position = [0, 0, 0],
  tone = 'light',
}: SceneBadgeProps) {
  const performanceTier = useScenePerformanceTier()
  const width = MathUtils.clamp(0.28 + label.length * 0.052, 0.58, 1.45)
  const dark = tone === 'dark'
  const accent = tone === 'accent'

  return (
    <group position={position}>
      <RoundedBox
        args={[width, 0.28, 0.045]}
        radius={0.08}
        smoothness={performanceTier === 'high' ? 2 : 1}
      >
        <meshStandardMaterial
          color={
            accent
              ? SCENE_PALETTE.accent
              : dark
                ? SCENE_PALETTE.graphite
                : SCENE_PALETTE.white
          }
          metalness={dark || accent ? 0.58 : 0.08}
          roughness={0.28}
        />
      </RoundedBox>
      <SceneText
        position={[0, 0.005, 0.03]}
        anchorX='center'
        anchorY='middle'
        textAlign='center'
        fontSize={0.092}
        fontWeight={600}
        letterSpacing={0.015}
        color={dark || accent ? SCENE_PALETTE.white : SCENE_PALETTE.smoke}
      >
        {label}
      </SceneText>
    </group>
  )
}

function activateHref(href: string): void {
  if (href.startsWith('#')) {
    const target = document.querySelector(href)
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return
  }

  if (href.startsWith('mailto:')) {
    window.location.href = href
    return
  }

  window.open(href, '_blank', 'noopener,noreferrer')
}

export interface SceneButtonProps {
  href?: string
  label: string
  onActivate?: () => void
  position?: Position
  targetId: string
  tone?: 'dark' | 'light' | 'accent'
  width?: number
}

export function SceneButton({
  href,
  label,
  onActivate,
  position = [0, 0, 0],
  tone = 'dark',
  width,
}: SceneButtonProps) {
  const group = useRef<Group>(null)
  const material = useRef<MeshStandardMaterial>(null)
  const hovered = useRef(false)
  const performanceTier = useScenePerformanceTier()
  const resolvedWidth =
    width ?? MathUtils.clamp(0.64 + label.length * 0.075, 1.3, 2.5)
  const baseZ = position[2]
  const foreground =
    tone === 'light' ? SCENE_PALETTE.graphite : SCENE_PALETTE.white
  const background =
    tone === 'light'
      ? SCENE_PALETTE.white
      : tone === 'accent'
        ? SCENE_PALETTE.accent
        : SCENE_PALETTE.graphite

  useEffect(
    () => () => {
      if (hovered.current) document.body.style.cursor = ''
    },
    []
  )

  const setHoverState = (nextHovered: boolean) => {
    hovered.current = nextHovered
    group.current?.scale.setScalar(nextHovered ? 1.045 : 1)
    if (group.current) {
      group.current.position.z = baseZ + (nextHovered ? 0.08 : 0)
    }
    if (material.current) {
      material.current.emissiveIntensity = nextHovered ? 0.34 : 0.08
    }
  }

  const onPointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setHoverState(true)
    document.body.style.cursor = 'pointer'
  }

  const onPointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setHoverState(false)
    document.body.style.cursor = ''
  }

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onActivate?.()
    if (href) activateHref(href)
  }

  return (
    <group ref={group} position={position}>
      <RoundedBox
        args={[resolvedWidth, 0.46, 0.09]}
        radius={0.15}
        smoothness={performanceTier === 'high' ? 3 : 1}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        <meshStandardMaterial
          ref={material}
          color={background}
          emissive={tone === 'light' ? SCENE_PALETTE.accentSoft : background}
          emissiveIntensity={0.08}
          metalness={tone === 'light' ? 0.12 : 0.6}
          roughness={0.24}
        />
      </RoundedBox>
      <SceneText
        position={[0, 0.01, 0.06]}
        anchorX='center'
        anchorY='middle'
        textAlign='center'
        fontSize={0.12}
        fontWeight={650}
        letterSpacing={0.025}
        color={foreground}
      >
        {label}
      </SceneText>
    </group>
  )
}

export interface SceneRuleProps {
  color?: string
  length: number
  position?: Position
  vertical?: boolean
}

export function SceneRule({
  color = SCENE_PALETTE.chrome,
  length,
  position = [0, 0, 0],
  vertical = false,
}: SceneRuleProps) {
  return (
    <mesh position={position}>
      <boxGeometry
        args={vertical ? [0.012, length, 0.012] : [length, 0.012, 0.012]}
      />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.08}
        metalness={0.76}
        roughness={0.24}
      />
    </mesh>
  )
}
