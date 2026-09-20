import type { PortfolioContent } from '@/types/portfolio-content'

export interface KageExperienceProps {
  content: Pick<PortfolioContent, 'experience'>
}

const EXPERIENCE_KANJI = ['山門', '借景', '焼杉', '灯籠', '朱月']

export function KageExperience({ content }: KageExperienceProps) {
  const { experience } = content

  return (
    <section id='experience' className='kage-sec'>
      {/* Chapter header */}
      <div className='sec-head'>
        <span className='k'>
          <b>03</b> — Sacred Craft
        </span>
        <span className='rule' />
        <span className='k jp'>手業</span>
      </div>

      {/* Head */}
      <div className='grid grid-cols-1 lg:grid-cols-[1.1fr_0.8fr] gap-6 lg:gap-16 items-end mb-12 lg:mb-16'>
        <h2 className='kage-display text-[clamp(28px,3.8vw,52px)] text-[var(--bone)]'>
          Five chapters. Five years. One quiet mind.
        </h2>
        <p className='kage-lead text-[#b4bfb7]'>
          {experience.headline ||
            'Each tenure is a forge of craftsmanship, technical ownership, and architectural rigor in enterprise and high-growth environments.'}
        </p>
      </div>

      {/* Curriculum table */}
      <div className='cur'>
        {experience.records.map((record, index) => {
          const kanji = EXPERIENCE_KANJI[index % EXPERIENCE_KANJI.length]
          const num = String(index + 1).padStart(2, '0')

          return (
            <div key={record.id} className='les group' data-cursor>
              <span className='k'>{num}</span>

              <div>
                <h3>
                  {record.company}
                  <em className='jp'>{kanji}</em>
                </h3>
                <span className='text-[12px] font-medium tracking-[0.14em] uppercase text-[var(--vermilion)] block mt-1'>
                  {record.position}
                </span>
              </div>

              <div>
                <p>{record.description}</p>
                <div className='flex flex-wrap gap-1.5 mt-2'>
                  {record.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className='text-[10px] tracking-[0.1em] text-[var(--muted)]'
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>

              <span className='t'>{record.period}</span>

              {/* Red sweep bar on hover */}
              <i className='bar' aria-hidden='true' />
            </div>
          )
        })}
      </div>
    </section>
  )
}
