'use client'

import { useTranslations } from 'next-intl'
import { ScanReveal, SectionHeader } from '@/components/molecules/reveal-kit'
import type { ExperienceRecord } from '@/types/experience'

function summarize(text: string): string {
  const clean = text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const end = clean.search(/[.。!?]\s/)
  return end === -1 ? clean : clean.slice(0, end + 1)
}

export interface ExperienceSectionProps {
  experiences: ExperienceRecord[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const t = useTranslations('experience')
  const roles = [...experiences].reverse()

  return (
    <section
      id='experience'
      className='mx-auto max-w-[90rem] px-5 py-28 sm:px-8 md:py-36 lg:px-12'
    >
      <SectionHeader
        title={<span className='whitespace-pre-line'>{t('title')}</span>}
        description={t('headline')}
      />

      {roles.length === 0 ? (
        <p className='text-portfolio-muted'>{t('noExperience')}</p>
      ) : (
        <div className='grid gap-10 lg:grid-cols-[minmax(15rem,0.36fr)_minmax(0,1fr)] lg:gap-16'>
          <ScanReveal className='hidden lg:block'>
            <aside className='sticky top-28 border-l border-portfolio-line pl-6'>
              <p className='text-lg font-semibold tracking-[-0.035em] text-portfolio-ink'>
                Product surfaces that need equal parts craft and reliability.
              </p>
              <p className='mt-5 text-sm leading-relaxed text-portfolio-muted'>
                My work moves between customer-facing products, high-trust
                financial flows, and systems used by teams every day.
              </p>
            </aside>
          </ScanReveal>

          <ol className='relative border-l border-portfolio-line pl-6 sm:pl-9'>
            {roles.map((role, index) => (
              <ScanReveal key={role.id} delay={index * 70}>
                <li className='relative'>
                  <span
                    className='absolute -left-[1.85rem] top-7 h-2.5 w-2.5 rounded-full border-2 border-portfolio-bg bg-portfolio-accent sm:-left-[2.6rem]'
                    aria-hidden='true'
                  />
                  <article className='border-t border-portfolio-line py-7 sm:py-9'>
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                      <div>
                        <p className='font-mono text-xs text-portfolio-accent'>
                          {role.period}
                        </p>
                        <h3 className='mt-3 font-display text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-portfolio-ink'>
                          {role.company}
                        </h3>
                        <p className='mt-3 text-base font-medium text-portfolio-muted'>
                          {role.position}
                        </p>
                      </div>
                      <p className='shrink-0 text-sm text-portfolio-dim'>
                        {role.location}
                      </p>
                    </div>
                    <p className='mt-6 max-w-[46rem] text-[0.98rem] leading-relaxed text-portfolio-muted'>
                      {summarize(role.description)}
                    </p>
                    <p className='mt-6 font-mono text-[0.7rem] leading-relaxed text-portfolio-dim'>
                      {role.skills.slice(0, 5).join(' / ')}
                    </p>
                  </article>
                </li>
              </ScanReveal>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
