'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, MapPin, Circle } from 'lucide-react'
import { loadGSAP } from '@/lib/gsap-utils'

export function HeroSection({ email }: { email: string }) {
  const t = useTranslations('hero')
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const statCardRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

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

      const lines = section.querySelectorAll('[data-hero-line]')
      const statCard = statCardRef.current
      const ctas = ctasRef.current
      const meta = metaRef.current

      // Set initial states
      gsap.set(lines, { yPercent: 110, opacity: 0 })
      if (statCard) gsap.set(statCard, { y: 40, opacity: 0 })
      if (ctas) gsap.set(ctas, { y: 24, opacity: 0 })
      if (meta) gsap.set(meta, { y: 16, opacity: 0 })

      const tl = gsap.timeline({ delay: 0.1 })

      // Name lines stagger up
      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
      })

      // CTAs come in
      if (ctas) {
        tl.to(
          ctas,
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.55'
        )
      }

      // Stat card slides up
      if (statCard) {
        tl.to(
          statCard,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
      }

      // Meta strip fades in
      if (meta) {
        tl.to(
          meta,
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
      }
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <section
      id='top'
      ref={sectionRef}
      className='creative-hero relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-[clamp(1.25rem,4vw,4rem)]'
      data-section
      data-waypoint='hero'
    >
      {/* Ambient radial lights */}
      <div
        className='pointer-events-none absolute inset-0 z-0'
        aria-hidden='true'
      >
        <div className='absolute top-0 left-0 h-[70vh] w-[70vw] bg-[radial-gradient(ellipse_at_0%_0%,rgba(200,255,69,0.06)_0%,transparent_60%)]' />
        <div className='absolute top-0 right-0 h-[40vh] w-[40vw] bg-[radial-gradient(ellipse_at_100%_0%,rgba(200,255,69,0.03)_0%,transparent_55%)]' />
        {/* Grain */}
        <div
          className='absolute inset-0 opacity-[0.028]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />
        {/* Bottom fade */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--creative-bg)]' />
      </div>

      {/* Main stage */}
      <div
        className='relative z-20 mx-auto w-full max-w-screen-2xl pb-[clamp(2.5rem,7vh,5rem)] pt-32'
        data-hero-stage
      >
        {/* Editorial name stack */}
        <div
          ref={nameRef}
          className='relative'
          aria-label={`${t('front')} ${t('middle')} ${t('end')}`}
        >
          {/* NGUYEN — left-anchored */}
          <div className='overflow-hidden leading-[0.88]'>
            <div
              data-hero-line
              className='font-display font-black uppercase tracking-[-0.03em] text-creative-ink'
              style={{ fontSize: 'clamp(4.5rem, 13vw, 12rem)' }}
              aria-hidden='true'
            >
              {t('front')}
            </div>
          </div>

          {/* MINH — indented right for asymmetry */}
          <div className='overflow-hidden leading-[0.88]'>
            <div
              data-hero-line
              className='font-display font-black uppercase tracking-[-0.03em] text-creative-ink pl-[8vw]'
              style={{ fontSize: 'clamp(4.5rem, 13vw, 12rem)' }}
              aria-hidden='true'
            >
              {t('middle')}
            </div>
          </div>

          {/* HIEU — lime accent, slightly less indented */}
          <div className='overflow-hidden leading-[0.88]'>
            <div
              data-hero-line
              className='font-display font-black uppercase tracking-[-0.03em] pl-[4vw]'
              style={{
                fontSize: 'clamp(4.5rem, 13vw, 12rem)',
                color: 'var(--creative-lime)',
              }}
              aria-hidden='true'
            >
              {t('end')}
            </div>
          </div>

          {/* Floating stat card — positioned bottom-right of name block */}
          <div
            ref={statCardRef}
            className='absolute right-0 bottom-0 hidden lg:flex flex-col gap-3 rounded-2xl border border-white/8 bg-[#12140f]/80 p-5 backdrop-blur-xl'
            style={{ maxWidth: '260px' }}
            aria-label='Quick profile stats'
          >
            {/* Status pill */}
            <div className='flex items-center gap-2'>
              <Circle
                className='h-2 w-2 fill-[var(--creative-lime)] text-[var(--creative-lime)]'
                aria-hidden='true'
              />
              <span className='font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em] text-creative-muted'>
                {t('status')}
              </span>
            </div>

            {/* Divider */}
            <div className='h-[1px] w-full bg-white/8' />

            {/* Stats grid */}
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <p
                  className='m-0 font-display font-black leading-none text-creative-ink'
                  style={{ fontSize: 'clamp(1.4rem,2vw,1.8rem)' }}
                >
                  5+
                </p>
                <p className='m-0 mt-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-creative-dim'>
                  {t('meta.experience')}
                </p>
              </div>
              <div>
                <p
                  className='m-0 font-display font-black leading-none text-creative-ink'
                  style={{ fontSize: 'clamp(1.4rem,2vw,1.8rem)' }}
                >
                  95%
                </p>
                <p className='m-0 mt-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-creative-dim'>
                  {t('meta.contact')}
                </p>
              </div>
            </div>

            {/* Stack */}
            <p className='m-0 font-mono text-[0.65rem] leading-relaxed text-creative-dim'>
              {t('meta.coreStackValue')}
            </p>
          </div>
        </div>

        {/* Bottom strip: description + CTAs + location */}
        <div className='mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20'>
          {/* Left: description */}
          <p
            className='m-0 max-w-[42ch] font-body text-[clamp(1rem,1.4vw,1.2rem)] font-light leading-relaxed text-creative-muted'
            data-hero-copy
          >
            {t('description')}
          </p>

          {/* Right: CTAs + location */}
          <div className='flex flex-col gap-5 lg:items-end'>
            {/* CTAs */}
            <div ref={ctasRef} className='flex flex-wrap items-center gap-3'>
              <a
                href='#work'
                className='group inline-flex items-center gap-2 rounded-full bg-[var(--creative-lime)] px-6 py-3 font-display text-[0.85rem] font-black uppercase tracking-[0.06em] text-[#10120c] no-underline transition-all duration-300 hover:brightness-110 active:scale-[0.97]'
              >
                {t('viewWork')}
                <ArrowUpRight
                  className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  aria-hidden='true'
                />
              </a>
              <a
                href={`mailto:${email}`}
                className='inline-flex items-center gap-2 rounded-full border border-white/14 px-6 py-3 font-display text-[0.85rem] font-black uppercase tracking-[0.06em] text-creative-ink no-underline backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/5 active:scale-[0.97]'
              >
                {t('contactMe')}
              </a>
            </div>

            {/* Location meta */}
            <div
              ref={metaRef}
              className='flex items-center gap-2 text-creative-dim'
            >
              <MapPin className='h-3 w-3' aria-hidden='true' />
              <span className='font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em]'>
                {t('contact.location')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
