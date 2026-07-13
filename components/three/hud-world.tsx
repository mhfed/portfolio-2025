'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Grid, Line, Sparkles, Environment, Lightformer } from '@react-three/drei'
import { QuadraticBezierCurve3, Color, Vector3 } from 'three'
import type { Mesh } from 'three'
import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'
import { station, type WorldQuality } from './hud-stations'
import { ParticleCore } from './particle-core'
import {
  Beacon,
  ExperienceSpine,
  LandmarkShell,
  ProjectPanels,
  RolesRing,
} from './hud-landmarks'

export type { WorldQuality }

const ACCENT = '#73ff87'
const AMBER = '#ff8a3d'
const GRID_CELL = '#163020'
const FOG = '#04070a'

function randomSpherePoint(radius: number): Vector3 {
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

/** Gradient vertex colours: bright at the crown of the arc, dark at the ends so
 * the lines read as glowing signal traces that fade into the void. */
function arcColors(count: number, hot: Color): Color[] {
  const cold = new Color('#04120b')
  const out: Color[] = []
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const k = Math.sin(t * Math.PI) // 0 at ends, 1 at crown
    out.push(cold.clone().lerp(hot, k))
  }
  return out
}

/* ── orbiting great-circle arcs with a traveling signal dot ── */
function Arcs({ radius, count }: { radius: number; count: number }) {
  const dots = useRef<(Mesh | null)[]>([])
  const arcs = useMemo(() => {
    const green = new Color(ACCENT)
    const amber = new Color(AMBER)
    const list: {
      points: Vector3[]
      colors: Color[]
      curve: QuadraticBezierCurve3
      amber: boolean
    }[] = []
    for (let i = 0; i < count; i++) {
      const a = randomSpherePoint(radius)
      const b = randomSpherePoint(radius)
      const mid = a.clone().add(b).multiplyScalar(0.5)
      const lift = 1 + 0.35 + Math.random() * 0.4
      mid.setLength(radius * lift)
      const curve = new QuadraticBezierCurve3(a, mid, b)
      const pts = curve.getPoints(48)
      const isAmber = i % 3 === 0
      list.push({
        points: pts,
        colors: arcColors(pts.length, isAmber ? amber : green),
        curve,
        amber: isAmber,
      })
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
            vertexColors={arc.colors}
            lineWidth={1.8}
            transparent
            opacity={0.7}
          />
          <mesh ref={(el) => (dots.current[i] = el)}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color={arc.amber ? AMBER : ACCENT} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function HudWorld({
  quality,
  projects,
  experiences,
}: {
  quality: WorldQuality
  projects: ProjectCaseStudy[]
  experiences: ExperienceRecord[]
}) {
  const hero = station('hero')
  const about = station('about')
  const experience = station('experience')
  const work = station('work')
  const contact = station('contact')

  return (
    <>
      <fog attach='fog' args={[FOG, 8, 36]} />

      {/* ── lighting rig: soft ambient + green key + amber rim ── */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 7, 5]} intensity={1.3} color='#d8fff0' />
      <pointLight position={[-7, 2, -12]} intensity={55} color={AMBER} />
      <pointLight position={[5, -3, -26]} intensity={40} color={'#ff5ebc'} />

      {/* Built-in HDRI from lightformers — no network fetch, gives physical
          materials something to reflect. */}
      <Environment resolution={quality === 'high' ? 256 : 128}>
        <Lightformer
          form='rect'
          intensity={2.2}
          color={ACCENT}
          position={[0, 4, -6]}
          scale={[8, 6, 1]}
        />
        <Lightformer
          form='circle'
          intensity={1.6}
          color={AMBER}
          position={[-6, -2, -3]}
          scale={5}
        />
        <Lightformer
          form='ring'
          intensity={1.2}
          color='#ffffff'
          position={[6, 3, -8]}
          scale={4}
        />
      </Environment>

      <ParticleCore position={hero.landmark} quality={quality} />
      {quality === 'high' && (
        <group position={hero.landmark}>
          <Arcs radius={1.85} count={9} />
        </group>
      )}

      <LandmarkShell station={about} spin={0.1}>
        <RolesRing count={experiences.length} accent={about.accent} />
      </LandmarkShell>

      {/* No spin: the spine carries pinned DOM labels that must not orbit. */}
      <LandmarkShell station={experience} spin={0}>
        <ExperienceSpine
          experiences={experiences}
          accent={experience.accent}
          quality={quality}
          landmark={experience.landmark}
        />
      </LandmarkShell>

      {/* Panels stay put (no spin) so they keep facing the incoming camera. */}
      <LandmarkShell station={work} spin={0}>
        <ProjectPanels
          projects={projects}
          accent={work.accent}
          landmark={work.landmark}
        />
      </LandmarkShell>

      <LandmarkShell station={contact} spin={0.16}>
        <Beacon accent={contact.accent} />
      </LandmarkShell>

      <Grid
        position={[0, -2, -14]}
        args={[80, 80]}
        cellSize={0.7}
        cellThickness={0.6}
        cellColor={GRID_CELL}
        sectionSize={3.5}
        sectionThickness={1.1}
        sectionColor={ACCENT}
        fadeDistance={38}
        fadeStrength={2.4}
        infiniteGrid
      />

      <Sparkles
        count={quality === 'high' ? 160 : 50}
        scale={[24, 10, 40]}
        position={[0, 1, -14]}
        size={1.6}
        speed={0.2}
        opacity={0.4}
        color={ACCENT}
      />
    </>
  )
}
