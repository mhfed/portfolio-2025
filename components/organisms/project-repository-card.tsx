import Image from 'next/image'
import { ArrowUpRight, Github } from 'lucide-react'
import type { ProjectCaseStudy } from '@/data/projects'

interface ProjectRepositoryCardProps {
  project: ProjectCaseStudy
  index: number
  liveLabel: string
  githubLabel: string
}

export function ProjectRepositoryCard({
  project,
  index,
  liveLabel,
  githubLabel,
}: ProjectRepositoryCardProps) {
  const isEven = index % 2 === 1

  return (
    <article
      className='project-scene group'
      data-cursor='view case'
    >
      <div className='project-scene__number'>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{project.year}</span>
      </div>

      <div className={`project-scene__layout ${isEven ? 'project-scene__layout--reverse' : ''}`}>
        <div className='project-scene__copy'>
          <h3>{project.title}</h3>
          <p className='case-card__description'>{project.description}</p>

          <div className='project-scene__stack'>
            {project.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className='project-scene__actions'>
            {project.liveUrl && (
              <a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
                {liveLabel}
                <ArrowUpRight className='h-4 w-4' />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
                {githubLabel}
                <Github className='h-4 w-4' />
              </a>
            )}
          </div>

          <dl className='project-scene__facts'>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Result</dt>
              <dd>{project.result}</dd>
            </div>
          </dl>
        </div>

        <a
          href={project.liveUrl ?? project.githubUrl ?? '#projects'}
          target={project.liveUrl || project.githubUrl ? '_blank' : undefined}
          rel={project.liveUrl || project.githubUrl ? 'noopener noreferrer' : undefined}
          className='project-scene__visual'
          aria-label={`Open ${project.title}`}
        >
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1280px) 64vw, 980px'
            className='object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.055]'
          />
          <span className='project-scene__visual-glow' />
        </a>
      </div>
    </article>
  )
}
