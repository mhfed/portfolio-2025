'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CatmullRomCurve3, Vector2, Vector3 } from 'three'
import { loadGSAP } from '@/lib/gsap-utils'
import type { StationDef } from './hud-stations'

/**
 * Drives the default camera along a Catmull-Rom curve through the station
 * points, using overall document scroll progress (via GSAP ScrollTrigger) as
 * the parameter. Progress is damped for a cinematic glide, and pointer motion
 * adds a subtle parallax offset.
 */
export function ScrollCamera({ stations }: { stations: StationDef[] }) {
  const target = useRef(0)
  const current = useRef(0)
  const pointer = useRef(new Vector2(0, 0))

  const camPath = useMemo(
    () =>
      new CatmullRomCurve3(stations.map((s) => new Vector3(...s.camera))),
    [stations]
  )
  const lookPath = useMemo(
    () => new CatmullRomCurve3(stations.map((s) => new Vector3(...s.look))),
    [stations]
  )
  const tmpPos = useMemo(() => new Vector3(), [])
  const tmpLook = useMemo(() => new Vector3(), [])

  useEffect(() => {
    let active = true
    let trigger: { kill: () => void } | undefined

    const onPointer = (e: PointerEvent) => {
      pointer.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      )
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    loadGSAP().then(({ ScrollTrigger }) => {
      if (!active) return
      const root = document.querySelector('[data-creative-root]')
      if (!root) return
      trigger = ScrollTrigger.create({
        trigger: root as Element,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self: { progress: number }) => {
          target.current = self.progress
        },
      })
    })

    return () => {
      active = false
      window.removeEventListener('pointermove', onPointer)
      trigger?.kill()
    }
  }, [])

  useFrame((state, delta) => {
    const lerp = Math.min(1, delta * 2.6)
    current.current += (target.current - current.current) * lerp
    const p = Math.min(1, Math.max(0, current.current))

    camPath.getPointAt(p, tmpPos)
    lookPath.getPointAt(p, tmpLook)

    tmpPos.x += pointer.current.x * 0.5
    tmpPos.y += pointer.current.y * 0.3

    state.camera.position.copy(tmpPos)
    state.camera.lookAt(tmpLook)
  })

  return null
}
