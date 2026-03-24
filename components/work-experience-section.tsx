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
    <section id='experience' className='scroll-mt-24 px-4 md:px-6'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='terminal-panel px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10'>
          <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <SectionTitle
              title={t.rich('title', {
                br: () => <br />,
              })}
              className='mb-0'
            />

            <span className='self-start rounded-full border border-primary/15 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-primary'>
              {timelineItems.length} entries
            </span>
          </div>

          <div className='overflow-hidden rounded-[1.5rem] border border-primary/15 bg-background/55'>
            <div className='flex items-center justify-between border-b border-primary/10 px-4 py-3 md:px-5'>
              <div className='flex items-center gap-2'>
                <span className='h-2.5 w-2.5 rounded-full bg-red-400/70' />
                <span className='h-2.5 w-2.5 rounded-full bg-yellow-400/70' />
                <span className='h-2.5 w-2.5 rounded-full bg-primary/80' />
              </div>
              <span className='font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/55'>
                work_logs.sh
              </span>
            </div>

            <div className='space-y-4 p-4 md:p-6'>
              {dbExperiences.length === 0 ? (
                <p className='rounded-[1.25rem] border border-dashed border-primary/15 px-4 py-8 text-center text-muted-foreground'>
                  {t('noExperience') || 'No work experience yet.'}
                </p>
              ) : (
                timelineItems.map((item, idx) => (
                  <TimelineItem key={`${item.company}-${idx}`} {...item} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
