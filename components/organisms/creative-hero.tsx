'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { MapPin } from 'lucide-react'
import { loadGSAP } from '@/lib/gsap-utils'
import { MagneticLink } from './magnetic-link'
import { InteractiveTerminal } from '../molecules/interactive-terminal'
import { cn } from '@/lib/utils'

export function HeroSection({ email }: { email: string }) {
  const t = useTranslations('hero')
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const visualCardRef = useRef<HTMLDivElement>(null)
  const visualImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let active = true
    let mm: { revert: () => void } | null = null
    let cardCleanup: (() => void) | undefined

    loadGSAP().then(({ gsap }) => {
      if (!active) return

      const lines = section.querySelectorAll('[data-hero-line]')
      const ctas = ctasRef.current
      const meta = metaRef.current
      const card = visualCardRef.current
      const img = visualImageRef.current
      const textBlock = section.querySelector('[data-hero-text]')

      // Set initial states
      gsap.set(lines, { yPercent: 110, opacity: 0 })
      if (ctas) gsap.set(ctas, { y: 24, opacity: 0 })
      if (meta) gsap.set(meta, { y: 16, opacity: 0 })
      if (card) gsap.set(card, { y: 40, opacity: 0, rotateX: 0, rotateY: 0 })

      const matchMedia = gsap.matchMedia()
      mm = matchMedia

      /* ── Desktop ── */
      matchMedia.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({ delay: 0.1 })

        // Name lines stagger up
        tl.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.08,
        })

        // Content animations
        if (ctas) {
          tl.to(
            ctas,
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            '-=0.55'
          )
        }

        if (card) {
          tl.to(
            card,
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.5'
          )
        }

        if (meta) {
          tl.to(
            meta,
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
        }

        // Hero scroll parallax: text side vs card side
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(
            textBlock,
            {
              yPercent: -10,
              opacity: 0.7,
              ease: 'none',
            },
            0
          )
          .to(
            card,
            {
              yPercent: -18,
              opacity: 0.8,
              ease: 'none',
            },
            0
          )

        // Spotlight is handled globally by CreativePortfolioEffects
      })

      /* ── Mobile/Tablet ── */
      matchMedia.add('(max-width: 1023px)', () => {
        const tl = gsap.timeline({ delay: 0.1 })

        tl.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
        })

        if (ctas) {
          tl.to(
            ctas,
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.45'
          )
        }

        if (card) {
          tl.to(
            card,
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
            '-=0.4'
          )
        }

        if (meta) {
          tl.to(
            meta,
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          )
        }
      })

      // 3D Card Tilt & image depth parallax
      if (card && img) {
        const onCardMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2

          const rotateX = -(y / rect.height) * 12
          const rotateY = (x / rect.width) * 12

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            ease: 'power2.out',
            duration: 0.4,
            overwrite: 'auto',
          })

          gsap.to(img, {
            x: (x / rect.width) * 12,
            y: (y / rect.height) * 12,
            ease: 'power2.out',
            duration: 0.4,
            overwrite: 'auto',
          })
        }

        const onCardLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            ease: 'power3.out',
            duration: 0.6,
            overwrite: 'auto',
          })

          gsap.to(img, {
            x: 0,
            y: 0,
            ease: 'power3.out',
            duration: 0.6,
            overwrite: 'auto',
          })
        }

        card.addEventListener('mousemove', onCardMove)
        card.addEventListener('mouseleave', onCardLeave)

        cardCleanup = () => {
          card.removeEventListener('mousemove', onCardMove)
          card.removeEventListener('mouseleave', onCardLeave)
        }
      }
    })

    return () => {
      active = false
      if (mm) mm.revert()
      cardCleanup?.()
    }
  }, [])

  // Helper to split name string into interactive individual hoverable letters
  const renderHoverableText = (
    text: string,
    baseColorClass = ''
  ) => {
    const words = text.split(' ')
    return words.map((word, wordIdx) => (
      <span key={wordIdx} className="inline-block whitespace-nowrap">
        {word.split('').map((char, charIdx) => (
          <span
            key={charIdx}
            className={cn(
              'inline-block transition-transform duration-200 origin-bottom select-none cursor-default hover:scale-y-115 hover:-translate-y-1 hover:text-[var(--creative-lime)]',
              baseColorClass
            )}
            style={{
              transitionProperty: 'transform, color',
            }}
          >
            {char}
          </span>
        ))}
        {wordIdx < words.length - 1 && (
          <span className="inline-block" style={{ width: '0.26em' }}>
            &nbsp;
          </span>
        )}
      </span>
    ))
  }

  // Parse markdown *italic* text from translations and highlight
  const renderFormattedHeadline = (text: string) => {
    const parts = text.split('*')
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <span
          key={i}
          className='text-[var(--creative-lime)] italic font-semibold'
        >
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <section
      id='top'
      ref={sectionRef}
      className='creative-hero relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-[clamp(1.25rem,4vw,4rem)] pb-8 pt-20 md:pt-24 lg:pb-16'
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
      </div>

      {/* Main stage */}
      <div className='relative z-20 mx-auto w-full max-w-screen-2xl'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 items-center'>
          {/* Left Column: Typography, description, CTAs */}
          <div className='flex flex-col items-start' data-hero-text>
            {/* Technical Monospace Eyebrow */}
            <div className='mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.24em] text-creative-dim'>
              [ SYSTEM INIT // FE_MOTION_ENG ]
            </div>

            {/* Editorial name stack: NGUYEN MINH / HIEU */}
            <div
              ref={nameRef}
              className='relative mb-5'
              aria-label={`${t('front')} ${t('middle')} ${t('end')}`}
            >
              {/* NGUYEN MINH */}
              <div className='overflow-hidden leading-[0.88]'>
                <div
                  data-hero-line
                  className='font-display font-black uppercase tracking-[-0.03em] text-creative-ink flex gap-[0.02em]'
                  style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
                  aria-hidden='true'
                >
                  {renderHoverableText(
                    `${t('front')} ${t('middle')}`,
                    'text-creative-ink'
                  )}
                </div>
              </div>

              {/* HIEU — lime accent */}
              <div className='overflow-hidden leading-[0.88]'>
                <div
                  data-hero-line
                  className='font-display font-black uppercase tracking-[-0.03em] flex gap-[0.02em]'
                  style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
                  aria-hidden='true'
                >
                  {renderHoverableText(
                    t('end'),
                    'text-[var(--creative-lime)]'
                  )}
                </div>
              </div>
            </div>

            {/* Bold Display Headline (max 2 lines) */}
            <h1
              className='m-0 mb-4 max-w-[28ch] font-display font-black leading-[1.15] tracking-tight text-creative-ink'
              style={{ fontSize: 'clamp(1.35rem, 2.4vw, 2.2rem)' }}
              data-hero-headline
            >
              {renderFormattedHeadline(t('headline'))}
            </h1>

            {/* Short, precise Subtext (exactly 15 words) */}
            <p
              className='m-0 mb-6 max-w-[42ch] font-body text-[clamp(0.95rem,1.15vw,1.05rem)] font-light leading-relaxed text-creative-muted'
              data-hero-copy
            >
              {t('description')}
            </p>

            {/* Magnetic CTAs */}
            <div ref={ctasRef} className='flex flex-wrap items-center gap-3'>
              <MagneticLink href='#work' variant='light'>
                {t('viewWork')}
              </MagneticLink>
              <MagneticLink
                href={`mailto:${email}`}
                variant='dark'
                showArrow={false}
              >
                {t('contactMe')}
              </MagneticLink>
            </div>
          </div>

          {/* Right Column: 3D Holographic glass visual card & tech panel */}
          <div
            ref={visualCardRef}
            className='relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.015] p-4 backdrop-blur-md transition-all duration-300 group'
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            {/* Visual Frame containing interactive terminal */}
            <div className='relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 border border-white/5'>
              <div
                ref={visualImageRef}
                className='w-full h-full transition-transform duration-700'
              >
                <InteractiveTerminal />
              </div>
              {/* Overlay glass glare */}
              <div className='absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-20' />
            </div>

            {/* Diagnostic Readout Panel */}
            <div
              className='mt-4 flex flex-col gap-3 p-1'
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className='flex items-center justify-between'>
                {/* Live pulsing status */}
                <div className='flex items-center gap-2'>
                  <span className='relative flex h-2 w-2'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--creative-lime)] opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-2 w-2 bg-[var(--creative-lime)]'></span>
                  </span>
                  <span className='font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-creative-muted'>
                    {t('status')}
                  </span>
                </div>
                {/* Tech value label */}
                <span className='font-mono text-[0.62rem] tracking-wider text-creative-dim uppercase'>
                  SYS_ACTIVE: TRUE
                </span>
              </div>

              {/* Divider line */}
              <div className='h-[1px] w-full bg-white/10' />

              {/* Readouts Grid */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='m-0 font-mono text-[0.55rem] uppercase tracking-widest text-creative-dim'>
                    {t('meta.experience')}
                  </p>
                  <p className='m-0 mt-0.5 font-display font-extrabold text-base text-creative-ink'>
                    5+ YEARS
                  </p>
                </div>
                <div>
                  <p className='m-0 font-mono text-[0.55rem] uppercase tracking-widest text-creative-dim'>
                    {t('meta.coreStack')}
                  </p>
                  <p className='m-0 mt-0.5 font-mono text-[0.62rem] text-creative-muted leading-tight'>
                    {t('meta.coreStackValue')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Location strip */}
        <div
          ref={metaRef}
          className='mt-10 lg:mt-16 flex items-center gap-2 text-creative-dim'
        >
          <MapPin className='h-3 w-3' aria-hidden='true' />
          <span className='font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em]'>
            {t('contact.location')}
          </span>
        </div>
      </div>
    </section>
  )
}
