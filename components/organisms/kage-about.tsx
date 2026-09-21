import { ArrowUpRight } from 'lucide-react'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface KageAboutProps {
  content: Pick<PortfolioContent, 'about' | 'editorialUi'>
}

export function KageAbout({ content }: KageAboutProps) {
  const { about, editorialUi } = content

  return (
    <section id='about' className='kage-sec'>
      {/* Chapter header */}
      <div className='sec-head'>
        <span className='k'>
          <b>01</b> — The Foundation
        </span>
        <span className='rule' />
        <span className='k jp'>山門</span>
      </div>

      {/* Asymmetric 2-column grid */}
      <div className='grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-20 items-start'>
        <h2 className='kage-display text-[clamp(28px,3.8vw,54px)] text-[var(--bone)] max-w-[15ch]'>
          Charred cypress, clean systems, one path pursued.
        </h2>

        <div className='pt-1'>
          <p className='kage-lead mb-5 text-[#c2cdc5]'>{about.statement}</p>
          <p className='kage-body text-[#9aa5a0] mb-8'>{about.description}</p>

          <a href='#experience' className='arrowlink' data-cursor>
            <span>{editorialUi.journey}</span>
            <span className='ar'>
              <ArrowUpRight size={14} stroke='var(--bone)' />
            </span>
          </a>
        </div>
      </div>

      {/* Elegant Editorial Colophon */}
      <div className='mt-16 sm:mt-24 pt-6 border-t border-[var(--line-soft)] flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.22em] uppercase text-[var(--muted)]'>
        <div className='flex items-center gap-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-[var(--vermilion)]' />
          <span className='text-[var(--bone-dim)]'>Hanoi, Vietnam</span>
          <span>•</span>
          <span>5+ Years Production Systems</span>
        </div>
        <div className='flex items-center gap-3'>
          <span className='jp text-[var(--bone-dim)]'>山門</span>
          <span>Quiet Architecture</span>
        </div>
      </div>
    </section>
  )
}
