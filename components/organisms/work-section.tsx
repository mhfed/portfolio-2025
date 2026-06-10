'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ProjectCaseStudy } from '@/data/projects'
import { loadGSAP } from '@/lib/gsap-utils'

type WorkSectionProps = {
  projects: ProjectCaseStudy[]
}

export function WorkSection({ projects }: WorkSectionProps) {
  const t = useTranslations('projects')
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const displayIndex = hoveredIndex ?? activeIndex
  const activeProject =
    projects[displayIndex] ?? projects[activeIndex] ?? projects[0]

  useEffect(() => {
    const section = sectionRef.current
    const rail = railRef.current
    if (!section || !rail) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let active = true
    let mm: { add: (...args: any[]) => void; revert: () => void } | undefined

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      const cards = gsap.utils.toArray(
        '[data-project-card]',
        rail
      ) as HTMLElement[]
      const desktopQuery = '(min-width: 1024px)'
      const mobileQuery = '(max-width: 1023px)'
      const horizontalStart = 'center 33%'

      const matchMedia = gsap.matchMedia()
      mm = matchMedia

      matchMedia.add(desktopQuery, () => {
        const getDistance = () =>
          Math.max(0, rail.scrollWidth - section.clientWidth)
        const cardCount = Math.max(1, cards.length - 1)

        ScrollTrigger.saveStyles([rail, ...cards])

        gsap.set(rail, { x: 0 })
        gsap.set(cards, { willChange: 'transform' })

        const tween = gsap.to(rail, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'projects-horizontal-gallery',
            trigger: section,
            start: horizontalStart,
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap:
              cardCount > 0
                ? {
                    snapTo: (value: number) =>
                      Math.round(value * cardCount) / cardCount,
                    duration: { min: 0.18, max: 0.45 },
                    delay: 0.08,
                    ease: 'power1.inOut',
                  }
                : false,
            onUpdate(self: { progress: number }) {
              const nextIndex = Math.min(
                projects.length - 1,
                Math.max(0, Math.round(self.progress * cardCount))
              )
              setActiveIndex((current) =>
                current === nextIndex ? current : nextIndex
              )
            },
          },
        })

        gsap.to('.creative-work__intro-copy', {
          y: -12,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center top',
            scrub: 0.8,
          },
        })

        cards.forEach((card, index) => {
          const image = card.querySelector<HTMLElement>('[data-project-image]')
          const meta = card.querySelector<HTMLElement>('[data-project-meta]')

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.12 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: horizontalStart,
                  end: () => `+=${getDistance()}`,
                  scrub: 1,
                },
              }
            )
          }

          if (meta) {
            gsap.fromTo(
              meta,
              { opacity: 0.35 },
              {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: horizontalStart,
                  end: () => `+=${getDistance()}`,
                  scrub: 1,
                },
              }
            )
          }
        })

        ScrollTrigger.refresh()

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      matchMedia.add(mobileQuery, () => {
        setActiveIndex(0)

        const activeTriggers = cards.map((card, index) =>
          ScrollTrigger.create({
            trigger: card,
            start: 'top 52%',
            end: 'bottom 48%',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          })
        )

        ScrollTrigger.batch(cards, {
          start: 'top 86%',
          interval: 0.08,
          onEnter: (elements: Element[]) => {
            gsap.fromTo(
              elements,
              { y: 36, opacity: 0, scale: 0.985 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.72,
                stagger: 0.05,
                ease: 'power3.out',
                overwrite: true,
              }
            )
          },
          onEnterBack: (elements: Element[]) => {
            gsap.fromTo(
              elements,
              { y: 24, opacity: 0.76, scale: 0.99 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.56,
                stagger: 0.04,
                ease: 'power3.out',
                overwrite: true,
              }
            )
          },
        })

        ScrollTrigger.refresh()

        return () => {
          activeTriggers.forEach((trigger) => trigger.kill())
        }
      })
    })

    return () => {
      active = false
      mm?.revert()
    }
  }, [projects.length])

  return (
    <section
      id='work'
      className='creative-section creative-work'
      data-section
      data-waypoint='work'
      ref={sectionRef}
    >
      <div className='project-gallery__frame'>
        <div className='creative-section__intro creative-work__intro'>
          <div className='creative-work__intro-copy'>
            <p className='creative-kicker' data-reveal>
              {t('selected')}
            </p>
            <h2 data-split-line>{t('headline')}</h2>
          </div>

          <div className='project-gallery__status' aria-live='polite'>
            <span>{String(displayIndex + 1).padStart(2, '0')}</span>
            <strong>{activeProject?.title}</strong>
            <small>{activeProject?.role}</small>
          </div>
        </div>

        <div className='project-gallery' data-project-gallery>
          <div className='project-gallery__track' ref={railRef}>
            {projects.map((project, index) => {\n              const hasLink = project.liveUrl || project.githubUrl\n              const href = hasLink ? (project.liveUrl ?? project.githubUrl!) : undefined\n              const target = hasLink ? '_blank' : undefined\n              const rel = hasLink ? 'noreferrer' : undefined\n              const isDisabled = !hasLink

              return (
                <div
                  key={project.id}
                  className={`project-card ${index % 2 === 1 ? 'is-alt' : ''} ${
                    activeIndex === index ? 'is-active' : ''
                  } ${hoveredIndex === index ? 'is-previewed' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  data-project-card
                >
                  {hasLink ? (
                    <a
                      href={href}
                      className='project-card__link'
                      target={target}
                      rel={rel}
                      aria-label={`${project.title}: ${project.description}`}>
                  </a>
                  ) : null}
                  <div className='project-card__content'>
                  <div className='project-card__media' data-project-image>
                    <Image
                      src={project.image}
                      alt=''
                      fill
                      sizes='(min-width: 1024px) 42vw, 92vw'
                      quality={70}
                      priority={index < 2}
                    />
                  </div>

                  <div className='project-card__body' data-project-body>
                    <div className='project-card__meta' data-project-meta>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <small>{project.year}</small>
                    </div>

                    <h3>{project.title}</h3>
                    <p className='project-card__description'>
                      {project.description}
                    </p>
                    <p className='project-card__result'>{project.result}</p>

                    <div className='project-card__details'>
                      <div>
                        <span>Role</span>
                        <strong>{project.role}</strong>
                      </div>
                      <div>
                        <span>Stack</span>
                        <strong>
                          {project.techStack.slice(0, 4).join(' · ')}
                        </strong>
                      </div>
                    </div>

                    <div className='project-card__footer'>
                      <span>
                        {project.liveUrl
                          ? 'Live case study'
                          : 'Source / archive'}
                      </span>
                      <ArrowUpRight aria-hidden='true' />
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
