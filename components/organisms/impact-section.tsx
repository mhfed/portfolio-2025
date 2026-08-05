import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface ImpactSectionProps {
  about: PortfolioContent['about']
}

function ImpactStatement({ statement }: { statement: string }) {
  const words = statement.split(/(\s+)/)

  return (
    <h2
      className='impact-statement'
      aria-label={statement}
      data-impact-statement
    >
      <span aria-hidden='true'>
        {words.map((word, index) =>
          /^\s+$/.test(word) ? (
            word
          ) : (
            <span
              key={`${word}-${index}`}
              className='impact-statement__word'
              data-impact-word
            >
              {word}
            </span>
          )
        )}
      </span>
    </h2>
  )
}

export function ImpactSection({ about }: ImpactSectionProps) {
  return (
    <section id='about' className='impact-section section-anchor'>
      <div className='portfolio-shell'>
        <EditorialReveal className='section-label'>
          <p>{about.title}</p>
        </EditorialReveal>

        <EditorialReveal delay={0.04}>
          <ImpactStatement statement={about.statement} />
        </EditorialReveal>

        <div className='impact-details'>
          <EditorialReveal className='impact-description' delay={0.06}>
            <p>{about.description}</p>
          </EditorialReveal>

          <dl className='impact-metrics'>
            {about.metrics.map((metric, index) => (
              <EditorialReveal
                key={metric.label}
                className='impact-metric'
                delay={0.08 + index * 0.04}
              >
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </EditorialReveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
