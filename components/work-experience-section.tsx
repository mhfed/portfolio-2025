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
    <section
      id='experience'
      className='section-shell scroll-mt-24 px-4 md:px-6'
    >
      <div className='mx-auto max-w-[1280px]'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <Reveal>
            <SectionTitle
              title={t.rich('title', {
                br: () => <br />,
              })}
              className='mb-0'
            />
          </Reveal>

          <Reveal delay={140}>
            <span className='font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/48'>
              {timelineItems.length} roles
            </span>
          </Reveal>
        </div>

        <div className='mt-8 border-b border-white/10'>
          {dbExperiences.length === 0 ? (
            <p className='border-t border-dashed border-white/10 px-4 py-8 text-center text-muted-foreground'>
              {t('noExperience') || 'No work experience yet.'}
            </p>
          ) : (
            timelineItems.map((item, idx) => (
              <Reveal
                key={`${item.company}-${idx}`}
                delay={idx * 90}
                variant={idx % 2 === 0 ? 'left' : 'right'}
              >
                <TimelineItem
                  {...item}
                  isFirst={idx === 0}
                  isLast={idx === timelineItems.length - 1}
                />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
