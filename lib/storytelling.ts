import {
  STORY_BEAT_IDS,
  type NavigableStoryBeatId,
  type StoryBeatId,
  type StoryBeatPresentation,
  type StoryTransitionState,
  type StoryWaypoint,
} from '@/types/storytelling'

export { STORY_BEAT_IDS }

export const NAVIGABLE_STORY_BEAT_IDS = STORY_BEAT_IDS.filter(
  (id): id is NavigableStoryBeatId => id !== 'top'
)

const STORY_PRESENTATIONS = {
  top: {
    imageSrc: '/images/story/mascot-top.png',
    prop: 'laptop',
    tone: 'cream',
    waypoint: { xVw: 84, yVh: 62, scale: 1, rotation: -1 },
  },
  about: {
    imageSrc: '/images/story/mascot-about.png',
    prop: 'design board',
    tone: 'leaf',
    waypoint: { xVw: 87, yVh: 59, scale: 0.92, rotation: 1.5 },
  },
  work: {
    imageSrc: '/images/story/mascot-work.png',
    prop: 'roadmap',
    tone: 'sun',
    waypoint: { xVw: 89, yVh: 66, scale: 0.9, rotation: -1.5 },
  },
  experience: {
    imageSrc: '/images/story/mascot-experience.png',
    prop: 'steps',
    tone: 'leaf',
    waypoint: { xVw: 86, yVh: 55, scale: 0.94, rotation: 1 },
  },
  skills: {
    imageSrc: '/images/story/mascot-skills.png',
    prop: 'code board',
    tone: 'cream',
    waypoint: { xVw: 89, yVh: 61, scale: 0.9, rotation: -1 },
  },
  contact: {
    imageSrc: '/images/story/mascot-contact.png',
    prop: 'wave',
    tone: 'coral',
    waypoint: { xVw: 84, yVh: 65, scale: 0.96, rotation: 1.5 },
  },
} satisfies Record<StoryBeatId, StoryBeatPresentation>

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)

const rangeProgress = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start))

export function isStoryBeatId(value: unknown): value is StoryBeatId {
  return (
    typeof value === 'string' &&
    (STORY_BEAT_IDS as readonly string[]).includes(value)
  )
}

export function getStoryBeatIndex(id: StoryBeatId): number {
  return STORY_BEAT_IDS.indexOf(id)
}

export function getStoryBeatPresentation(
  id: StoryBeatId
): StoryBeatPresentation {
  return STORY_PRESENTATIONS[id]
}

export function interpolateStoryWaypoint(
  from: StoryWaypoint,
  to: StoryWaypoint,
  progress: number
): StoryWaypoint {
  const amount = clamp01(progress)
  const interpolate = (start: number, end: number) =>
    start + (end - start) * amount

  return {
    rotation: interpolate(from.rotation, to.rotation),
    scale: interpolate(from.scale, to.scale),
    xVw: interpolate(from.xVw, to.xVw),
    yVh: interpolate(from.yVh, to.yVh),
  }
}

export function getStoryTransitionState(
  localProgress: number
): StoryTransitionState {
  return {
    travelProgress: rangeProgress(localProgress, 0.62, 0.92),
    poseBlend: rangeProgress(localProgress, 0.72, 0.86),
  }
}
