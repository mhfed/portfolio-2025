import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import { ProjectStack } from '@/components/molecules/project-stack'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface ProjectShowcaseProps {
  work: PortfolioContent['work']
}

export function ProjectShowcase({ work }: ProjectShowcaseProps) {
  return (
    <section id='work' className='project-showcase section-anchor'>
      <div className='portfolio-shell project-showcase__heading'>
        <EditorialReveal>
          <h2>{work.title}</h2>
        </EditorialReveal>
      </div>

      <ProjectStack>
        {work.projects.map((project) => (
          <article
            key={project.id}
            id={`project-${project.id}`}
            className='project-panel'
            data-project-panel
          >
            <div className='portfolio-shell project-panel__inner'>
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

              <a
                className='project-media'
                data-project-id={project.id}
                href={project.liveUrl || undefined}
                target={project.liveUrl ? '_blank' : undefined}
                rel={project.liveUrl ? 'noreferrer' : undefined}
                aria-label={project.liveUrl ? `${work.viewLabel}: ${project.title}` : undefined}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes='(max-width: 767px) 100vw, 90vw'
                  quality={75}
                />
              </a>

              <div className='project-meta'>
                <p>{project.description}</p>
                <ul aria-label={`${project.title} technology stack`}>
                  {project.techStack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </ProjectStack>
    </section>
  )
}
