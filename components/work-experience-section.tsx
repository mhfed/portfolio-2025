import { getTranslations } from 'next-intl/server'
import { SectionTitle } from './section-title'
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
} from './timeline-item'
import { Reveal } from './ui/reveal'
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

          <Reveal delay={80}>
            <span className='font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/48'>
              {timelineItems.length} roles
            </span>
          </Reveal>
        </div>

        <div className='mt-8 border-b border-white/10'>
          {timelineItems.length === 0 ? (
            <p className='border-t border-dashed border-white/10 px-4 py-8 text-center text-muted-foreground'>
              {t('noExperience') || 'No work experience yet.'}
            </p>
          ) : (
            timelineItems.map((item, idx) => (
              <Reveal
                key={`${item.company}-${idx}`}
                delay={idx * 40}
                variant={idx % 2 === 0 ? 'left' : 'right'}
              >
                <TimelineItemRoot
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
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
