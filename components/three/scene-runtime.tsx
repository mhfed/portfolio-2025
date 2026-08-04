'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { ScenePerformanceTier } from '@/hooks/use-client-capabilities'

const ScenePerformanceContext = createContext<ScenePerformanceTier>('low')

export function ScenePerformanceProvider({
  children,
  tier,
}: {
  children: ReactNode
  tier: ScenePerformanceTier
}) {
  return (
    <ScenePerformanceContext value={tier}>{children}</ScenePerformanceContext>
  )
}

export function useScenePerformanceTier(): ScenePerformanceTier {
  return useContext(ScenePerformanceContext)
}
