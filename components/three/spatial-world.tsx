'use client'

import type { ScenePerformanceTier } from '@/hooks/use-client-capabilities'
import { useSceneValue } from '@/lib/sceneStore'
import type { PortfolioSceneContent } from '@/types/scene-content'
import { AboutStation } from './about-station'
import { ContactStation } from './contact-station'
import { ExperienceStation } from './experience-station'
import { HeroStation } from './hero-station'
import { SCENE_PALETTE } from './scene-palette'
import {
  getWaypoint,
  type SceneQuality,
  type SceneWaypoint,
} from './scene-waypoints'
import { ScenePerformanceProvider } from './scene-runtime'
import { WorkStation } from './work-station'

export interface SpatialWorldProps {
  content: PortfolioSceneContent
  performanceTier: ScenePerformanceTier
  quality: SceneQuality
  waypoints: SceneWaypoint[]
}

export function SpatialWorld({
  content,
  performanceTier,
  quality,
  waypoints,
}: SpatialWorldProps) {
  const activeStation = useSceneValue('activeStation')
  const waypoint = getWaypoint(waypoints, activeStation)

  const station = {
    hero: (
      <HeroStation
        content={content.hero}
        email={content.email}
        performanceTier={performanceTier}
        quality={quality}
      />
    ),
    work: (
      <WorkStation
        content={content.work}
        projects={content.projects}
        quality={quality}
      />
    ),
    about: (
      <AboutStation
        content={content.about}
        locale={content.locale}
        quality={quality}
      />
    ),
    experience: (
      <ExperienceStation
        content={content.experience}
        experiences={content.experiences}
        quality={quality}
      />
    ),
    contact: (
      <ContactStation
        content={content.contact}
        email={content.email}
        locale={content.locale}
        performanceTier={performanceTier}
        quality={quality}
      />
    ),
  }[activeStation]

  return (
    <ScenePerformanceProvider tier={performanceTier}>
      <color attach='background' args={[SCENE_PALETTE.frost]} />
      <fog attach='fog' args={[SCENE_PALETTE.frost, 9, 42]} />

      <ambientLight intensity={1.45} color={SCENE_PALETTE.white} />
      <directionalLight
        position={[5, 7, 8]}
        intensity={1.85}
        color={SCENE_PALETTE.white}
      />
      <group key={activeStation} position={waypoint.landmark}>
        {station}
      </group>
    </ScenePerformanceProvider>
  )
}
