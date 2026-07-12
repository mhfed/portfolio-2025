'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Grid, Line, Sparkles } from '@react-three/drei'
import { QuadraticBezierCurve3, Vector3 } from 'three'
import type { Group, Mesh, MeshBasicMaterial } from 'three'
import { STATIONS, type LandmarkKind, type StationDef } from './hud-stations'

export type WorldQuality = 'high' | 'low'

const ACCENT = '#73ff87'
const AMBER = '#ff8a3d'
const GRID_CELL = '#1b3a24'
const FOG = '#050a08'

/* ── even sphere point cloud via the golden-angle spiral ── */
function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return positions
}

function randomSpherePoint(radius: number): Vector3 {
  // deterministic-ish spread using trig of an index is done by callers;
  // here we accept precomputed angles
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  )
}

/* ── orbiting great-circle arcs with a traveling signal dot ── */
function Arcs({ radius, count }: { radius: number; count: number }) {
  const dots = useRef<(Mesh | null)[]>([])
  const arcs = useMemo(() => {
    const list: { points: Vector3[]; curve: QuadraticBezierCurve3 }[] = []
    for (let i = 0; i < count; i++) {
      const a = randomSpherePoint(radius)
      const b = randomSpherePoint(radius)
      const mid = a.clone().add(b).multiplyScalar(0.5)
      const lift = 1 + 0.35 + Math.random() * 0.4
      mid.setLength(radius * lift)
      const curve = new QuadraticBezierCurve3(a, mid, b)
      list.push({ points: curve.getPoints(40), curve })
    }
    return list
  }, [radius, count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    arcs.forEach((arc, i) => {
      const dot = dots.current[i]
      if (!dot) return
      const u = (t * 0.12 + i / count) % 1
      arc.curve.getPointAt(u, dot.position)
    })
  })

  return (
    <group>
      {arcs.map((arc, i) => (
        <group key={i}>
          <Line
            points={arc.points}
            color={i % 3 === 0 ? AMBER : ACCENT}
            lineWidth={1}
            transparent
            opacity={0.35}
          />
          <mesh ref={(el) => (dots.current[i] = el)}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={i % 3 === 0 ? AMBER : ACCENT} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ── hero landmark: wireframe globe + point cloud + arcs ── */
function Globe({
  position,
  quality,
}: {
  position: [number, number, number]
  quality: WorldQuality
}) {
  const group = useRef<Group>(null)
  const count = quality === 'high' ? 1100 : 420
  const positions = useMemo(() => fibonacciSphere(count, 1.6), [count])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06
  })

  return (
    <group position={position}>
      <group ref={group}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach='attributes-position' args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.025}
            color={ACCENT}
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </points>
        <mesh>
          <icosahedronGeometry args={[1.57, quality === 'high' ? 3 : 2]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.09} />
        </mesh>
      </group>
      {quality === 'high' && <Arcs radius={1.75} count={9} />}
    </group>
  )
}

/* ── generic wireframe landmark for the non-hero stations ── */
const MAX_OPACITY = 0.44
const NEAR = 6 // fully visible when camera is this close
const FAR = 11 // fully faded beyond this

function StationLandmark({
  station,
  quality,
}: {
  station: StationDef
  quality: WorldQuality
}) {
  const group = useRef<Group>(null)
  const material = useRef<MeshBasicMaterial>(null)
  const landmarkVec = useMemo(
    () => new Vector3(...station.landmark),
    [station]
  )

  // Fade each landmark in only as the camera flies near its station, so the
  // hero stays clean and distant stations reveal themselves on scroll.
  useFrame((state, delta) => {
    if (!group.current || !material.current) return
    group.current.rotation.y += delta * 0.16
    group.current.rotation.x += delta * 0.05
    const d = state.camera.position.distanceTo(landmarkVec)
    const o = Math.max(
      0,
      Math.min(MAX_OPACITY, ((FAR - d) / (FAR - NEAR)) * MAX_OPACITY)
    )
    material.current.opacity = o
    group.current.visible = o > 0.01
  })

  return (
    <group ref={group} position={station.landmark}>
      <mesh>
        <LandmarkGeometry kind={station.kind} quality={quality} />
        <meshBasicMaterial
          ref={material}
          color={station.accent}
          wireframe
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  )
}

function LandmarkGeometry({
  kind,
  quality,
}: {
  kind: LandmarkKind
  quality: WorldQuality
}) {
  const detail = quality === 'high' ? 1 : 0
  switch (kind) {
    case 'ring':
      return <torusGeometry args={[0.95, 0.26, 12, 40]} />
    case 'spine':
      return <cylinderGeometry args={[0.15, 0.15, 3.4, 6, 8, true]} />
    case 'graph':
      return <icosahedronGeometry args={[1.2, detail + 1]} />
    case 'panels':
      return <boxGeometry args={[1.8, 1.2, 1.8, 2, 2, 2]} />
    case 'beacon':
      return <octahedronGeometry args={[1.1, 0]} />
    default:
      return <icosahedronGeometry args={[1.1, detail]} />
  }
}

export function HudWorld({ quality }: { quality: WorldQuality }) {
  const hero = STATIONS[0]

  return (
    <>
      <fog attach='fog' args={[FOG, 7, 34]} />

      <Globe position={hero.landmark} quality={quality} />

      {STATIONS.slice(1).map((station) => (
        <StationLandmark key={station.key} station={station} quality={quality} />
      ))}

      <Grid
        position={[0, -2, -14]}
        args={[80, 80]}
        cellSize={0.7}
        cellThickness={0.6}
        cellColor={GRID_CELL}
        sectionSize={3.5}
        sectionThickness={1.1}
        sectionColor={ACCENT}
        fadeDistance={40}
        fadeStrength={2}
        infiniteGrid
      />

      <Sparkles
        count={quality === 'high' ? 200 : 60}
        scale={[24, 10, 40]}
        position={[0, 1, -14]}
        size={2}
        speed={0.25}
        opacity={0.5}
        color={ACCENT}
      />
    </>
  )
}
