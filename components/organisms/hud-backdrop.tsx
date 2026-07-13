'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'
import {
  usePrefersReducedMotion,
  useIsMobile,
} from '@/hooks/use-client-capabilities'

interface HudBackdropProps {
  projects: ProjectCaseStudy[]
  experiences: ExperienceRecord[]
}

const Fallback = () => (
  <div
    aria-hidden='true'
    className='hud-grid-fallback pointer-events-none fixed inset-0 z-0'
  />
)

/**
 * The WebGL scene (three + drei + postprocessing) is code-split into its own
 * chunk and only fetched on the client, after mount, for users who haven't
 * asked for reduced motion — so none of that weight lands in the critical
 * bundle or blocks first paint / LCP. A static grid stands in until it loads.
 */
const HudScene = dynamic(() => import('./hud-scene'), {
  ssr: false,
  loading: Fallback,
})

/**
 * Fixed, full-viewport WebGL backdrop for the whole portfolio. Falls back to a
 * static grid under reduced-motion or before mount so it never blocks LCP.
 */
export function HudBackdrop({ projects, experiences }: HudBackdropProps) {
  const reduced = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted || reduced) return <Fallback />

  const quality = isMobile ? 'low' : 'high'

  return (
    <HudScene quality={quality} projects={projects} experiences={experiences} />
  )
}
