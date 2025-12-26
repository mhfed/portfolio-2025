import { getTranslations, getLocale } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { TimelineItem } from './timeline-item'
import { db } from '@/lib/db'
import { experiences } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { Separator } from './ui/separator'

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
      <div className='max-w-5xl mx-auto md:flex gap-8'>
        {/* Left: Title */}
        <div className='w-fit'>
          <SectionTitle
            title={
              <>
                {t('title')
                  .split(/<br\s*\/?>/i)
                  .flatMap((part, idx, arr) =>
                    idx < arr.length - 1
                      ? [part, <br key={`br-${idx}`} />]
                      : [part]
                  )}
              </>
            }
            className='sticky top-24 self-start'
          />
        </div>
        {/* Vertical Separator: Only render on md+ screens, full height between items */}
        <div className='hidden md:flex items-stretch px-0'>
          <div className='w-px bg-border h-full mx-4' />
        </div>

        {/* <Separator className='bg-border' orientation='vertical' /> */}

        {/* Right: Timeline Items */}
        <div className='flex-1 space-y-8'>
          {dbExperiences.length === 0 ? (
            <p className='text-muted-foreground text-center py-12'>
              {t('noExperience') || 'No work experience yet.'}
            </p>
          ) : (
            timelineItems.map((item, idx) => (
              <div key={idx}>
                <TimelineItem {...item} />
                {idx < timelineItems.length - 1 && (
                  <Separator className='my-8 h-0.5 bg-border' />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
