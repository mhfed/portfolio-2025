import { getTranslations } from 'next-intl/server'
import { SectionTitle } from './section-title'
import {
  ProjectCardRoot,
  ProjectCardMockup,
  ProjectCardDetails,
  ProjectCardHeader,
  ProjectCardTitle,
  ProjectCardDescription,
  ProjectCardResponsibilities,
  ProjectCardTechStack,
  ProjectCardActions,
  ProjectCardLink,
} from './project-repository-card'
import { Reveal } from './ui/reveal'

interface ProjectData {
  id: number
  title: string
  year: string
  description: string
  details: string
  imageUrl: string
  liveUrl: string | null
  githubUrl: string | null
  techStack: string[]
}

export async function ProjectsSection() {
  const t = await getTranslations('projects')
  const projectsList = (t.raw('list') || []) as ProjectData[]

  // Map localization records to match ProjectCard interface
  const mappedProjects = projectsList.map((project: ProjectData) => ({
    image: project.imageUrl,
    title: project.title,
    year: project.year || '',
    description: project.description,
    details: project.details,
    liveUrl: project.liveUrl || undefined,
    githubUrl: project.githubUrl || undefined,
    techStack: project.techStack || [],
  }))

  return (
    <section id='projects' className='section-shell scroll-mt-24 px-4 md:px-6'>
      <div className='mx-auto max-w-[1280px]'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <Reveal>
            <SectionTitle title={t('title')} className='mb-0' />
          </Reveal>
          <Reveal delay={80}>
            <span className='font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/48'>
              {mappedProjects.length} selected builds
            </span>
          </Reveal>
        </div>

        <div className='mt-8'>
          {mappedProjects.length === 0 ? (
            <p className='border-t border-dashed border-white/10 py-12 text-center text-muted-foreground'>
              {t('noProjects') || 'No projects available yet.'}
            </p>
          ) : (
            <div className='flex flex-col'>
              {mappedProjects.map((project, idx) => {
                const detailsList = project.details
                  ? project.details
                      .split(/\r?\n/)
                      .map((line) => line.trim())
                      .filter((line) => line.length > 0)
                  : []

                return (
                  <Reveal
                    key={project.title + idx}
                    delay={idx * 60}
                    variant='up'
                    className='w-full'
                  >
                    <ProjectCardRoot
                      isEven={idx % 2 === 1}
                      isFirst={idx === 0}
                    >
                      <ProjectCardMockup
                        image={project.image}
                        title={project.title}
                      />
                      <ProjectCardDetails>
                        <ProjectCardHeader year={project.year} />
                        <ProjectCardTitle>{project.title}</ProjectCardTitle>
                        <ProjectCardDescription>
                          {project.description}
                        </ProjectCardDescription>
                        <ProjectCardResponsibilities items={detailsList} />
                        <ProjectCardTechStack tags={project.techStack} />
                        {(project.liveUrl || project.githubUrl) && (
                          <ProjectCardActions>
                            {project.liveUrl && (
                              <ProjectCardLink
                                href={project.liveUrl}
                                type='live'
                              />
                            )}
                            {project.githubUrl && (
                              <ProjectCardLink
                                href={project.githubUrl}
                                type='github'
                              />
                            )}
                          </ProjectCardActions>
                        )}
                      </ProjectCardDetails>
                    </ProjectCardRoot>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
