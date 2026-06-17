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
      className='creative-section creative-experience'
      data-section
      data-waypoint='experience'
    >
      <div className='creative-section__intro'>
        <p className='creative-kicker' data-reveal>
          {t('kicker')}
        </p>
        <h2 data-split-line data-experience-title>
          {t('headline')}
        </h2>
      </div>

      <div className='experience-timeline'>
        {orderedExperiences.map((experience, index) => {
          const descriptionLines = splitExperienceDescription(experience.description)
          const isExpanded = expandedId === experience.id

          return (
            <article
              key={experience.id}
              className={`experience-row cursor-pointer transition-all duration-300 group/row ${
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
              <span className='experience-row__scan' data-experience-scan />

              <div className='experience-row__meta' data-experience-meta>
                <div className='flex items-center gap-3'>
                  <span className='experience-row__index'>{String(index + 1).padStart(2, '0')}</span>
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
                <strong>{experience.period}</strong>
                <small>{experience.location}</small>
              </div>

              <div className='experience-row__body w-full'>
                <div className='experience-row__heading flex items-start justify-between gap-6 w-full'>
                  <div>
                    <h3 data-experience-company>{experience.company}</h3>
                    <p data-experience-role>{experience.position}</p>
                  </div>
                  <div className='experience-row__toggle-btn shrink-0' aria-hidden='true'>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                <div
                  className={`experience-row__collapsible ${
                    isExpanded ? 'experience-row__collapsible--expanded' : ''
                  }`}
                >
                  <div className='experience-row__collapsible-inner'>
                    <div className='experience-row__copy'>
                      {descriptionLines.map((line) => (
                        <p key={line} data-experience-copy>
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className='experience-row__skills'>
                      {experience.skills.map((skill) => (
                        <span key={skill} data-experience-skill>
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
