import { getTranslations } from 'next-intl/server';
import { SectionTitle } from './section-title';
import { TimelineItem } from './timeline-item';
import { db } from '@/lib/db';
import { experiences } from '@/db/schema';
import { asc, desc } from 'drizzle-orm';

interface TimelineItemProps {
  company: string;
  position: string;
  period: string;
  description: string;
  skills: string[];
}

export async function WorkExperienceSection() {
  const t = await getTranslations('experience');

  let dbExperiences: (typeof experiences.$inferSelect)[] = [];
  try {
    dbExperiences = await db
      .select()
      .from(experiences)
      .orderBy(desc(experiences.createdAt));
  } catch (error) {
    console.error('Error fetching experiences:', error);
    dbExperiences = [];
  }

  const timelineItems: TimelineItemProps[] = dbExperiences.map((exp) => ({
    company: exp.company,
    position: exp.position,
    period: exp.period,
    description: exp.description,
    skills: exp.skills || [],
  }));

  return (
    <section id='experience' className=''>
      <div className='max-w-4xl mx-auto'>
        <SectionTitle title={t('title')} />
        <div className='space-y-8'>
          {dbExperiences.map((exp, idx) => (
            <TimelineItem key={idx} {...exp} skills={exp.skills || []} />
          ))}
        </div>
      </div>
    </section>
  );
}
