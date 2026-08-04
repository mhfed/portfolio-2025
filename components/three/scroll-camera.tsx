'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { setSceneState } from '@/lib/sceneStore'
import type { SceneQuality, SceneWaypoint } from './scene-waypoints'

/**
 * Holds the camera on each information station, then blends across section
 * boundaries. Long project and experience rails therefore update their active
 * record without making the camera drift away from the station.
 */
export interface ScrollCameraProps {
  waypoints: SceneWaypoint[]
  quality: SceneQuality
}

export function ScrollCamera({ waypoints, quality }: ScrollCameraProps) {
  const invalidate = useThree((state) => state.invalidate)
  const target = useRef(0)
  const current = useRef(0)
  const sectionTops = useRef<number[]>([])
  const viewportHeight = useRef(0)

  const cameraPoints = useMemo(
    () => waypoints.map((item) => new Vector3(...item.camera)),
    [waypoints]
  )
  const lookPoints = useMemo(
    () => waypoints.map((item) => new Vector3(...item.look)),
    [waypoints]
  )
  const tmpPos = useMemo(() => new Vector3(), [])
  const tmpLook = useMemo(() => new Vector3(), [])

  useEffect(() => {
    const root = document.querySelector('[data-creative-root]')
    if (!(root instanceof HTMLElement)) return
    let frameId = 0

    const progressForScroll = (scroll: number) => {
      const measured = sectionTops.current
      const segments = measured.length - 1
      if (segments < 1 || scroll <= measured[0]) return 0

      for (let index = 0; index < segments; index++) {
        const boundary = measured[index + 1]
        const transitionStart = boundary - viewportHeight.current * 0.7
        const transitionEnd = boundary + viewportHeight.current * 0.18

        if (scroll < transitionStart) return index / segments
        if (scroll <= transitionEnd) {
          const local = Math.min(
            1,
            Math.max(
              0,
              (scroll - transitionStart) / (transitionEnd - transitionStart)
            )
          )
          const eased = local * local * (3 - 2 * local)
          return (index + eased) / segments
        }
      }
      return 1
    }

    const updateProgress = () => {
      frameId = 0
      const progress = progressForScroll(window.scrollY)
      target.current = progress
      invalidate()
      const stationIndex = Math.min(
        waypoints.length - 1,
        Math.max(0, Math.round(progress * (waypoints.length - 1)))
      )
      setSceneState({ activeStation: waypoints[stationIndex].key })
    }

    const scheduleProgressUpdate = () => {
      if (frameId !== 0) return
      frameId = window.requestAnimationFrame(updateProgress)
    }

    const measureStops = () => {
      const pageScroll = window.scrollY
      viewportHeight.current =
        window.visualViewport?.height ?? window.innerHeight
      sectionTops.current = waypoints.map((waypoint) => {
        const section = document.querySelector(
          `[data-waypoint="${waypoint.key}"]`
        )
        if (!(section instanceof HTMLElement)) return 0
        const rect = section.getBoundingClientRect()
        return Math.max(0, rect.top + pageScroll)
      })
      scheduleProgressUpdate()
    }

    const resizeObserver = new ResizeObserver(measureStops)
    resizeObserver.observe(root)
    measureStops()
    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true })
    window.addEventListener('resize', measureStops, { passive: true })
    window.visualViewport?.addEventListener('resize', measureStops, {
      passive: true,
    })
    void document.fonts.ready.then(measureStops)

    return () => {
      if (frameId !== 0) window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleProgressUpdate)
      window.removeEventListener('resize', measureStops)
      window.visualViewport?.removeEventListener('resize', measureStops)
    }
  }, [invalidate, waypoints])

  useFrame((state, delta) => {
    const difference = target.current - current.current
    if (Math.abs(difference) > 0.0005) {
      const lerp = Math.min(1, delta * 7.5)
      current.current += difference * lerp
      state.invalidate()
    } else {
      current.current = target.current
    }
    const p = Math.min(1, Math.max(0, current.current))

    const scaled = p * (waypoints.length - 1)
    const index = Math.min(waypoints.length - 2, Math.floor(scaled))
    const local = p >= 1 ? 1 : scaled - index
    const eased = local * local * (3 - 2 * local)

    tmpPos.lerpVectors(cameraPoints[index], cameraPoints[index + 1], eased)
    tmpLook.lerpVectors(lookPoints[index], lookPoints[index + 1], eased)
    tmpPos.y += Math.sin(eased * Math.PI) * 0.24

    tmpPos.x += state.pointer.x * (quality === 'high' ? 0.34 : 0)
    tmpPos.y += state.pointer.y * (quality === 'high' ? 0.22 : 0)

    state.camera.position.copy(tmpPos)
    state.camera.lookAt(tmpLook)
  })

  return null
}
