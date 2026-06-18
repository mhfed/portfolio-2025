'use client'

import { useEffect } from 'react'
import { loadGSAP } from '@/lib/gsap-utils'

/**
 * Global GSAP orchestration layer for the creative portfolio.
 *
 * Each section now owns its own ScrollTrigger-based animations internally
 * (about scrub-text, experience pinned columns, work card scale/fade,
 * contact entrance). This component handles only:
 *
 * 1. Hero word entrance + scroll parallax (hero has no internal GSAP)
 * 2. Generic [data-reveal] batch fade-in for any stray elements
 * 3. Mobile fallback batch animations
 */
export function CreativePortfolioEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-creative-root]')
    if (!root) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let active = true
    let mm:
      | { add: (query: string, func: () => void) => void; revert: () => void }
      | undefined

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      const hero = root.querySelector<HTMLElement>('.creative-hero')
      if (!hero) return

      const heroWords = gsap.utils.toArray(
        '[data-hero-word]',
        hero
      ) as HTMLElement[]
      const heroCtas = root.querySelector<HTMLElement>('[data-hero-ctas]')
      const heroSubline = root.querySelector<HTMLElement>('[data-hero-subline]')

      const matchMedia = gsap.matchMedia()
      mm = matchMedia

      /* ── Desktop ── */
      matchMedia.add('(min-width: 1024px)', () => {
        // Hero word entrance
        if (heroWords.length) {
          gsap.set(heroWords, { yPercent: 110, rotate: 3, opacity: 0 })

          gsap
            .timeline({ defaults: { ease: 'power4.out' } })
            .to(heroWords, {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.06,
            })
            .fromTo(
              [heroSubline, heroCtas].filter(Boolean),
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
              '-=0.5'
            )
        }

        // Hero scroll parallax
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: '+=100%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(
            heroWords,
            {
              yPercent: -20,
              opacity: 0.7,
              stagger: 0.03,
              duration: 1,
              ease: 'none',
            },
            0
          )
          .to(
            [heroSubline, heroCtas].filter(Boolean),
            {
              y: 40,
              opacity: 0.5,
              duration: 1,
              ease: 'none',
            },
            0
          )

        // Generic reveal batch for any [data-reveal] elements
        const revealElements = gsap.utils.toArray(
          '[data-reveal]',
          root
        ) as HTMLElement[]
        if (revealElements.length) {
          ScrollTrigger.batch(revealElements, {
            start: 'top 82%',
            interval: 0.08,
            onEnter: (elements: Element[]) => {
              gsap.fromTo(
                elements,
                { y: 36, opacity: 0, scale: 0.98 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.75,
                  stagger: 0.07,
                  ease: 'power3.out',
                  overwrite: true,
                }
              )
            },
            onEnterBack: (elements: Element[]) => {
              gsap.fromTo(
                elements,
                { y: 36, opacity: 0, scale: 0.98 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.75,
                  stagger: 0.07,
                  ease: 'power3.out',
                  overwrite: true,
                }
              )
            },
          })
        }

        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      })

      /* ── Mobile ── */
      matchMedia.add('(max-width: 1023px)', () => {
        // Simple word entrance on mobile
        if (heroWords.length) {
          gsap.set(heroWords, { yPercent: 60, opacity: 0 })
          gsap.to(heroWords, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out',
          })
        }

        // Mobile batch reveals
        const mobileRevealElements = gsap.utils.toArray(
          '[data-reveal]',
          root
        ) as HTMLElement[]
        if (mobileRevealElements.length) {
          ScrollTrigger.batch(mobileRevealElements, {
            start: 'top 78%',
            interval: 0.06,
            onEnter: (elements: Element[]) => {
              gsap.fromTo(
                elements,
                { y: 28, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.05,
                  ease: 'power3.out',
                  overwrite: true,
                }
              )
            },
            onEnterBack: (elements: Element[]) => {
              gsap.fromTo(
                elements,
                { y: 28, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.05,
                  ease: 'power3.out',
                  overwrite: true,
                }
              )
            },
          })
        }

        ScrollTrigger.sort()
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
