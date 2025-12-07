import { getTranslations } from 'next-intl/server';
import { SectionTitle } from './section-title';
import { ProjectCard } from './project-card';
import { db } from '@/lib/db';
import { projects } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function ProjectsSection() {
  const t = await getTranslations('projects');

  // Fetch projects from database, ordered by createdAt descending
  let dbProjects: (typeof projects.$inferSelect)[] = [];
  try {
    dbProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return empty array if database query fails
    // This allows the page to render with "No projects" message
    dbProjects = [];
  }

  // Map database results to match ProjectCard interface
  const mappedProjects = dbProjects.map(
    (project: typeof projects.$inferSelect) => ({
      image: project.imageUrl,
      title: project.title,
      year: project.year || '',
      description: project.description,
      details: project.details || '',
      liveUrl: project.liveUrl || undefined,
      githubUrl: project.githubUrl || undefined,
      techStack: project.techStack || [],
    })
  );

  return (
    <section id='projects' className=''>
      <div className='max-w-4xl mx-auto'>
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
                isAlternate={false}
                index={idx}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
