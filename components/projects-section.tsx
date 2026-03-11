import { getTranslations, getLocale } from 'next-intl/server'
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
    dbProjects = []
  }

  // Map database results to match ProjectCard interface
  const mappedProjects = dbProjects.map(
    (project: typeof projects.$inferSelect) => {
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
    <section id='projects' className='w-full max-w-[1200px] mx-auto px-6 mt-24 mb-32'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-3xl font-bold uppercase tracking-tight'>/home/featured_projects</h2>
        <span className='mono-text text-sm text-primary font-bold hover:underline cursor-pointer'>
          {t('viewProject') || 'VIEW_ALL.EXE'}
        </span>
      </div>
      {mappedProjects.length === 0 ? (
        <p className='text-muted-foreground text-center py-12'>
          {t('noProjects') || 'No projects available yet.'}
        </p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {mappedProjects.map((project, idx) => (
            <ProjectCard
              key={project.title + idx}
              {...project}
              isAlternate={idx % 2 === 1}
              index={idx}
            />
          ))}
        </div>
      )}
    </section>
  )
}
