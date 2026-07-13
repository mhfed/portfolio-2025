'use client'

/**
 * Signature hero centerpiece for the Financial HUD world: a living particle
 * core whose points are the skill graph, clustered by domain. A fresnel-lit
 * glass shell sits inside, and the whole field reacts to the cursor — points
 * within reach are pushed outward, so moving the mouse "parts" the data cloud.
 *
 * The points use a custom additive ShaderMaterial so their emissive cores feed
 * the bloom pass, and the repulsion runs entirely on the GPU (vertex shader) so
 * thousands of points stay cheap. Deterministic layout (no RNG) keeps SSR/CSR
 * stable and the hero recognisable between reloads.
 */

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  AdditiveBlending,
  BackSide,
  Color,
  Plane,
  Raycaster,
  Vector2,
  Vector3,
} from 'three'
import type { ShaderMaterial, Points } from 'three'
import { skillGroups } from '@/data/skills'
import type { WorldQuality } from './hud-stations'

const GREEN = '#73ff87'
const AMBER = '#ff8a3d'

/* ── deterministic skill-cluster field with per-point colour + jitter ── */
function buildField(radius: number, quality: WorldQuality) {
  const base = quality === 'high' ? 36 : 16
  const per = quality === 'high' ? 30 : 14
  const spread = 0.52
  const golden = Math.PI * (3 - Math.sqrt(5))

  // cluster centres spread evenly over the sphere (Fibonacci lattice)
  const n = skillGroups.length
  const centers: Vector3[] = []
  for (let i = 0; i < n; i++) {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    centers.push(
      new Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(
        radius
      )
    )
  }

  const green = new Color(GREEN)
  const amber = new Color(AMBER)
  const positions: number[] = []
  const colors: number[] = []
  const scales: number[] = []
  const seeds: number[] = []

  skillGroups.forEach((group, gi) => {
    const center = centers[gi]
    const dir = center.clone().normalize()
    const up = Math.abs(dir.y) < 0.99 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0)
    const u = new Vector3().crossVectors(dir, up).normalize()
    const v = new Vector3().crossVectors(dir, u).normalize()
    const count = base + group.skills.length * per
    const tint = gi % 3 === 0 ? amber : green

    for (let j = 0; j < count; j++) {
      const rr = spread * Math.sqrt((j + 0.5) / count)
      const th = golden * j
      const p = dir
        .clone()
        .addScaledVector(u, Math.cos(th) * rr)
        .addScaledVector(v, Math.sin(th) * rr)
        .normalize()
        .multiplyScalar(radius)
      positions.push(p.x, p.y, p.z)
      // core of each cluster brighter/greener, rim dimmer
      const edge = rr / spread
      colors.push(tint.r, tint.g, tint.b)
      scales.push(1.5 - edge * 0.9)
      // deterministic seed for twinkle phase
      seeds.push(((j * 97 + gi * 131) % 100) / 100)
    }
  })

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    scales: new Float32Array(scales),
    seeds: new Float32Array(seeds),
    count: scales.length,
  }
}

const POINT_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uMouse;      // in local space
  uniform float uRepel;

  attribute vec3 aColor;
  attribute float aScale;
  attribute float aSeed;

  varying vec3 vColor;
  varying float vGlow;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // gentle breathing along the radial direction
    float breathe = sin(uTime * 0.6 + aSeed * 6.2831) * 0.03;
    pos += normalize(pos) * breathe;

    // cursor repulsion: push points near the mouse outward along (pos - mouse)
    vec3 away = pos - uMouse;
    float d = length(away);
    float force = uRepel * smoothstep(0.9, 0.0, d);
    pos += normalize(away + 1e-4) * force;

    vGlow = 0.5 + 0.5 * sin(uTime * 1.4 + aSeed * 12.566) + force * 2.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  }
`

const POINT_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vGlow;

  void main() {
    // soft round sprite with a hot core
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float core = smoothstep(0.5, 0.0, dist);
    float alpha = pow(core, 1.6);
    vec3 col = vColor * (0.6 + vGlow * 0.9);
    gl_FragColor = vec4(col, alpha);
  }
`

const FRESNEL_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const FRESNEL_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - abs(dot(vNormal, vView)), uPower);
    gl_FragColor = vec4(uColor * f * uIntensity, f);
  }
`

export function ParticleCore({
  position,
  quality,
}: {
  position: [number, number, number]
  quality: WorldQuality
}) {
  const groupRotation = useRef<Points>(null)
  const pointsMat = useRef<ShaderMaterial>(null)
  const fresnelMat = useRef<ShaderMaterial>(null)

  const field = useMemo(() => buildField(1.55, quality), [quality])

  // The WebGL canvas sits under a pointer-events:none layer, so fiber's
  // state.pointer never updates. Read the cursor from a window listener instead.
  const ndc = useRef(new Vector2(0, 0))
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ndc.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: quality === 'high' ? 26 : 20 },
      uPixelRatio: { value: 1 },
      uMouse: { value: new Vector3(999, 999, 999) },
      uRepel: { value: 0 },
    }),
    [quality]
  )

  const fresnelUniforms = useMemo(
    () => ({
      uColor: { value: new Color(GREEN) },
      uPower: { value: 2.6 },
      uIntensity: { value: 1.4 },
    }),
    []
  )

  // reusable scratch objects for cursor → local-space projection
  const scratch = useMemo(
    () => ({
      ray: new Raycaster(),
      plane: new Plane(new Vector3(0, 0, 1), -position[2]),
      hit: new Vector3(),
      origin: new Vector3(...position),
      targetMouse: new Vector3(999, 999, 999),
    }),
    [position]
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (pointsMat.current) {
      pointsMat.current.uniforms.uTime.value = t
      pointsMat.current.uniforms.uPixelRatio.value = Math.min(
        state.gl.getPixelRatio(),
        2
      )
    }
    if (groupRotation.current) groupRotation.current.rotation.y += delta * 0.05

    // project the cursor onto the core's plane, convert to local space
    scratch.ray.setFromCamera(ndc.current, state.camera)
    const hit = scratch.ray.ray.intersectPlane(scratch.plane, scratch.hit)
    if (hit) {
      scratch.targetMouse.copy(hit).sub(scratch.origin)
    } else {
      scratch.targetMouse.set(999, 999, 999)
    }

    if (pointsMat.current) {
      const m = pointsMat.current.uniforms.uMouse.value as Vector3
      m.lerp(scratch.targetMouse, Math.min(1, delta * 8))
      // ramp repulsion strength while the cursor is actually near the core
      const near = m.length() < 2.2 ? 0.22 : 0
      const u = pointsMat.current.uniforms.uRepel
      u.value += (near - u.value) * Math.min(1, delta * 6)
    }
  })

  return (
    <group position={position}>
      {/* fresnel glass shell */}
      <mesh>
        <icosahedronGeometry args={[1.5, 4]} />
        <shaderMaterial
          ref={fresnelMat}
          vertexShader={FRESNEL_VERT}
          fragmentShader={FRESNEL_FRAG}
          uniforms={fresnelUniforms}
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
          side={BackSide}
        />
      </mesh>

      {/* skill particle field */}
      <points ref={groupRotation}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[field.positions, 3]}
          />
          <bufferAttribute attach='attributes-aColor' args={[field.colors, 3]} />
          <bufferAttribute attach='attributes-aScale' args={[field.scales, 1]} />
          <bufferAttribute attach='attributes-aSeed' args={[field.seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pointsMat}
          vertexShader={POINT_VERT}
          fragmentShader={POINT_FRAG}
          uniforms={uniforms}
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
