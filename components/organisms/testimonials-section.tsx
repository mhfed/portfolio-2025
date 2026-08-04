'use client'

import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ScanReveal, SectionHeader } from '@/components/molecules/reveal-kit'

export function TestimonialsSection() {
  const tHeader = useTranslations('header')
  const t = useTranslations('references')
  const referenceAreas = [
    {
      title: t('storefront.title'),
      description: t('storefront.description'),
    },
    {
      title: t('fintech.title'),
      description: t('fintech.description'),
    },
    {
      title: t('systems.title'),
      description: t('systems.description'),
    },
  ]

  return (
    <section className='mx-auto max-w-[90rem] px-5 py-28 sm:px-8 md:py-36 lg:px-12'>
      <SectionHeader title={t('title')} description={t('description')} />
      <div className='grid gap-x-10 gap-y-12 lg:grid-cols-12'>
        <ScanReveal className='lg:col-span-7'>
          <article className='flex min-h-[21rem] flex-col justify-between border-y border-portfolio-line py-7 sm:py-9'>
            <p className='max-w-[17ch] font-display text-[clamp(2.25rem,4.5vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-portfolio-ink'>
              {t('statement')}
            </p>
            <a
              href='#contact'
              className='group mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-portfolio-ink no-underline transition-colors hover:text-portfolio-accent'
            >
              {tHeader('contact')}
              <ArrowUpRight
                size={16}
                className='transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                aria-hidden='true'
              />
            </a>
          </article>
        </ScanReveal>
        <div className='grid lg:col-span-5'>
          {referenceAreas.slice(0, 2).map((area, index) => (
            <ScanReveal key={area.title} delay={(index + 1) * 80}>
              <article className='border-t border-portfolio-line py-6'>
                <h3 className='text-lg font-semibold tracking-[-0.04em] text-portfolio-ink'>
                  {area.title}
                </h3>
                <p className='mt-3 text-sm leading-relaxed text-portfolio-muted'>
                  {area.description}
                </p>
              </article>
            </ScanReveal>
          ))}
        </div>
        <ScanReveal delay={210} className='lg:col-span-12'>
          <article className='border-t border-portfolio-line pt-7'>
            <div className='grid gap-3 sm:grid-cols-[minmax(14rem,0.35fr)_1fr] sm:items-start sm:gap-10'>
              <h3 className='text-lg font-semibold tracking-[-0.04em] text-portfolio-ink'>
                {referenceAreas[2].title}
              </h3>
              <p className='max-w-[46rem] text-sm leading-relaxed text-portfolio-muted'>
                {referenceAreas[2].description}
              </p>
            </div>
          </article>
        </ScanReveal>
      </div>
    </section>
  )
}
