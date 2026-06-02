import { getTranslations, getLocale } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { ProjectRepositoryCard } from './project-repository-card'
import { db } from '@/lib/db'
import { projects } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { Reveal } from './ui/reveal'
import { ProjectsClientAnimator } from './projects-client-animator'

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
    <section id='projects' className='relative bg-black'>
      {/* Title Section */}
      <div className='px-4 md:px-12 pt-32 pb-16'>
        <div className='max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-white/20 pb-8'>
          <h2 className='text-white font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter'>
            Selected Works
          </h2>
          <span className='font-serif italic text-lg md:text-xl text-white/50'>
            ({mappedProjects.length} Projects)
          </span>
        </div>
      </div>

      <div className='relative z-10 max-w-[1400px] mx-auto px-4 md:px-12 pb-48'>
        <div className='flex flex-col group/list'>
          {mappedProjects.length === 0 ? (
            <div className='flex h-[50vh] w-full items-center justify-center'>
              <p className='text-muted-foreground'>{t('noProjects') || 'No projects available yet.'}</p>
            </div>
          ) : (
            mappedProjects.map((project, idx) => (
              <ProjectRepositoryCard key={project.title + idx} {...project} index={idx + 1} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
