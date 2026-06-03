import { getTranslations, getLocale } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { TimelineItem } from './timeline-item'
import { db } from '@/lib/db'
import { experiences } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { Reveal } from './ui/reveal'

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
    <section id='experience' className='relative w-full bg-background'>
      {/* Title Section */}
      <div className='px-4 md:px-12 pt-32 pb-16'>
        <div className='max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-white/20 pb-8'>
          <h2 className='text-white font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter'>
            {t.rich('title', {
              br: () => <br />,
            })}
          </h2>
          <span className='font-serif italic text-lg md:text-xl text-white/50'>
            ({timelineItems.length} Roles)
          </span>
        </div>
      </div>

      <div className='relative z-10 max-w-[1400px] mx-auto px-4 md:px-12 pb-48'>
        <div className='flex flex-col border-b border-white/20'>
          {dbExperiences.length === 0 ? (
            <p className='px-4 py-8 text-center text-muted-foreground'>
              {t('noExperience') || 'No work experience yet.'}
            </p>
          ) : (
            timelineItems.map((item, idx) => (
              <TimelineItem
                key={`${item.company}-${idx}`}
                {...item}
                isFirst={idx === 0}
                isLast={idx === timelineItems.length - 1}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
