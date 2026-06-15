import { useTranslations } from 'next-intl'

export function SkillsSection() {
  const t = useTranslations('skills')
  const skillGroups = t.raw('groups') as { label: string; items: string[] }[]
  const marqueeItems = skillGroups.flatMap((group) => [group.label, ...group.items])

  return (
    <section
      id='skills'
      className='creative-section creative-skills'
      data-section
      data-waypoint='skills'
    >
      <div className='creative-skills__frame'>
        <div className='creative-section__intro creative-skills__intro'>
          <p className='creative-kicker' data-reveal>
            {t('kicker')}
          </p>
          <h2 data-split-line>{t('headline')}</h2>
        </div>

        <div className='creative-marquee creative-marquee--skills' aria-hidden='true'>
          <div>
            {marqueeItems.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
          <div>
            {marqueeItems.map((item, index) => (
              <span key={`${item}-clone-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <div className='skill-stack grid grid-cols-1 md:grid-cols-3 gap-6 !bg-transparent'>
          {skillGroups.map((group, index) => {
            const themes = ['accent-blue', 'accent-lime', 'accent-orange', 'accent-pink']
            const groupTheme = themes[index % themes.length]
            // Asymmetric layout: first and last items span 2 columns on desktop, middle ones span 1
            const spanClass = index === 0 ? 'md:col-span-2' : index === 3 ? 'md:col-span-2' : 'md:col-span-1'

            return (
              <div
                key={group.label}
                className={`p-[2px] rounded-[1.6rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 ${spanClass}`}
                data-skill-group
              >
                <article
                  className={`skill-stack__group ${groupTheme} !border-0 !min-h-[14rem] !h-full bg-[#080907]/95 rounded-[calc(1.6rem-2px)] p-6 flex flex-col justify-between`}
                >
                  <div className='skill-stack__header'>
                    <span className='skill-stack__index'>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{group.label}</h3>
                  </div>
                  <div className='skill-stack__items flex flex-wrap gap-2 mt-4'>
                    {group.items.map((item) => (
                      <span key={item} className='skill-item-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[11px] font-semibold text-creative-muted'>
                        <span className='skill-item-dot w-1.5 h-1.5 rounded-full' />
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
