import { getTranslations, getLocale } from 'next-intl/server'
import { db } from '@/lib/db'
import { ExpandableText } from './expandable-text'
import { experiences } from '@/db/schema'
import { desc } from 'drizzle-orm'

interface TimelineItemProps {
  company: string
  position: string
  period: string
  description: string
  skills: string[]
}

export async function WorkExperienceSection() {
  const t = await getTranslations('experience')
  const locale = (await getLocale()) as 'en' | 'vi'

  let dbExperiences: (typeof experiences.$inferSelect)[] = []
  try {
    dbExperiences = await db
      .select()
      .from(experiences)
      .orderBy(desc(experiences.createdAt))
  } catch (error) {
    console.error('Error fetching experiences:', error)
    dbExperiences = []
  }

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

  const timelineItems: TimelineItemProps[] = dbExperiences.map((exp) => ({
    company: getLocalized(exp.companyEn, exp.companyVi, exp.company),
    position: getLocalized(exp.positionEn, exp.positionVi, exp.position),
    period: exp.period,
    description: getLocalized(
      exp.descriptionEn,
      exp.descriptionVi,
      exp.description
    ),
    skills: exp.skills || [],
  }))

  return (
    <section id='experience' className='w-full max-w-[1200px] mx-auto px-6 mt-24 mb-32'>
      <div className='flex items-center justify-between border-b-2 border-foreground pb-4 mb-16'>
        <h2 className='text-3xl font-bold uppercase tracking-tight'>/root/work_experience</h2>
        <span className='mono-text text-sm text-primary font-bold'>
          {timelineItems.length}_STATIONS_ACTIVE
        </span>
      </div>

      {dbExperiences.length === 0 ? (
        <p className='text-muted-foreground'>
          {t('noExperience') || 'No work experience yet.'}
        </p>
      ) : (
        <div className='flex flex-col gap-12'>
          {timelineItems.map((item, idx) => (
            <div key={idx} className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start'>
              <div className='md:col-span-3'>
                <span className='mono-text text-xl font-bold text-primary'>{item.period}</span>
              </div>
              <div className='md:col-span-9 border-l-2 border-foreground/20 pl-8'>
                <h3 className='text-2xl font-bold uppercase mb-1'>{item.company}</h3>
                <p className='mono-text font-bold text-muted-foreground mb-4'>{item.position}</p>
                <ExpandableText text={item.description} />
                {item.skills.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className='bg-foreground/80 text-background px-3 py-1 text-xs mono-text font-bold'
                      >
                        {skill.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
