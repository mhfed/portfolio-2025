'use client'

import { useSyncExternalStore } from 'react'

export type SceneStation = 'hero' | 'work' | 'about' | 'experience' | 'contact'

export interface SceneState {
  activeStation: SceneStation
  experienceIndex: number
  ready: boolean
  workIndex: number
}

const INITIAL_STATE: SceneState = {
  activeStation: 'hero',
  experienceIndex: 0,
  ready: false,
  workIndex: 0,
}

let state: SceneState = INITIAL_STATE
const listeners = new Set<() => void>()

export function getSceneState(): SceneState {
  return state
}

export function setSceneState(patch: Partial<SceneState>): void {
  const next = { ...state, ...patch }
  const unchanged = (Object.keys(patch) as Array<keyof SceneState>).every(
    (key) => Object.is(state[key], next[key])
  )
  if (unchanged) return

  state = next
  listeners.forEach((listener) => listener())
}

export function subscribeToScene(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/**
 * Subscribe to one primitive scene value instead of the complete store. This
 * keeps hover and scroll updates from rerendering every semantic section.
 */
export function useSceneValue<Key extends keyof SceneState>(
  key: Key
): SceneState[Key] {
  return useSyncExternalStore(
    subscribeToScene,
    () => state[key],
    () => INITIAL_STATE[key]
  )
}

export function scrollToSceneRecord(
  station: 'work' | 'experience',
  index: number
): void {
  const target = document.querySelector(
    `[data-scene-record="${station}"][data-index="${index}"]`
  )
  if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
