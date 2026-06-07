'use client'

import { useEffect } from 'react'
import { loadGSAP } from '@/lib/gsap-utils'

function batchFadeIn(gsap: any, elements: Element[]) {
  gsap.fromTo(
    elements,
    {
      y: 42,
      opacity: 0,
      scale: 0.985,
      filter: 'blur(10px)',
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      overwrite: true,
    }
  )
}

export function CreativePortfolioEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-creative-root]')
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let active = true
    let mm: { add: (...args: any[]) => void; revert: () => void } | undefined

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      const hero = root.querySelector<HTMLElement>('.creative-hero')
      const aboutSection = root.querySelector<HTMLElement>('.creative-about')
      const experienceSection = root.querySelector<HTMLElement>('.creative-experience')
      const skillsSection = root.querySelector<HTMLElement>('.creative-skills')
      const contactSection = root.querySelector<HTMLElement>('.creative-contact')

      if (
        !hero ||
        !aboutSection ||
        !experienceSection ||
        !skillsSection ||
        !contactSection
      ) {
        return
      }

      const heroWords = gsap.utils.toArray('[data-hero-word]', hero) as HTMLElement[]
      const heroField = root.querySelector<HTMLElement>('[data-hero-field]')
      const heroMarquee = root.querySelector<HTMLElement>('[data-hero-marquee]')
      const heroCopy = root.querySelector<HTMLElement>('[data-hero-copy]')
      const heroTop = root.querySelector<HTMLElement>('[data-hero-top]')

      const aboutStatement = aboutSection.querySelector<HTMLElement>(
        '.creative-about__statement'
      )
      const aboutBadges = gsap.utils.toArray(
        '.creative-about__badges span',
        aboutSection
      ) as HTMLElement[]

      const experienceTitle = experienceSection.querySelector<HTMLElement>(
        '[data-experience-title]'
      )
      const experienceRows = gsap.utils.toArray(
        '[data-experience-row]',
        experienceSection
      ) as HTMLElement[]

      const skillGroups = gsap.utils.toArray(
        '[data-skill-group]',
        skillsSection
      ) as HTMLElement[]
      const skillHeadline = skillsSection.querySelector<HTMLElement>('.creative-section__intro h2')
      const skillMarquee = skillsSection.querySelector<HTMLElement>('.creative-marquee--skills')

      const contactLinks = gsap.utils.toArray('a', contactSection) as HTMLElement[]
      const contactHeadline = contactSection.querySelector<HTMLElement>('h2')

      const matchMedia = gsap.matchMedia()
      mm = matchMedia

      matchMedia.add('(min-width: 1024px)', () => {
        ScrollTrigger.saveStyles([
          ...heroWords,
          ...aboutBadges,
          ...experienceRows,
          ...skillGroups,
          ...contactLinks,
        ])

        gsap.set(heroWords, { yPercent: 120, rotate: 4, opacity: 0 })
        gsap.set(heroField, { scale: 0.98, opacity: 0.92 })
        gsap.set(heroMarquee, { opacity: 0.12 })
        gsap.set(heroCopy, { y: 18, opacity: 0.7 })
        gsap.set(heroTop, { y: -10, opacity: 0.7 })

        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .to(heroWords, {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.055,
          })
          .to(
            [heroTop, heroCopy],
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
            },
            '-=0.64'
          )

        gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
          .to(
            heroWords,
            {
              yPercent: -18,
              rotate: 0,
              opacity: 0.82,
              stagger: 0.04,
              duration: 1,
              ease: 'none',
            },
            0
          )
          .to(
            heroField,
            {
              xPercent: -8,
              y: -96,
              rotate: 18,
              scale: 1.08,
              duration: 1,
              ease: 'none',
            },
            0
          )
          .to(
            heroMarquee,
            {
              y: -16,
              xPercent: -12,
              opacity: 0.22,
              duration: 1,
              ease: 'none',
            },
            0
          )
          .to(
            heroCopy,
            {
              y: 32,
              opacity: 0.75,
              duration: 1,
              ease: 'none',
            },
            0.08
          )

        if (aboutStatement) {
          gsap.to(aboutStatement, {
            x: 24,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top 82%',
              end: 'bottom 25%',
              scrub: 1,
            },
          })
        }

        ScrollTrigger.batch(aboutBadges, {
          start: 'top 82%',
          interval: 0.08,
          onEnter: (elements: Element[]) => batchFadeIn(gsap, elements),
          onEnterBack: (elements: Element[]) => batchFadeIn(gsap, elements),
        })

        if (experienceTitle) {
          gsap.to(experienceTitle, {
            xPercent: -5,
            ease: 'none',
            scrollTrigger: {
              trigger: experienceSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.75,
            },
          })
        }

        experienceRows.forEach((row) => {
          const scan = row.querySelector<HTMLElement>('[data-experience-scan]')
          const meta = row.querySelector<HTMLElement>('[data-experience-meta]')
          const company = row.querySelector<HTMLElement>('[data-experience-company]')
          const role = row.querySelector<HTMLElement>('[data-experience-role]')
          const copy = row.querySelectorAll<HTMLElement>('[data-experience-copy]')
          const skills = row.querySelectorAll<HTMLElement>('[data-experience-skill]')

          if (scan) {
            gsap.set(scan, { scaleX: 0, transformOrigin: 'left center' })
          }

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

        if (skillHeadline) {
          gsap.to(skillHeadline, {
            xPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: skillsSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }

        if (skillMarquee) {
          gsap.to(skillMarquee, {
            xPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: skillsSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }

        gsap.set(skillGroups, { opacity: 0.36, scale: 0.98, y: 18 })
        ScrollTrigger.batch(skillGroups, {
          start: 'top 78%',
          interval: 0.08,
          onEnter: (elements: Element[]) => {
            gsap.fromTo(
              elements,
              { opacity: 0.34, scale: 0.975, y: 20 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.72,
                stagger: 0.06,
                ease: 'power3.out',
                overwrite: true,
              }
            )
          },
          onEnterBack: (elements: Element[]) => {
            gsap.fromTo(
              elements,
              { opacity: 0.45, scale: 0.985, y: 10 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.56,
                stagger: 0.05,
                ease: 'power3.out',
                overwrite: true,
              }
            )
          },
        })

        ScrollTrigger.batch(contactLinks, {
          start: 'top 88%',
          interval: 0.08,
          onEnter: (elements: Element[]) => batchFadeIn(gsap, elements),
          onEnterBack: (elements: Element[]) => batchFadeIn(gsap, elements),
        })

        if (contactHeadline) {
          gsap.to(contactHeadline, {
            y: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: contactSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          })
        }

        ScrollTrigger.refresh()
      })

      matchMedia.add('(max-width: 1023px)', () => {
        ScrollTrigger.batch(
          [
            ...aboutBadges,
            ...experienceRows,
            ...skillGroups,
            ...contactLinks,
          ],
          {
            start: 'top 72%',
            interval: 0.08,
            onEnter: (elements: Element[]) => batchFadeIn(gsap, elements),
            onEnterBack: (elements: Element[]) => batchFadeIn(gsap, elements),
          }
        )

        if (contactHeadline) {
          gsap.to(contactHeadline, {
            y: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: contactSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
            },
          })
        }

        ScrollTrigger.refresh()
      })
    })

    return () => {
      active = false
      mm?.revert()
    }
  }, [])

  return null
}
