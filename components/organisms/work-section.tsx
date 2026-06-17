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
      className='creative-section creative-work relative w-full max-w-[1500px] mx-auto px-[clamp(1rem,4vw,4rem)] !py-32'
      data-section
      data-waypoint='work'
      ref={sectionRef}
    >
      <div className='creative-section__intro creative-work__intro grid grid-cols-1 lg:grid-cols-[minmax(10rem,0.48fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,6rem)] items-start !mb-16'>
        <p className='creative-kicker max-w-[34rem] text-creative-muted font-mono text-[clamp(0.72rem,1vw,0.82rem)] font-extrabold tracking-widest leading-relaxed uppercase' data-reveal>
          {t('selected')}
        </p>
        <h2 data-split-line className="m-0 text-creative-ink font-display text-[clamp(1.45rem,2.4vw,2.8rem)] max-sm:text-[clamp(1.3rem,5.5vw,2.2rem)] font-black tracking-tight leading-[1.15] uppercase [text-wrap:balance] max-w-none">{t('headline')}</h2>
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
          <div className='macbook-device relative w-full max-w-[580px] mx-auto [perspective:1200px] scale-[1.08] origin-center'>
            <div className='macbook-screen-bezel relative w-full aspect-[16/10] bg-black rounded-t-[20px] p-[3.2%_3.2%_4.2%_3.2%] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.12),0_12px_36px_-12px_rgba(0,0,0,0.75)] border border-[#141414] overflow-hidden'>
              <div className='macbook-camera absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[5px] height-[5px] rounded-full bg-[#0d0d0d] shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.25)] flex items-center justify-center after:content-[""] after:w-[2px] after:h-[2px] after:rounded-full after:bg-[#0a2044]' />
              <div className='macbook-screen relative w-full h-full bg-[#0d0d0d] rounded-[4px] overflow-hidden shadow-[inset_0_0_16px_rgba(0,0,0,0.95)] border border-[#070707] after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/8 after:to-transparent after:pointer-events-none after:z-5' ref={screenRef}>
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
            <div className='macbook-base relative w-[122%] h-[12px] bg-gradient-to-b from-[#4c4e52] to-[#252629] ml-[-11%] rounded-b-[10px] shadow-[0_16px_28px_-8px_rgba(0,0,0,0.85),0_3px_4px_rgba(0,0,0,0.45)] border-t border-[#7d8187] flex justify-center'>
              <div className='macbook-notch absolute top-0 w-[15%] h-[4px] bg-[#18191b] rounded-b-[5px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.65)]' />
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
                className='p-0.5 rounded-[28px] bg-white/5 border border-white/10 hover:border-white/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-500'
                data-project-card
              >
                <article className='bg-[#080907]/95 rounded-[26px] p-6 md:p-8 flex flex-col justify-between h-full group'>
                  
                  {/* Mobile-Only MacBook Frame Inline Preview */}
                  <div className='block lg:hidden w-[82%] mx-auto mb-6 scale-[0.95] origin-top max-w-[420px]'>
                    <div className='macbook-device relative w-full max-w-[580px] mx-auto [perspective:1200px]'>
                      <div className='macbook-screen-bezel relative w-full aspect-[16/10] bg-black rounded-t-[20px] p-[3.2%_3.2%_4.2%_3.2%] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.12),0_12px_36px_-12px_rgba(0,0,0,0.75)] border border-[#141414] overflow-hidden'>
                        <div className='macbook-camera absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[5px] height-[5px] rounded-full bg-[#0d0d0d] shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.25)] flex items-center justify-center after:content-[""] after:w-[2px] after:h-[2px] after:rounded-full after:bg-[#0a2044]' />
                        <div className='macbook-screen relative w-full aspect-[16/10] bg-[#0d0d0d] rounded-[4px] overflow-hidden shadow-[inset_0_0_16px_rgba(0,0,0,0.95)] border border-[#070707] after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/8 after:to-transparent after:pointer-events-none after:z-5'>
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
                      <div className='macbook-base relative w-[122%] h-[12px] bg-gradient-to-b from-[#4c4e52] to-[#252629] ml-[-11%] rounded-b-[10px] shadow-[0_16px_28px_-8px_rgba(0,0,0,0.85),0_3px_4px_rgba(0,0,0,0.45)] border-t border-[#7d8187] flex justify-center'>
                        <div className='macbook-notch absolute top-0 w-[15%] h-[4px] bg-[#18191b] rounded-b-[5px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.65)]' />
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
