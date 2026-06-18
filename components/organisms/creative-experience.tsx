'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ExperienceRecord } from '@/types/experience'
import { loadGSAP } from '@/lib/gsap-utils'

// ─────────────────────────────────────────────
// Description line formatter
// ─────────────────────────────────────────────

function splitLines(raw: string): string[] {
  return raw
    .split(/<br\s*\/?>|\n/gi)
    .map((l) => l.trim())
    .filter(Boolean)
}

// ─────────────────────────────────────────────
// Single experience row — always visible
// ─────────────────────────────────────────────

interface ExperienceRowProps {
  experience: ExperienceRecord
  index: number
  total: number
}

function ExperienceRow({ experience, index, total }: ExperienceRowProps) {
  const tCommon = useTranslations('common')
  const [isExpanded, setIsExpanded] = useState(false)
  const lines = splitLines(experience.description)
  const isLast = index === total - 1
  const hasMore = lines.length > 2
  const visibleLines = isExpanded ? lines : lines.slice(0, 2)

  return (
    <div
      data-exp-row
      className='relative grid grid-cols-1 gap-6 py-12 lg:grid-cols-[160px_1fr_1fr] lg:gap-10 lg:py-14'
      style={{
        borderBottom: isLast ? '1px solid rgba(248,248,245,0.08)' : 'none',
      }}
    >
      <div className='absolute top-0 left-0 h-[1px] bg-white/8 w-0 exp-row-line' />
      {/* Left: index + period */}
      <div
        data-exp-col-1
        className='flex flex-row items-start justify-between lg:flex-col lg:justify-start lg:gap-3'
      >
        <span
          className='select-none font-mono font-black leading-none text-creative-line'
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          aria-hidden='true'
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className='font-mono text-meta font-bold uppercase tracking-[0.18em] text-creative-dim lg:mt-auto'>
          {experience.period}
        </span>
      </div>

      {/* Middle: company + position + description */}
      <div data-exp-col-2 className='flex flex-col gap-4'>
        {/* Lime accent line */}
        <div
          className='h-[2px] w-10'
          style={{ background: 'var(--creative-lime)' }}
          aria-hidden='true'
        />

        <h3
          className='m-0 font-display font-black uppercase leading-[1.0] tracking-[-0.02em] text-creative-ink'
          style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}
        >
          {experience.company}
        </h3>

        <p className='m-0 font-mono text-meta font-bold uppercase tracking-wider text-creative-line'>
          {experience.position}
        </p>

        {visibleLines.length > 0 && (
          <div className='mt-2 flex flex-col gap-2.5'>
            {visibleLines.map((line, i) => {
              const colon = line.indexOf(':')
              if (colon > 0 && colon < 50) {
                const label = line.substring(0, colon)
                const body = line.substring(colon + 1).trim()
                return (
                  <p
                    key={i}
                    className='m-0 text-body-sm max-w-prose leading-[1.7] text-creative-muted'
                  >
                    <span className='mr-1.5 font-mono text-kicker font-bold uppercase tracking-widest text-[var(--creative-lime)]'>
                      {label}:
                    </span>
                    {body}
                  </p>
                )
              }
              return (
                <p
                  key={i}
                  className='m-0 text-body-sm max-w-prose leading-[1.7] text-creative-muted'
                >
                  {line}
                </p>
              )
            })}
          </div>
        )}

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='mt-2 self-start font-mono text-meta font-bold uppercase tracking-wider text-[var(--creative-lime)] hover:text-creative-ink transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--creative-lime)]/50 rounded px-2.5 py-1 bg-white/[0.02] border border-white/5 hover:border-[var(--creative-lime)]/30'
          >
            {isExpanded ? tCommon('showLess') : tCommon('seeMore')}
          </button>
        )}
      </div>

      {/* Right: location + skills */}
      <div data-exp-col-3 className='flex flex-col justify-between gap-6'>
        {experience.location && (
          <p className='m-0 font-mono text-meta uppercase tracking-widest text-creative-dim lg:text-right'>
            {experience.location}
          </p>
        )}

        <div className='mt-auto flex flex-wrap gap-1.5 lg:justify-end'>
          {experience.skills.slice(0, 7).map((skill) => (
            <span
              key={skill}
              className='rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-meta font-bold uppercase tracking-wide text-creative-dim'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// ExperienceSection
// ─────────────────────────────────────────────

export function ExperienceSection({
  experiences,
}: {
  experiences: ExperienceRecord[]
}) {
  const t = useTranslations('experience')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let active = true
    const triggers: { kill: () => void }[] = []

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      // Section headline entrance
      const headline = section.querySelector('[data-exp-headline]')
      if (headline) {
        gsap.set(headline, { yPercent: 30, opacity: 0 })
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            gsap.to(headline, {
              yPercent: 0,
              opacity: 1,
              duration: 1,
              ease: 'power4.out',
            })
          },
        })
        triggers.push(st)
      }

      // Each row staggers in as it enters viewport
      const rows = gsap.utils.toArray<HTMLElement>('[data-exp-row]', section)

      rows.forEach((row) => {
        const cols = row.querySelectorAll(
          '[data-exp-col-1], [data-exp-col-2], [data-exp-col-3]'
        )
        const line = row.querySelector('.exp-row-line')

        gsap.set(cols, { y: 20, opacity: 0 })
        if (line) gsap.set(line, { width: '0%' })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            once: true,
          },
        })

        if (tl.scrollTrigger) {
          triggers.push(tl.scrollTrigger)
        }

        if (line) {
          tl.to(line, {
            width: '100%',
            duration: 0.9,
            ease: 'power2.out',
          })
        }

        tl.to(
          cols,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          },
          line ? '-=0.65' : 0
        )
      })

      ScrollTrigger.refresh()
    })

    return () => {
      active = false
      triggers.forEach((t) => t.kill())
    }
  }, [experiences.length])

  return (
    <section
      id='experience'
      ref={sectionRef}
      className='creative-section w-full py-20 md:py-32'
      data-section
      data-waypoint='experience'
    >
      <div className='mx-auto w-full px-[clamp(1.25rem,6vw,6rem)]'>
        {/* Section header */}
        <div
          className='mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'
          data-exp-headline
        >
          <div>
            <p className='m-0 mb-4 font-mono text-kicker font-bold uppercase tracking-[0.24em] text-creative-dim'>
              {t('kicker')}
            </p>
            <h2
              className='m-0 font-display font-black uppercase leading-[0.92] tracking-[-0.03em] text-creative-ink'
              style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)' }}
            >
              {t('title').replace(/\n/g, ' ')}
            </h2>
          </div>
          <p className='m-0 max-w-[44ch] text-body-sm font-light leading-relaxed text-creative-muted lg:text-right'>
            {t('headline')}
          </p>
        </div>

        {/* Timeline list — all rows always visible, scroll-staggered */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceRow
              key={exp.id}
              experience={exp}
              index={i}
              total={experiences.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
