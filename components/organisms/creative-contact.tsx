'use client'

import { useTranslations } from 'next-intl'
import { ArrowUpRight, FileText, Github, Linkedin } from 'lucide-react'
import { ScanReveal } from '@/components/molecules/hud-kit'

const ACCENT = '#73ff87'

export function ContactSection({
  email,
  locale,
}: {
  email: string
  locale: string
}) {
  const t = useTranslations()
  const resolvedLocale = locale as 'en' | 'vi' | 'zh-TW'

  const headlineLines: Record<'en' | 'vi' | 'zh-TW', [string, string]> = {
    en: ["LET'S BUILD", 'SOMETHING'],
    vi: ['HÃY XÂY', 'DỰNG GÌ ĐÓ'],
    'zh-TW': ['讓我們', '一起創造'],
  }
  const [line1Text, line2Text] =
    headlineLines[resolvedLocale] ?? headlineLines.en

  return (
    <section
      id='contact'
      data-section
      data-waypoint='contact'
      className='creative-section relative w-full overflow-hidden px-[clamp(1.25rem,6vw,6rem)] py-28 md:py-40'
    >
      <div className='relative z-10 mx-auto w-full max-w-[1400px]'>
        <ScanReveal>
          <div className='flex items-center gap-4'>
            <span
              className='h-2.5 w-2.5 rounded-full'
              style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
            />
            <span className='font-mono text-kicker font-bold uppercase tracking-[0.3em] text-creative-dim'>
              STATION 04 <span className='text-creative-line'>//</span>{' '}
              <span style={{ color: ACCENT }}>OPEN_CHANNEL</span>
            </span>
            <span className='h-px flex-1 bg-gradient-to-r from-creative-line to-transparent' />
          </div>
        </ScanReveal>

        {/* Giant display headline */}
        <ScanReveal delay={80} className='mb-12 mt-10'>
          <div className='overflow-hidden leading-[0.86]'>
            <span
              className='block font-display font-black uppercase tracking-[-0.03em] text-creative-ink'
              style={{ fontSize: 'clamp(3.2rem, 11vw, 10rem)' }}
            >
              {line1Text}
            </span>
          </div>
          <div className='overflow-hidden leading-[0.86]'>
            <span
              className='block pl-[6vw] font-display font-black uppercase tracking-[-0.03em]'
              style={{ fontSize: 'clamp(3.2rem, 11vw, 10rem)', color: ACCENT }}
            >
              {line2Text}
            </span>
          </div>
        </ScanReveal>

        {/* Terminal prompt email */}
        <ScanReveal delay={140} className='mb-20'>
          <div className='hud-panel max-w-[640px] rounded-2xl p-6 font-mono'>
            <p className='m-0 text-meta text-creative-dim'>
              nmhieu@portfolio <span className='text-creative-line'>~</span>{' '}
              <span style={{ color: ACCENT }}>%</span> open --channel
            </p>
            <a
              href={`mailto:${email}`}
              className='group mt-4 flex items-center justify-between gap-4 no-underline'
              aria-label={`Send email to ${email}`}
            >
              <span
                className='font-bold leading-none text-creative-muted transition-colors duration-300 group-hover:text-creative-ink'
                style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.35rem)' }}
              >
                {email}
              </span>
              <span
                className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-creative-bg transition-transform duration-300 group-hover:scale-105'
                style={{ background: ACCENT }}
              >
                <ArrowUpRight
                  className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  aria-hidden='true'
                />
              </span>
            </a>
          </div>
        </ScanReveal>

        {/* Footer strip */}
        <ScanReveal
          delay={200}
          className='flex flex-col gap-8 border-t border-creative-line pt-8 sm:flex-row sm:items-center sm:justify-between'
        >
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2'>
              <span
                className='h-1.5 w-1.5 animate-pulse rounded-full'
                style={{ background: ACCENT }}
                aria-hidden='true'
              />
              <span className='font-mono text-kicker font-bold uppercase tracking-[0.18em] text-creative-dim'>
                {t('hero.contact.basedIn')} {t('hero.contact.location')}
              </span>
            </div>
            <span className='font-mono text-meta uppercase tracking-widest text-creative-line'>
              {t('hero.meta.availabilityValue')}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <a
              href='https://github.com/nmhieu1896'
              target='_blank'
              rel='noreferrer'
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-creative-line text-creative-dim no-underline transition-all duration-300 hover:border-creative-green/40 hover:text-creative-ink'
              aria-label='GitHub profile'
            >
              <Github className='h-4 w-4' aria-hidden='true' />
            </a>
            <a
              href='https://www.linkedin.com/in/hieunm09/'
              target='_blank'
              rel='noreferrer'
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-creative-line text-creative-dim no-underline transition-all duration-300 hover:border-creative-green/40 hover:text-creative-ink'
              aria-label='LinkedIn profile'
            >
              <Linkedin className='h-4 w-4' aria-hidden='true' />
            </a>
            <a
              href='/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
              download
              className='inline-flex h-9 items-center gap-2 rounded-full border border-creative-line px-4 font-mono text-kicker font-bold uppercase tracking-[0.14em] text-creative-dim no-underline transition-all duration-300 hover:border-creative-green/40 hover:text-creative-green'
            >
              <FileText className='h-3.5 w-3.5' aria-hidden='true' />
              {t('header.downloadResume')}
            </a>
          </div>
        </ScanReveal>

        <p className='m-0 mt-8 font-mono text-meta uppercase tracking-widest text-creative-line'>
          © 2026 Nguyen Minh Hieu
        </p>
      </div>
    </section>
  )
}
