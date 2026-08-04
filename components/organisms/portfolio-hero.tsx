'use client'

import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'motion/react'
import { useLocale } from '@/hooks/use-locale'
import { MagneticLink } from './magnetic-link'

export interface PortfolioHeroProps {
  email: string
}

const textEase = [0.16, 1, 0.3, 1] as const

const heroStatementByLocale = {
  en: ['Complex products.', 'Simple interfaces.'],
  vi: ['Sản phẩm phức tạp.', 'Giao diện đơn giản.'],
  'zh-TW': ['複雜產品。', '簡潔介面。'],
} as const

export function PortfolioHero({ email }: PortfolioHeroProps) {
  const t = useTranslations('hero')
  const tHeader = useTranslations('header')
  const { locale } = useLocale()
  const reduceMotion = useReducedMotion()
  const lines =
    heroStatementByLocale[locale as keyof typeof heroStatementByLocale] ??
    heroStatementByLocale.en
  const identity = `${t('front')} ${t('middle')} ${t('end')}`

  return (
    <section
      id='top'
      className='mx-auto max-w-[90rem] px-5 pt-16 sm:px-8 lg:px-12'
    >
      <div className='flex min-h-[calc(100dvh-4rem)] flex-col border-b border-portfolio-line py-7 sm:py-9 lg:py-10'>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: textEase }}
          className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3'
        >
          <p className='text-sm font-semibold tracking-[-0.035em] text-portfolio-ink'>
            {identity}
          </p>
          <div className='flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] text-portfolio-dim'>
            <span>{t('developer')}</span>
            <span>React / Next.js / TypeScript</span>
          </div>
        </motion.div>

        <div className='my-auto pt-16 sm:pt-20 lg:pt-24'>
          <h1 className='max-w-[12ch] font-display text-[clamp(4rem,9.4vw,10.2rem)] font-semibold leading-[0.82] tracking-[-0.095em] text-portfolio-ink'>
            {lines.map((line, index) => (
              <span key={line} className='block overflow-hidden pb-2'>
                <motion.span
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: '110%', filter: 'blur(10px)' }
                  }
                  animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.85,
                    delay: 0.08 + index * 0.12,
                    ease: textEase,
                  }}
                  className={
                    index === 1
                      ? 'inline-block text-portfolio-accent-strong'
                      : 'inline-block'
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: textEase }}
          className='grid gap-8 border-t border-portfolio-line pt-7 md:grid-cols-[minmax(0,1.25fr)_minmax(10rem,0.35fr)_auto] md:items-end'
        >
          <p className='max-w-[36rem] text-[1rem] leading-relaxed text-portfolio-muted sm:text-[1.08rem]'>
            {t('description')}
          </p>
          <div className='border-l border-portfolio-line pl-5'>
            <p className='font-display text-4xl font-semibold leading-none tracking-[-0.07em] text-portfolio-ink'>
              5+
            </p>
            <p className='mt-2 font-mono text-[0.68rem] text-portfolio-dim'>
              {t('meta.experienceValue')}
            </p>
          </div>
          <div className='flex flex-wrap gap-3 md:justify-end'>
            <MagneticLink href='#work'>{t('viewWork')}</MagneticLink>
            <MagneticLink href={`mailto:${email}`} variant='dark'>
              {tHeader('contact')}
            </MagneticLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
