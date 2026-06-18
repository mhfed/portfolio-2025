'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import { loadGSAP } from '@/lib/gsap-utils'

// ─────────────────────────────────────────────
// Tech marquee items — hardcoded display strip
// ─────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'React.js',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'GSAP',
  'Three.js',
  'Node.js',
  'React Native',
  'Redux',
  'React Query',
  'GraphQL',
  'Vite',
]

function TechMarquee() {
  // Duplicate for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div
      className='marquee-mask relative w-full overflow-hidden py-6'
      aria-hidden='true'
    >
      <div
        className='flex items-center gap-8'
        style={{
          animation: 'marquee 28s linear infinite',
          width: 'max-content',
        }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className='whitespace-nowrap font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-creative-dim'
          >
            {item}
            <span className='ml-8 text-creative-lime/30'>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Sticky scroll-stack stat section
// 4 full-width cards pin + shrink as next arrives
// Pattern: Section 5.A canonical skeleton
// ─────────────────────────────────────────────

const STACK_TAGS = [
  'React.js',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'GSAP',
  'Three.js',
  'React Native',
]

interface BentoProps {
  yearsLabel: string
  yearsDesc: string
  deliveryLabel: string
  deliveryDesc: string
  stackLabel: string
}

// ── Option 1 — Full Viewport Cinematic ────────
// Each card is min-h-[100dvh], pinned, giant stat.
// Cards shrink+fade as next scrolls into view.
// Card 4 breaks the dark theme with full lime fill.
function AboutBento({
  yearsLabel,
  yearsDesc,
  deliveryLabel,
  deliveryDesc,
  stackLabel,
}: BentoProps) {
  const countRef = useRef<HTMLSpanElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true

    loadGSAP().then(({ gsap }) => {
      if (!active) return

      // CountUp animation for experience
      if (countRef.current) {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: 5,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: countRef.current,
            start: 'top 85%',
          },
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.innerText = String(Math.floor(obj.val))
            }
          },
        })
      }

      // Circular progress animation
      if (circleRef.current) {
        gsap.fromTo(
          circleRef.current,
          { strokeDashoffset: 251.2 },
          {
            strokeDashoffset: 251.2 * (1 - 0.95),
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: circleRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Stagger animate tech stack pills
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('.tech-pill')
        gsap.fromTo(
          pills,
          { scale: 0.85, opacity: 0, y: 12 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pillsRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className='relative mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch'>
      {/* ── Card 1 — Years of Experience ─────── */}
      <div className='flex flex-col justify-between rounded-2xl border border-white/5 bg-black/15 backdrop-blur-md p-8 min-h-[300px] transition-all duration-300 hover:border-white/10 hover:bg-black/20 group'>
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-creative-dim'>
            {yearsLabel}
          </p>
          <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-creative-dim/40'>
            01 / 04
          </p>
        </div>

        <div className='my-6 flex items-baseline justify-between gap-4'>
          <p
            className='m-0 font-display font-black leading-none text-[var(--creative-lime)] group-hover:scale-105 transition-transform duration-300'
            style={{
              fontSize: 'clamp(5rem, 8vw, 8rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            <span ref={countRef}>0</span>+
          </p>
        </div>

        <p className='m-0 font-body text-[0.85rem] font-light leading-relaxed text-creative-muted'>
          {yearsDesc}
        </p>
      </div>

      {/* ── Card 2 — Core Stack ──────────────── */}
      <div className='flex flex-col justify-between rounded-2xl border border-white/5 bg-black/15 backdrop-blur-md p-8 min-h-[300px] transition-all duration-300 hover:border-white/10 hover:bg-black/20'>
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-creative-dim'>
            {stackLabel}
          </p>
          <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-creative-dim/40'>
            02 / 04
          </p>
        </div>

        <div ref={pillsRef} className='flex flex-wrap items-center gap-1.5 py-6'>
          {STACK_TAGS.map((tech) => (
            <span
              key={tech}
              className='tech-pill rounded-full border border-[var(--creative-lime)]/15 bg-[var(--creative-lime)]/[0.03] px-3.5 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-creative-muted transition-all duration-300 hover:border-[var(--creative-lime)]/50 hover:bg-[var(--creative-lime)]/8 hover:text-creative-ink'
            >
              {tech}
            </span>
          ))}
        </div>

        <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-creative-dim/50'>
          {STACK_TAGS.length} technologies in active use
        </p>
      </div>

      {/* ── Card 3 — On-time Delivery ────────── */}
      <div className='flex flex-col justify-between rounded-2xl border border-white/5 bg-black/15 backdrop-blur-md p-8 min-h-[300px] transition-all duration-300 hover:border-white/10 hover:bg-black/20 group'>
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-creative-dim'>
            {deliveryLabel}
          </p>
          <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-creative-dim/40'>
            03 / 04
          </p>
        </div>

        <div className='my-6 flex items-center justify-between gap-6'>
          <p
            className='m-0 font-display font-black leading-none text-creative-ink group-hover:scale-105 transition-transform duration-300'
            style={{
              fontSize: 'clamp(3.5rem, 5vw, 5.5rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            95%
          </p>
          <div className='shrink-0 flex items-center justify-center'>
            <svg className='w-16 h-16 transform -rotate-90' viewBox='0 0 100 100'>
              <circle className='text-white/5 stroke-current' strokeWidth='8' cx='50' cy='50' r='40' fill='transparent' />
              <circle
                ref={circleRef}
                className='text-[var(--creative-lime)] stroke-current'
                strokeWidth='8'
                strokeLinecap='round'
                cx='50'
                cy='50'
                r='40'
                fill='transparent'
                strokeDasharray='251.2'
                strokeDashoffset='251.2'
              />
            </svg>
          </div>
        </div>

        <p className='m-0 font-body text-[0.85rem] font-light leading-relaxed text-creative-muted'>
          {deliveryDesc}
        </p>
      </div>

      {/* ── Card 4 — Status ───── */}
      <div className='flex flex-col justify-between rounded-2xl border border-[var(--creative-lime)]/20 bg-[var(--creative-lime)]/[0.04] p-8 min-h-[300px] transition-all duration-300 hover:bg-[var(--creative-lime)]/[0.06] hover:border-[var(--creative-lime)]/40 group'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span
              className='relative flex h-2.5 w-2.5'
            >
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--creative-lime)] opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--creative-lime)]'></span>
            </span>
            <p className='m-0 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-[var(--creative-lime)] font-extrabold'>
              Status
            </p>
          </div>
          <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--creative-lime)]/40'>
            04 / 04
          </p>
        </div>

        <div className='my-6'>
          <p
            className='m-0 font-display font-black leading-[1.05] tracking-[-0.03em] text-creative-ink uppercase'
            style={{
              fontSize: 'clamp(1.4rem, 2vw, 2.1rem)',
            }}
          >
            Open to new opportunities
          </p>
        </div>

        <div className='flex flex-col gap-1 border-t border-[var(--creative-lime)]/10 pt-4'>
          <span className='font-mono text-[0.55rem] uppercase tracking-widest text-[var(--creative-lime)]/60'>
            Direct Connect
          </span>
          <a
            href='mailto:nmhieu04091999@gmail.com'
            className='font-mono text-[0.72rem] font-bold text-creative-ink no-underline hover:text-[var(--creative-lime)] transition-colors'
          >
            nmhieu04091999@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// AboutSection
// ─────────────────────────────────────────────

export function AboutSection({ locale }: { locale: string }) {
  const t = useTranslations('about')
  const badges = t.raw('badges') as string[]

  const statementRef = useRef<HTMLDivElement>(null)

  // Scrubbing text reveal on statement
  useEffect(() => {
    const statementEl = statementRef.current
    if (!statementEl) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let active = true

    loadGSAP().then(({ ScrollTrigger }) => {
      if (!active) return

      const text = statementEl.textContent || ''
      const words = text.split(' ').filter(Boolean)
      statementEl.innerHTML = ''

      words.forEach((word, i) => {
        const span = document.createElement('span')
        span.textContent = word + (i < words.length - 1 ? ' ' : '')
        span.className = 'about-scrub-word inline'
        span.style.opacity = '0.1'
        statementEl.appendChild(span)
      })

      const wordSpans = Array.from(
        statementEl.querySelectorAll('.about-scrub-word')
      ) as HTMLElement[]
      const total = wordSpans.length

      ScrollTrigger.create({
        trigger: statementEl,
        start: 'top 78%',
        end: 'bottom 28%',
        scrub: 1.2,
        onUpdate: (self: ScrollTriggerType) => {
          const progress = self.progress
          wordSpans.forEach((span, idx) => {
            const wordProgress = idx / total
            if (wordProgress < progress) {
              span.style.opacity = '1'
            } else if (wordProgress < progress + 0.1) {
              const fade = (progress + 0.1 - wordProgress) / 0.1
              span.style.opacity = `${0.1 + fade * 0.9}`
            } else {
              span.style.opacity = '0.1'
            }
          })
        },
      })
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <section
      id='about'
      className='creative-section creative-about w-full py-32 md:py-48'
      data-section
      data-waypoint='about'
    >
      <div className='mx-auto max-w-screen-2xl px-[clamp(1.25rem,4vw,4rem)]'>
        {/* Section kicker */}
        <p className='m-0 mb-8 font-mono text-[0.65rem] font-bold uppercase tracking-[0.24em] text-creative-dim'>
          {locale === 'vi'
            ? 'Giới thiệu'
            : locale === 'zh-TW'
              ? '關於我'
              : 'About'}
        </p>

        {/* Two-column layout */}
        <div className='grid grid-cols-1 gap-[clamp(2rem,8vw,8rem)] lg:grid-cols-[1.1fr_0.9fr]'>
          {/* Left: scrubbing statement */}
          <div data-about-col-left>
            <div
              ref={statementRef}
              className='font-display font-extrabold leading-[1.18] tracking-[-0.01em] text-creative-ink'
              style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.6rem)' }}
            >
              {t('statement')}
            </div>

            {/* Badges */}
            <div className='mt-10 flex flex-wrap gap-2' data-reveal>
              {badges.map((badge) => (
                <span
                  key={badge}
                  className='rounded-full border border-[var(--creative-lime)]/30 px-3 py-1.5 font-mono text-[0.7rem] font-black uppercase tracking-wider text-[var(--creative-lime)] transition-all duration-300 hover:border-[var(--creative-lime)]/60 hover:bg-[var(--creative-lime)]/8'
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: description */}
          <div
            data-about-col-right
            className='flex flex-col justify-center'
            data-reveal
          >
            <p className='m-0 text-[clamp(1rem,1.3vw,1.18rem)] font-light leading-relaxed text-creative-muted'>
              {t('description1')}
            </p>
          </div>
        </div>

        {/* Tech marquee strip */}
        <div className='mt-20 border-y border-white/8'>
          <TechMarquee />
        </div>

        {/* Bento grid */}
        <AboutBento
          yearsLabel={t('yearsExperience')}
          yearsDesc={t('yearsDescription')}
          deliveryLabel={t('clientSatisfaction')}
          deliveryDesc={t('satisfactionDescription')}
          stackLabel={t('coreSkills')}
        />
      </div>
    </section>
  )
}
