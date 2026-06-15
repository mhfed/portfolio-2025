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
  const containerRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const screen = screenRef.current
    if (!section || !container || !screen) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    if (reduced || !desktop) return

    let active = true
    let mm: { add: (...args: any[]) => void; revert: () => void } | undefined

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      const cards = gsap.utils.toArray('[data-project-card]', container) as HTMLElement[]
      const images = gsap.utils.toArray('[data-screen-image]', screen) as HTMLElement[]

      const matchMedia = gsap.matchMedia()
      mm = matchMedia

      matchMedia.add('(min-width: 1024px)', () => {
        ScrollTrigger.saveStyles([...cards, ...images])

        // Hide all screenshots except the first one initially
        gsap.set(images, { opacity: 0 })
        if (images[0]) gsap.set(images[0], { opacity: 1 })

        // Intro headline parallax reveal
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

        // Pin the left column containing the MacBook
        ScrollTrigger.create({
          trigger: container,
          start: 'top 15%',
          end: 'bottom 85%',
          pin: '[data-macbook-pin-container]',
          pinSpacing: false,
          anticipatePin: 1,
        })

        // Monitor each card scrolling past to cross-fade MacBook screens
        cards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 45%',
            end: 'bottom 45%',
            onToggle: (self: any) => {
              if (self.isActive && images[index]) {
                // Cross-fade MacBook screens
                gsap.to(images, { opacity: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
                gsap.to(images[index], { opacity: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })

                // Highlight active project card (Spotlight focus effect)
                gsap.to(cards, { opacity: 0.28, scale: 0.985, duration: 0.35, overwrite: 'auto' })
                gsap.to(card, { opacity: 1, scale: 1, duration: 0.35, overwrite: 'auto' })
              }
            },
          })
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
      className='creative-section creative-work !py-32'
      data-section
      data-waypoint='work'
      ref={sectionRef}
    >
      <div className='creative-section__intro creative-work__intro !mb-16'>
        <p className='creative-kicker' data-reveal>
          {t('selected')}
        </p>
        <h2 data-split-line>{t('headline')}</h2>
      </div>

      {/* Main Content Layout */}
      <div
        className='relative w-full lg:grid lg:grid-cols-12 lg:gap-16'
        ref={containerRef}
      >
        {/* Left Column (Sticky MacBook on desktop) */}
        <div
          className='hidden lg:block lg:col-span-6 h-[70vh] flex items-center justify-center'
          data-macbook-pin-container
        >
          <div className='macbook-device scale-[1.08] origin-center'>
            <div className='macbook-screen-bezel'>
              <div className='macbook-camera' />
              <div className='macbook-screen' ref={screenRef}>
                {projects.map((project, index) => (
                  <div
                    key={`screen-${project.id}`}
                    className='absolute inset-0 w-full h-full'
                    data-screen-image
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className='object-cover object-top'
                      quality={85}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='macbook-base'>
              <div className='macbook-notch' />
            </div>
          </div>
        </div>

        {/* Right Column (Scrollable details on desktop, full stack on mobile) */}
        <div className='lg:col-span-6 flex flex-col gap-12 lg:gap-28 lg:pb-36'>
          {projects.map((project, index) => {
            const href = project.liveUrl ?? project.githubUrl ?? '#contact'
            const target = project.liveUrl || project.githubUrl ? '_blank' : undefined
            const rel = project.liveUrl || project.githubUrl ? 'noreferrer' : undefined

            return (
              <div
                key={project.id}
                className='p-[2px] rounded-[1.8rem] bg-white/5 border border-white/10 hover:border-white/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-500'
                data-project-card
              >
                <article className='bg-[#080907]/95 rounded-[calc(1.8rem-2px)] p-6 md:p-8 flex flex-col justify-between h-full group'>
                  
                  {/* Mobile-Only MacBook Frame Inline Preview */}
                  <div className='block lg:hidden w-full mb-6 scale-[0.95] origin-top'>
                    <div className='macbook-device'>
                      <div className='macbook-screen-bezel'>
                        <div className='macbook-camera' />
                        <div className='macbook-screen relative aspect-ratio'>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className='object-cover object-top'
                            quality={70}
                            priority={index < 2}
                          />
                        </div>
                      </div>
                      <div className='macbook-base'>
                        <div className='macbook-notch' />
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-5'>
                    <div className='flex items-center justify-between font-mono text-[10px] tracking-widest text-creative-dim uppercase border-b border-white/5 pb-3'>
                      <span className='text-creative-lime font-extrabold'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className='font-display text-2xl md:text-3xl font-extrabold uppercase text-creative-ink tracking-tight m-0'>
                      {project.title}
                    </h3>

                    <p className='text-sm text-creative-muted font-light leading-relaxed m-0'>
                      {project.description}
                    </p>

                    <p className='text-sm text-creative-ink font-semibold leading-relaxed m-0 border-l-2 border-creative-lime/50 pl-3.5'>
                      {project.result}
                    </p>

                    {/* Metadata tags */}
                    <div className='grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs'>
                      <div>
                        <span className='block font-mono text-[9px] tracking-wider text-creative-dim uppercase mb-1.5'>Role</span>
                        <strong className='text-creative-ink font-semibold'>{project.role}</strong>
                      </div>
                      <div>
                        <span className='block font-mono text-[9px] tracking-wider text-creative-dim uppercase mb-1.5'>Stack</span>
                        <strong className='text-creative-ink font-semibold'>{project.techStack.slice(0, 3).join(' · ')}</strong>
                      </div>
                    </div>
                  </div>

                  <div className='mt-8 pt-4 border-t border-white/5 flex items-center justify-between w-full'>
                    <span className='font-mono text-[9px] tracking-wider text-creative-dim uppercase'>
                      {project.liveUrl ? 'Live case study' : 'Source / archive'}
                    </span>
                    <a
                      href={href}
                      target={target}
                      rel={rel}
                      className='flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-creative-lime group-hover:text-black transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      aria-label={`${project.title}: open case study`}
                    >
                      <ArrowUpRight className='w-4 h-4' aria-hidden='true' />
                    </a>
                  </div>

                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
