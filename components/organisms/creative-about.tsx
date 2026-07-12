'use client'

import { useTranslations } from 'next-intl'
import { ScanReveal, StationHeader } from '@/components/molecules/hud-kit'

const ACCENT = '#ff8a3d'

type SkillRow = { label: string; value: string }

/** Split a statement into its opening sentence and the remainder. */
function splitLead(text: string): [string, string] {
  const clean = text.replace(/\s+/g, ' ').trim()
  const idx = clean.search(/[.。!?]\s/)
  if (idx === -1) return [clean, '']
  return [clean.slice(0, idx + 1), clean.slice(idx + 1).trim()]
}

export function AboutSection() {
  const t = useTranslations('about')
  const skillList = t.raw('skillList') as Record<string, SkillRow>
  const badges = t.raw('badges') as string[]
  const rows = Object.values(skillList)
  const [lead, rest] = splitLead(t('statement'))

  return (
    <section
      id='about'
      data-section
      data-waypoint='about'
      className='creative-section relative w-full px-[clamp(1.25rem,6vw,6rem)] py-28 md:py-40'
    >
      <div className='mx-auto w-full max-w-[1400px]'>
        <StationHeader
          index={1}
          label='ABOUT'
          title={t('title')}
          accent={ACCENT}
        />

        {/* Two-tone statement — the lead sentence bright, the rest receding */}
        <ScanReveal>
          <p
            className='max-w-[24ch] font-display font-bold leading-[1.06] tracking-[-0.02em]'
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.4rem)' }}
          >
            <span className='text-creative-ink'>{lead}</span>{' '}
            <span className='text-creative-dim'>{rest}</span>
          </p>
        </ScanReveal>

        <div className='mt-16 grid gap-x-16 gap-y-14 border-t border-creative-line pt-14 lg:grid-cols-[0.9fr_1.1fr]'>
          {/* Profile · stats · badges */}
          <ScanReveal className='flex flex-col gap-12'>
            <div>
              <span className='font-mono text-meta uppercase tracking-[0.24em] text-creative-dim'>
                // PROFILE
              </span>
              <p className='mt-6 max-w-[44ch] font-body text-body-md leading-relaxed text-creative-muted'>
                {t('description1')}
              </p>
            </div>

            {/* Stats — focal, divided by a hairline */}
            <div className='flex items-stretch gap-10'>
              <div>
                <div
                  className='font-display font-black leading-none'
                  style={{
                    color: ACCENT,
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                  }}
                >
                  5+
                </div>
                <div className='mt-3 max-w-[16ch] font-mono text-meta uppercase leading-snug tracking-[0.14em] text-creative-dim'>
                  {t('yearsExperience')}
                </div>
              </div>
              <div className='w-px self-stretch bg-creative-line' />
              <div>
                <div
                  className='font-display font-black leading-none'
                  style={{
                    color: ACCENT,
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                  }}
                >
                  100%
                </div>
                <div className='mt-3 max-w-[16ch] font-mono text-meta uppercase leading-snug tracking-[0.14em] text-creative-dim'>
                  {t('clientSatisfaction')}
                </div>
              </div>
            </div>

            {/* Badges — slash-separated inline */}
            <div className='flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-meta uppercase tracking-[0.14em] text-creative-muted'>
              {badges.map((badge, i) => (
                <span key={badge} className='flex items-center gap-3'>
                  {i > 0 && <span className='text-creative-line'>/</span>}
                  {badge}
                </span>
              ))}
            </div>
          </ScanReveal>

          {/* Stack readout — amber labels, editorial values, airy rows */}
          <ScanReveal delay={120}>
            <span className='font-mono text-meta uppercase tracking-[0.24em] text-creative-dim'>
              // STACK
            </span>
            <dl className='mt-6'>
              {rows.map((row) => (
                <div
                  key={row.label}
                  className='grid gap-1.5 border-t border-creative-line py-5 md:grid-cols-[160px_1fr] md:gap-8'
                >
                  <dt
                    className='font-mono text-meta font-bold uppercase tracking-[0.14em]'
                    style={{ color: ACCENT }}
                  >
                    {row.label}
                  </dt>
                  <dd className='font-body text-body-sm leading-relaxed text-creative-muted'>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScanReveal>
        </div>
      </div>
    </section>
  )
}
