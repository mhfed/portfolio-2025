'use client'

import { useLayoutEffect } from 'react'
import { loadGSAP } from '@/lib/gsap-utils'

const REDUCED_MOTION_SAFE = '(prefers-reduced-motion: no-preference)'
const DESKTOP_MOTION =
  '(min-width: 48rem) and (prefers-reduced-motion: no-preference)'
const POINTER_MOTION =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

function getRevealDelay(element: HTMLElement) {
  const delay = Number(element.dataset.revealDelay)
  return Number.isFinite(delay) ? delay : 0
}

export function ScrollMotionRuntime() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.editorial-portfolio')

    if (!root) return

    let cancelled = false
    let cleanUp: () => void = () => {}

    void loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return

      const media = gsap.matchMedia()
      const context = gsap.context(() => {
        const header = root.querySelector<HTMLElement>('.portfolio-header')
        const progress = root.querySelector<HTMLElement>(
          '[data-scroll-progress]'
        )
        const navLinks = gsap.utils.toArray<HTMLAnchorElement>(
          '.portfolio-nav a[href^="#"]',
          root
        )

        const setActiveNavigation = (href: string) => {
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === href
            link.classList.toggle('is-active', active)

            if (active) {
              link.setAttribute('aria-current', 'location')
            } else {
              link.removeAttribute('aria-current')
            }
          })
        }

        navLinks.forEach((link) => {
          const href = link.getAttribute('href')
          const section = href
            ? root.querySelector<HTMLElement>(href)
            : undefined

          if (!href || !section) return

          ScrollTrigger.create({
            trigger: section,
            start: 'top 46%',
            end: 'bottom 46%',
            onToggle: (self) => {
              if (self.isActive) setActiveNavigation(href)
            },
          })
        })

        if (header) {
          ScrollTrigger.create({
            trigger: root,
            start: 'top top-=120',
            end: 'max',
            toggleClass: { targets: header, className: 'is-scrolled' },
          })
        }

        media.add(REDUCED_MOTION_SAFE, () => {
          if (progress) {
            gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })
            gsap.to(progress, {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                start: 0,
                end: 'max',
                scrub: 0.2,
              },
            })
          }

          const hero = root.querySelector<HTMLElement>('.editorial-hero')
          const heroChars = gsap.utils.toArray<HTMLElement>(
            '[data-hero-char]',
            hero ?? root
          )
          const heroShapes = gsap.utils.toArray<HTMLElement>(
            '[data-hero-shape]',
            hero ?? root
          )
          const heroPath = gsap.utils.toArray<SVGPathElement>(
            '[data-hero-path]',
            hero ?? root
          )[0]
          const heroIntro = gsap.utils.toArray<HTMLElement>(
            '[data-hero-intro]',
            hero ?? root
          )
          const heroImage = root.querySelector<HTMLElement>('[data-hero-image]')
          const heroMedia = root.querySelector<HTMLElement>('.hero-media')

          gsap.set(heroChars, {
            x: (index) => ((index % 7) - 3) * 18,
            y: (index) => (index % 2 === 0 ? -1 : 1) * (34 + (index % 5) * 8),
            rotation: (index) => ((index % 9) - 4) * 9,
            scale: (index) => 0.58 + (index % 4) * 0.08,
            opacity: 0,
          })
          gsap.set(heroShapes, {
            opacity: 0,
            rotation: (index) => (index % 2 === 0 ? -80 : 80),
            scale: 0,
          })
          gsap.set(heroIntro, { opacity: 0, y: 22 })

          if (heroPath) {
            const pathLength = heroPath.getTotalLength()
            gsap.set(heroPath, {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
            })
          }

          if (heroMedia) {
            gsap.set(heroMedia, {
              clipPath: 'polygon(0 0, 7% 0, 0 100%, 0 100%)',
            })
          }

          const intro = gsap.timeline({
            defaults: { ease: 'power4.out' },
            delay: 0.06,
          })

          intro
            .to(heroChars, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 1.25,
              stagger: { each: 0.018, from: 'random' },
              ease: 'elastic.out(1, 0.68)',
            })
            .to(
              heroShapes,
              {
                opacity: 1,
                rotation: 0,
                scale: 1,
                duration: 1.05,
                stagger: 0.09,
                ease: 'elastic.out(1, 0.55)',
              },
              0.12
            )
            .to(
              heroIntro,
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.1,
              },
              0.34
            )

          if (heroPath) {
            intro.to(
              heroPath,
              {
                strokeDashoffset: 0,
                duration: 1.1,
                ease: 'power2.inOut',
              },
              0.18
            )
          }

          if (heroMedia) {
            intro.to(
              heroMedia,
              {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 1.25,
              },
              0.42
            )
          }

          if (heroImage) {
            intro.fromTo(
              heroImage,
              { scale: 1.18, xPercent: -4 },
              { scale: 1.035, xPercent: 0, duration: 1.35 },
              0.42
            )
          }

          const reveals = gsap.utils.toArray<HTMLElement>(
            '[data-editorial-reveal]',
            root
          )

          reveals.forEach((element) => {
            gsap.fromTo(
              element,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.86,
                delay: getRevealDelay(element),
                ease: 'power4.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 88%',
                  once: true,
                },
              }
            )
          })

          const impactStatement = root.querySelector<HTMLElement>(
            '[data-impact-statement]'
          )
          const impactWords = gsap.utils.toArray<HTMLElement>(
            '[data-impact-word]',
            impactStatement ?? root
          )

          if (impactStatement && impactWords.length > 0) {
            gsap.fromTo(
              impactWords,
              { opacity: 0.16 },
              {
                opacity: 1,
                stagger: 0.08,
                ease: 'none',
                scrollTrigger: {
                  trigger: impactStatement,
                  start: 'top 78%',
                  end: 'bottom 42%',
                  scrub: 0.55,
                },
              }
            )
          }

          const projectHeading = root.querySelector<HTMLElement>(
            '.project-showcase__heading h2'
          )

          if (projectHeading) {
            gsap.fromTo(
              projectHeading,
              { xPercent: -3 },
              {
                xPercent: 3,
                ease: 'none',
                scrollTrigger: {
                  trigger: projectHeading,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.7,
                },
              }
            )
          }

          const projectMedia = gsap.utils.toArray<HTMLElement>(
            '.project-media',
            root
          )

          projectMedia.forEach((project) => {
            const parallax = project.querySelector<HTMLElement>(
              '[data-project-parallax]'
            )
            const chrome = project.querySelector<HTMLElement>(
              '.project-window-chrome'
            )

            gsap.fromTo(
              project,
              {
                clipPath: 'inset(9% 0% 9% 0% round 1.5rem)',
                opacity: 0.55,
              },
              {
                clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
                opacity: 1,
                duration: 1.05,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: project,
                  start: 'top 84%',
                  once: true,
                },
              }
            )

            if (parallax) {
              gsap.fromTo(
                parallax,
                { yPercent: -2.5 },
                {
                  yPercent: 2.5,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: project,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                  },
                }
              )
            }

            if (chrome) {
              gsap.fromTo(
                chrome,
                { opacity: 0, y: -12 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  delay: 0.12,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: project,
                    start: 'top 84%',
                    once: true,
                  },
                }
              )
            }
          })
        })

        media.add(DESKTOP_MOTION, () => {
          const hero = root.querySelector<HTMLElement>('.editorial-hero')
          const heroImage = root.querySelector<HTMLElement>('[data-hero-image]')
          const heroChars = gsap.utils.toArray<HTMLElement>(
            '[data-hero-char]',
            hero ?? root
          )
          const heroShapes = gsap.utils.toArray<HTMLElement>(
            '[data-hero-shape]',
            hero ?? root
          )

          if (!hero) return

          if (heroImage) {
            gsap.to(heroImage, {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.65,
              },
            })
          }

          if (heroChars.length > 0) {
            gsap
              .timeline({ repeat: -1, repeatDelay: 3.8, delay: 2.4 })
              .to(heroChars, {
                y: (index) => (index % 2 === 0 ? -7 : 4),
                rotation: (index) => (index % 2 === 0 ? -2 : 2),
                duration: 0.45,
                stagger: { each: 0.018, from: 'center' },
                ease: 'sine.inOut',
              })
              .to(
                heroChars,
                {
                  y: 0,
                  rotation: 0,
                  duration: 0.7,
                  stagger: { each: 0.014, from: 'center' },
                  ease: 'elastic.out(1, 0.7)',
                },
                '-=0.15'
              )
          }

          heroShapes.forEach((shape, index) => {
            gsap.to(shape, {
              rotation: '+=360',
              duration: 14 + index * 4,
              delay: 1.6,
              repeat: -1,
              ease: 'none',
            })
          })
        })

        media.add(POINTER_MOTION, () => {
          const manualCleanups: Array<() => void> = []
          const hero = root.querySelector<HTMLElement>('.editorial-hero')
          const heroShapes = gsap.utils.toArray<HTMLElement>(
            '[data-hero-shape]',
            hero ?? root
          )

          if (hero && heroShapes.length > 0) {
            const shapeMovers = heroShapes.map((shape, index) => ({
              strength: 10 + index * 7,
              x: gsap.quickTo(shape, 'x', {
                duration: 0.8,
                ease: 'power3.out',
              }),
              y: gsap.quickTo(shape, 'y', {
                duration: 0.8,
                ease: 'power3.out',
              }),
            }))
            const moveShapes = (event: PointerEvent) => {
              const bounds = hero.getBoundingClientRect()
              const x = (event.clientX - bounds.left) / bounds.width - 0.5
              const y = (event.clientY - bounds.top) / bounds.height - 0.5

              shapeMovers.forEach((mover) => {
                mover.x(x * mover.strength)
                mover.y(y * mover.strength)
              })
            }
            const resetShapes = () => {
              shapeMovers.forEach((mover) => {
                mover.x(0)
                mover.y(0)
              })
            }

            hero.addEventListener('pointermove', moveShapes)
            hero.addEventListener('pointerleave', resetShapes)
            manualCleanups.push(() => {
              hero.removeEventListener('pointermove', moveShapes)
              hero.removeEventListener('pointerleave', resetShapes)
              shapeMovers.forEach((mover) => {
                mover.x.tween.kill()
                mover.y.tween.kill()
              })
            })
          }

          const magneticTargets = gsap.utils.toArray<HTMLElement>(
            '.button, .project-action, .header-contact',
            root
          )
          const spotlightSurfaces = gsap.utils.toArray<HTMLElement>(
            '[data-spotlight-surface]',
            root
          )

          magneticTargets.forEach((target) => {
            const moveX = gsap.quickTo(target, 'x', {
              duration: 0.35,
              ease: 'power3.out',
            })
            const moveY = gsap.quickTo(target, 'y', {
              duration: 0.35,
              ease: 'power3.out',
            })
            const move = (event: PointerEvent) => {
              const bounds = target.getBoundingClientRect()
              moveX((event.clientX - bounds.left - bounds.width / 2) * 0.12)
              moveY((event.clientY - bounds.top - bounds.height / 2) * 0.18)
            }
            const reset = () => {
              moveX(0)
              moveY(0)
            }

            target.addEventListener('pointermove', move)
            target.addEventListener('pointerleave', reset)
            manualCleanups.push(() => {
              target.removeEventListener('pointermove', move)
              target.removeEventListener('pointerleave', reset)
              gsap.killTweensOf(target)
            })
          })

          spotlightSurfaces.forEach((surface) => {
            const updateSpotlight = (event: PointerEvent) => {
              const bounds = surface.getBoundingClientRect()
              surface.style.setProperty(
                '--spotlight-x',
                `${event.clientX - bounds.left}px`
              )
              surface.style.setProperty(
                '--spotlight-y',
                `${event.clientY - bounds.top}px`
              )
            }
            const resetSpotlight = () => {
              surface.style.removeProperty('--spotlight-x')
              surface.style.removeProperty('--spotlight-y')
            }

            surface.addEventListener('pointermove', updateSpotlight)
            surface.addEventListener('pointerleave', resetSpotlight)
            manualCleanups.push(() => {
              surface.removeEventListener('pointermove', updateSpotlight)
              surface.removeEventListener('pointerleave', resetSpotlight)
              resetSpotlight()
            })
          })

          return () => manualCleanups.forEach((cleanup) => cleanup())
        })
      }, root)

      cleanUp = () => {
        media.revert()
        context.revert()
      }
      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      cleanUp()
    }
  }, [])

  return (
    <div className='scroll-progress' aria-hidden='true'>
      <span data-scroll-progress />
    </div>
  )
}
