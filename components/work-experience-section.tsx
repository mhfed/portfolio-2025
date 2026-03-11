import { getTranslations, getLocale } from 'next-intl/server'
import { TimelineItem } from './timeline-item'
import { db } from '@/lib/db'
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
        <div className='relative flex flex-col -space-y-16'>
          {timelineItems.map((item, idx) => {
            const stationNum = String(idx + 1).padStart(2, '0')
            const translateX = idx === 0 ? 'translate-x-8' : idx === 1 ? 'translate-x-16' : 'translate-x-24'

            return (
              <div
                key={idx}
                className='archive-card relative group'
                style={{ zIndex: idx + 1 }}
              >
                <div className={`inline-block px-6 py-2 bg-muted border-t-2 border-x-2 border-foreground font-bold mono-text text-sm ${translateX} rounded-t-lg`}>
                  STATION_{stationNum}.INF
                </div>
                <div className='bg-card border-2 border-foreground p-8 shadow-neo-dark dark:shadow-neo'>
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start'>
                    <div className='md:col-span-3'>
                      <span className='mono-text text-xl font-bold text-primary'>{item.period}</span>
                    </div>
                    <div className='md:col-span-9'>
                      <h3 className='text-2xl font-bold uppercase mb-1'>{item.company}</h3>
                      <p className='mono-text font-bold text-muted-foreground mb-4'>{item.position}</p>
                      <p className='text-muted-foreground mb-6'>
                        {item.description}
                      </p>
                      {item.skills.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className='bg-foreground text-background px-3 py-1 text-xs mono-text font-bold'
                            >
                              {skill.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
