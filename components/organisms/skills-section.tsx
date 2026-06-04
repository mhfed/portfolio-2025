import { skillGroups } from '@/data/skills'
import { Reveal } from '@/components/ui/reveal'

export function SkillsSection() {
  return (
    <section id='skills' className='skills-section section-shell scroll-mt-28 py-28 lg:py-40'>
      <div className='skills-marquee' aria-hidden='true'>
        <span>React Next.js TypeScript Motion UI Systems Performance</span>
        <span>React Next.js TypeScript Motion UI Systems Performance</span>
      </div>

      <div className='mx-auto max-w-[1500px] px-4 md:px-6'>
        <Reveal>
          <div className='mb-24 max-w-4xl lg:mb-32'>
            <span className='section-kicker'>Capabilities</span>
            <h2 className='mt-5 font-display text-[clamp(3rem,7.6vw,8.75rem)] font-semibold uppercase leading-[0.84] tracking-normal text-foreground'>
              Stack as motion language.
            </h2>
          </div>
        </Reveal>

        <div className='skills-index' data-cursor='skill index'>
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 55} variant='up'>
              <article className='skills-index__row'>
                <span className='skills-index__count'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{group.label}</h3>
                <div className='skills-index__meta'>
                  <p>{group.signal}</p>
                  <div className='skills-index__tags'>
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
