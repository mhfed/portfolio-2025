import { getTranslations, getLocale } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { ProjectRepositoryCard } from './project-repository-card'
import { db } from '@/lib/db'
import { projects } from '@/db/schema'
import { desc } from 'drizzle-orm'

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
    <section id='projects' className='scroll-mt-24 px-4 md:px-6'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='terminal-panel px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10'>
          <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <SectionTitle title={t('title')} className='mb-0' />
            <span className='self-start rounded-full border border-primary/15 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-primary'>
              repository: {mappedProjects.length} modules
            </span>
          </div>

          <div className='grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
            {mappedProjects.length === 0 ? (
              <p className='col-span-full rounded-[1.25rem] border border-dashed border-primary/15 py-12 text-center text-muted-foreground'>
                {t('noProjects') || 'No projects available yet.'}
              </p>
            ) : (
              mappedProjects.map((project, idx) => (
                <ProjectRepositoryCard
                  key={project.title + idx}
                  {...project}
                  index={idx}
                  featured={idx === 0}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
