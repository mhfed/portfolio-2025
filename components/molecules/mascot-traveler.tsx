'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getStoryBeatPresentation } from '@/lib/storytelling'
import type {
  PortfolioStoryContent,
  StoryBeatId,
} from '@/types/storytelling'

export interface MascotTravelerProps {
  activeBeatId: StoryBeatId
  story: PortfolioStoryContent
}

export function MascotTraveler({
  activeBeatId,
  story,
}: MascotTravelerProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true)
  const activeBeat =
    story.beats.find((beat) => beat.id === activeBeatId) ?? story.beats[0]
  const activeIndex = story.beats.findIndex((beat) => beat.id === activeBeatId)

  return (
    <aside
      className='story-traveler'
      data-active-beat={activeBeatId}
      data-story-guide
      data-story-traveler
      data-tooltip-open={isTooltipOpen}
      aria-label={story.ariaLabel}
    >
      <svg
        className='story-traveler__trail'
        viewBox='0 0 240 520'
        preserveAspectRatio='none'
        aria-hidden='true'
        data-story-trail
      >
        <path
          className='story-traveler__trail-base'
          d='M182 12 C54 84 218 164 92 238 C8 288 188 350 46 508'
          pathLength='1'
        />
        <path
          className='story-traveler__trail-progress'
          d='M182 12 C54 84 218 164 92 238 C8 288 188 350 46 508'
          pathLength='1'
          data-story-trail-progress
        />
      </svg>

      <div
        id='story-traveler-dialogue'
        className='story-traveler__bubble'
        data-story-bubble
        aria-hidden={!isTooltipOpen}
      >
        <div className='story-traveler__bubble-meta'>
          <span>{activeBeat.label}</span>
          <span>
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(story.beats.length).padStart(2, '0')}
          </span>
        </div>
        <p data-story-dialogue>{activeBeat.dialogue}</p>
        <strong data-story-bridge>{activeBeat.bridge}</strong>
      </div>

      <button
        type='button'
        className='story-traveler__stage story-traveler__toggle'
        aria-controls='story-traveler-dialogue'
        aria-expanded={isTooltipOpen}
        aria-label={
          isTooltipOpen ? story.hideTooltipLabel : story.showTooltipLabel
        }
        onClick={() => setIsTooltipOpen((isOpen) => !isOpen)}
      >
        {story.beats.map((beat) => {
          const presentation = getStoryBeatPresentation(beat.id)

          return (
            <div
              className={cn(
                'story-traveler__pose',
                beat.id === activeBeatId && 'is-active'
              )}
              data-story-pose={beat.id}
              key={beat.id}
            >
              <Image
                src={presentation.imageSrc}
                alt=''
                width={1254}
                height={1254}
                sizes='(max-width: 1180px) 7rem, (min-width: 1181px) 19rem, 1px'
                className='story-traveler__image'
              />
            </div>
          )
        })}
      </button>
    </aside>
  )
}
