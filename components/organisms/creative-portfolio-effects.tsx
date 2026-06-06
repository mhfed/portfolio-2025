'use client'

import { useEffect } from 'react'
import { loadGSAP } from '@/lib/gsap-utils'

export function CreativePortfolioEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-creative-root]')
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let context: { revert: () => void } | undefined
    let active = true

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      context = gsap.context(() => {
        gsap.set('[data-hero-word]', { yPercent: 105, rotate: 3, opacity: 0 })
        gsap.set('[data-reveal]', { y: 24, opacity: 0 })

        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .to('[data-hero-word]', {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.055,
          })
          .to(
            '[data-reveal]',
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              stagger: 0.08,
            },
            '-=0.62'
          )

        gsap.to('[data-parallax="field"]', {
          y: 110,
          rotate: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.creative-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        gsap.utils.toArray('[data-section]').forEach((sectionNode: unknown) => {
          const section = sectionNode as HTMLElement
          const lines = section.querySelectorAll('[data-split-line]')
          const rows = section.querySelectorAll(
            '[data-work-row], [data-skill-group]'
          )

          if (lines.length > 0) {
            gsap.from(lines, {
              y: 54,
              duration: 0.9,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 72%',
              },
            })
          }

          if (rows.length > 0) {
            gsap.from(rows, {
              y: 34,
              duration: 0.72,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 68%',
              },
            })
          }
        })

        const experienceSection = root.querySelector('.creative-experience')

        if (experienceSection) {
          const experienceTitle = experienceSection.querySelector(
            '[data-experience-title]'
          )

          if (experienceTitle) {
            gsap.to(experienceTitle, {
              xPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: experienceSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            })
          }

          gsap.utils
            .toArray('[data-experience-row]')
            .forEach((rowNode: unknown) => {
              const row = rowNode as HTMLElement
              const scan = row.querySelector('[data-experience-scan]')
              const meta = row.querySelector('[data-experience-meta]')
              const company = row.querySelector('[data-experience-company]')
              const role = row.querySelector('[data-experience-role]')
              const copy = row.querySelectorAll('[data-experience-copy]')
              const skills = row.querySelectorAll('[data-experience-skill]')

              gsap.set(scan, { scaleX: 0, transformOrigin: 'left center' })

              const rowTimeline = gsap.timeline({
                scrollTrigger: {
                  trigger: row,
                  start: 'top 76%',
                  toggleActions: 'play none none none',
                },
                defaults: {
                  ease: 'power3.out',
                },
              })

              rowTimeline
                .from(row, {
                  y: 74,
                  rotateX: -5,
                  transformOrigin: '50% 0%',
                  duration: 0.9,
                })
                .to(
                  scan,
                  {
                    scaleX: 1,
                    duration: 0.72,
                  },
                  '<'
                )
                .from(
                  meta,
                  {
                    x: -34,
                    duration: 0.64,
                  },
                  '<0.08'
                )
                .from(
                  company,
                  {
                    x: 34,
                    duration: 0.78,
                  },
                  '<0.08'
                )
                .from(
                  role,
                  {
                    x: 20,
                    duration: 0.5,
                  },
                  '-=0.38'
                )
                .from(
                  copy,
                  {
                    y: 20,
                    duration: 0.48,
                    stagger: 0.055,
                  },
                  '-=0.22'
                )
                .from(
                  skills,
                  {
                    y: 14,
                    scale: 0.94,
                    duration: 0.42,
                    stagger: 0.035,
                  },
                  '-=0.2'
                )
            })
        }

        ScrollTrigger.refresh()
      }, root)
    })

    return () => {
      active = false
      context?.revert()
    }
  }, [])

  return null
}
