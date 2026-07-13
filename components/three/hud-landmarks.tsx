'use client'

/**
 * Data-driven landmarks for the Financial HUD world. Each landmark's geometry
 * is *generated from real portfolio data* — the number of experience nodes,
 * project panels, and skill-cluster density all read off the actual records —
 * so flying the camera past a station reads like inspecting the CV in space
 * rather than passing anonymous wireframes.
 *
 * Materials are physically-lit (metalness/roughness + emissive) so they catch
 * the scene's light rig + Environment and feed the bloom pass. LandmarkShell
 * drives a scroll-based "focus glow": the closer the camera flies to a station,
 * the brighter that station's emissive burns.
 */

import { useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import { Color, Vector3 } from 'three'
import type { Group, Material } from 'three'
import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'
import { hudFocus } from '@/lib/hud-focus'
import type { StationDef, WorldQuality } from './hud-stations'

const NEAR = 6 // fully visible when the camera is this close (world units)
const FAR = 11 // fully faded beyond this

interface MaterialLike {
  material?: Material | Material[]
}

interface EmissiveMaterial extends Material {
  emissiveIntensity?: number
}

/** Same reveal curve LandmarkShell uses, exposed so DOM labels fade in sync. */
function stationFade(cam: Vector3, landmark: Vector3): number {
  const d = cam.distanceTo(landmark)
  return Math.max(0, Math.min(1, (FAR - d) / (FAR - NEAR)))
}

interface HudLabelItem {
  key: string | number
  position: [number, number, number]
  title: string
  meta: string
  tags: string[]
}

/**
 * Condensed HUD labels (title · meta · top tags) pinned in 3D as real DOM via
 * drei <Html>. Only the label whose index matches the shared `hudFocus[section]`
 * — i.e. the item the reader has centered in the 2D column — lights up; the rest
 * dim and shrink. The whole set fades with the camera's approach to the station.
 */
function HudLabels({
  items,
  section,
  accent,
  landmarkVec,
}: {
  items: HudLabelItem[]
  section: string
  accent: string
  landmarkVec: Vector3
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const lastKey = useRef('')

  useFrame((state) => {
    const fade = stationFade(state.camera.position, landmarkVec)
    // Fully faded and already off: nothing to write. Skip the DOM churn.
    if (fade <= 0.001) {
      if (lastKey.current !== 'off') {
        refs.current.forEach((el) => el && (el.style.opacity = '0'))
        lastKey.current = 'off'
      }
      return
    }
    const raw = hudFocus[section] ?? 0
    const active = Math.max(0, Math.min(items.length - 1, raw))
    // Parked at a station (fade + active steady): style is already correct.
    const key = `${fade.toFixed(3)}|${active}`
    if (key === lastKey.current) return
    lastKey.current = key
    refs.current.forEach((el, i) => {
      if (!el) return
      const on = i === active
      el.style.opacity = String(on ? fade : fade * 0.1)
      el.style.transform = on ? 'scale(1.14)' : 'scale(0.8)'
    })
  })

  return (
    <>
      {items.map((it, i) => (
        <Html
          key={it.key}
          position={it.position}
          center
          distanceFactor={6.5}
          zIndexRange={[30, 12]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            ref={(el) => {
              refs.current[i] = el
            }}
            style={{
              opacity: 0,
              borderColor: accent,
              color: accent,
              pointerEvents: 'none',
            }}
            className='w-[200px] select-none rounded-md border bg-black/65 px-3 py-2 text-center font-mono uppercase backdrop-blur-sm transition-[opacity,transform] duration-300 ease-out'
          >
            <div className='truncate text-[12px] font-bold tracking-wider'>
              {it.title || '—'}
            </div>
            <div className='mt-0.5 text-[9px] tracking-[0.18em] text-white/55'>
              {it.meta}
            </div>
            {it.tags.length > 0 && (
              <div className='mt-1 text-[8px] tracking-[0.12em] text-white/40'>
                {it.tags.join(' · ')}
              </div>
            )}
          </div>
        </Html>
      ))}
    </>
  )
}

/**
 * Wraps a landmark: gently spins it, fades the whole group in as the camera
 * flies near its station, and drives a focus glow — as `fade` rises toward 1
 * each material's emissive burns brighter (scaled from `userData.baseEmissive`)
 * and its opacity lifts from `userData.baseOpacity`. Per-child brightness is
 * preserved so a "most recent role" node can still read hotter than the rest.
 */
export function LandmarkShell({
  station,
  spin = 0.16,
  children,
}: {
  station: StationDef
  spin?: number
  children: ReactNode
}) {
  const group = useRef<Group>(null)
  const landmarkVec = useMemo(() => new Vector3(...station.landmark), [station])
  const lastFade = useRef(-1)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    const d = state.camera.position.distanceTo(landmarkVec)
    const fade = Math.max(0, Math.min(1, (FAR - d) / (FAR - NEAR)))

    // Far station: hide it and skip the per-frame material traversal entirely.
    // Only the station the camera is near ever pays the traversal cost.
    if (fade <= 0.001) {
      if (g.visible) g.visible = false
      lastFade.current = 0
      return
    }
    g.visible = true
    if (spin) g.rotation.y += delta * spin

    // Parked at the station (fade steady): materials are already set — skip.
    if (Math.abs(fade - lastFade.current) < 0.002) return
    lastFade.current = fade

    g.traverse((obj) => {
      const mat = (obj as unknown as MaterialLike).material
      if (!mat || Array.isArray(mat)) return
      const base = (mat.userData?.baseOpacity as number | undefined) ?? 0.44
      mat.transparent = true
      mat.opacity = base * fade
      const em = mat as EmissiveMaterial
      const baseEm = mat.userData?.baseEmissive as number | undefined
      if (baseEm !== undefined && 'emissiveIntensity' in em) {
        em.emissiveIntensity = baseEm * (0.35 + fade * 1.5)
      }
    })
  })

  return (
    <group ref={group} position={station.landmark}>
      {children}
    </group>
  )
}

/* ── Experience → vertical "signal spine": one node per role, tech branches ── */

type SpineItem = Pick<ExperienceRecord, 'id' | 'company' | 'period' | 'skills'>

export function ExperienceSpine({
  experiences,
  accent,
  quality,
  landmark,
}: {
  experiences: ExperienceRecord[]
  accent: string
  quality: WorldQuality
  landmark: [number, number, number]
}) {
  // Most-recent role on top, matching the reversed order of the 2D log — so the
  // shared active index lines up node-for-node with the card being read.
  const ordered: SpineItem[] = experiences.length
    ? [...experiences].reverse()
    : [{ id: -1, company: '', period: '', skills: [] }]
  const n = ordered.length
  const height = 3.4
  const top = height / 2
  const step = n > 1 ? height / (n - 1) : 0
  const maxBranch = quality === 'high' ? 5 : 3
  const landmarkVec = useMemo(() => new Vector3(...landmark), [landmark])

  const spineColors = useMemo(() => {
    const hot = new Color(accent)
    const cold = new Color('#04120b')
    return [hot.clone(), cold.clone()]
  }, [accent])

  const spinePts = useMemo(
    () => [new Vector3(0, top, 0), new Vector3(0, -top, 0)],
    [top]
  )

  const labels: HudLabelItem[] = ordered.map((exp, i) => ({
    key: exp.id ?? i,
    position: [1.05, top - i * step, 0],
    title: exp.company,
    meta: exp.period,
    tags: (exp.skills ?? []).slice(0, 3),
  }))

  return (
    <group>
      <Line
        points={spinePts}
        vertexColors={spineColors}
        lineWidth={2}
        transparent
        opacity={0.7}
      />
      {ordered.map((exp, i) => {
        const y = top - i * step
        const recent = i === 0
        const size = recent ? 0.19 : 0.11
        const branches = Math.min(maxBranch, exp.skills?.length ?? 0)
        return (
          <group key={exp.id ?? i} position={[0, y, 0]}>
            <mesh>
              <icosahedronGeometry args={[size, 0]} />
              <meshStandardMaterial
                color='#08140d'
                emissive={accent}
                emissiveIntensity={recent ? 1.6 : 0.8}
                metalness={0.6}
                roughness={0.28}
                transparent
                opacity={0.9}
                userData={{
                  baseOpacity: 0.95,
                  baseEmissive: recent ? 1.6 : 0.8,
                }}
              />
            </mesh>
            {Array.from({ length: branches }).map((_, b) => {
              const dir = b % 2 === 0 ? 1 : -1
              const len = 0.38 + b * 0.1
              const yb = (b - branches / 2) * 0.05
              return (
                <Line
                  key={b}
                  points={[new Vector3(0, 0, 0), new Vector3(dir * len, yb, 0)]}
                  color={accent}
                  lineWidth={1.4}
                  transparent
                  opacity={0.4}
                />
              )
            })}
          </group>
        )
      })}
      <HudLabels
        items={labels}
        section='experience'
        accent={accent}
        landmarkVec={landmarkVec}
      />
    </group>
  )
}

/* ── Work → shallow arc of panels: one per project, height ~ tech-stack size ──
 * Each panel carries a condensed HUD label (title · year · top tags) rendered
 * as real DOM via drei <Html>, pinned in 3D and faded in sync with the camera.
 * The full case-study copy still lives in the DOM work section, so this is a
 * visual layer only — accessibility and SEO are untouched. */

type PanelItem = Pick<ProjectCaseStudy, 'id' | 'title' | 'year' | 'techStack'>

export function ProjectPanels({
  projects,
  accent,
  landmark,
}: {
  projects: ProjectCaseStudy[]
  accent: string
  landmark: [number, number, number]
}) {
  const items: PanelItem[] = projects.length
    ? projects
    : [{ id: -1, title: '', year: '', techStack: [] }]
  const n = items.length
  const arc = 0.6 // total angular spread (radians)
  const landmarkVec = useMemo(() => new Vector3(...landmark), [landmark])

  const layout = useMemo(
    () =>
      items.map((item, i) => {
        const t = n > 1 ? i / (n - 1) - 0.5 : 0 // -0.5 .. 0.5
        const angle = t * arc
        const x = Math.sin(angle) * 2.3
        const z = (1 - Math.cos(angle)) * -1.2
        const h = 0.6 + Math.min(6, item.techStack?.length ?? 0) * 0.16
        return { angle, x, z, h }
      }),
    [items, n]
  )

  const labels: HudLabelItem[] = layout.map((l, i) => ({
    key: items[i].id ?? i,
    position: [l.x, l.h / 2 + 0.4, l.z],
    title: items[i].title,
    meta: items[i].year || 'LIVE',
    tags: (items[i].techStack ?? []).slice(0, 3),
  }))

  return (
    <group>
      {items.map((p, i) => {
        const { angle, x, z, h } = layout[i]
        return (
          <group key={p.id ?? i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            {/* reflective chrome panel */}
            <mesh>
              <boxGeometry args={[0.9, h, 0.05]} />
              <meshStandardMaterial
                color='#0b0910'
                emissive={accent}
                emissiveIntensity={0.35}
                metalness={0.92}
                roughness={0.18}
                transparent
                opacity={0.85}
                userData={{ baseOpacity: 0.9, baseEmissive: 0.35 }}
              />
            </mesh>
            {/* glowing top edge bar */}
            <mesh position={[0, h / 2 - 0.03, 0.03]}>
              <boxGeometry args={[0.9, 0.05, 0.02]} />
              <meshBasicMaterial color={accent} toneMapped={false} transparent />
            </mesh>
            {/* HUD wireframe overlay for the scanned-blueprint identity */}
            <mesh>
              <boxGeometry args={[0.92, h + 0.02, 0.06]} />
              <meshBasicMaterial
                color={accent}
                wireframe
                transparent
                opacity={0.25}
                userData={{ baseOpacity: 0.35 }}
              />
            </mesh>
          </group>
        )
      })}
      <HudLabels
        items={labels}
        section='work'
        accent={accent}
        landmarkVec={landmarkVec}
      />
    </group>
  )
}

/* ── About → ring with one tick per role held ── */

export function RolesRing({ count, accent }: { count: number; accent: string }) {
  const n = Math.max(1, count)
  const r = 0.95
  return (
    <group>
      <mesh>
        <torusGeometry args={[r, 0.045, 16, 64]} />
        <meshStandardMaterial
          color='#140d08'
          emissive={accent}
          emissiveIntensity={0.7}
          metalness={0.85}
          roughness={0.2}
          transparent
          opacity={0.9}
          userData={{ baseOpacity: 0.95, baseEmissive: 0.7 }}
        />
      </mesh>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]}>
            <boxGeometry args={[0.13, 0.13, 0.13]} />
            <meshStandardMaterial
              color='#140d08'
              emissive={accent}
              emissiveIntensity={1.3}
              metalness={0.7}
              roughness={0.25}
              transparent
              opacity={0.95}
              userData={{ baseOpacity: 0.98, baseEmissive: 1.3 }}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/* ── Contact → beacon: emissive core + wireframe halo ── */

export function Beacon({ accent }: { accent: string }) {
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color='#08140d'
          emissive={accent}
          emissiveIntensity={1.8}
          metalness={0.5}
          roughness={0.3}
          transparent
          opacity={0.95}
          userData={{ baseOpacity: 0.98, baseEmissive: 1.8 }}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.3}
          userData={{ baseOpacity: 0.4 }}
        />
      </mesh>
    </group>
  )
}
