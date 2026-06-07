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

        <div className='skill-stack'>
          {skillGroups.map((group, index) => {
            const themes = ['accent-blue', 'accent-lime', 'accent-orange', 'accent-pink']
            const groupTheme = themes[index % themes.length]

            return (
              <article
                key={group.label}
                className={`skill-stack__group ${groupTheme}`}
                data-skill-group
              >
                <div className='skill-stack__header'>
                  <span className='skill-stack__index'>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{group.label}</h3>
                </div>
                <div className='skill-stack__items'>
                  {group.items.map((item) => (
                    <span key={item} className='skill-item-tag'>
                      <span className='skill-item-dot' />
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
