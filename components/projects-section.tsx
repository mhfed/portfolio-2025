import { getTranslations, getLocale } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { ProjectCard } from './project-card'
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
    <section id='projects' className='px-4 md:px-6'>
      <div className='max-w-5xl mx-auto'>
        <SectionTitle title={t('title')} />
        <div className='space-y-8'>
          {mappedProjects.length === 0 ? (
            <p className='text-muted-foreground text-center py-12'>
              {t('noProjects') || 'No projects available yet.'}
            </p>
          ) : (
            mappedProjects.map((project, idx) => (
              <ProjectCard
                key={project.title + idx}
                {...project}
                isAlternate={idx % 2 === 1}
                index={idx}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
