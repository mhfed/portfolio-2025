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

      {/* Ruled Stats Band */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mt-16 sm:mt-24 pt-8 border-t border-[var(--line-soft)]'>
        <div>
          <b className='block text-[clamp(24px,2.4vw,36px)] font-light tracking-[-0.02em] text-[var(--bone)] tabular-nums mb-1'>
            5+
          </b>
          <span className='text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]'>
            Years Experience
          </span>
        </div>
        <div>
          <b className='block text-[clamp(24px,2.4vw,36px)] font-light tracking-[-0.02em] text-[var(--bone)] tabular-nums mb-1'>
            94
          </b>
          <span className='text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]'>
            PageSpeed Benchmark
          </span>
        </div>
        <div>
          <b className='block text-[clamp(24px,2.4vw,36px)] font-light tracking-[-0.02em] text-[var(--bone)] tabular-nums mb-1'>
            60 FPS
          </b>
          <span className='text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]'>
            Hardware Motion
          </span>
        </div>
        <div>
          <b className='block text-[clamp(24px,2.4vw,36px)] font-light tracking-[-0.02em] text-[var(--bone)] tabular-nums mb-1'>
            100%
          </b>
          <span className='text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]'>
            Type-Safe & Clean
          </span>
        </div>
      </div>
    </section>
  )
}
