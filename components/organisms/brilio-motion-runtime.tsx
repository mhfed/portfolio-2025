'use client'

import { useLayoutEffect } from 'react'
import { loadGSAP } from '@/lib/gsap-utils'

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'
const DESKTOP_MOTION_QUERY =
  '(min-width: 48rem) and (prefers-reduced-motion: no-preference)'
const POINTER_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export function BrilioMotionRuntime() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.duo-portfolio')
    if (!root) return

    let cancelled = false
    let cleanUp = () => {}

    void loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return

      const listeners: Array<() => void> = []
      const media = gsap.matchMedia()
      const context = gsap.context(() => {
        media.add(MOTION_QUERY, () => {
          const heroElements = [
            root.querySelector('.duo-hero__hello'),
            root.querySelector('.duo-hero h1'),
            root.querySelector('.duo-hero__description'),
            root.querySelector('.duo-actions'),
            root.querySelector('.duo-hero__meta'),
          ].filter((element): element is Element => element !== null)

          gsap
            .timeline({ defaults: { duration: 1, ease: 'power2.out' } })
            .fromTo(
              '.duo-header',
              { autoAlpha: 0, y: -70 },
              { autoAlpha: 1, y: 0 },
              0
            )
            .fromTo(
              heroElements,
              { autoAlpha: 0, y: 100, skewY: 7 },
              {
                autoAlpha: 1,
                y: 0,
                skewY: 0,
                stagger: 0.09,
              },
              0.08
            )

          gsap.utils
            .toArray<HTMLElement>('[data-brilio-reveal]', root)
            .forEach((element) => {
              gsap.fromTo(
                element,
                { autoAlpha: 0, y: 56, skewY: 3 },
                {
                  autoAlpha: 1,
                  y: 0,
                  skewY: 0,
                  duration: 1,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 88%',
                    once: true,
                  },
                }
              )
            })

          const mutedColor = getComputedStyle(root)
            .getPropertyValue('--muted')
            .trim()
          const inkColor = getComputedStyle(root)
            .getPropertyValue('--ink')
            .trim()

          gsap.utils
            .toArray<HTMLElement>('[data-brilio-scroll-fill]', root)
            .forEach((heading) => {
              const characters = gsap.utils.toArray<HTMLElement>(
                '[data-brilio-scroll-char]',
                heading
              )

              gsap.fromTo(
                characters,
                { color: mutedColor },
                {
                  color: inkColor,
                  stagger: 0.08,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: heading,
                    start: 'top 82%',
                    end: 'top 24%',
                    scrub: 0.8,
                  },
                }
              )
            })

          gsap.utils
            .toArray<HTMLElement>('.duo-project__image', root)
            .forEach((frame) => {
              const image = frame.querySelector('img')
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: frame,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                },
              })

              timeline.fromTo(
                frame,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                  clipPath: 'inset(0 0% 0 0)',
                  duration: 1.35,
                  ease: 'power2.out',
                }
              )

              if (image) {
                timeline.fromTo(
                  image,
                  { xPercent: 12, scale: 1.18 },
                  {
                    xPercent: 0,
                    scale: 1,
                    duration: 1.35,
                    ease: 'power2.out',
                  },
                  0
                )
              }
            })
        })

        media.add(DESKTOP_MOTION_QUERY, () => {
          gsap.utils
            .toArray<HTMLElement>('.duo-project__image img', root)
            .forEach((image) => {
              gsap.fromTo(
                image,
                { yPercent: -4 },
                {
                  yPercent: 4,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: image.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                }
              )
            })
        })

        media.add(POINTER_QUERY, () => {
          gsap.utils
            .toArray<HTMLElement>('.duo-button, .duo-text-link', root)
            .forEach((element) => {
              const onMove = (event: PointerEvent) => {
                const bounds = element.getBoundingClientRect()
                gsap.to(element, {
                  x: (event.clientX - bounds.left - bounds.width / 2) * 0.12,
                  y: (event.clientY - bounds.top - bounds.height / 2) * 0.12,
                  duration: 0.35,
                  ease: 'power2.out',
                })
              }
              const onLeave = () => {
                gsap.to(element, {
                  x: 0,
                  y: 0,
                  duration: 0.55,
                  ease: 'power2.out',
                })
              }

              element.addEventListener('pointermove', onMove)
              element.addEventListener('pointerleave', onLeave)
              listeners.push(() => {
                element.removeEventListener('pointermove', onMove)
                element.removeEventListener('pointerleave', onLeave)
              })
            })
        })

        root.dataset.brilioMotionReady = 'true'
        ScrollTrigger.refresh()
      }, root)

      cleanUp = () => {
        listeners.forEach((removeListener) => removeListener())
        delete root.dataset.brilioMotionReady
        media.revert()
        context.revert()
      }
    })

    return () => {
      cancelled = true
      cleanUp()
    }
  }, [])

  return null
}
