'use client'

import { useEffect, useRef } from 'react'
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
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

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
        grid
      ) as HTMLElement[]

      const matchMedia = gsap.matchMedia()
      mm = matchMedia

      // Desktop: staggered 3D fly-in per card
      matchMedia.add('(min-width: 1024px)', () => {
        ScrollTrigger.saveStyles(cards)

        // Section heading reveal
        gsap.to('.creative-work__intro-copy', {
          y: -12,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 30%',
            scrub: 0.8,
          },
        })

        // Each card flies in individually on scroll
        cards.forEach((card, index) => {
          const image = card.querySelector<HTMLElement>(
            '[data-project-image] img'
          )

          // Alternate direction: even cards from left, odd from right
          const fromX = index % 2 === 0 ? -80 : 80
          const fromRotateY = index % 2 === 0 ? 8 : -8
          const fromRotateZ = index % 2 === 0 ? 3 : -3

          // Card fly-in timeline
          gsap.fromTo(
            card,
            {
              y: 100,
              x: fromX,
              scale: 0.85,
              rotateY: fromRotateY,
              rotateZ: fromRotateZ,
              opacity: 0,
              filter: 'blur(6px)',
            },
            {
              y: 0,
              x: 0,
              scale: 1,
              rotateY: 0,
              rotateZ: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 40%',
                scrub: 1,
              },
            }
          )

          // Image parallax: shifts upward inside the card
          if (image) {
            gsap.fromTo(
              image,
              { yPercent: 8, scale: 1.15 },
              {
                yPercent: -8,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            )
          }
        })

        ScrollTrigger.refresh()
      })

      // Mobile: simple batch fade-in
      matchMedia.add('(max-width: 1023px)', () => {
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
      <div className='creative-section__intro creative-work__intro'>
        <div className='creative-work__intro-copy'>
          <p className='creative-kicker' data-reveal>
            {t('selected')}
          </p>
          <h2 data-split-line>{t('headline')}</h2>
        </div>
      </div>

      <div className='project-grid' ref={gridRef}>
        {projects.map((project, index) => {
          const href = project.liveUrl ?? project.githubUrl ?? '#contact'
          const target =
            project.liveUrl || project.githubUrl ? '_blank' : undefined
          const rel =
            project.liveUrl || project.githubUrl ? 'noreferrer' : undefined

          return (
            <div
              key={project.id}
              className="p-[2px] rounded-[1.6rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
              data-project-card
            >
              <a
                href={href}
                className='project-card group !border-0 !rounded-[calc(1.6rem-2px)] overflow-hidden'
                target={target}
                rel={rel}
                aria-label={`${project.title}: ${project.description}`}
              >
                <div className='project-card__media' data-project-image>
                  <Image
                    src={project.image}
                    alt=''
                    fill
                    sizes='(min-width: 1024px) 48vw, 92vw'
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
                      <strong>{project.techStack.slice(0, 4).join(' · ')}</strong>
                    </div>
                  </div>

                  <div className='project-card__footer !mt-4 !pt-3 border-t border-white/10 flex items-center justify-between w-full'>
                    <span className="text-[10px] uppercase tracking-wider text-creative-muted">
                      {project.liveUrl ? 'Live case study' : 'Source / archive'}
                    </span>
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-creative-lime group-hover:text-black transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden='true' />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
