'use client'

import { useLayoutEffect } from 'react'
import { loadGSAP } from '@/lib/gsap-utils'

/**
 * Scroll choreography for the three mascot beats: work, skills, and contact.
 * It is intentionally isolated from the page's server-rendered content.
 */
export function MascotScrollMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.querySelector<HTMLElement>('.duo-portfolio')
    if (!root) return

    let cancelled = false
    let cleanUp: () => void = () => {}

    void loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return

      const context = gsap.context(() => {
        const heroMascot = root.querySelector<HTMLElement>('[data-mascot="work"]')
        const skillsMascot = root.querySelector<HTMLElement>('[data-mascot="skills"]')
        const contactMascot = root.querySelector<HTMLElement>('[data-mascot="celebrate"]')
        const storyScenes = [
          { selector: '[data-story-scene="about"]', rotation: -4, offset: -22 },
          { selector: '[data-story-scene="work"]', rotation: 4, offset: -18 },
          { selector: '[data-story-scene="experience"]', rotation: -3, offset: -110 },
        ]
        const chapterLinks = gsap.utils.toArray<HTMLAnchorElement>(
          '[data-story-progress-link]',
          root
        )

        const setActiveChapter = (chapterId: string) => {
          chapterLinks.forEach((link) => {
            const active = link.dataset.storyProgressLink === chapterId
            link.classList.toggle('is-active', active)

            if (active) {
              link.setAttribute('aria-current', 'location')
            } else {
              link.removeAttribute('aria-current')
            }
          })
        }

        gsap.utils
          .toArray<HTMLElement>('[data-story-chapter]', root)
          .forEach((chapter) => {
            const chapterId = chapter.dataset.storyChapter
            if (!chapterId) return

            ScrollTrigger.create({
              trigger: chapter,
              start: 'top 52%',
              end: 'bottom 52%',
              onToggle: (self) => {
                if (self.isActive) setActiveChapter(chapterId)
              },
            })
          })

        if (heroMascot) {
          gsap.from(heroMascot, {
            autoAlpha: 0,
            y: 28,
            rotation: -4,
            scale: 0.92,
            duration: 0.8,
            delay: 0.18,
            ease: 'power3.out',
          })

          gsap.to(heroMascot, {
            y: -34,
            rotation: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: heroMascot.closest('section'),
              start: 'top top',
              end: 'bottom top',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })
        }

        ;[
          { element: skillsMascot, rotation: 5 },
          { element: contactMascot, rotation: -5 },
        ].forEach(({ element, rotation }) => {
          if (!element) return

          gsap.from(element, {
            autoAlpha: 0,
            y: 36,
            rotation,
            scale: 0.9,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
              once: true,
            },
          })
        })

        storyScenes.forEach(({ selector, rotation, offset }) => {
          const scene = root.querySelector<HTMLElement>(selector)
          const section = scene?.closest<HTMLElement>('section')
          if (!scene || !section) return

          gsap.fromTo(
            scene,
            { autoAlpha: 0, y: 42, rotation, scale: 0.9 },
            {
              autoAlpha: 1,
              y: offset,
              rotation: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                end: 'bottom 34%',
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            }
          )
        })

        const projectCards = gsap.utils.toArray<HTMLElement>('.duo-project', root)
        if (projectCards.length > 0) {
          gsap.from(projectCards, {
            autoAlpha: 0,
            y: 44,
            rotation: (index) => (index % 2 === 0 ? -2 : 2),
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.duo-projects',
              start: 'top 78%',
              once: true,
            },
          })
        }

        const timelineCards = gsap.utils.toArray<HTMLElement>(
          '.duo-timeline__card',
          root
        )
        timelineCards.forEach((card) => {
          gsap.from(card, {
            autoAlpha: 0,
            x: 28,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              once: true,
            },
          })
        })

        const skillGroups = gsap.utils.toArray<HTMLElement>('.duo-skill-group', root)
        if (skillGroups.length > 0) {
          gsap.from(skillGroups, {
            autoAlpha: 0,
            y: 28,
            scale: 0.96,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.duo-skill-grid',
              start: 'top 80%',
              once: true,
            },
          })
        }
      }, root)

      cleanUp = () => context.revert()
      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      cleanUp()
    }
  }, [])

  return null
}
