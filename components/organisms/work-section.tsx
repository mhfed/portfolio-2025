'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, Github } from 'lucide-react'
import type { ProjectCaseStudy } from '@/data/projects'
import { StationHeader } from '@/components/molecules/hud-kit'
import { hudFocus } from '@/lib/hud-focus'
import { cn } from '@/lib/utils'

const ACCENT = '#ff5ebc'

function summarize(text: string): string {
  const clean = text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const idx = clean.search(/[.。!?]\s/)
  return idx === -1 ? clean : clean.slice(0, idx + 1)
}

function Monitor({
  project,
  swapKey,
  priority,
}: {
  project: ProjectCaseStudy
  swapKey: number | string
  priority?: boolean
}) {
  const hasImage = !!(project.image && project.image.trim().length > 0)
  return (
    <div className='overflow-hidden rounded-xl border border-creative-line'>
      <div className='flex items-center gap-1.5 border-b border-creative-line bg-black/30 px-4 py-2.5'>
        <span className='h-2.5 w-2.5 rounded-full bg-creative-orange/70' />
        <span className='h-2.5 w-2.5 rounded-full bg-creative-green/60' />
        <span className='h-2.5 w-2.5 rounded-full bg-white/15' />
        <span className='ml-2 truncate font-mono text-[0.7rem] uppercase tracking-wider text-creative-dim'>
          {project.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.app
        </span>
        {project.liveUrl && (
          <span className='ml-auto flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-creative-green'>
            <span className='relative flex h-1.5 w-1.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-creative-green opacity-75' />
              <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-creative-green' />
            </span>
            LIVE
          </span>
        )}
      </div>
      <div
        key={swapKey}
        className='hud-fade-in relative aspect-[16/10] overflow-hidden'
      >
        {hasImage ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className='object-cover object-top'
            quality={75}
            priority={priority}
            sizes='(max-width: 1024px) 100vw, 55vw'
          />
        ) : (
          <div className='absolute inset-0 grid place-items-center bg-[#0c0e0b] font-mono text-meta text-creative-dim'>
            NO_PREVIEW
          </div>
        )}
        <div
          className='hud-scanlines pointer-events-none absolute inset-0 opacity-40'
          aria-hidden='true'
        />
        <div
          className='pointer-events-none absolute inset-0 bg-gradient-to-t from-creative-bg/70 via-transparent to-transparent'
          aria-hidden='true'
        />
      </div>
    </div>
  )
}

function RecordDetail({
  project,
  index,
  total,
}: {
  project: ProjectCaseStudy
  index: number
  total: number
}) {
  const t = useTranslations('projects')
  return (
    <>
      <div className='flex items-baseline justify-between gap-4'>
        <span className='font-mono text-meta uppercase tracking-[0.2em] text-creative-dim'>
          REC_{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className='font-mono text-meta uppercase' style={{ color: ACCENT }}>
          {project.liveUrl ? 'DEPLOYED' : 'ARCHIVED'} · {project.year}
        </span>
      </div>

      <h3 className='mt-3 font-display text-panel-title font-black uppercase leading-[0.98] tracking-[-0.02em] text-creative-ink'>
        {project.title}
      </h3>

      <p className='mt-3 max-w-[52ch] font-body text-body-sm leading-relaxed text-creative-muted'>
        {summarize(project.result || project.description)}
      </p>

      <p className='mt-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-creative-dim'>
        {project.role}
      </p>

      <ul className='mt-5 flex flex-wrap gap-2'>
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className='rounded border border-creative-line bg-white/[0.02] px-2.5 py-1 font-mono text-[0.72rem] font-bold uppercase tracking-wide text-creative-dim'
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className='mt-7 flex flex-wrap items-center gap-3'>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-full bg-creative-green px-5 py-2.5 font-mono text-meta font-bold uppercase tracking-wider text-creative-bg transition-transform duration-200 hover:scale-[1.03]'
          >
            {t('launchApp')}
            <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-creative-line px-5 py-2.5 font-mono text-meta font-bold uppercase tracking-wider text-creative-muted transition-colors duration-200 hover:border-creative-green/50 hover:text-creative-ink'
          >
            <Github className='h-4 w-4' aria-hidden='true' />
            {t('sourceCode')}
          </a>
        )}
      </div>
    </>
  )
}

export function WorkSection({ projects }: { projects: ProjectCaseStudy[] }) {
  const t = useTranslations('projects')
  const [active, setActive] = useState(0)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll-driven: whichever record block crosses the vertical center of the
  // viewport becomes the active one, and the sticky monitor swaps to match.
  useEffect(() => {
    const els = blockRefs.current.filter(Boolean) as HTMLDivElement[]
    if (els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(i)) setActive(i)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [projects.length])

  // Mirror the active record to the 3D scene so its panel label lights up.
  useEffect(() => {
    hudFocus.work = active
  }, [active])

  const current = projects[active]

  return (
    <section
      id='work'
      data-section
      data-waypoint='work'
      className='creative-section relative w-full px-[clamp(1.25rem,6vw,6rem)] py-28 md:py-40'
    >
      <div className='mx-auto w-full max-w-[1400px]'>
        <StationHeader
          index={3}
          label='PROJECTS'
          title={t('title')}
          accent={ACCENT}
        />

        {projects.length === 0 || !current ? (
          <p className='font-mono text-creative-dim'>{t('noProjects')}</p>
        ) : (
          <div className='grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16'>
            {/* Left: scrolling record blocks */}
            <div>
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    blockRefs.current[i] = el
                  }}
                  data-index={i}
                  className={cn(
                    'flex min-h-[62vh] flex-col justify-center py-10 transition-opacity duration-500',
                    i === active ? 'opacity-100' : 'lg:opacity-35'
                  )}
                >
                  {/* Inline monitor on mobile only */}
                  <div className='mb-6 lg:hidden'>
                    <Monitor
                      project={project}
                      swapKey={project.id}
                      priority={i === 0}
                    />
                  </div>
                  <RecordDetail
                    project={project}
                    index={i}
                    total={projects.length}
                  />
                </div>
              ))}
            </div>

            {/* Right: sticky monitor tracking the active record (desktop) */}
            <div className='hidden lg:block'>
              <div className='sticky top-[16vh]'>
                <Monitor
                  project={current}
                  swapKey={active}
                  priority={active === 0}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
