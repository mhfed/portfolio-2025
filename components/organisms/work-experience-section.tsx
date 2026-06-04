import { getTranslations } from 'next-intl/server'
import {
  TimelineItemRoot,
  TimelineItemLine,
  TimelineItemDot,
  TimelineItemBody,
  TimelineItemPeriod,
  TimelineItemContent,
  TimelineItemCompany,
  TimelineItemPosition,
  TimelineItemCollapsible,
  TimelineItemDescription,
  TimelineItemSkills,
  TimelineItemTrigger,
} from '@/components/organisms/timeline-item'
import { Reveal } from '@/components/ui/reveal'
interface TimelineItemProps {
  id: number
  company: string
  position: string
  period: string
  location: string
  description: string
  skills: string[]
}

export async function WorkExperienceSection() {
  const t = await getTranslations('experience')

  const timelineItems = (t.raw('list') || []) as TimelineItemProps[]

  return (
    <section
      id='experience'
      className='section-shell scroll-mt-28 px-4 py-28 md:px-6 lg:py-40'
    >
      <div className='mx-auto max-w-[1500px]'>
        <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end'>
          <Reveal>
            <div>
              <span className='section-kicker'>{t('kicker')}</span>
              <h2 className='mt-5 font-display text-[clamp(3rem,7.8vw,9rem)] font-semibold uppercase leading-[0.84] tracking-normal text-foreground'>
                {t.rich('title', {
                  br: () => <br />,
                })}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <span className='font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/50'>
              {timelineItems.length} roles
            </span>
          </Reveal>
        </div>

        <div className='experience-credits mt-20 lg:mt-28'>
          {timelineItems.length === 0 ? (
            <p className='border-t border-dashed border-white/10 px-4 py-8 text-center text-muted-foreground'>
              {t('noExperience') || 'No work experience yet.'}
            </p>
          ) : (
            timelineItems.map((item, idx) => (
              <TimelineItemRoot
                key={`${item.company}-${idx}`}
                isFirst={idx === 0}
                isLast={idx === timelineItems.length - 1}
              >
                <TimelineItemLine />
                <TimelineItemDot />
                <TimelineItemBody>
                  <TimelineItemPeriod>
                    {item.period}
                  </TimelineItemPeriod>
                  <TimelineItemContent>
                    <TimelineItemCompany>
                      {item.company}
                    </TimelineItemCompany>
                    <TimelineItemPosition>
                      {item.position}
                    </TimelineItemPosition>
                    <TimelineItemCollapsible>
                      <TimelineItemDescription
                        html={item.description}
                      />
                      <TimelineItemSkills skills={item.skills} />
                    </TimelineItemCollapsible>
                  </TimelineItemContent>
                  <TimelineItemTrigger />
                </TimelineItemBody>
              </TimelineItemRoot>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
