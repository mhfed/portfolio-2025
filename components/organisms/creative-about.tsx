'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { ScanReveal, SectionHeader } from '@/components/molecules/reveal-kit'

type SkillRow = { label: string; value: string }

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.7 })
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setCount(value)
      return
    }

    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    })

    return () => controls.stop()
  }, [inView, reduceMotion, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function AboutSection() {
  const t = useTranslations('about')
  const skillList = t.raw('skillList') as Record<string, SkillRow>
  const rows = Object.values(skillList).slice(0, 3)

  return (
    <section
      id='about'
      className='mx-auto max-w-[90rem] px-5 py-28 sm:px-8 md:py-36 lg:px-12'
    >
      <SectionHeader title={t('title')} />
      <div className='grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(26rem,0.74fr)] lg:gap-20'>
        <ScanReveal>
          <p className='max-w-[21ch] font-display text-[clamp(2.6rem,4vw,4.6rem)] font-semibold leading-[0.93] tracking-[-0.072em] text-portfolio-ink'>
            {t('statement')}
          </p>
          <p className='mt-8 max-w-[40rem] text-[1.05rem] leading-relaxed text-portfolio-muted'>
            {t('description1')}
          </p>
        </ScanReveal>

        <div className='space-y-10'>
          <ScanReveal delay={90}>
            <div className='border-y border-portfolio-line py-7'>
              <div className='grid gap-7 sm:grid-cols-2'>
                <div>
                  <p className='font-display text-[clamp(3.6rem,6vw,5.4rem)] font-semibold leading-none tracking-[-0.08em] text-portfolio-accent'>
                    <CountUp value={5} suffix='+' />
                  </p>
                  <p className='mt-3 text-sm leading-relaxed text-portfolio-muted'>
                    {t('yearsExperience')}
                  </p>
                </div>
                <div className='border-t border-portfolio-line pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0'>
                  <p className='font-display text-[clamp(3.6rem,6vw,5.4rem)] font-semibold leading-none tracking-[-0.08em] text-portfolio-accent-strong'>
                    <CountUp value={90} suffix='+' />
                  </p>
                  <p className='mt-3 text-sm leading-relaxed text-portfolio-muted'>
                    {t('storefrontResult')}
                  </p>
                </div>
              </div>
            </div>
          </ScanReveal>

          <ScanReveal delay={150}>
            <div className='border-t border-portfolio-line pt-7'>
              <p className='text-sm font-semibold text-portfolio-ink'>
                {t('coreSkills')}
              </p>
              <dl className='mt-5 grid gap-6'>
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className='grid gap-1.5 sm:grid-cols-[8.5rem_1fr] sm:gap-6'
                  >
                    <dt className='font-mono text-xs text-portfolio-accent'>
                      {row.label}
                    </dt>
                    <dd className='text-sm leading-relaxed text-portfolio-muted'>
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScanReveal>
        </div>
      </div>
    </section>
  )
}
