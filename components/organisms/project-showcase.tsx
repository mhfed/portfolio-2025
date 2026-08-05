import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import { ProjectStack } from '@/components/molecules/project-stack'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface ProjectShowcaseProps {
  work: PortfolioContent['work']
}

interface ProjectMediaProps {
  project: PortfolioContent['work']['projects'][number]
  viewLabel: string
}

function ProjectMedia({ project, viewLabel }: ProjectMediaProps) {
  const image = (
    <Image
      className='project-media__image'
      src={project.image}
      alt={`${project.title} project preview`}
      fill
      sizes='(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 45vw'
      quality={75}
    />
  )

  if (!project.liveUrl) {
    return (
      <div
        className='project-media'
        data-project-id={project.id}
        data-spotlight-surface
      >
        <ProjectWindowChrome />
        <span className='project-media__screen'>
          <span className='project-media__parallax' data-project-parallax>
            {image}
          </span>
        </span>
      </div>
    )
  }

  return (
    <a
      className='project-media'
      data-project-id={project.id}
      href={project.liveUrl}
      target='_blank'
      rel='noreferrer'
      aria-label={`${viewLabel}: ${project.title}`}
      data-spotlight-surface
    >
      <ProjectWindowChrome />
      <span className='project-media__screen'>
        <span className='project-media__parallax' data-project-parallax>
          {image}
        </span>
      </span>
    </a>
  )
}

function ProjectWindowChrome() {
  return (
    <span className='project-window-chrome' aria-hidden='true'>
      <span className='project-window-chrome__dots'>
        <i />
        <i />
        <i />
      </span>
      <span className='project-window-chrome__address'>
        localhost / preview
      </span>
    </span>
  )
}

export function ProjectShowcase({ work }: ProjectShowcaseProps) {
  return (
    <section id='work' className='project-showcase section-anchor'>
      <div className='portfolio-shell project-showcase__heading'>
        <EditorialReveal className='project-showcase__title'>
          <h2>{work.title}</h2>
        </EditorialReveal>
        <EditorialReveal className='project-showcase__intro' delay={0.08}>
          <span aria-label={`${work.projects.length} projects`}>
            01 — {`${work.projects.length}`.padStart(2, '0')}
          </span>
        </EditorialReveal>
      </div>

      <ProjectStack>
        {work.projects.map((project, index) => (
          <article
            key={project.id}
            id={`project-${project.id}`}
            className='project-panel'
            data-project-index={index}
            data-project-panel
          >
            <div className='portfolio-shell project-panel__inner'>
              <div className='project-content'>
                <div className='project-title-row'>
                  <div>
                    <p className='project-year'>{project.year}</p>
                    <h3>{project.title}</h3>
                  </div>
                  {project.liveUrl ? (
                    <a
                      className='project-action'
                      href={project.liveUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {work.launchLabel}
                      <ArrowUpRight
                        aria-hidden='true'
                        size={18}
                        strokeWidth={1.7}
                      />
                    </a>
                  ) : null}
                </div>

                <div className='project-meta'>
                  <div className='project-meta__copy'>
                    <p className='project-role'>{project.role}</p>
                    <p>{project.result}</p>
                    <p>{project.description}</p>
                  </div>
                  <ul aria-label={`${project.title} technology stack`}>
                    {project.techStack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  {project.githubUrl ? (
                    <a
                      className='project-source'
                      href={project.githubUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {work.sourceLabel}
                      <ArrowUpRight
                        aria-hidden='true'
                        size={16}
                        strokeWidth={1.7}
                      />
                    </a>
                  ) : null}
                </div>
              </div>
              <ProjectMedia project={project} viewLabel={work.viewLabel} />
            </div>
          </article>
        ))}
      </ProjectStack>
    </section>
  )
}
