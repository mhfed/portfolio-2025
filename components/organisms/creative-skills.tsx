import { useTranslations } from 'next-intl'

export function SkillsSection() {
  const t = useTranslations('skills')
  const skillGroups = t.raw('groups') as { label: string; items: string[] }[]
  const marqueeItems = skillGroups.flatMap((group) => [group.label, ...group.items])

  return (
    <section id='skills' className='creative-section creative-skills' data-section>
      <div className='creative-section__intro creative-section__intro--split'>
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
        {skillGroups.map((group, index) => (
          <article key={group.label} className='skill-stack__group' data-skill-group>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{group.label}</h3>
            <p>{group.items.join(' / ')}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
