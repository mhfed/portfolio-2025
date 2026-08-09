import Image from 'next/image'
import { getStoryBeatPresentation } from '@/lib/storytelling'
import type { StoryBeatContent } from '@/types/storytelling'

export interface StoryCheckpointProps {
  beat: StoryBeatContent
}

export function StoryCheckpoint({ beat }: StoryCheckpointProps) {
  const presentation = getStoryBeatPresentation(beat.id)

  return (
    <aside className='story-checkpoint' data-story-checkpoint={beat.id}>
      <div className='story-checkpoint__image' aria-hidden='true'>
        <Image
          src={presentation.imageSrc}
          alt=''
          fill
          sizes='(max-width: 1180px) 8rem, 1px'
        />
      </div>
      <div className='story-checkpoint__copy'>
        <span>{beat.label}</span>
        <p>{beat.dialogue}</p>
        <strong>{beat.bridge}</strong>
      </div>
    </aside>
  )
}
