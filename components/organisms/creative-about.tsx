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
          gsap.to(panel, {
            height: isActive ? 220 : 75,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto',
          })

          const content = panel.querySelector('.panel-content')
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
      className='creative-section creative-about'
      data-section
      data-waypoint='about'
    >
      <div className='creative-section__intro creative-about__intro'>
        <p className='creative-kicker' data-reveal>
          {t('title')}
        </p>
        <h2 data-split-line>{t('focus')}</h2>
      </div>

      <div className='about-grid'>
        {/* Left Column: Personal Statement & Keyword Badges */}
        <div className='about-grid__left'>
          <div className='creative-about__statement' data-split-line>
            {t('statement')}
          </div>
          <div className='creative-about__badges' data-reveal>
            {badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        {/* Right Column: Bio paragraph and core metrics stats */}
        <div className='about-grid__right'>
          <p className='about-bio' data-reveal>
            {t('description1')}
          </p>

          <div className='about-stats' data-reveal>
            <div className='stat-card'>
              <span className='stat-card__number'>5+</span>
              <div className='stat-card__meta'>
                <strong>{t('yearsExperience')}</strong>
                <p>{t('yearsDescription')}</p>
              </div>
            </div>

            <div className='stat-card'>
              <span className='stat-card__number'>99%</span>
              <div className='stat-card__meta'>
                <strong>{t('clientSatisfaction')}</strong>
                <p>{t('satisfactionDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive GSAP Expanding Accordion Skills */}
      <div className='about-skills' data-reveal ref={containerRef}>
        <h3 className='about-skills__title'>{t('coreSkills')}</h3>
        <div
          className='about-skills__accordion'
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
                className={`accordion-panel ${isCurrent ? 'is-active' : ''}`}
                style={{
                  ['--panel-accent' as any]: skill.accent,
                  ['--panel-glow' as any]: skill.glow,
                }}
                onMouseEnter={() => {
                  const isMobile = window.matchMedia('(max-width: 767px)').matches
                  if (!isMobile) setActiveIndex(index)
                }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Vertical Title (Desktop collapsed state) */}
                <div className='panel-title--vertical'>
                  {skill.label}
                </div>

                {/* Mobile Title (Mobile collapsed state) */}
                <div className='panel-header--mobile'>
                  <span className='panel-num'>{skill.number}</span>
                  <span className='panel-title--mobile-text'>{skill.label}</span>
                </div>

                {/* Expanded content */}
                <div className='panel-content'>
                  <div className='panel-header'>
                    <span className='panel-num'>{skill.number}</span>
                    <h4 className='panel-title--horizontal'>{skill.label}</h4>
                  </div>
                  <div className='panel-body'>
                    <p>{skill.value}</p>
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
