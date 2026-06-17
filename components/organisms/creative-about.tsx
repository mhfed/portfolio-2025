'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { loadGSAP } from '@/lib/gsap-utils'

export function AboutSection({ locale }: { locale: string }) {
  const t = useTranslations('about')
  const badges = t.raw('badges') as string[]
  const skillListObj = t.raw('skillList') as Record<string, { label: string; value: string }>

  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const isHoveringRef = useRef(false)
  const scrollTriggerRef = useRef<any>(null)

  // Group the 9 raw translations into 5 high-impact accordion panels
  const skillsData = [
    {
      id: 'frontend',
      label: skillListObj.frontend.label,
      value: skillListObj.frontend.value,
      number: '01',
      accent: 'var(--creative-lime)',
      glow: 'rgba(200, 255, 69, 0.15)',
    },
    {
      id: 'state',
      label: skillListObj.state.label,
      value: skillListObj.state.value,
      number: '02',
      accent: '#60a5fa',
      glow: 'rgba(96, 165, 250, 0.15)',
    },
    {
      id: 'performance',
      label: skillListObj.performance.label,
      value: skillListObj.performance.value,
      number: '03',
      accent: '#c084fc',
      glow: 'rgba(192, 132, 252, 0.15)',
    },
    {
      id: 'infrastructure',
      label: locale === 'vi' ? 'DevOps & Di động' : 'DevOps & Mobile',
      value: `${skillListObj.devops.value} / ${skillListObj.mobile.value}`,
      number: '04',
      accent: 'var(--creative-orange)',
      glow: 'rgba(255, 138, 61, 0.15)',
    },
    {
      id: 'leadership',
      label: locale === 'vi' ? 'Lãnh đạo & Quy trình' : 'Leadership & Quality',
      value: `${skillListObj.leadership.value} / ${skillListObj.productMindset.value} / ${skillListObj.codeQuality.value} / ${skillListObj.agile.value}`,
      number: '05',
      accent: 'var(--creative-pink)',
      glow: 'rgba(255, 94, 188, 0.15)',
    },
  ]

  // Setup ScrollTrigger for sequential auto-activation on scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let active = true
    let triggerInstance: any = null

    loadGSAP().then(({ ScrollTrigger }) => {
      if (!active) return

      triggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top 75%',
        end: 'bottom 25%',
        onUpdate: (self: any) => {
          if (isHoveringRef.current) return
          const progress = self.progress
          const count = skillsData.length
          const index = Math.min(count - 1, Math.max(0, Math.floor(progress * count)))
          setActiveIndex(index)
        },
      })
      scrollTriggerRef.current = triggerInstance
    })

    return () => {
      active = false
      if (triggerInstance) {
        triggerInstance.kill()
      }
    }
  }, [])

  // GSAP Accordion Animation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let active = true

    loadGSAP().then(({ gsap }) => {
      if (!active) return

      const isMobile = window.matchMedia('(max-width: 767px)').matches
      const panels = container.querySelectorAll('.accordion-panel')

      panels.forEach((panel, idx) => {
        const isActive = idx === activeIndex

        if (isMobile) {
          // Reset flex-grow for mobile vertical layout
          gsap.set(panel, { flexGrow: 1 })

          // Animate height on mobile
          const content = panel.querySelector('.panel-content') as HTMLElement
          const naturalHeight = content ? content.scrollHeight : 220

          gsap.to(panel, {
            height: isActive ? naturalHeight : 75,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto',
          })

          if (content) {
            gsap.to(content, {
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 10,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        } else {
          // Reset height for desktop horizontal layout
          gsap.set(panel, { height: '100%' })

          // Animate flex-grow on desktop horizontal accordion
          gsap.to(panel, {
            flexGrow: isActive ? 5.5 : 1,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
          })

          const verticalTitle = panel.querySelector('.panel-title--vertical')
          const content = panel.querySelector('.panel-content')

          if (verticalTitle) {
            gsap.to(verticalTitle, {
              opacity: isActive ? 0 : 1,
              y: isActive ? -20 : 0,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }

          if (content) {
            gsap.to(content, {
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : 20,
              duration: 0.5,
              delay: isActive ? 0.12 : 0,
              ease: 'power3.out',
              overwrite: 'auto',
            })
          }
        }
      })
    })

    return () => {
      active = false
    }
  }, [activeIndex])

  return (
    <section
      id='about'
      className='creative-section creative-about grid gap-[clamp(2rem,5vw,4rem)]'
      data-section
      data-waypoint='about'
    >
      <div className='creative-section__intro creative-about__intro grid grid-cols-1 lg:grid-cols-[minmax(10rem,0.48fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,6rem)] items-start mb-[clamp(2.5rem,6vw,5rem)]'>
        <p className='creative-kicker max-w-[34rem] text-creative-muted font-mono text-[clamp(0.72rem,1vw,0.82rem)] font-extrabold tracking-widest leading-relaxed uppercase' data-reveal>
          {t('title')}
        </p>
        <h2 data-split-line className="m-0 text-creative-ink font-display text-[clamp(1.45rem,2.4vw,2.8rem)] max-sm:text-[clamp(1.3rem,5.5vw,2.2rem)] font-black tracking-tight leading-[1.15] uppercase [text-wrap:balance] max-w-none">{t('focus')}</h2>
      </div>

      <div className='about-grid grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,6rem)] mt-9'>
        {/* Left Column: Personal Statement & Keyword Badges */}
        <div className='about-grid__left flex flex-col gap-8'>
          <div className='creative-about__statement max-w-none m-0 text-creative-ink font-display text-[clamp(1.25rem,1.8vw,2rem)] max-sm:text-[clamp(1.1rem,4.8vw,1.65rem)] font-extrabold tracking-normal leading-[1.25] [text-wrap:balance]' data-split-line>
            {t('statement')}
          </div>
          <div className='creative-about__badges flex flex-wrap gap-2.5 max-w-[54rem] text-creative-lime' data-reveal>
            {badges.map((badge) => (
              <span key={badge} className="border border-current rounded-full px-2.5 py-1.5 font-mono text-[0.75rem] not-italic font-black tracking-wider leading-none uppercase opacity-85">{badge}</span>
            ))}
          </div>
        </div>

        {/* Right Column: Bio paragraph and core metrics stats */}
        <div className='about-grid__right flex flex-col gap-10'>
          <p className='about-bio text-creative-muted text-[clamp(1.05rem,1.35vw,1.25rem)] font-light leading-relaxed' data-reveal>
            {t('description1')}
          </p>

          <div className='about-stats grid grid-cols-2 gap-[clamp(1rem,2vw,2rem)] border-t border-creative-line pt-8' data-reveal>
            <div className="p-0.5 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className='stat-card bg-[#080907]/90 rounded-[22px] p-6 flex flex-col gap-2'>
                <span className='stat-card__number font-display text-[clamp(2.5rem,4vw,4.5rem)] font-black text-creative-lime leading-none'>5+</span>
                <div className='stat-card__meta flex flex-col gap-1'>
                  <strong className="text-[0.88rem] font-extrabold uppercase tracking-wider text-creative-ink">{t('yearsExperience')}</strong>
                  <p className="m-0 text-[0.82rem] text-creative-dim leading-normal">{t('yearsDescription')}</p>
                </div>
              </div>
            </div>

            <div className="p-0.5 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className='stat-card bg-[#080907]/90 rounded-[22px] p-6 flex flex-col gap-2'>
                <span className='stat-card__number font-display text-[clamp(2.5rem,4vw,4.5rem)] font-black text-creative-lime leading-none'>99%</span>
                <div className='stat-card__meta flex flex-col gap-1'>
                  <strong className="text-[0.88rem] font-extrabold uppercase tracking-wider text-creative-ink">{t('clientSatisfaction')}</strong>
                  <p className="m-0 text-[0.82rem] text-creative-dim leading-normal">{t('satisfactionDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive GSAP Expanding Accordion Skills */}
      <div className='about-skills mt-[clamp(4rem,8vw,8rem)] border-t border-creative-line pt-[clamp(2.5rem,4vw,4rem)]' data-reveal ref={containerRef}>
        <h3 className='about-skills__title font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-black uppercase tracking-tight mb-8 text-creative-ink'>{t('coreSkills')}</h3>
        <div
          className='about-skills__accordion flex flex-col md:flex-row w-full md:h-[420px] gap-3 mt-8'
          onMouseEnter={() => {
            isHoveringRef.current = true
          }}
          onMouseLeave={() => {
            isHoveringRef.current = false
            if (scrollTriggerRef.current) {
              const progress = scrollTriggerRef.current.progress
              const count = skillsData.length
              const index = Math.min(count - 1, Math.max(0, Math.floor(progress * count)))
              setActiveIndex(index)
            }
          }}
        >
          {skillsData.map((skill, index) => {
            const isCurrent = activeIndex === index

            return (
              <div
                key={skill.id}
                ref={(el) => {
                  panelRefs.current[index] = el
                }}
                className={`accordion-panel group flex-1 h-full rounded-[12px] border bg-[#080907]/56 backdrop-blur-[16px] relative overflow-hidden cursor-pointer flex items-center justify-center after:content-[''] after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:transition-opacity after:duration-[450ms] hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)] transition-all max-md:w-full max-md:h-[75px] max-md:flex-none max-md:justify-start max-md:p-0 max-md:items-stretch ${
                  isCurrent
                    ? 'is-active border-[var(--panel-accent,var(--creative-lime))] shadow-[0_16px_48px_rgba(0,0,0,0.35)] after:opacity-100'
                    : 'border-creative-line hover:border-[var(--panel-accent,var(--creative-lime))]'
                }`}
                style={{
                  ['--panel-accent' as any]: skill.accent,
                  ['--panel-glow' as any]: skill.glow,
                  ['--panel-glow-dir' as any]: isCurrent ? '100% 50%' : '50% 120%',
                }}
                onMouseEnter={() => {
                  const isMobile = window.matchMedia('(max-width: 767px)').matches
                  if (!isMobile) setActiveIndex(index)
                }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Vertical Title (Desktop collapsed state) */}
                <div className='panel-title--vertical absolute whitespace-nowrap -rotate-90 font-display text-[0.95rem] font-black uppercase tracking-widest text-creative-muted pointer-events-none origin-center transition-colors duration-300 group-hover:text-creative-ink max-md:hidden'>
                  {skill.label}
                </div>

                {/* Mobile Title (Mobile collapsed state) */}
                <div className={`panel-header--mobile flex md:hidden items-center gap-4 p-6 w-full h-[75px] absolute top-0 left-0 z-10 pointer-events-none transition-opacity duration-300 ${
                  isCurrent ? 'opacity-0' : 'opacity-100'
                }`}>
                  <span className='panel-num font-mono text-[0.82rem] font-black text-[var(--panel-accent)]'>{skill.number}</span>
                  <span className='panel-title--mobile-text font-display text-base font-black uppercase tracking-wider text-creative-ink'>{skill.label}</span>
                </div>

                {/* Expanded content */}
                <div className='panel-content p-9 flex flex-col justify-between h-full w-full absolute inset-0 z-[2] opacity-0 pointer-events-none max-md:p-6 max-md:relative max-md:opacity-100 max-md:pointer-events-auto'>
                  <div className='panel-header flex justify-between items-start w-full'>
                    <span className='panel-num font-mono text-[0.82rem] font-black text-[var(--panel-accent)]'>{skill.number}</span>
                    <h4 className='panel-title--horizontal m-0 font-display text-[clamp(1.4rem,2.2vw,2.1rem)] max-md:text-[1.15rem] font-black uppercase tracking-tight text-creative-ink max-w-[15ch] max-md:max-w-none leading-none max-md:text-left text-right'>{skill.label}</h4>
                  </div>
                  <div className='panel-body mt-auto w-full'>
                    <p className="m-0 text-[clamp(0.92rem,1.18vw,1.1rem)] max-md:text-[0.88rem] text-creative-muted leading-[1.62] max-md:leading-normal font-light">{skill.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

