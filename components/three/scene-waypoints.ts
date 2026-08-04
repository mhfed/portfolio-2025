import { SCENE_PALETTE } from './scene-palette'
import type { SceneStation } from '@/lib/sceneStore'

export type SceneQuality = 'high' | 'low'

export interface SceneWaypoint {
  key: SceneStation
  accent: string
  landmark: [number, number, number]
  camera: [number, number, number]
  look: [number, number, number]
}

export const DESKTOP_WAYPOINTS: SceneWaypoint[] = [
  {
    key: 'hero',
    accent: SCENE_PALETTE.accent,
    landmark: [0, 0, 0],
    camera: [0, 0.28, 8.4],
    look: [0, 0, 0],
  },
  {
    key: 'work',
    accent: SCENE_PALETTE.accent,
    landmark: [-0.6, 0, -12],
    camera: [-0.2, 0.24, -3.6],
    look: [-0.6, 0, -12],
  },
  {
    key: 'about',
    accent: SCENE_PALETTE.accent,
    landmark: [0.65, 0, -24],
    camera: [0.2, 0.24, -15.6],
    look: [0.65, 0, -24],
  },
  {
    key: 'experience',
    accent: SCENE_PALETTE.accent,
    landmark: [-0.55, 0, -36],
    camera: [-0.18, 0.24, -27.6],
    look: [-0.55, 0, -36],
  },
  {
    key: 'contact',
    accent: SCENE_PALETTE.accent,
    landmark: [0, 0, -48],
    camera: [0, 0.24, -39.6],
    look: [0, 0, -48],
  },
]

export const MOBILE_WAYPOINTS: SceneWaypoint[] = [
  {
    key: 'hero',
    accent: SCENE_PALETTE.accent,
    landmark: [0, 0, 0],
    camera: [0, 0.18, 8.6],
    look: [0, 0, 0],
  },
  {
    key: 'work',
    accent: SCENE_PALETTE.accent,
    landmark: [0, 0, -12],
    camera: [0, 0.18, -3.4],
    look: [0, 0, -12],
  },
  {
    key: 'about',
    accent: SCENE_PALETTE.accent,
    landmark: [0, 0, -24],
    camera: [0, 0.18, -15.4],
    look: [0, 0, -24],
  },
  {
    key: 'experience',
    accent: SCENE_PALETTE.accent,
    landmark: [0, 0, -36],
    camera: [0, 0.18, -27.4],
    look: [0, 0, -36],
  },
  {
    key: 'contact',
    accent: SCENE_PALETTE.accent,
    landmark: [0, 0, -48],
    camera: [0, 0.18, -39.4],
    look: [0, 0, -48],
  },
]

export function getWaypoint(
  waypoints: SceneWaypoint[],
  key: SceneStation
): SceneWaypoint {
  const found = waypoints.find((waypoint) => waypoint.key === key)
  if (!found) throw new Error(`Unknown WebGL waypoint: ${key}`)
  return found
}
