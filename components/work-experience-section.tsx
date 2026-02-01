import { getTranslations, getLocale } from 'next-intl/server'
import { SectionTitle } from './section-title'
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
    <section id='experience' className='px-4 md:px-6'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='mb-8 md:mb-12'>
          <SectionTitle
            title={t.rich('title', {
              br: () => <br />,
            })}
            className='mb-0'
          />
        </div>

        {/* Timeline Layout */}
        <div className='relative'>
          {/* Vertical line */}
          <div className='absolute left-3 md:left-32 top-0 bottom-0 w-px bg-border/70 pointer-events-none' />

          <div className='space-y-8 md:space-y-12'>
            {dbExperiences.length === 0 ? (
              <p className='pl-10 md:pl-40 text-muted-foreground'>
                {t('noExperience') || 'No work experience yet.'}
              </p>
            ) : (
              timelineItems.map((item, idx) => (
                <div key={idx} className='relative pl-10 md:pl-40'>
                  {/* Dot */}
                  <div className='absolute left-1 md:left-[calc(8rem-6px)] top-2 w-3 h-3 rounded-full bg-background border border-primary shadow-sm' />

                  {/* Period - Desktop */}
                  <div className='hidden md:block md:absolute md:left-0 md:top-1 md:w-32 md:text-right md:pr-4'>
                    <span className='text-xs text-foreground/60 uppercase tracking-[0.16em] font-medium'>
                      {item.period}
                    </span>
                  </div>

                  <TimelineItem {...item} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
