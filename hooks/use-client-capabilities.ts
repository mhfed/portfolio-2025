'use client'

import { useEffect, useState } from 'react'

export type ScenePerformanceTier = 'high' | 'balanced' | 'low'

export interface SceneDeviceProfile {
  isMobile: boolean
  ready: boolean
  shouldRender3D: boolean
  tier: ScenePerformanceTier
}

interface NavigatorConnection {
  effectiveType?: string
  saveData?: boolean
}

interface PerformanceNavigator extends Navigator {
  connection?: NavigatorConnection
  deviceMemory?: number
}

const INITIAL_DEVICE_PROFILE: SceneDeviceProfile = {
  isMobile: false,
  ready: false,
  shouldRender3D: true,
  tier: 'balanced',
}

/**
 * Tracks the user's reduced-motion preference. Returns `false` during SSR and
 * the first client render, then syncs on mount so heavy 3D can be skipped.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Resolves a conservative WebGL budget from stable browser signals. Runtime
 * FPS monitoring can still lower this initial tier after the scene starts.
 */
export function useSceneDeviceProfile(maxWidth = 768): SceneDeviceProfile {
  const [profile, setProfile] = useState<SceneDeviceProfile>(
    INITIAL_DEVICE_PROFILE
  )

  useEffect(() => {
    const viewport = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const coarsePointer = window.matchMedia('(pointer: coarse)')

    const resolveProfile = () => {
      const navigatorWithPerformance = navigator as PerformanceNavigator
      const memory = navigatorWithPerformance.deviceMemory
      const cores = navigator.hardwareConcurrency || 4
      const connection = navigatorWithPerformance.connection
      const isMobile = viewport.matches || coarsePointer.matches
      const slowNetwork =
        connection?.effectiveType === 'slow-2g' ||
        connection?.effectiveType === '2g'
      const criticallyConstrained =
        connection?.saveData === true ||
        (typeof memory === 'number' && memory <= 2) ||
        cores <= 2

      let tier: ScenePerformanceTier = 'high'
      if (
        criticallyConstrained ||
        slowNetwork ||
        cores <= 4 ||
        (typeof memory === 'number' && memory <= 4)
      ) {
        tier = 'low'
      } else if (
        isMobile ||
        cores <= 8 ||
        (typeof memory === 'number' && memory <= 8)
      ) {
        tier = 'balanced'
      }

      setProfile({
        isMobile,
        ready: true,
        shouldRender3D: !criticallyConstrained,
        tier,
      })
    }

    resolveProfile()
    viewport.addEventListener('change', resolveProfile)
    coarsePointer.addEventListener('change', resolveProfile)
    return () => {
      viewport.removeEventListener('change', resolveProfile)
      coarsePointer.removeEventListener('change', resolveProfile)
    }
  }, [maxWidth])

  return profile
}
