import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface CapabilitiesSectionProps {
  skills: PortfolioContent['skills']
}

export function CapabilitiesSection({ skills }: CapabilitiesSectionProps) {
  return (
    <section id='skills' className='capabilities-section section-anchor'>
      <div className='portfolio-shell'>
        <EditorialReveal>
          <h2>{skills.headline}</h2>
        </EditorialReveal>

        <div className='capability-groups'>
          {skills.groups.map((group, index) => (
            <EditorialReveal
              key={group.label}
              className='capability-group'
              delay={index * 0.04}
            >
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
