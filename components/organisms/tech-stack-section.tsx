'use client'

import { useTranslations } from 'next-intl'
import { ScanReveal, SectionHeader } from '@/components/molecules/reveal-kit'
import { skillGroups } from '@/data/skills'
import { cn } from '@/lib/utils'

const gridClasses: Record<(typeof skillGroups)[number]['id'], string> = {
  core: 'lg:col-span-7 lg:row-span-2',
  ui: 'lg:col-span-5',
  motion: 'lg:col-span-5',
  backend: 'lg:col-span-5',
  tooling: 'lg:col-span-7',
}

export function TechStackSection() {
  const t = useTranslations('skills')

  return (
    <section
      id='skills'
      className='mx-auto max-w-[90rem] px-5 py-28 sm:px-8 md:py-36 lg:px-12'
    >
      <SectionHeader title={t('headline')} />
      <div className='grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-12'>
        {skillGroups.map((group, index) => (
          <ScanReveal
            key={group.id}
            delay={index * 60}
            className={cn('min-h-full', gridClasses[group.id])}
          >
            <article className='flex h-full min-h-52 flex-col border-t border-portfolio-line pt-5'>
              <p className='font-mono text-xs text-portfolio-accent'>
                {group.label}
              </p>
              <h3 className='mt-5 max-w-[14ch] font-display text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-portfolio-ink'>
                {group.signal}
              </h3>
              <div className='mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-8'>
                {group.skills.map((skill) => (
                  <span key={skill} className='text-sm text-portfolio-muted'>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </ScanReveal>
        ))}
      </div>
    </section>
  )
}
