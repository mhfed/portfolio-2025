'use client'

import { useEffect } from 'react'
import { loadGSAP } from '@/lib/gsap-utils'

/**
 * Global GSAP orchestration layer for the creative portfolio.
 *
 * Each section now owns its own ScrollTrigger-based animations internally
 * (hero entrance + parallax, about scrub-text, experience pinned columns,
 * work card scale/fade, contact entrance). This component handles only:
 *
 * 1. Generic [data-reveal] batch fade-in for any stray elements
 * 2. Mobile fallback batch animations
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

      const matchMedia = gsap.matchMedia()
      mm = matchMedia

      /* ── Desktop ── */
      matchMedia.add('(min-width: 1024px)', () => {
        let cleanupMouseListeners = () => {}

        // Global spotlight mouse follower
        const spotlight = document.getElementById('global-spotlight')
        if (spotlight) {
          const xTo = gsap.quickTo(spotlight, 'x', {
            duration: 0.8,
            ease: 'power3.out',
          })
          const yTo = gsap.quickTo(spotlight, 'y', {
            duration: 0.8,
            ease: 'power3.out',
          })

          const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX)
            yTo(e.clientY)
          }

          const onMouseEnter = () => {
            gsap.to(spotlight, { opacity: 1, duration: 0.6 })
          }

          const onMouseLeave = () => {
            gsap.to(spotlight, { opacity: 0, duration: 0.6 })
          }

          window.addEventListener('mousemove', onMouseMove, { passive: true })
          document.addEventListener('mouseenter', onMouseEnter)
          document.addEventListener('mouseleave', onMouseLeave)

          gsap.to(spotlight, { opacity: 1, duration: 0.6 })

          cleanupMouseListeners = () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseenter', onMouseEnter)
            document.removeEventListener('mouseleave', onMouseLeave)
          }
        }

        // 1. About column parallax
        const about = root.querySelector('.creative-about')
        const aboutLeft = root.querySelector('[data-about-col-left]')
        const aboutRight = root.querySelector('[data-about-col-right]')
        if (about && aboutLeft && aboutRight) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: about,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            })
            .to(aboutLeft, { yPercent: -8, ease: 'none' }, 0)
            .to(aboutRight, { yPercent: 8, ease: 'none' }, 0)
        }

        // 3. Work stack cards split columns parallax
        const projectCards = gsap.utils.toArray(
          '[data-stack-card]',
          root
        ) as HTMLElement[]
        projectCards.forEach((card) => {
          const colImg = card.querySelector('[data-project-col-img]')
          const colContent = card.querySelector('[data-project-col-content]')
          if (colImg && colContent) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.8,
                },
              })
              .to(colImg, { yPercent: -4, ease: 'none' }, 0)
              .to(colContent, { yPercent: 4, ease: 'none' }, 0)
          }
        })

        // 4. Contact section typography parallax
        const contact = root.querySelector('#contact')
        const c1 = root.querySelector('[data-contact-line1]')
        const c2 = root.querySelector('[data-contact-line2]')
        const cEmail = root.querySelector('[data-contact-email]')
        if (contact && c1 && c2 && cEmail) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: contact,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            })
            .to(c1, { yPercent: -15, ease: 'none' }, 0)
            .to(c2, { yPercent: -5, ease: 'none' }, 0)
            .to(cEmail, { yPercent: 10, ease: 'none' }, 0)
        }

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

        return cleanupMouseListeners
      })

      /* ── Mobile ── */
      matchMedia.add('(max-width: 1023px)', () => {
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
