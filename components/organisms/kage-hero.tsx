'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface KageHeroProps {
  content: Pick<PortfolioContent, 'hero' | 'work'>
}

export function KageHero({ content }: KageHeroProps) {
  const { hero, work } = content
  const featuredProject = work.projects[0]

  return (
    <section
      id='hero'
      className='relative min-h-[100svh] px-[var(--pad)] flex flex-col justify-between pt-[calc(var(--nav-h)+clamp(16px,3vh,44px))] pb-[clamp(24px,4vh,48px)]'
    >
      {/* Top Scrim Gradient */}
      <div
        className='absolute inset-x-0 top-0 h-[46%] pointer-events-none z-0'
        style={{
          background:
            'linear-gradient(rgba(3,6,9,0.72), rgba(3,6,9,0.34) 46%, transparent)',
        }}
      />

      {/* Hero Top Content */}
      <div className='relative z-10 max-w-[min(640px,52vw)]'>
        <div className='kage-eyebrow mb-5'>
          <span className='dot' />
          <span>Chapter 00 — The Threshold</span>
        </div>

        <h1 className='kage-display text-[clamp(28px,3.8vw,56px)] leading-[1.08] text-[var(--bone)] mb-5'>
          Where stillness
          <br />
          reveals the
          <br />
          <span className='italic font-light text-[var(--bone-dim)]'>
            unseen craft.
          </span>
        </h1>

        <p className='kage-body text-[clamp(14px,1.1vw,17px)] max-w-[440px] mb-6 text-[#9aa5a0]'>
          {hero.description}
        </p>

        <div className='flex items-center gap-6 mt-8'>
          <a href='#work' className='arrowlink mt-0' data-cursor>
            <span>{hero.actions.viewWork.label}</span>
            <span className='ar'>
              <ArrowUpRight size={14} stroke='var(--bone)' />
            </span>
          </a>

          <a
            href='#contact'
            className='text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--muted)] hover:text-[var(--bone)] transition-colors'
            data-cursor
          >
            {hero.actions.contact.label}
          </a>
        </div>
      </div>

      {/* Floating Peek Card (Featured Project Preview) */}
      {featuredProject && (
        <a
          href='#work'
          className='kage-peek group'
          data-cursor
          aria-label={`Featured: ${featuredProject.title}`}
        >
          <div className='kage-peek-fr'>
            <Image
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className='object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700'
              sizes='290px'
            />
            <div className='kage-peek-play'>
              <span>
                <svg viewBox='0 0 22 22' fill='none' className='w-4 h-4 ml-0.5'>
                  <path d='M8 5.6 16.4 11 8 16.4z' fill='var(--bone)' />
                </svg>
              </span>
            </div>
          </div>
          <div className='kage-peek-cap'>
            <b className='jp text-[var(--bone-dim)]'>山門</b>
            <i className='not-italic'>{featuredProject.title}</i>
          </div>
        </a>
      )}

      {/* Vertical Japanese Calligraphy Watermark */}
      <div className='hero-side' aria-hidden='true'>
        <span className='v jp'>影の道</span>
      </div>

      {/* Hero Foot (Minimalist Editorial Alignment) */}
      <div className='relative z-10 w-full mt-12 pt-5 border-t border-[var(--line-soft)] flex items-center justify-between text-[9px] tracking-[0.26em] uppercase text-[var(--muted)]'>
        <div className='flex items-center gap-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-[var(--vermilion)]' />
          <span>Hanoi, VN ──── 2020 // 2025</span>
        </div>

        <div className='flex items-center gap-3'>
          <span>Scroll to enter</span>
          <div className='w-12 h-[1px] bg-[var(--line)] relative overflow-hidden'>
            <i className='absolute inset-0 bg-[var(--bone)] origin-left animate-[cue_2.8s_var(--ease-io)_infinite]' />
          </div>
          <span className='tabular-nums text-[var(--bone-dim)]'>00 // 04</span>
        </div>
      </div>
    </section>
  )
}
