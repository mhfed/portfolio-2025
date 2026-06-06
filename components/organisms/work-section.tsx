'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ProjectCaseStudy } from '@/data/projects'

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
            <span className='work-row__tags'>
              {project.techStack.slice(0, 5).map((tech) => (
                <em key={tech}>{tech}</em>
              ))}
            </span>
            <ArrowUpRight aria-hidden='true' />
          </a>
        ))}
      </div>

      <ProjectPreview project={activeProject} active={previewActive} />
    </section>
  )
}
