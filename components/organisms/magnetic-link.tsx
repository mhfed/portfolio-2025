'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowDownRight } from 'lucide-react'

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

      const onMove = (event: MouseEvent) => {
        const rect = node.getBoundingClientRect()
        const x = event.clientX - (rect.left + rect.width / 2)
        const y = event.clientY - (rect.top + rect.height / 2)
        const distance = Math.hypot(x, y)

        if (distance < 120) {
          gsap.to(node, {
            x: x * 0.16,
            y: y * 0.2,
            duration: 0.35,
            ease: 'power3.out',
          })
        }
      }

      const reset = () => {
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

  return (
    <a ref={ref} href={href} className={`magnetic-link magnetic-link--${variant}`}>
      <span>{children}</span>
      <ArrowDownRight aria-hidden='true' />
    </a>
  )
}
