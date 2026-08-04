'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ScanReveal } from '@/components/molecules/reveal-kit'
import type { ProjectCaseStudy } from '@/data/projects'
import { cn } from '@/lib/utils'

interface ProjectPreviewProps {
  project: ProjectCaseStudy
  priority?: boolean
  className?: string
}

function ProjectPreview({
  project,
  priority = false,
  className,
}: ProjectPreviewProps) {
  return (
    <div
      className={cn('relative overflow-hidden bg-portfolio-surface', className)}
    >
      <Image
        src={project.image}
        alt={`${project.title} project preview`}
        fill
        priority={priority}
        quality={78}
        sizes='(max-width: 767px) 100vw, (max-width: 1439px) 90vw, 81rem'
        className='object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]'
      />
      <div
        className='pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-portfolio-bg/55 to-transparent'
        aria-hidden='true'
      />
    </div>
  )
}

export interface WorkSectionProps {
  projects: ProjectCaseStudy[]
}

export function WorkSection({ projects }: WorkSectionProps) {
  const t = useTranslations('projects')

  return (
    <section
      id='work'
      className='mx-auto max-w-[90rem] px-5 py-28 sm:px-8 md:py-36 lg:px-12'
    >
      <ScanReveal className='mb-14 md:mb-20'>
        <h2 className='font-display text-[clamp(2.8rem,6vw,6.4rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-portfolio-ink'>
          {t('title')}
        </h2>
      </ScanReveal>

      {projects.length === 0 ? (
        <p className='text-portfolio-muted'>{t('noProjects')}</p>
      ) : (
        <div>
          {projects.map((project, index) => (
            <article
              key={project.id}
              className='project-case-study border-t border-portfolio-line py-14 first:pt-0 md:py-18'
            >
              <ScanReveal>
                <div className='grid gap-10 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16 xl:gap-20'>
                  <div className='max-w-[30rem]'>
                    <p className='font-mono text-[0.7rem] text-portfolio-accent'>
                      {project.year}
                    </p>
                    <h3 className='mt-5 max-w-[11ch] font-display text-[clamp(3rem,5.25vw,6rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-portfolio-ink'>
                      {project.title}
                    </h3>
                    <p className='mt-7 font-mono text-[0.7rem] text-portfolio-accent'>
                      {project.role}
                    </p>
                    <p className='mt-4 text-[1rem] leading-relaxed text-portfolio-muted'>
                      {project.result}
                    </p>
                    <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-3'>
                      <p className='font-mono text-[0.65rem] text-portfolio-dim'>
                        {project.techStack.slice(0, 4).join(' / ')}
                      </p>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target='_blank'
                          rel='noreferrer'
                          className='group inline-flex items-center gap-2 text-sm font-semibold text-portfolio-ink no-underline transition-colors hover:text-portfolio-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent'
                        >
                          {t('launchApp')}
                          <ArrowUpRight
                            size={16}
                            className='transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                            aria-hidden='true'
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className='group'>
                    <ProjectPreview
                      project={project}
                      priority={index === 0}
                      className='aspect-[16/10] lg:aspect-[16/10]'
                    />
                  </div>
                </div>
              </ScanReveal>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
