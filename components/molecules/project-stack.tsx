'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { loadGSAP } from '@/lib/gsap-utils'

export interface ProjectStackProps {
  children: ReactNode
}

export function ProjectStack({ children }: ProjectStackProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const compactViewport = window.matchMedia('(max-width: 767px)').matches

    if (!root || reducedMotion || compactViewport) return

    let cancelled = false
    let cleanUp: () => void = () => {}

    void loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return

      const context = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(
          '[data-project-panel]',
          root
        )
        const finalPanel = panels.at(-1)

        if (!finalPanel) return

        panels.forEach((panel, index) => {
          const nextPanel = panels[index + 1]
          const panelContent = panel.querySelector<HTMLElement>(
            '.project-panel__inner'
          )
          const entranceTargets = gsap.utils.toArray<HTMLElement>(
            '.project-title-row, .project-meta',
            panel
          )

          gsap.set(panel, { zIndex: index + 1 })

          gsap.fromTo(
            entranceTargets,
            { opacity: 0.35, y: 32 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top 82%',
                end: 'top 48%',
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            }
          )

          if (!nextPanel) return

          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            endTrigger: finalPanel,
            end: 'top top',
            pin: true,
            pinSpacing: false,
            toggleClass: { targets: panel, className: 'is-active' },
            invalidateOnRefresh: true,
          })

          gsap.to(panel, {
            scale: 0.95,
            ease: 'none',
            scrollTrigger: {
              trigger: nextPanel,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          })

          if (panelContent) {
            gsap.to(panelContent, {
              opacity: 0.42,
              ease: 'none',
              scrollTrigger: {
                trigger: nextPanel,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            })
          }
        })
      }, root)

      cleanUp = () => context.revert()
      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      cleanUp()
    }
  }, [])

  return <div ref={rootRef}>{children}</div>
}
