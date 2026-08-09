export const STORY_BEAT_IDS = [
  'top',
  'about',
  'work',
  'experience',
  'skills',
  'contact',
] as const

export type StoryBeatId = (typeof STORY_BEAT_IDS)[number]
export type NavigableStoryBeatId = Exclude<StoryBeatId, 'top'>
export type StoryTone = 'cream' | 'leaf' | 'sun' | 'coral'

export interface StoryBeatContent {
  bridge: string
  dialogue: string
  id: StoryBeatId
  label: string
}

export interface PortfolioStoryContent {
  ariaLabel: string
  beats: StoryBeatContent[]
  progressLabel: string
}

export interface StoryWaypoint {
  rotation: number
  scale: number
  xVw: number
  yVh: number
}

export interface StoryBeatPresentation {
  imageSrc: string
  prop: string
  tone: StoryTone
  waypoint: StoryWaypoint
}

export interface StoryTransitionState {
  poseBlend: number
  travelProgress: number
}
