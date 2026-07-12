/**
 * Camera "stations" for the Financial HUD world. Each section of the portfolio
 * maps to one station: a landmark placed in 3D space, plus the camera position
 * and look-at target that frames it. The scroll progress (0..1) is interpolated
 * along a Catmull-Rom curve through these points, so scrolling flies the camera
 * from station to station.
 */

export type LandmarkKind =
  | 'globe'
  | 'ring'
  | 'spine'
  | 'graph'
  | 'panels'
  | 'beacon'

export interface StationDef {
  key: string
  accent: string
  /** World-space position of this station's landmark object. */
  landmark: [number, number, number]
  kind: LandmarkKind
  /** Camera position when this station is centered. */
  camera: [number, number, number]
  /** Camera look-at target when this station is centered. */
  look: [number, number, number]
}

export const STATIONS: StationDef[] = [
  {
    key: 'hero',
    accent: '#73ff87',
    landmark: [1.9, 0.5, 0],
    kind: 'globe',
    // camera looks left of the globe so it reads on the right of the frame
    camera: [0, 0.9, 6.6],
    look: [0.1, 0.4, 0],
  },
  {
    key: 'about',
    accent: '#ff8a3d',
    landmark: [-5.0, 1.2, -9],
    kind: 'ring',
    camera: [-2.25, 1.12, -2.5],
    look: [-5.0, 1.2, -9],
  },
  {
    key: 'experience',
    accent: '#73ff87',
    landmark: [4.2, -0.8, -15],
    kind: 'spine',
    camera: [1.89, -0.08, -8.5],
    look: [4.2, -0.8, -15],
  },
  {
    key: 'work',
    accent: '#ff5ebc',
    landmark: [4.4, -0.4, -27],
    kind: 'panels',
    camera: [1.98, 0.16, -20.5],
    look: [4.4, -0.4, -27],
  },
  {
    key: 'contact',
    accent: '#73ff87',
    landmark: [0, 0.4, -33],
    kind: 'beacon',
    camera: [0, 0.64, -26.5],
    look: [0, 0.4, -33],
  },
]
