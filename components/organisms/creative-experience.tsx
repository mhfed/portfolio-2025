import { useTranslations } from 'next-intl'
import type { ExperienceRecord } from '@/types/experience'

function splitExperienceDescription(description: string) {
  return description
    .split(/<br\s*\/?>|\n/gi)
    .map((line) => line.trim())
    .filter(Boolean)
}

export function ExperienceSection({ experiences }: { experiences: ExperienceRecord[] }) {
  const t = useTranslations('experience')
  const orderedExperiences = [...experiences].reverse()

  return (
    <section
      id='experience'
      className='creative-section creative-experience'
      data-section
    >
      <div className='creative-section__intro'>
        <h2 data-split-line data-experience-title>
          {t('headline')}
        </h2>
      </div>

      <div className='experience-timeline'>
        {orderedExperiences.map((experience, index) => {
          const descriptionLines = splitExperienceDescription(experience.description)

          return (
            <article
              key={experience.id}
              className='experience-row'
              data-experience-row
            >
              <span className='experience-row__scan' data-experience-scan />

              <div className='experience-row__meta' data-experience-meta>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{experience.period}</strong>
                <small>{experience.location}</small>
              </div>

              <div className='experience-row__body'>
                <div className='experience-row__heading'>
                  <h3 data-experience-company>{experience.company}</h3>
                  <p data-experience-role>{experience.position}</p>
                </div>

                <div className='experience-row__copy'>
                  {descriptionLines.slice(0, 4).map((line) => (
                    <p key={line} data-experience-copy>
                      {line}
                    </p>
                  ))}
                </div>

                <div className='experience-row__skills'>
                  {experience.skills.slice(0, 7).map((skill) => (
                    <span key={skill} data-experience-skill>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
