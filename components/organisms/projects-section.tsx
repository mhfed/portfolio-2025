import { getTranslations } from 'next-intl/server'
import { normalizeProjects, type LocalizedProjectRecord } from '@/data/projects'
import { ProjectRepositoryCard } from '@/components/organisms/project-repository-card'
import { Reveal } from '@/components/ui/reveal'

export async function ProjectsSection() {
  const t = await getTranslations('projects')
  const projects = normalizeProjects(
    ((t.raw('list') || []) as LocalizedProjectRecord[])
  )

  return (
    <section id='projects' className='section-shell scroll-mt-28 py-28 lg:py-40'>
      <div className='mx-auto max-w-[1500px] px-4 md:px-6'>
        <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end'>
          <Reveal>
            <div>
              <span className='section-kicker'>Selected work</span>
              <h2 className='mt-5 max-w-5xl font-display text-[clamp(3rem,7.8vw,9rem)] font-semibold uppercase leading-[0.84] tracking-normal text-foreground'>
                Scenes from production work.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className='max-w-sm text-sm leading-7 text-foreground/60 md:text-right'>
              Recruiter-readable projects with role, result, stack, and direct
              links kept visible.
            </p>
          </Reveal>
        </div>

        <div className='mt-24 space-y-32 lg:mt-36 lg:space-y-48'>
          {projects.length === 0 ? (
            <p className='border-t border-dashed border-white/10 py-12 text-center text-muted-foreground'>
              {t('noProjects') || 'No projects available yet.'}
            </p>
          ) : (
            projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 70} variant='up'>
                <ProjectRepositoryCard
                  project={project}
                  index={index}
                  liveLabel={t('launchApp')}
                  githubLabel={t('sourceCode')}
                />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
