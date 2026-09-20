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

  const chapters = [
    {
      num: '01',
      title: 'Thresholds',
      desc: 'Principles, metrics, and software architecture foundation.',
      href: '#about',
    },
    {
      num: '02',
      title: 'Still Gardens',
      desc: 'Selected production systems and interactive applications.',
      href: '#work',
    },
    {
      num: '03',
      title: 'Sacred Craft',
      desc: 'Career trajectory, leadership, and production milestones.',
      href: '#experience',
    },
    {
      num: '04',
      title: 'Disciplines',
      desc: 'Technical ecosystem, tools, and creative engineering.',
      href: '#skills',
    },
  ]

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

        <p className='kage-body text-[clamp(14px,1.1vw,17px)] max-w-[440px] mb-8 text-[#9aa5a0]'>
          {hero.description}
        </p>

        <div className='flex items-center gap-6'>
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

      {/* Hero Foot (Scroll Cue + Chapter Chips) */}
      <div className='relative z-10 w-full mt-16 pt-6 border-t border-[var(--line-soft)]'>
        <div className='flex items-center justify-end gap-3 mb-4 text-[9px] tracking-[0.3em] uppercase text-[var(--muted)]'>
          <span>Scroll to enter</span>
          <div className='w-14 h-[1px] bg-[var(--line)] relative overflow-hidden'>
            <i className='absolute inset-0 bg-[var(--bone)] origin-left animate-[cue_2.8s_var(--ease-io)_infinite]' />
          </div>
        </div>

        {/* 4 Chapter Chips */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
          {chapters.map((ch) => (
            <a
              key={ch.num}
              href={ch.href}
              className='flex items-start gap-3.5 group text-inherit cursor-pointer'
              data-cursor
            >
              <span className='text-[clamp(24px,2.2vw,34px)] font-light leading-none tabular-nums text-[var(--bone)] group-hover:text-[var(--ember)] group-hover:-translate-y-0.5 transition-all duration-300'>
                {ch.num}
              </span>
              <div className='min-w-0 pt-0.5'>
                <b className='block text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--bone-dim)] group-hover:text-[var(--bone)] transition-colors mb-1'>
                  {ch.title}
                </b>
                <p className='text-[11px] leading-snug text-[#7d8781] group-hover:text-[var(--bone-dim)] transition-colors line-clamp-2'>
                  {ch.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
