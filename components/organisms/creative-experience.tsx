'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ExperienceRecord } from '@/types/experience'
import { ScanReveal, StationHeader } from '@/components/molecules/hud-kit'
import { hudFocus } from '@/lib/hud-focus'
import { cn } from '@/lib/utils'

const ACCENT = '#73ff87'
const MAX_SKILLS = 6

/** Reduce a verbose paragraph to a single concise sentence. */
function summarize(text: string): string {
  const clean = text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const idx = clean.search(/[.。!?]\s/)
  return idx === -1 ? clean : clean.slice(0, idx + 1)
}

export function ExperienceSection({
  experiences,
}: {
  experiences: ExperienceRecord[]
}) {
  const t = useTranslations('experience')
  const log = [...experiences].reverse()
  const [active, setActive] = useState(0)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll-driven: whichever role crosses the vertical center becomes active —
  // its 2D card holds full focus while the rest recede, and the matching spine
  // node lights up in the 3D world (via the shared hudFocus bridge).
  useEffect(() => {
    const els = blockRefs.current.filter(Boolean) as HTMLDivElement[]
    if (els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(i)) setActive(i)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [log.length])

  useEffect(() => {
    hudFocus.experience = active
  }, [active])

  return (
    <section
      id='experience'
      data-section
      data-waypoint='experience'
      className='creative-section relative w-full px-[clamp(1.25rem,6vw,6rem)] py-28 md:py-40'
    >
      <div className='mx-auto w-full max-w-[1400px]'>
        <StationHeader
          index={2}
          label='EXPERIENCE'
          title={<span className='whitespace-pre-line'>{t('title')}</span>}
          accent={ACCENT}
        />

        {log.length === 0 ? (
          <p className='font-mono text-creative-dim'>{t('noExperience')}</p>
        ) : (
          <div className='relative ml-1 border-l border-creative-line pl-8 md:pl-12'>
            {log.map((role, i) => {
              const tag = `LOG_${String(log.length - i).padStart(2, '0')}`
              return (
                <div
                  key={role.id}
                  ref={(el) => {
                    blockRefs.current[i] = el
                  }}
                  data-index={i}
                  className={cn(
                    'transition-opacity duration-500',
                    i === active ? 'opacity-100' : 'md:opacity-35'
                  )}
                >
                <ScanReveal
                  delay={i * 80}
                  className='relative pb-14 last:pb-0'
                >
                  {/* rail node */}
                  <span
                    className='absolute -left-[calc(2rem+7px)] top-1.5 h-3 w-3 rounded-full md:-left-[calc(3rem+7px)]'
                    style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
                    aria-hidden='true'
                  />
                  <div className='grid gap-4 md:grid-cols-[180px_1fr] md:gap-10'>
                    <div className='flex flex-col gap-1'>
                      <span className='font-mono text-meta uppercase tracking-[0.16em] text-creative-dim'>
                        {tag}
                      </span>
                      <span
                        className='font-mono text-meta tabular-nums'
                        style={{ color: ACCENT }}
                      >
                        {role.period}
                      </span>
                      <span className='font-mono text-meta uppercase tracking-wider text-creative-dim'>
                        {role.location}
                      </span>
                    </div>

                    <div>
                      <h3 className='m-0 font-display text-company-title-xs font-black uppercase leading-none tracking-[-0.02em] text-creative-ink md:text-[clamp(1.8rem,3.2vw,3rem)]'>
                        {role.company}
                      </h3>
                      <p
                        className='mt-2 font-mono text-meta font-bold uppercase tracking-[0.12em]'
                        style={{ color: ACCENT }}
                      >
                        {role.position}
                      </p>
                      <p className='mt-4 line-clamp-2 max-w-[60ch] font-body text-body-sm leading-relaxed text-creative-muted'>
                        {summarize(role.description)}
                      </p>
                      <div className='mt-5 flex flex-wrap items-center gap-2'>
                        {role.skills.slice(0, MAX_SKILLS).map((skill) => (
                          <span
                            key={skill}
                            className='rounded border border-creative-line bg-white/[0.02] px-2.5 py-1 font-mono text-[0.72rem] font-bold uppercase tracking-wide text-creative-dim'
                          >
                            {skill}
                          </span>
                        ))}
                        {role.skills.length > MAX_SKILLS && (
                          <span className='font-mono text-[0.72rem] font-bold text-creative-dim'>
                            +{role.skills.length - MAX_SKILLS}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </ScanReveal>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
