'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import { loadGSAP } from '@/lib/gsap-utils'
import { Copy, Check, Mail, ArrowUpRight } from 'lucide-react'

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

  const [copied, setCopied] = useState(false)
  const emailAddress = 'nmhieu04091999@gmail.com'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

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
    <div className='relative mt-20 grid grid-cols-1 gap-y-12 md:gap-y-16 gap-x-12 md:grid-cols-3 items-stretch'>
      {/* ── Card 1 — Years of Experience ─────── */}
      <div className='col-span-1 flex flex-col justify-between py-2 min-h-[220px] md:border-r md:border-white/8 md:pr-10 md:py-4 group'>
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-kicker uppercase tracking-[0.26em] text-creative-dim'>
            {yearsLabel}
          </p>
          <p className='m-0 font-mono text-meta uppercase tracking-[0.18em] text-creative-dim/40'>
            01 / 04
          </p>
        </div>

        <div className='my-4 flex items-baseline justify-start'>
          <p
            className='m-0 font-display font-black leading-none bg-gradient-to-br from-creative-ink to-[var(--creative-lime)] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500'
            style={{
              fontSize: 'clamp(5.5rem, 8vw, 8rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            <span ref={countRef}>0</span>+
          </p>
        </div>

        <p className='m-0 font-body text-body-sm font-light leading-relaxed text-creative-muted max-w-[24ch]'>
          {yearsDesc}
        </p>
      </div>

      {/* ── Card 2 — Core Stack ──────────────── */}
      <div className='col-span-1 md:col-span-2 flex flex-col justify-between py-2 min-h-[220px] border-t border-white/8 pt-8 md:border-t-0 md:pt-4 md:pl-10 group relative overflow-hidden'>
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-kicker uppercase tracking-[0.26em] text-creative-dim'>
            {stackLabel}
          </p>
          <p className='m-0 font-mono text-meta uppercase tracking-[0.18em] text-creative-dim/40'>
            02 / 04
          </p>
        </div>

        <div ref={pillsRef} className='flex flex-wrap items-center gap-2 py-6'>
          {STACK_TAGS.map((tech) => (
            <span
              key={tech}
              className='tech-pill flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-meta font-bold uppercase tracking-wider text-creative-muted transition-all duration-300 hover:border-[var(--creative-lime)]/40 hover:bg-[var(--creative-lime)]/[0.04] hover:text-creative-ink hover:scale-[1.02]'
            >
              <span className='h-1.5 w-1.5 rounded-full bg-[var(--creative-lime)]/40' />
              {tech}
            </span>
          ))}
        </div>

        <div className='flex items-center gap-2 font-mono text-meta uppercase tracking-[0.16em] text-creative-dim/60'>
          <span className='text-[var(--creative-lime)]'>$</span>
          <span>{STACK_TAGS.length} technologies in active use</span>
        </div>
      </div>

      {/* ── Card 4 — Status & Direct Connect ───── */}
      <div className='col-span-1 md:col-span-2 flex flex-col justify-between py-2 min-h-[220px] border-t border-white/8 pt-8 md:pt-10 md:border-r md:border-white/8 md:pr-10 group'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--creative-lime)] opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-[var(--creative-lime)]'></span>
            </span>
            <p className='m-0 font-mono text-kicker uppercase tracking-[0.26em] text-[var(--creative-lime)] font-extrabold'>
              Status
            </p>
          </div>
          <p className='m-0 font-mono text-meta uppercase tracking-[0.18em] text-[var(--creative-lime)]/40'>
            04 / 04
          </p>
        </div>

        <div className='my-6 md:my-4 md:max-w-[90%]'>
          <h4
            className='m-0 font-display font-black leading-[1.05] tracking-[-0.03em] text-creative-ink uppercase'
            style={{
              fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)',
            }}
          >
            Open to new opportunities
          </h4>
          <p className='m-0 mt-3 text-body-sm font-light text-creative-muted leading-relaxed max-w-[48ch]'>
            Let&apos;s build something fast, polished, and animated. Reach out
            to kickstart a collaboration.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/8 pt-6'>
          <div className='flex flex-col gap-1.5'>
            <span className='font-mono text-[0.72rem] uppercase tracking-widest text-[var(--creative-lime)]/60 font-black'>
              Direct Connect
            </span>
            <span className='font-mono text-body-md font-bold text-creative-ink selection:bg-[var(--creative-lime)] selection:text-black'>
              {emailAddress}
            </span>
          </div>

          <div className='flex items-center gap-3 shrink-0'>
            <button
              onClick={handleCopy}
              className='flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 active:scale-95 text-creative-ink px-4 py-2.5 font-mono text-kicker font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer'
              aria-label='Copy email address'
            >
              {copied ? (
                <>
                  <Check className='h-3.5 w-3.5 text-[var(--creative-lime)]' />
                  <span className='text-[var(--creative-lime)]'>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className='h-3.5 w-3.5' />
                  <span>Copy</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${emailAddress}`}
              className='flex items-center justify-center gap-2 rounded-lg bg-[var(--creative-lime)] hover:bg-[var(--creative-lime)]/90 active:scale-95 text-black px-5 py-2.5 font-mono text-kicker font-bold uppercase tracking-wider transition-all duration-300 group/btn shadow-md'
            >
              <Mail className='h-3.5 w-3.5' />
              <span>Email</span>
              <ArrowUpRight className='h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5' />
            </a>
          </div>
        </div>
      </div>

      {/* ── Card 3 — On-time Delivery ────────── */}
      <div className='col-span-1 flex flex-col justify-between py-2 min-h-[220px] border-t border-white/8 pt-8 md:pt-10 md:pl-10 group relative overflow-hidden'>
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-kicker uppercase tracking-[0.26em] text-creative-dim'>
            {deliveryLabel}
          </p>
          <p className='m-0 font-mono text-meta uppercase tracking-[0.18em] text-creative-dim/40'>
            03 / 04
          </p>
        </div>

        <div className='my-6 flex items-center justify-between gap-6'>
          <p
            className='m-0 font-display font-black leading-none text-creative-ink group-hover:scale-105 transition-transform duration-500'
            style={{
              fontSize: 'clamp(3.8rem, 5.5vw, 6rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            95%
          </p>
          <div className='shrink-0 flex items-center justify-center relative'>
            <svg
              className='w-16 h-16 transform -rotate-90'
              viewBox='0 0 100 100'
            >
              <circle
                className='text-white/5 stroke-current'
                strokeWidth='8'
                cx='50'
                cy='50'
                r='40'
                fill='transparent'
              />
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
                style={{
                  filter: 'drop-shadow(0 0 2px var(--creative-lime))',
                }}
              />
            </svg>
          </div>
        </div>

        <p className='m-0 font-body text-body-sm font-light leading-relaxed text-creative-muted max-w-[22ch]'>
          {deliveryDesc}
        </p>
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
      className='creative-section creative-about w-full py-20 md:py-32'
      data-section
      data-waypoint='about'
    >
      <div className='mx-auto w-full px-[clamp(1.25rem,6vw,6rem)]'>
        {/* Section kicker */}
        <p className='m-0 mb-8 font-mono text-kicker font-bold uppercase tracking-[0.24em] text-creative-dim'>
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
                  className='rounded-full border border-[var(--creative-lime)]/30 px-3 py-1.5 font-mono text-meta font-black uppercase tracking-wider text-[var(--creative-lime)] transition-all duration-300 hover:border-[var(--creative-lime)]/60 hover:bg-[var(--creative-lime)]/8'
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
            <p className='m-0 text-body-md max-w-prose font-light leading-relaxed text-creative-muted'>
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
