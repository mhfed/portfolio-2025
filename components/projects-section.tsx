import { getTranslations, getLocale } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { ProjectRepositoryCard } from './project-repository-card'
import { db } from '@/lib/db'
import { projects } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { Reveal } from './ui/reveal'

export async function ProjectsSection() {
  const t = await getTranslations('projects')
  const locale = (await getLocale()) as 'en' | 'vi'

  // Fetch projects from database, ordered by createdAt descending
  let dbProjects: (typeof projects.$inferSelect)[] = []
  try {
    dbProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Return empty array if database query fails
    // This allows the page to render with "No projects" message
    dbProjects = []
  }

  // Map database results to match ProjectCard interface
  // Select locale-specific values with fallback
  const mappedProjects = dbProjects.map(
    (project: typeof projects.$inferSelect) => {
      // Helper to get localized value with fallback
      const getLocalized = (
        enValue: string | null | undefined,
        viValue: string | null | undefined,
        fallback: string | null | undefined
      ): string => {
        if (locale === 'vi') {
          return viValue || enValue || fallback || ''
        }
        return enValue || viValue || fallback || ''
      }

      return {
        image: project.imageUrl,
        title: getLocalized(project.titleEn, project.titleVi, project.title),
        year: project.year || '',
        description: getLocalized(
          project.descriptionEn,
          project.descriptionVi,
          project.description
        ),
        details: getLocalized(
          project.detailsEn,
          project.detailsVi,
          project.details
        ),
        liveUrl: project.liveUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        techStack: project.techStack || [],
      }
    }
  )

  return (
    <section id='projects' className='section-shell scroll-mt-24 px-4 md:px-6'>
      <div className='mx-auto max-w-[1280px]'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <Reveal>
            <SectionTitle title={t('title')} className='mb-0' />
          </Reveal>
          <Reveal delay={140}>
            <span className='font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/48'>
              {mappedProjects.length} selected builds
            </span>
          </Reveal>
        </div>

        <div className='mt-8 border-b border-white/10'>
          {mappedProjects.length === 0 ? (
            <p className='border-t border-dashed border-white/10 py-12 text-center text-muted-foreground'>
              {t('noProjects') || 'No projects available yet.'}
            </p>
          ) : (
            mappedProjects.map((project, idx) => (
              <Reveal
                key={project.title + idx}
                delay={idx * 90}
                variant={idx === 0 ? 'scale' : idx % 2 === 0 ? 'left' : 'right'}
              >
                <ProjectRepositoryCard {...project} featured={idx === 0} />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
