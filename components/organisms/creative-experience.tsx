'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import type { ExperienceRecord } from '@/types/experience'
import { loadGSAP } from '@/lib/gsap-utils'

function splitExperienceDescription(description: string) {
  return description
    .split(/<br\s*\/?>|\n/gi)
    .map((line) => line.trim())
    .filter(Boolean)
}

export function ExperienceSection({ experiences }: { experiences: ExperienceRecord[] }) {
  const t = useTranslations('experience')
  const orderedExperiences = [...experiences].reverse()

  const [expandedId, setExpandedId] = useState<string | number | null>(
    orderedExperiences[0]?.id || null
  )

  const toggleExpand = (id: string | number) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  // Automatically refresh GSAP ScrollTrigger when layout shifts
  useEffect(() => {
    let active = true
    let observer: ResizeObserver | null = null

    loadGSAP().then(({ ScrollTrigger }) => {
      if (!active) return
      
      observer = new ResizeObserver(() => {
        ScrollTrigger.refresh()
      })

      const container = document.querySelector('.experience-timeline')
      if (container) {
        observer.observe(container)
      }
    })

    return () => {
      active = false
      observer?.disconnect()
    }
  }, [])

  return (
    <section
      id='experience'
      className='creative-section creative-experience w-full max-w-screen-2xl mx-auto px-[clamp(1rem,4vw,4rem)] py-[clamp(3.5rem,8vw,8rem)]'
      data-section
      data-waypoint='experience'
    >
      <div className='creative-section__intro grid grid-cols-1 lg:grid-cols-[minmax(10rem,0.48fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,6rem)] items-start mb-[clamp(2rem,4vw,4rem)]'>
        <p className='creative-kicker max-w-[34rem] text-creative-muted font-mono text-kicker font-extrabold tracking-widest leading-relaxed uppercase' data-reveal>
          {t('kicker')}
        </p>
        <h2 data-split-line data-experience-title className="m-0 text-creative-ink font-display text-display-sm max-sm:text-display-sm-xs font-black tracking-tight leading-[1.15] uppercase [text-wrap:balance] max-w-none">
          {t('headline')}
        </h2>
      </div>

      <div className='experience-timeline border-t border-creative-line'>
        {orderedExperiences.map((experience, index) => {
          const descriptionLines = splitExperienceDescription(experience.description)
          const isExpanded = expandedId === experience.id

          return (
            <article
              key={experience.id}
              className={`experience-row group/row cursor-pointer transition-all duration-300 relative grid grid-cols-1 lg:grid-cols-[minmax(9rem,0.32fr)_1fr] gap-6 lg:gap-[clamp(1.5rem,5vw,5rem)] overflow-hidden border-b border-creative-line py-[clamp(1.5rem,3vw,3rem)] max-sm:py-10 [perspective:1200px] [transform-style:preserve-3d] [will-change:transform] after:content-[''] after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:bg-[radial-gradient(circle_at_76%_22%,rgba(200,255,69,0.08),transparent_22rem),linear-gradient(90deg,rgba(200,255,69,0.035),transparent_45%)] hover:after:opacity-100 after:transition-opacity after:duration-320 ${
                isExpanded ? 'is-expanded' : ''
              }`}
              data-experience-row
              onClick={() => toggleExpand(experience.id)}
              role='button'
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleExpand(experience.id)
                }
              }}
            >
              <span className='experience-row__scan absolute top-[-1px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-creative-lime/72 to-transparent shadow-[0_0_28px_rgba(200,255,69,0.38)] scale-x-0 origin-left pointer-events-none' data-experience-scan />

              <div className='experience-row__meta grid lg:grid-cols-1 lg:align-content-start flex flex-wrap items-center gap-[0.65rem] max-lg:gap-2.5 text-creative-muted font-mono uppercase' data-experience-meta>
                <div className='flex items-center gap-3'>
                  <span className='experience-row__index text-current font-mono text-[0.85rem] font-black opacity-55'>{String(index + 1).padStart(2, '0')}</span>
                  {experience.period.toLowerCase().includes('present') ||
                  experience.period.toLowerCase().includes('hiện tại') ||
                  experience.period.toLowerCase().includes('至今') ? (
                    <span
                      className='w-2 h-2 rounded-full bg-creative-lime shadow-[0_0_8px_var(--creative-lime)] animate-pulse'
                      aria-label='Current Role'
                    />
                  ) : (
                    <span className='w-1.5 h-1.5 rounded-full bg-creative-dim' />
                  )}
                </div>
                <strong className="text-creative-ink text-meta font-black leading-[1.35]">{experience.period}</strong>
                <small className="text-creative-dim text-[0.72rem] font-black tracking-widest">{experience.location}</small>
              </div>

              <div className='experience-row__body w-full grid gap-[clamp(1rem,2vw,1.5rem)]'>
                <div className='experience-row__heading flex items-start justify-between gap-6 w-full'>
                  <div>
                    <h3 data-experience-company className="m-0 text-creative-ink font-display text-company-title max-sm:text-company-title-xs font-black tracking-normal leading-[0.95] uppercase [will-change:transform,opacity] transition-[color,transform] duration-420 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/row:text-creative-lime group-hover/row:translate-x-[0.35rem]">{experience.company}</h3>
                    <p data-experience-role className="m-0 text-creative-lime text-role-title font-semibold leading-normal">{experience.position}</p>
                  </div>
                  <div className='experience-row__toggle-btn flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(243,240,223,0.15)] text-creative-muted bg-[rgba(243,240,223,0.03)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] mt-1 shrink-0 group-hover/row:border-creative-lime group-hover/row:text-[#080907] group-hover/row:bg-creative-lime group-hover/row:scale-105' aria-hidden='true'>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                <div
                  className={`experience-row__collapsible grid transition-[grid-template-rows,opacity,margin-top] duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] overflow-hidden motion-reduce:transition-none ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-[clamp(1rem,2vw,1.5rem)]' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className='experience-row__collapsible-inner min-height-0 grid gap-[clamp(1rem,2vw,1.5rem)]'>
                    <div className='experience-row__copy grid gap-3 max-w-[42rem]'>
                      {descriptionLines.map((line) => (
                        <p key={line} data-experience-copy className="m-0 text-creative-muted text-body-md font-light leading-[1.62] [will-change:transform,opacity]">
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className='experience-row__skills flex flex-wrap gap-2'>
                      {experience.skills.map((skill) => (
                        <span key={skill} data-experience-skill className="border border-[rgba(243,240,223,0.22)] rounded-full px-2 py-1.5 text-creative-muted font-mono text-[0.72rem] font-black tracking-wider leading-none uppercase [will-change:transform,opacity] transition-[border-color,color,background-color,transform] duration-[220ms] hover:duration-[260ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/row:border-creative-lime/42 group-hover/row:text-creative-lime group-hover/row:-translate-y-[2px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

