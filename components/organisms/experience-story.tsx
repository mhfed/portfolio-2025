import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import type { ExperienceRecord } from '@/types/experience'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface ExperienceStoryProps {
  experience: PortfolioContent['experience']
}

const htmlBreakPattern = /<br\s*\/?>/gi

function getDescriptionParagraphs(record: ExperienceRecord) {
  return record.description
    .split(htmlBreakPattern)
    .map((paragraph) => paragraph.trim().replace(/\.{2,}/g, '.'))
    .filter(Boolean)
}

export function ExperienceStory({ experience }: ExperienceStoryProps) {
  const records = [...experience.records].reverse()

  return (
    <section id='experience' className='experience-section section-anchor'>
      <div className='portfolio-shell experience-layout'>
        <div className='experience-intro'>
          <EditorialReveal>
            <h2>{experience.title}</h2>
            <p>{experience.headline}</p>
          </EditorialReveal>
        </div>

        <div className='experience-list'>
          {records.length > 0 ? (
            records.map((record, index) => (
              <EditorialReveal
                key={record.id}
                className='experience-record'
                delay={Math.min(index * 0.04, 0.12)}
              >
                <div className='experience-record__heading'>
                  <div>
                    <h3>{record.company}</h3>
                    <p>{record.position}</p>
                  </div>
                  <div className='experience-record__time'>
                    <span>{record.period}</span>
                    <span>{record.location}</span>
                  </div>
                </div>

                <div className='experience-record__body'>
                  {getDescriptionParagraphs(record).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <ul className='experience-skills'>
                  {record.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </EditorialReveal>
            ))
          ) : (
            <p>{experience.emptyLabel}</p>
          )}
        </div>
      </div>
    </section>
  )
}
