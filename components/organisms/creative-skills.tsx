'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { skillGroups } from '@/data/skills'
import { loadGSAP } from '@/lib/gsap-utils'

// ─────────────────────────────────────────────
// Single skill card for horizontal strip
// ─────────────────────────────────────────────

interface SkillCardProps {
  label: string
  signal: string
  skills: string[]
  index: number
}

function SkillCard({ label, signal, skills, index }: SkillCardProps) {
  // Each card is a tall vertical panel: index top-right, label big, signal small, tags bottom
  return (
    <div
      data-skill-card
      className='skill-card relative flex h-full w-[clamp(260px,28vw,380px)] flex-none flex-col justify-between border-r border-white/8 px-8 py-10'
    >
      {/* Index */}
      <span className='font-mono text-meta font-black uppercase tracking-[0.22em] text-creative-dim'>
        0{index + 1}
      </span>

      {/* Label */}
      <div className='mt-auto'>
        <h3
          className='m-0 font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-creative-ink'
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
        >
          {label}
        </h3>

        {/* Signal */}
        <p className='m-0 mt-3 text-body-sm font-light leading-relaxed text-creative-muted'>
          {signal}
        </p>

        {/* Tags */}
        <div className='mt-6 flex flex-wrap gap-1.5'>
          {skills.map((skill) => (
            <span
              key={skill}
              className='rounded-sm border border-[var(--creative-lime)]/20 px-2.5 py-1 font-mono text-meta font-semibold uppercase tracking-wider text-[var(--creative-lime)]/70'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Skills section — Horizontal Scroll Strip (Option D)
// Pinned left title panel, right side scrubs horizontally
// ─────────────────────────────────────────────

export function SkillsSection() {
  const t = useTranslations('skills')
  const outerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const pinnedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const strip = stripRef.current
    if (!outer || !strip) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let active = true
    const triggers: { kill: () => void }[] = []

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      // On mobile / reduced-motion: no horizontal scrub, just show everything
      if (reduced || window.innerWidth < 768) {
        gsap.set(strip, { x: 0 })
        return
      }

      // Calculate how far we need to scroll horizontally
      // The strip must travel its own width minus the visible right panel width
      const getScrollDist = () => {
        const stripW = strip.scrollWidth
        const viewW = strip.offsetWidth
        return -(stripW - viewW)
      }

      // Animate cards in on enter (stagger opacity + y)
      const cards = Array.from(
        strip.querySelectorAll('[data-skill-card]')
      ) as HTMLElement[]
      gsap.set(cards, { opacity: 0, y: 24 })

      // Pin the outer container while strip scrolls horizontally
      const pinST = ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollDist()) + window.innerHeight * 0.5}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const dist = getScrollDist()
          gsap.set(strip, { x: dist * self.progress })

          // Reveal cards progressively as strip scrolls in
          const segSize = 1 / cards.length
          cards.forEach((card, i) => {
            const threshold = i * segSize
            const localProgress = Math.min(
              1,
              Math.max(0, (self.progress - threshold) / segSize)
            )
            gsap.set(card, {
              opacity: localProgress,
              y: 24 * (1 - localProgress),
            })
          })
        },
      })
      triggers.push(pinST)
    })

    return () => {
      active = false
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      id='skills'
      ref={outerRef}
      className='creative-section creative-skills w-full overflow-hidden'
      data-section
      data-waypoint='skills'
      style={{ minHeight: '100svh' }}
    >
      {/* Inner flex: pinned left title | scrolling right strip */}
      <div ref={pinnedRef} className='flex h-screen w-full items-stretch'>
        {/* Left panel — pinned title */}
        <div className='flex w-[clamp(180px,22vw,320px)] flex-none flex-col justify-between border-r border-white/8 px-[clamp(1.25rem,6vw,6rem)] py-16'>
          <p className='m-0 font-mono text-kicker font-bold uppercase tracking-[0.24em] text-creative-dim'>
            {t('kicker')}
          </p>

          <div>
            <h2
              className='m-0 font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-creative-ink'
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 3rem)' }}
              dangerouslySetInnerHTML={{ __html: t('title') }}
            />
            <p className='m-0 mt-4 text-body-sm font-light leading-relaxed text-creative-muted'>
              {t('headline')}
            </p>
          </div>

          {/* Scroll hint */}
          <div className='flex items-center gap-2'>
            <span className='font-mono text-meta uppercase tracking-wider text-creative-dim'>
              scroll
            </span>
            <div className='h-px w-8 bg-white/20' />
          </div>
        </div>

        {/* Right panel — horizontal strip */}
        <div className='relative flex-1 overflow-hidden'>
          <div
            ref={stripRef}
            className='flex h-full items-stretch'
            style={{ willChange: 'transform' }}
          >
            {skillGroups.map((group, i) => (
              <SkillCard
                key={group.id}
                label={group.label}
                signal={group.signal}
                skills={group.skills}
                index={i}
              />
            ))}
            {/* End padding card — visual breathing room */}
            <div className='w-[clamp(4rem,8vw,8rem)] flex-none' />
          </div>
        </div>
      </div>
    </section>
  )
}
