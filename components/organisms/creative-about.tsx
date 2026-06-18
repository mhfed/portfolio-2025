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
    <div className='relative w-full overflow-hidden py-6' aria-hidden='true'>
      {/* Left fade */}
      <div className='pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--creative-bg)] to-transparent' />
      {/* Right fade */}
      <div className='pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--creative-bg)] to-transparent' />

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
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let active = true

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active || !wrap) return

      const cards = gsap.utils.toArray<HTMLElement>('.about-stack-card', wrap)

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return

        // Pin each card at viewport top until the last card arrives
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[cards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        })

        // Shrink + fade as next card scrolls up
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })
      })
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <div ref={wrapRef} className='relative mt-20'>
      {/* ── Card 1 — Years of Experience ─────── */}
      {/* Dark near-black. Giant lime "5+" anchored bottom-right. */}
      <div className='about-stack-card sticky top-0 flex min-h-[100dvh] flex-col justify-between overflow-hidden rounded-2xl bg-[#080907] p-[clamp(2rem,5vw,4rem)] will-change-transform'>
        {/* Top-left kicker */}
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-creative-dim'>
            {yearsLabel}
          </p>
          <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-creative-dim/40'>
            01 / 04
          </p>
        </div>

        {/* Mid description */}
        <p
          className='max-w-[22ch] font-display font-extrabold leading-[1.12] tracking-[-0.02em] text-creative-ink/30'
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
        >
          {yearsDesc}
        </p>

        {/* Giant stat anchored bottom-right */}
        <div className='flex items-end justify-end'>
          <p
            className='m-0 font-display font-black leading-none'
            style={{
              fontSize: 'clamp(10rem, 22vw, 20rem)',
              color: 'var(--creative-lime)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            5+
          </p>
        </div>
      </div>

      {/* ── Card 2 — Core Stack ──────────────── */}
      {/* Slightly lighter dark. Pills centered with generous spacing. */}
      <div className='about-stack-card sticky top-0 flex min-h-[100dvh] flex-col justify-between overflow-hidden rounded-2xl bg-[#0b0d08] p-[clamp(2rem,5vw,4rem)] will-change-transform'>
        {/* Top-left kicker */}
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-creative-dim'>
            {stackLabel}
          </p>
          <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-creative-dim/40'>
            02 / 04
          </p>
        </div>

        {/* Pills grid — generous spacing, centered */}
        <div className='flex flex-wrap items-center justify-center gap-3 py-8'>
          {STACK_TAGS.map((tech) => (
            <span
              key={tech}
              className='rounded-full border border-[var(--creative-lime)]/20 bg-[var(--creative-lime)]/[0.04] px-5 py-2.5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-creative-muted transition-all duration-300 hover:border-[var(--creative-lime)]/60 hover:bg-[var(--creative-lime)]/10 hover:text-creative-ink'
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom: count */}
        <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-creative-dim/40'>
          {STACK_TAGS.length} technologies in active use
        </p>
      </div>

      {/* ── Card 3 — On-time Delivery ────────── */}
      {/* Dark. Giant white "95%" bottom-left, kicker top-right. */}
      <div className='about-stack-card sticky top-0 flex min-h-[100dvh] flex-col justify-between overflow-hidden rounded-2xl bg-[#080907] p-[clamp(2rem,5vw,4rem)] will-change-transform'>
        {/* Top: two-sided kicker */}
        <div className='flex items-center justify-between'>
          <p className='m-0 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-creative-dim'>
            {deliveryLabel}
          </p>
          <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-creative-dim/40'>
            03 / 04
          </p>
        </div>

        {/* Mid description — right-aligned */}
        <p
          className='ml-auto max-w-[24ch] text-right font-display font-extrabold leading-[1.12] tracking-[-0.02em] text-creative-ink/25'
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
        >
          {deliveryDesc}
        </p>

        {/* Giant stat anchored bottom-left */}
        <div className='flex items-end justify-start'>
          <p
            className='m-0 font-display font-black leading-none text-creative-ink'
            style={{
              fontSize: 'clamp(10rem, 22vw, 20rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            95%
          </p>
        </div>
      </div>

      {/* ── Card 4 — Status (last, no pin) ───── */}
      {/* Full lime fill — inverts the palette, strong landing. */}
      <div
        className='about-stack-card flex min-h-[100dvh] flex-col justify-between overflow-hidden rounded-2xl p-[clamp(2rem,5vw,4rem)]'
        style={{ backgroundColor: 'var(--creative-lime)' }}
      >
        {/* Top */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <span
              className='h-2 w-2 animate-pulse rounded-full bg-[#080907]'
              aria-hidden='true'
            />
            <p className='m-0 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-[#080907]/60'>
              Status
            </p>
          </div>
          <p className='m-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#080907]/40'>
            04 / 04
          </p>
        </div>

        {/* Center — big message */}
        <p
          className='max-w-[14ch] font-display font-black leading-[1.0] tracking-[-0.04em]'
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            color: '#080907',
          }}
        >
          Open to new opportunities
        </p>

        {/* Bottom — CTA row */}
        <div className='flex items-end justify-between'>
          <p
            className='m-0 font-mono text-[0.65rem] uppercase tracking-[0.22em]'
            style={{ color: '#080907', opacity: 0.5 }}
          >
            Available now
          </p>
          <p
            className='m-0 font-mono text-[0.65rem] uppercase tracking-[0.22em]'
            style={{ color: '#080907', opacity: 0.5 }}
          >
            nmhieu04091999@gmail.com
          </p>
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
          <div>
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
          <div className='flex flex-col justify-center' data-reveal>
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
