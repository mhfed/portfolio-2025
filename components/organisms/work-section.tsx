'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ProjectCaseStudy } from '@/data/projects'
import { loadGSAP } from '@/lib/gsap-utils'

// ─────────────────────────────────────────────
// Single stacking card
// ─────────────────────────────────────────────

interface ProjectCardProps {
  project: ProjectCaseStudy
  index: number
  total: number
}

function ProjectCard({ project, index, total }: ProjectCardProps) {
  const tCommon = useTranslations('common')
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const href = project.liveUrl ?? project.githubUrl ?? '#contact'
  const isExternal = !!(project.liveUrl || project.githubUrl)

  // Guard: next/image requires a non-empty src
  const imageSrc =
    project.image && project.image.trim().length > 0 ? project.image : null

  return (
    <div
      className='project-stack-card group relative overflow-hidden rounded-2xl border border-white/8 bg-black/15 backdrop-blur-md'
      data-stack-card
      style={{
        position: 'sticky',
        top: `${72 + index * 24}px`,
        zIndex: index + 1,
        // last card has no bottom margin adjustment needed
        marginBottom: index < total - 1 ? 0 : 0,
      }}
    >
      {/* Subtle ambient lime gradient — always visible */}
      <div
        className='pointer-events-none absolute inset-0 z-10'
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(200,255,69,0.03) 0%, transparent 55%)',
        }}
        aria-hidden='true'
      />

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]'>
        {/* Left: image */}
        <div
          data-project-col-img
          className='relative overflow-hidden'
          style={{ aspectRatio: '4/3' }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className='object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]'
              quality={85}
              priority={index === 0}
              sizes='(max-width: 1024px) 100vw, 50vw'
            />
          ) : (
            // Fallback placeholder when image URL is missing
            <div className='absolute inset-0 bg-[#0c0e0b] border border-white/5 p-6 flex flex-col justify-between overflow-hidden group/fallback'>
              {/* Window Controls */}
              <div className='flex items-center gap-1.5 opacity-60'>
                <span className='w-2 h-2 rounded-full bg-white/10' />
                <span className='w-2 h-2 rounded-full bg-white/10' />
                <span className='w-2 h-2 rounded-full bg-white/10' />
                <span className='ml-2 font-mono text-[8px] uppercase tracking-wider text-white/40'>
                  {project.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.conf
                </span>
              </div>

              {/* Fake Code structure representation */}
              <div className='my-auto flex flex-col gap-2 font-mono text-[9px] text-white/40 leading-relaxed pl-2'>
                <div className='flex items-center gap-1.5'>
                  <span className='text-[var(--creative-lime)]'>const</span>
                  <span className='text-white/60'>project</span>
                  <span>=</span>
                  <span className='text-white/75'>&#123;</span>
                </div>
                <div className='pl-4 flex items-center gap-1.5'>
                  <span>title:</span>
                  <span className='text-[var(--creative-lime)]'>
                    "{project.title}"
                  </span>
                  ,
                </div>
                <div className='pl-4 flex items-center gap-1.5'>
                  <span>year:</span>
                  <span className='text-[var(--creative-lime)]'>
                    "{project.year}"
                  </span>
                  ,
                </div>
                <div className='pl-4 flex items-center gap-1.5'>
                  <span>stack:</span>
                  <span>[</span>
                  <span className='text-white/60'>
                    {project.techStack.map((t) => `"${t}"`).join(', ')}
                  </span>
                  <span>]</span>
                </div>
                <div className='flex items-center'>
                  <span className='text-white/75'>&#125;;</span>
                </div>
              </div>

              {/* Ambient Glow */}
              <div className='absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[var(--creative-lime)]/5 blur-2xl group-hover/fallback:bg-[var(--creative-lime)]/10 transition-all duration-500' />
            </div>
          )}

          {/* Year stamp */}
          <div className='absolute bottom-4 left-4 z-20'>
            <span className='rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-meta font-bold uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm'>
              {project.year}
            </span>
          </div>
        </div>

        {/* Right: content */}
        <div
          data-project-col-content
          className='flex flex-col justify-between p-8 lg:p-10'
        >
          {/* Top: index number + tech chips */}
          <div className='flex items-start justify-between gap-4'>
            <span
              className='select-none font-mono font-black leading-none text-creative-line'
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
              aria-hidden='true'
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {project.techStack.length > 0 && (
              <div
                className='flex flex-wrap justify-end gap-1.5'
                data-project-meta
              >
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    data-chip
                    className='rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-meta font-bold uppercase tracking-wide text-creative-dim'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title + description */}
          <div className='my-6 flex flex-col gap-4'>
            <h3
              className='m-0 font-display font-black uppercase leading-[1.0] tracking-[-0.02em] text-white'
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)' }}
            >
              {project.title}
            </h3>
            {project.description && (
              <p className='m-0 max-w-[48ch] text-body-sm font-light leading-relaxed text-creative-muted'>
                {project.description}
              </p>
            )}
          </div>

          {/* Result callout */}
          {project.result && (
            <div
              className='mb-6 border-l-2 pl-4 transition-colors duration-500'
              style={{ borderColor: 'var(--creative-lime)' }}
            >
              <p className='m-0 max-w-[48ch] text-body-sm font-medium leading-relaxed text-creative-ink/80'>
                {project.result}
              </p>
            </div>
          )}

          {/* Localized details collapse */}
          {project.details.length > 0 && (
            <div className='mb-6 flex flex-col gap-2'>
              <button
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                className='self-start font-mono text-meta font-bold uppercase tracking-wider text-[var(--creative-lime)] hover:text-creative-ink transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--creative-lime)]/50 rounded px-2.5 py-1 bg-white/[0.02] border border-white/5 hover:border-[var(--creative-lime)]/30'
              >
                {isDetailsExpanded ? tCommon('showLess') : tCommon('seeMore')}
              </button>

              {isDetailsExpanded && (
                <ul className='mt-2 flex flex-col gap-2.5 pl-4 list-disc text-creative-muted font-body text-body-sm max-w-prose leading-relaxed'>
                  {project.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className='marker:text-[var(--creative-lime)]'
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Role + CTA */}
          <div className='flex items-end justify-between gap-6 border-t border-white/6 pt-6'>
            {project.role && (
              <p className='m-0 max-w-[26ch] font-mono text-kicker font-bold uppercase leading-relaxed tracking-[0.14em] text-creative-dim'>
                {project.role}
              </p>
            )}
            <a
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
              className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/14 text-creative-dim no-underline transition-all duration-300 hover:border-[var(--creative-lime)] hover:bg-[var(--creative-lime)] hover:text-[#10120c] active:scale-95'
              aria-label={`Open ${project.title}`}
            >
              <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// WorkSection
// ─────────────────────────────────────────────

export function WorkSection({ projects }: { projects: ProjectCaseStudy[] }) {
  const t = useTranslations('projects')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let active = true
    // Track ScrollTrigger instances for cleanup
    const triggers: { kill: () => void }[] = []

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      // Section headline entrance
      const headline = section.querySelector('[data-work-headline]')
      if (headline) {
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top 78%',
          onEnter: () => {
            gsap.fromTo(
              headline,
              { yPercent: 30, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out' }
            )
          },
          once: true,
        })
        triggers.push(st)
      }

      // Per-card: image scale-in + buried-card dim
      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-stack-card]',
        section
      )

      cards.forEach((card, i) => {
        // Image scale-in on viewport enter
        const img = card.querySelector('img')
        if (img) {
          const st = ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(
                img,
                { scale: 0.92 },
                { scale: 1, duration: 1, ease: 'power3.out' }
              )
            },
            once: true,
          })
          triggers.push(st)
        }

        // Bury animation: dim card[i] as card[i+1] enters
        if (i < cards.length - 1) {
          const buryTrigger = cards[i + 1]
          const st = ScrollTrigger.create({
            trigger: buryTrigger,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 0.6,
            onUpdate: (self) => {
              gsap.set(card, {
                opacity: 1 - self.progress * 0.45,
                scale: 1 - self.progress * 0.02,
              })
            },
            onLeaveBack: () => {
              gsap.set(card, { opacity: 1, scale: 1 })
            },
          })
          triggers.push(st)
        }
      })

      ScrollTrigger.refresh()
    })

    return () => {
      active = false
      // Kill all created ScrollTrigger instances
      triggers.forEach((t) => t.kill())
    }
  }, [projects.length])

  // Show empty state if no projects
  if (projects.length === 0) {
    return (
      <section
        id='work'
        className='creative-section creative-work relative w-full py-20 md:py-32'
        data-section
        data-waypoint='work'
      >
        <div className='mx-auto w-full px-[clamp(1.25rem,6vw,6rem)]'>
          <p className='text-creative-dim font-mono text-body-sm'>
            {t('noProjects')}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      id='work'
      ref={sectionRef}
      className='creative-section creative-work relative w-full py-20 md:py-32'
      data-section
      data-waypoint='work'
    >
      <div className='mx-auto w-full px-[clamp(1.25rem,6vw,6rem)]'>
        {/* Section header */}
        <div className='mb-20 md:mb-28' data-work-headline>
          <p className='m-0 mb-4 font-mono text-kicker font-bold uppercase tracking-[0.24em] text-creative-dim'>
            {t('kicker')}
          </p>
          <h2
            className='m-0 max-w-[20ch] font-display font-black uppercase leading-[0.92] tracking-[-0.03em] text-creative-ink'
            style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)' }}
          >
            {t('headline')}
          </h2>
        </div>

        {/* Stacking card stack */}
        <div className='flex flex-col gap-4'>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>

        {/* Spacer so last card unsticks cleanly */}
        <div
          style={{ height: `${projects.length * 24}px` }}
          aria-hidden='true'
        />
      </div>
    </section>
  )
}
