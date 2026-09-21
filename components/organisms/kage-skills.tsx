import type { PortfolioContent } from '@/types/portfolio-content'

export interface KageSkillsProps {
  content: Pick<PortfolioContent, 'skills'>
}

const SKILL_GROUP_KANJI = ['基', '系', '動', '導']

export function KageSkills({ content }: KageSkillsProps) {
  const { skills } = content

  return (
    <section id='skills' className='kage-sec'>
      {/* Chapter header */}
      <div className='sec-head'>
        <span className='k'>
          <b>04</b> — Disciplines & Tools
        </span>
        <span className='rule' />
        <span className='k jp'>術</span>
      </div>

      <div className='mb-12 flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--line-soft)] pb-4'>
        <h2 className='kage-display text-[clamp(28px,3.8vw,52px)] text-[var(--bone)]'>
          {skills.headline || 'Disciplines & Tools'}
        </h2>
        <span className='text-[11px] tracking-[0.2em] uppercase text-[var(--muted)] font-mono'>
          Core Toolkit
        </span>
      </div>

      {/* Architectural Skill Groups Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
        {skills.groups.map((group, index) => {
          const kanji = SKILL_GROUP_KANJI[index % SKILL_GROUP_KANJI.length]
          const num = String(index + 1).padStart(2, '0')

          return (
            <article
              key={group.label}
              className='kage-glass-card group relative p-6 sm:p-7 rounded-xl flex flex-col overflow-hidden'
              data-cursor
            >
              {/* Optical Glass Diagonal Sheen Highlight */}
              <div
                className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500'
                aria-hidden='true'
              />

              <div className='relative z-10 flex items-baseline justify-between mb-6 pb-3 border-b border-[var(--line-soft)]'>
                <div className='flex items-baseline gap-2.5'>
                  <span className='text-[11px] font-medium tracking-[0.2em] text-[var(--vermilion)] tabular-nums'>
                    {num}
                  </span>
                  <h3 className='text-[14px] font-medium tracking-[0.14em] uppercase text-[var(--bone)]'>
                    {group.label}
                  </h3>
                </div>
                <span className='jp text-[12px] tracking-[0.2em] text-[var(--muted)]'>
                  {kanji}
                </span>
              </div>

              <ul className='relative z-10 flex flex-wrap gap-2'>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className='px-3 py-1.5 rounded-md border border-[rgba(223,231,224,0.1)] bg-[rgba(6,10,14,0.35)] backdrop-blur-sm text-[11px] tracking-[0.12em] uppercase text-[var(--bone-dim)] group-hover:text-[var(--bone)] group-hover:border-[rgba(223,231,224,0.22)] transition-colors'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
