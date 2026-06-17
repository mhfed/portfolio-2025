'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { loadGSAP } from '@/lib/gsap-utils'

export function AboutSection({ locale }: { locale: string }) {
  const t = useTranslations('about')
  const badges = t.raw('badges') as string[]
  const skillListObj = t.raw('skillList') as Record<
    string,
    { label: string; value: string }
  >

  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const isHoveringRef = useRef(false)
  const scrollTriggerRef = useRef<any>(null)
  const statementRef = useRef<HTMLDivElement>(null)

  // Accordion panels - single accent color (lime only)
  const skillsData = [
    {
      id: 'frontend',
      label: skillListObj.frontend.label,
      value: skillListObj.frontend.value,
    },
    {
      id: 'state',
      label: skillListObj.state.label,
      value: skillListObj.state.value,
    },
    {
      id: 'performance',
      label: skillListObj.performance.label,
      value: skillListObj.performance.value,
    },
    {
      id: 'infrastructure',
      label: locale === 'vi' ? 'DevOps & Di dong' : 'DevOps & Mobile',
      value: `${skillListObj.devops.value} / ${skillListObj.mobile.value}`,
    },
    {
      id: 'leadership',
      label: locale === 'vi' ? 'Lanh dao & Quy trinh' : 'Leadership & Quality',
      value: `${skillListObj.leadership.value} / ${skillListObj.productMindset.value} / ${skillListObj.codeQuality.value} / ${skillListObj.agile.value}`,
    },
  ]

  // Scrubbing Text Reveal for the statement
  useEffect(() => {
    const statementEl = statementRef.current
    if (!statementEl) return

    let active = true

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      const text = statementEl.textContent || ''
      const words = text.split(' ')
      statementEl.innerHTML = ''

      words.forEach((word) => {
        const span = document.createElement('span')
        span.textContent = word + ' '
        span.className = 'about-scrub-word inline'
        span.style.opacity = '0.12'
        span.style.transition = 'none'
        statementEl.appendChild(span)
      })

      const wordSpans = statementEl.querySelectorAll('.about-scrub-word')

      ScrollTrigger.create({
        trigger: statementEl,
        start: 'top 80%',
        end: 'bottom 30%',
        scrub: 0.8,
        onUpdate: (self: any) => {
          const progress = self.progress
          const total = wordSpans.length
          wordSpans.forEach((span: Element, idx: number) => {
            const wordProgress = idx / total
            const el = span as HTMLElement
            if (wordProgress < progress) {
              el.style.opacity = '1'
            } else if (wordProgress < progress + 0.08) {
              const fade = (progress + 0.08 - wordProgress) / 0.08
              el.style.opacity = `${0.12 + fade * 0.88}`
            } else {
              el.style.opacity = '0.12'
            }
          })
        },
      })
    })

    return () => {
      active = false
    }
  }, [])

  // ScrollTrigger for accordion auto-activation
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
          const index = Math.min(
            count - 1,
            Math.max(0, Math.floor(progress * count))
          )
          setActiveIndex(index)
        },
      })
      scrollTriggerRef.current = triggerInstance
    })

    return () => {
      active = false
      if (triggerInstance) triggerInstance.kill()
    }
  }, [])

  // GSAP Horizontal Accordion Animation
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
          gsap.set(panel, { flexGrow: 1 })
          const content = panel.querySelector('.panel-content') as HTMLElement
          const naturalHeight = content ? content.scrollHeight : 220

          gsap.to(panel, {
            height: isActive ? naturalHeight : 72,
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
          gsap.set(panel, { height: '100%' })

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
      className='creative-section creative-about w-full py-32 md:py-48'
      data-section
      data-waypoint='about'
    >
      <div className='max-w-screen-2xl mx-auto px-[clamp(1rem,4vw,4rem)]'>
        {/* Headline - vertical stack, no split-header */}
        <h2
          data-split-line
          className='m-0 text-creative-ink font-display font-black tracking-tight leading-[1.12] uppercase [text-wrap:balance] max-w-[24ch] mb-16'
          style={{ fontSize: 'clamp(1.45rem, 2.4vw, 2.8rem)' }}
        >
          {t('focus')}
        </h2>

        {/* Two-column content - statement left, bio + stats right */}
        <div className='grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-[clamp(2rem,6vw,6rem)]'>
          {/* Left: Statement with scrubbing reveal + badges */}
          <div className='flex flex-col gap-10'>
            <div
              ref={statementRef}
              className='max-w-none m-0 text-creative-ink font-display font-extrabold tracking-normal leading-[1.35] [text-wrap:balance]'
              style={{ fontSize: 'clamp(1.25rem, 1.8vw, 2rem)' }}
              data-split-line
            >
              {t('statement')}
            </div>

            <div className='flex flex-wrap gap-2.5 max-w-[54rem]' data-reveal>
              {badges.map((badge) => (
                <span
                  key={badge}
                  className='border border-creative-lime/40 text-creative-lime rounded-full px-3 py-1.5 font-mono text-[0.72rem] font-black tracking-wider leading-none uppercase transition-all duration-300 hover:bg-creative-lime/10 hover:border-creative-lime/60'
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Bio + Stats */}
          <div className='flex flex-col gap-10'>
            <p
              className='text-creative-muted text-body-lg font-light leading-relaxed'
              data-reveal
            >
              {t('description1')}
            </p>

            {/* Stats - 2 items only, no fake-precise numbers */}
            <div
              className='grid grid-cols-2 gap-0 border border-creative-line rounded-2xl overflow-hidden'
              data-reveal
            >
              <div className='p-6 border-r border-creative-line bg-[#080907]/60 hover:bg-[#080907]/80 transition-colors duration-300'>
                <span
                  className='block font-display font-black text-creative-lime leading-none mb-2'
                  style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
                >
                  5+
                </span>
                <strong className='text-[0.82rem] font-extrabold uppercase tracking-wider text-creative-ink block'>
                  {t('yearsExperience')}
                </strong>
                <p className='m-0 text-[0.78rem] text-creative-dim leading-normal mt-1'>
                  {t('yearsDescription')}
                </p>
              </div>

              <div className='p-6 bg-[#080907]/60 hover:bg-[#080907]/80 transition-colors duration-300'>
                <span
                  className='block font-display font-black text-creative-lime leading-none mb-2'
                  style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
                >
                  10+
                </span>
                <strong className='text-[0.82rem] font-extrabold uppercase tracking-wider text-creative-ink block'>
                  {locale === 'vi' ? 'Du an' : 'Projects Delivered'}
                </strong>
                <p className='m-0 text-[0.78rem] text-creative-dim leading-normal mt-0.5'>
                  {locale === 'vi'
                    ? 'Tu e-commerce den fintech va Web3'
                    : 'From e-commerce to fintech and Web3'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Accordion Skills */}
        <div className='mt-32 md:mt-48' data-reveal ref={containerRef}>
          <h3
            className='font-display font-black uppercase tracking-tight mb-10 text-creative-ink'
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
          >
            {t('coreSkills')}
          </h3>

          <div
            className='flex flex-col md:flex-row w-full md:h-[420px] gap-2'
            onMouseEnter={() => {
              isHoveringRef.current = true
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false
              if (scrollTriggerRef.current) {
                const progress = scrollTriggerRef.current.progress
                const count = skillsData.length
                const index = Math.min(
                  count - 1,
                  Math.max(0, Math.floor(progress * count))
                )
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
                  className={`accordion-panel group flex-1 h-full rounded-2xl border bg-[#080907]/50 backdrop-blur-md relative overflow-hidden cursor-pointer flex items-center justify-center transition-all duration-500 max-md:w-full max-md:h-[72px] max-md:flex-none max-md:justify-start max-md:p-0 max-md:items-stretch ${
                    isCurrent
                      ? 'is-active border-creative-lime/40 shadow-[0_16px_48px_rgba(0,0,0,0.35)]'
                      : 'border-creative-line hover:border-creative-lime/30'
                  }`}
                  role='button'
                  tabIndex={0}
                  aria-expanded={isCurrent}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveIndex(index)
                    }
                  }}
                  onMouseEnter={() => {
                    const isMobile =
                      window.matchMedia('(max-width: 767px)').matches
                    if (!isMobile) setActiveIndex(index)
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Radial glow on active - single lime color */}
                  {isCurrent && (
                    <div
                      className='absolute inset-0 opacity-60 pointer-events-none'
                      style={{
                        background:
                          'radial-gradient(ellipse at 50% 100%, rgba(200, 255, 69, 0.12), transparent 70%)',
                      }}
                    />
                  )}

                  {/* Vertical Title (Desktop collapsed) */}
                  <div className='panel-title--vertical absolute whitespace-nowrap -rotate-90 font-display text-[0.9rem] font-black uppercase tracking-[0.12em] text-creative-dim pointer-events-none origin-center transition-colors duration-300 group-hover:text-creative-ink max-md:hidden'>
                    {skill.label}
                  </div>

                  {/* Mobile collapsed title */}
                  <div
                    className={`panel-header--mobile flex md:hidden items-center gap-4 p-5 w-full h-[72px] absolute top-0 left-0 z-10 pointer-events-none transition-opacity duration-300 ${
                      isCurrent ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <span className='panel-title--mobile-text font-display text-sm font-black uppercase tracking-wider text-creative-ink'>
                      {skill.label}
                    </span>
                  </div>

                  {/* Expanded content */}
                  <div className='panel-content p-8 flex flex-col justify-between h-full w-full absolute inset-0 z-[2] opacity-0 pointer-events-none max-md:p-5 max-md:relative max-md:opacity-100 max-md:pointer-events-auto'>
                    <div className='panel-header flex justify-between items-start w-full'>
                      <div className='w-2 h-2 rounded-full bg-creative-lime mt-2' />
                      <h4
                        className='m-0 font-display font-black uppercase tracking-tight text-creative-ink max-w-[15ch] max-md:max-w-none leading-none max-md:text-left text-right'
                        style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
                      >
                        {skill.label}
                      </h4>
                    </div>
                    <div className='mt-auto w-full'>
                      <p className='m-0 text-body-sm max-md:text-[0.85rem] text-creative-muted leading-[1.65] font-light'>
                        {skill.value}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
