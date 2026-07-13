'use client'

import { useTranslations } from 'next-intl'
import { MapPin } from 'lucide-react'
import { MagneticLink } from './magnetic-link'
import { InteractiveTerminal } from '../molecules/interactive-terminal'
import { cn } from '@/lib/utils'

type TickerEntry = { sym: string; val: string; dir: 'up' | 'dn' }

const TICKER: TickerEntry[] = [
  { sym: 'REACT', val: '19.2', dir: 'up' },
  { sym: 'NEXT', val: '16.0', dir: 'up' },
  { sym: 'TYPESCRIPT', val: '5.7', dir: 'up' },
  { sym: 'GSAP', val: '3.12', dir: 'up' },
  { sym: 'THREE', val: '0.184', dir: 'dn' },
  { sym: 'TAILWIND', val: '4.1', dir: 'up' },
  { sym: 'EQUIX', val: 'LIVE', dir: 'up' },
  { sym: 'IRESS', val: 'LIVE', dir: 'up' },
  { sym: 'STARLENTO', val: 'LIVE', dir: 'up' },
]

function TickerRow() {
  return (
    <div className='hud-ticker-track font-mono text-kicker uppercase tracking-[0.12em] text-creative-dim'>
      {[...TICKER, ...TICKER].map((entry, i) => (
        <span key={i} className='inline-flex items-center gap-2'>
          <span className='text-creative-muted'>{entry.sym}</span>
          <span
            className={cn(
              entry.dir === 'up'
                ? 'text-creative-green'
                : 'text-creative-orange'
            )}
          >
            {entry.dir === 'up' ? '▲' : '▼'} {entry.val}
          </span>
          <span className='px-2 text-creative-line'>|</span>
        </span>
      ))}
    </div>
  )
}

export function HudHero({ email }: { email: string }) {
  const t = useTranslations('hero')

  return (
    <section
      id='top'
      data-section
      data-waypoint='hero'
      className='creative-hero relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-[clamp(1.25rem,6vw,6rem)] pb-16 pt-24'
    >
      {/* CRT scanlines now live in the WebGL composer (Scanline effect), so the
          DOM copy stays crisp and legible. */}

      {/* Corner readouts */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-10 font-mono text-meta uppercase tracking-[0.16em] text-creative-dim'
      >
        <span className='absolute left-[clamp(1.25rem,6vw,6rem)] top-24'>
          SYS ▸ ONLINE
        </span>
        <span className='absolute right-[clamp(1.25rem,6vw,6rem)] top-24 text-right'>
          FE · MOTION · WebGL
        </span>
        <span className='absolute right-[clamp(1.25rem,6vw,6rem)] bottom-24 text-creative-green'>
          ● 60FPS
        </span>
      </div>

      {/* Floating terminal panel (desktop) — kept lighter so the glowing 3D
          core reads through it instead of being boxed out. */}
      <div className='pointer-events-auto absolute right-[clamp(1.25rem,6vw,6rem)] top-1/2 z-10 hidden w-[clamp(18rem,22vw,24rem)] -translate-y-1/2 rounded-2xl border border-creative-line bg-creative-panel/45 p-3 backdrop-blur-md xl:block'>
        <div className='mb-2 flex items-center justify-between px-1'>
          <span className='flex items-center gap-2'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-creative-green opacity-75' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-creative-green' />
            </span>
            <span className='font-mono text-meta uppercase tracking-[0.16em] text-creative-muted'>
              {t('status')}
            </span>
          </span>
          <span className='font-mono text-meta uppercase tracking-wider text-creative-dim'>
            SYS_ACTIVE
          </span>
        </div>
        <div className='overflow-hidden rounded-xl border border-creative-line/40'>
          <InteractiveTerminal />
        </div>
      </div>

      {/* Main content */}
      <div className='relative z-10 mx-auto w-full max-w-[1400px]'>
        <p className='mb-5 font-mono text-kicker font-bold uppercase tracking-[0.24em] text-creative-dim'>
          [ SESSION 2025 // {t('developer')} ]
        </p>

        <h1
          className='m-0 font-display font-black uppercase leading-[0.86] tracking-[-0.03em]'
          aria-label={`${t('front')} ${t('middle')} ${t('end')}`}
        >
          <span
            className='block text-creative-ink'
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            {t('front')} {t('middle')}
          </span>
          <span
            className='block text-creative-green'
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            {t('end')}
          </span>
        </h1>

        <p className='mt-6 max-w-[52ch] font-mono text-body-sm leading-relaxed text-creative-muted'>
          {t('description')}
        </p>

        <div className='mt-8 flex flex-wrap items-center gap-3'>
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
          <span className='ml-2 flex items-center gap-2 text-creative-dim'>
            <MapPin className='h-3 w-3' aria-hidden='true' />
            <span className='font-mono text-kicker font-bold uppercase tracking-[0.16em]'>
              {t('contact.location')}
            </span>
          </span>
        </div>
      </div>

      {/* Ticker rail */}
      <div className='relative z-10 mt-12 overflow-hidden border-t border-creative-line py-3'>
        <TickerRow />
      </div>
    </section>
  )
}
