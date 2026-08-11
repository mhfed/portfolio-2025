'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { MascotTraveler } from '@/components/molecules/mascot-traveler'
import { StoryAtmosphere } from '@/components/organisms/story-atmosphere'
import { loadGSAP } from '@/lib/gsap-utils'
import {
  getStoryBeatPresentation,
  getStoryTransitionState,
  interpolateStoryWaypoint,
  isStoryBeatId,
} from '@/lib/storytelling'
import type {
  PortfolioStoryContent,
  StoryBeatId,
} from '@/types/storytelling'

export interface ScrollStoryRuntimeProps {
  story: PortfolioStoryContent
}

export function ScrollStoryRuntime({ story }: ScrollStoryRuntimeProps) {
  const [activeBeatId, setActiveBeatId] = useState<StoryBeatId>('top')
  const activeBeatRef = useRef<StoryBeatId>('top')

  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.duo-portfolio')
    if (!root) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const anchors = Array.from(
      root.querySelectorAll<HTMLElement>('[data-story-beat]')
    ).filter((anchor) => isStoryBeatId(anchor.dataset.storyBeat))

    const setDiscreteBeat = (id: StoryBeatId) => {
      if (activeBeatRef.current === id) return
      activeBeatRef.current = id
      setActiveBeatId(id)

      root
        .querySelectorAll<HTMLAnchorElement>('[data-story-progress-link]')
        .forEach((link) => {
          const active = link.dataset.storyProgressLink === id
          link.classList.toggle('is-active', active)
          if (active) link.setAttribute('aria-current', 'location')
          else link.removeAttribute('aria-current')
        })
    }

    const focusLine = window.innerHeight * 0.58
    const initialAnchor = anchors.reduce<HTMLElement | null>(
      (current, anchor) =>
        anchor.getBoundingClientRect().top <= focusLine ? anchor : current,
      null
    )
    const initialId = initialAnchor?.dataset.storyBeat
    if (isStoryBeatId(initialId)) setDiscreteBeat(initialId)

    if (reducedMotion) return

    let cancelled = false
    let cleanUp = () => {}

    void loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return

      const context = gsap.context(() => {
        const traveler = root.querySelector<HTMLElement>('[data-story-traveler]')
        const trail = root.querySelector<SVGPathElement>(
          '[data-story-trail-progress]'
        )
        const poses = Array.from(
          root.querySelectorAll<HTMLElement>('[data-story-pose]')
        )

        if (!traveler) return

        const renderJourney = (
          index: number,
          sectionProgress: number
        ) => {
          const currentBeat = story.beats[index]
          const nextBeat = story.beats[index + 1] ?? currentBeat
          const transition = getStoryTransitionState(sectionProgress)
          const currentPresentation = getStoryBeatPresentation(currentBeat.id)
          const nextPresentation = getStoryBeatPresentation(nextBeat.id)
          const waypoint = interpolateStoryWaypoint(
            currentPresentation.waypoint,
            nextPresentation.waypoint,
            transition.travelProgress
          )
          const journeyProgress =
            (index + transition.travelProgress) /
            Math.max(story.beats.length - 1, 1)
          const compactTraveler = window.innerWidth <= 1180
          const mobileTraveler = window.innerWidth <= 800

          gsap.set(traveler, {
            x: compactTraveler
              ? mobileTraveler
                ? 12
                : window.innerWidth - 12
              : (window.innerWidth * waypoint.xVw) / 100,
            y: compactTraveler
              ? window.innerHeight - 12
              : (window.innerHeight * waypoint.yVh) / 100,
            xPercent: compactTraveler ? (mobileTraveler ? 0 : -100) : -50,
            yPercent: compactTraveler ? -100 : -50,
            rotation: compactTraveler
              ? waypoint.rotation * 0.35
              : waypoint.rotation,
            scale: compactTraveler ? 1 : waypoint.scale,
          })

          poses.forEach((pose) => {
            const poseId = pose.dataset.storyPose
            let opacity = 0
            if (poseId === currentBeat.id) opacity = 1 - transition.poseBlend
            if (poseId === nextBeat.id) opacity = transition.poseBlend
            if (currentBeat.id === nextBeat.id && poseId === currentBeat.id) {
              opacity = 1
            }
            gsap.set(pose, { autoAlpha: opacity })
          })

          if (trail) {
            gsap.set(trail, { strokeDashoffset: 1 - journeyProgress })
          }

          setDiscreteBeat(
            transition.poseBlend >= 0.5 ? nextBeat.id : currentBeat.id
          )
        }

        anchors.forEach((anchor, index) => {
          ScrollTrigger.create({
            trigger: anchor,
            start: 'top 64%',
            end: 'bottom 36%',
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!self.isActive && self.progress !== 1) return
              renderJourney(index, self.progress)
            },
          })
        })

        root.dataset.storyReady = 'true'
        ScrollTrigger.refresh()
      }, root)

      cleanUp = () => {
        delete root.dataset.storyReady
        context.revert()
      }
    })

    return () => {
      cancelled = true
      cleanUp()
    }
  }, [story])

  return (
    <>
      <StoryAtmosphere activeBeatId={activeBeatId} />
      <MascotTraveler activeBeatId={activeBeatId} story={story} />
    </>
  )
}
