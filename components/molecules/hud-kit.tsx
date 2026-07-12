'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Returns true once the element scrolls into view (or immediately under reduced-motion). */
function useInView<T extends HTMLElement>(
  threshold = 0.15
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, inView]
}

/** Clip/opacity "scan-in" reveal, driven by IntersectionObserver. */
export function ScanReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      data-inview={inView || undefined}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn('hud-scan', className)}
    >
      {children}
    </div>
  )
}

/** Section marker: STATION 0X // LABEL + hairline + title with blinking caret. */
export function StationHeader({
  index,
  label,
  title,
  accent = 'var(--creative-green)',
}: {
  index: number
  label: string
  title: ReactNode
  accent?: string
}) {
  const idx = String(index).padStart(2, '0')
  return (
    <ScanReveal className='mb-10 md:mb-16'>
      <div className='flex items-center gap-4'>
        <span
          className='h-2.5 w-2.5 flex-none rounded-full'
          style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
        />
        <span className='font-mono text-kicker font-bold uppercase tracking-[0.3em] text-creative-dim'>
          STATION {idx} <span className='text-creative-line'>//</span>{' '}
          <span style={{ color: accent }}>{label}</span>
        </span>
        <span className='h-px flex-1 bg-gradient-to-r from-creative-line to-transparent' />
      </div>
      <h2 className='mt-6 max-w-[20ch] font-display text-display-md font-black uppercase leading-[0.95] tracking-[-0.02em] text-creative-ink'>
        {title}
        <span className='hud-caret ml-2 inline-block' style={{ background: accent }} />
      </h2>
    </ScanReveal>
  )
}

/** Count-up numeric readout, animates when scrolled into view. */
export function StatCounter({
  value,
  suffix = '',
  label,
  accent = 'var(--creative-green)',
}: {
  value: number
  suffix?: string
  label: string
  accent?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const duration = 1200
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <div ref={ref}>
      <div
        className='font-display text-stat font-black leading-none tabular-nums'
        style={{ color: accent }}
      >
        {display}
        {suffix}
      </div>
      <div className='mt-2 font-mono text-meta uppercase tracking-[0.16em] text-creative-dim'>
        {label}
      </div>
    </div>
  )
}

/** Segmented signal-strength bar that fills when in view. */
export function SignalBar({
  level,
  segments = 12,
  accent = 'var(--creative-green)',
}: {
  level: number // 0..1
  segments?: number
  accent?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const active = Math.round(level * segments)
  return (
    <div ref={ref} className='flex gap-[3px]' aria-hidden='true'>
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className='h-3 flex-1 rounded-[1px] transition-all duration-500'
          style={{
            background: inView && i < active ? accent : 'rgba(255,255,255,0.08)',
            boxShadow: inView && i < active ? `0 0 6px ${accent}` : 'none',
            transitionDelay: `${i * 35}ms`,
          }}
        />
      ))}
    </div>
  )
}
