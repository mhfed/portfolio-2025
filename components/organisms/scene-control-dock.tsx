'use client'

import { MathUtils } from 'three'
import { scrollToSceneRecord, useSceneValue } from '@/lib/sceneStore'
import type { PortfolioSceneContent } from '@/types/scene-content'

export interface SceneControlDockProps {
  content: PortfolioSceneContent
}

export function SceneControlDock({ content }: SceneControlDockProps) {
  const activeStation = useSceneValue('activeStation')
  const experienceIndex = useSceneValue('experienceIndex')
  const ready = useSceneValue('ready')
  const workIndex = useSceneValue('workIndex')

  if (!ready) {
    return null
  }

  if (activeStation === 'contact') {
    return (
      <div className='scene-control-dock' aria-label='Contact links'>
        <a href={`mailto:${content.email}`}>{content.contact.emailLabel}</a>
        {content.contact.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    )
  }

  if (activeStation !== 'work' && activeStation !== 'experience') return null

  const work = activeStation === 'work'
  const records = work ? content.projects : [...content.experiences].reverse()
  const currentIndex = MathUtils.clamp(
    work ? workIndex : experienceIndex,
    0,
    Math.max(0, records.length - 1)
  )
  const previous = Math.max(0, currentIndex - 1)
  const next = Math.min(records.length - 1, currentIndex + 1)
  const station = work ? 'work' : 'experience'
  const project = work ? content.projects[currentIndex] : undefined

  return (
    <div className='scene-control-dock' aria-label='3D scene controls'>
      <button
        type='button'
        onClick={() => scrollToSceneRecord(station, previous)}
        aria-label='Previous record'
        disabled={currentIndex === 0}
      >
        ←
      </button>
      <button
        type='button'
        onClick={() => scrollToSceneRecord(station, next)}
        aria-label='Next record'
        disabled={currentIndex === records.length - 1}
      >
        →
      </button>
      {project?.liveUrl ? (
        <a href={project.liveUrl} target='_blank' rel='noreferrer'>
          {content.work.launchLabel}
        </a>
      ) : null}
    </div>
  )
}
