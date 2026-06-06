'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ProjectCaseStudy } from '@/data/projects'
import { loadGSAP } from '@/lib/gsap-utils'

function ProjectPreview({
  project,
  active,
}: {
  project: ProjectCaseStudy | undefined
  active: boolean
}) {
  return (
    <aside
      className={`project-preview ${active ? 'is-active' : ''}`}
      aria-hidden='true'
    >
      {project ? (
        <>
          <Image
            src={project.image}
            alt=''
            fill
            sizes='(min-width: 1280px) 28rem, 32vw'
            quality={70}
          />
          <div>
            <span>{project.year}</span>
            <strong>{project.title}</strong>
          </div>
        </>
      ) : null}
    </aside>
  )
}

export function WorkSection({ projects }: { projects: ProjectCaseStudy[] }) {
  const t = useTranslations('projects')
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | undefined>(
    projects[0]
  )
  const [previewActive, setPreviewActive] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined

    // Check if device supports hover/fine pointer and screen is desktop
    const mq = window.matchMedia('(min-width: 1025px)')
    if (!mq.matches) return

    loadGSAP().then(({ gsap }) => {
      const preview = previewRef.current
      if (!preview) return

      // Pre-position preview card in center of screen
      gsap.set(preview, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })

      // Highly-optimized quickTo interpolation for smooth mouse-following lag
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.35, ease: 'power3.out' })
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.35, ease: 'power3.out' })

      const handleMouseMove = (e: MouseEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      cleanup = () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    })

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <section id='work' className='creative-section creative-work' data-section>
      <div className='creative-section__intro'>
        <p className='creative-kicker' data-reveal>
          {t('selected')}
        </p>
        <h2 data-split-line>
          {t('headline')}
        </h2>
      </div>

      <div className='work-list'>
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.liveUrl ?? project.githubUrl ?? '#contact'}
            className='work-row'
            target={project.liveUrl || project.githubUrl ? '_blank' : undefined}
            rel={project.liveUrl || project.githubUrl ? 'noreferrer' : undefined}
            onMouseEnter={() => {
              setActiveProject(project)
              setPreviewActive(true)
            }}
            onMouseLeave={() => setPreviewActive(false)}
            data-work-row
          >
            <span className='work-row__index'>
              {String(index + 1).padStart(2, '0')}
            </span>
            
            <span className='work-row__main'>
              <strong>{project.title}</strong>
              <small>{project.description}</small>
            </span>

            <span className='work-row__thumbnail'>
              <Image
                src={project.image}
                alt=''
                width={160}
                height={100}
                quality={60}
                sizes='(max-width: 768px) 90px, 140px'
                className='work-row__thumbnail-img'
              />
            </span>

            <span className='work-row__tags'>
              {project.techStack.slice(0, 5).map((tech) => (
                <em key={tech}>{tech}</em>
              ))}
            </span>
            <ArrowUpRight aria-hidden='true' />
          </a>
        ))}
      </div>

      <div
        ref={previewRef}
        className='project-preview-wrapper'
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      >
        <ProjectPreview project={activeProject} active={previewActive} />
      </div>
    </section>
  )
}
