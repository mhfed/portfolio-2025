'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type MagneticLinkProps = {
  href: string
  children: ReactNode
  variant?: 'light' | 'dark'
}

export function MagneticLink({
  href,
  children,
  variant = 'light',
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduced || !canHover) return

    let active = true
    let cleanup: (() => void) | undefined

    import('gsap').then(({ gsap }) => {
      if (!active) return

      let rafPending = false
      let lastEvent: MouseEvent | null = null

      const onMove = (event: MouseEvent) => {
        lastEvent = event
        if (!rafPending) {
          rafPending = true
          requestAnimationFrame(() => {
            if (!lastEvent) return
            const rect = node.getBoundingClientRect()
            const x = lastEvent.clientX - (rect.left + rect.width / 2)
            const y = lastEvent.clientY - (rect.top + rect.height / 2)
            const distance = Math.hypot(x, y)

            if (distance < 120) {
              gsap.to(node, {
                x: x * 0.16,
                y: y * 0.2,
                duration: 0.35,
                ease: 'power3.out',
              })
            }
            rafPending = false
          })
        }
      }

      const reset = () => {
        lastEvent = null
        gsap.to(node, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.45)',
        })
      }

      window.addEventListener('mousemove', onMove, { passive: true })
      node.addEventListener('mouseleave', reset)

      cleanup = () => {
        window.removeEventListener('mousemove', onMove)
        node.removeEventListener('mouseleave', reset)
      }
    })

    return () => {
      active = false
      cleanup?.()
    }
  }, [])

  // Light variant (primary): Lime fill, dark text
  // Dark variant (secondary): Glass dark outline fill, light text
  const isLight = variant === 'light'

  return (
    <a
      ref={ref}
      href={href}
      className={`group relative inline-flex p-[3px] rounded-full border transition-all duration-300 active:scale-[0.98] ${
        isLight
          ? 'bg-creative-lime/10 border-creative-lime/30 hover:border-creative-lime/60 hover:bg-creative-lime/15'
          : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10'
      }`}
    >
      <span
        className={`flex items-center gap-3.5 pl-6 pr-3.5 py-3 rounded-full transition-all duration-300 ${
          isLight
            ? 'bg-creative-lime text-black font-extrabold'
            : 'bg-[#080907]/90 text-creative-ink font-semibold border border-white/5'
        }`}
      >
        <span className="text-xs uppercase tracking-[0.14em]">{children}</span>
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            isLight
              ? 'bg-black/10 group-hover:bg-black/20 text-black'
              : 'bg-white/10 group-hover:bg-white/20 text-creative-ink'
          }`}
        >
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </span>
    </a>
  )
}
