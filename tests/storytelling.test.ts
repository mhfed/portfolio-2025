import { describe, expect, it } from 'vitest'
import {
  NAVIGABLE_STORY_BEAT_IDS,
  STORY_BEAT_IDS,
  getStoryBeatPresentation,
  getStoryTransitionState,
  interpolateStoryWaypoint,
  isStoryBeatId,
} from '@/lib/storytelling'

describe('storytelling journey', () => {
  it('defines one ordered six-beat journey', () => {
    expect(STORY_BEAT_IDS).toEqual([
      'top',
      'about',
      'work',
      'experience',
      'skills',
      'contact',
    ])
    expect(NAVIGABLE_STORY_BEAT_IDS).toEqual([
      'about',
      'work',
      'experience',
      'skills',
      'contact',
    ])
  })

  it('maps every beat to the normalized mascot family', () => {
    for (const id of STORY_BEAT_IDS) {
      const presentation = getStoryBeatPresentation(id)
      expect(presentation.imageSrc).toBe(`/images/story/mascot-${id}.png`)
      expect(presentation.waypoint.xVw).toBeGreaterThanOrEqual(0)
      expect(presentation.waypoint.xVw).toBeLessThanOrEqual(100)
      expect(presentation.waypoint.scale).toBeGreaterThan(0)
    }
  })

  it('interpolates the same path in either scroll direction', () => {
    const from = { xVw: 10, yVh: 20, scale: 1, rotation: -2 }
    const to = { xVw: 30, yVh: 40, scale: 0.8, rotation: 2 }

    expect(interpolateStoryWaypoint(from, to, 0)).toEqual(from)
    expect(interpolateStoryWaypoint(from, to, 1)).toEqual(to)
    expect(interpolateStoryWaypoint(from, to, 0.5)).toEqual({
      xVw: 20,
      yVh: 30,
      scale: 0.9,
      rotation: 0,
    })
    expect(interpolateStoryWaypoint(from, to, -1)).toEqual(from)
    expect(interpolateStoryWaypoint(from, to, 2)).toEqual(to)
  })

  it('holds, travels, and blends in deterministic windows', () => {
    expect(getStoryTransitionState(0.5)).toEqual({
      travelProgress: 0,
      poseBlend: 0,
    })
    expect(getStoryTransitionState(0.92)).toEqual({
      travelProgress: 1,
      poseBlend: 1,
    })
  })

  it('narrows unknown values to story IDs', () => {
    expect(isStoryBeatId('work')).toBe(true)
    expect(isStoryBeatId('unknown')).toBe(false)
    expect(isStoryBeatId(null)).toBe(false)
  })
})
