'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight, Github, Linkedin, FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { loadGSAP } from '@/lib/gsap-utils'

export function ContactSection({
  email,
  locale,
}: {
  email: string
  locale: string
}) {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let active = true

    loadGSAP().then(({ gsap }) => {
      if (!active) return

      const line1 = section.querySelector('[data-contact-line1]')
      const line2 = section.querySelector('[data-contact-line2]')
      const emailEl = section.querySelector('[data-contact-email]')
      const footer = section.querySelector('[data-contact-footer]')

      // Set initial states
      if (line1) gsap.set(line1, { yPercent: 110 })
      if (line2) gsap.set(line2, { yPercent: 110 })
      if (emailEl) gsap.set(emailEl, { y: 40, opacity: 0 })
      if (footer) gsap.set(footer, { y: 24, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      if (line1) {
        tl.to(line1, { yPercent: 0, duration: 1.0, ease: 'power4.out' })
      }
      if (line2) {
        tl.to(
          line2,
          { yPercent: 0, duration: 1.0, ease: 'power4.out' },
          '-=0.75'
        )
      }
      if (emailEl) {
        tl.to(
          emailEl,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
      }
      if (footer) {
        tl.to(
          footer,
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.35'
        )
      }
    })

    return () => {
      active = false
    }
  }, [])

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
      ref={sectionRef}
      className='creative-section relative w-full overflow-hidden py-20 md:py-32'
      data-section
      data-waypoint='contact'
    >
      {/* Ambient radial — bottom center */}
      <div
        className='pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[60vh] w-[80vw]'
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(200,255,69,0.05) 0%, transparent 65%)',
        }}
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto w-full px-[clamp(1.25rem,6vw,6rem)]'>
        {/* Kicker */}
        <p className='m-0 mb-8 font-mono text-kicker font-bold uppercase tracking-[0.24em] text-creative-dim'>
          {t('header.contact')}
        </p>

        {/* Giant display headline */}
        <div className='mb-14'>
          <div className='overflow-hidden leading-[0.88]'>
            <div
              data-contact-line1
              className='font-display font-black uppercase tracking-[-0.03em] text-creative-ink'
              style={{ fontSize: 'clamp(4rem, 11vw, 10rem)' }}
            >
              {line1Text}
            </div>
          </div>
          <div className='overflow-hidden leading-[0.88]'>
            <div
              data-contact-line2
              className='font-display font-black uppercase tracking-[-0.03em] pl-[6vw]'
              style={{
                fontSize: 'clamp(4rem, 11vw, 10rem)',
                color: 'var(--creative-lime)',
              }}
            >
              {line2Text}
            </div>
          </div>
        </div>

        {/* Email CTA */}
        <div data-contact-email className='mb-20'>
          <a
            href={`mailto:${email}`}
            className='group inline-flex items-center gap-4 no-underline'
            aria-label={`Send email to ${email}`}
          >
            <span
              className='font-mono font-bold leading-none text-creative-muted transition-colors duration-300 group-hover:text-creative-ink'
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)' }}
            >
              {email}
            </span>
            <span
              className='inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300'
              style={{
                background: 'var(--creative-lime)',
                color: '#10120c',
              }}
            >
              <ArrowUpRight
                className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                aria-hidden='true'
              />
            </span>
          </a>
        </div>

        {/* Footer strip */}
        <div
          data-contact-footer
          className='flex flex-col gap-8 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between'
        >
          {/* Left: location + availability */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2'>
              <span
                className='h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--creative-lime)]'
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

          {/* Right: social links */}
          <div className='flex items-center gap-2'>
            <a
              href='https://github.com/nmhieu1896'
              target='_blank'
              rel='noreferrer'
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/8 text-creative-dim no-underline transition-all duration-300 hover:border-white/20 hover:text-creative-ink'
              aria-label='GitHub profile'
            >
              <Github className='h-4 w-4' aria-hidden='true' />
            </a>
            <a
              href='https://www.linkedin.com/in/hieunm09/'
              target='_blank'
              rel='noreferrer'
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/8 text-creative-dim no-underline transition-all duration-300 hover:border-white/20 hover:text-creative-ink'
              aria-label='LinkedIn profile'
            >
              <Linkedin className='h-4 w-4' aria-hidden='true' />
            </a>
            <a
              href='/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
              download
              className='inline-flex h-9 items-center gap-2 rounded-full border border-white/8 px-4 font-mono text-kicker font-bold uppercase tracking-[0.14em] text-creative-dim no-underline transition-all duration-300 hover:border-[var(--creative-lime)]/40 hover:text-[var(--creative-lime)]'
            >
              <FileText className='h-3.5 w-3.5' aria-hidden='true' />
              {t('header.downloadResume')}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className='m-0 mt-8 font-mono text-meta uppercase tracking-widest text-creative-line'>
          © {new Date().getFullYear()} Nguyen Minh Hieu
        </p>
      </div>
    </section>
  )
}
