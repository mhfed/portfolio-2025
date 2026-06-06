import { useTranslations } from 'next-intl'

export function AboutSection() {
  const t = useTranslations('about')
  const badges = t.raw('badges') as string[]

  return (
    <section id='about' className='creative-section creative-about' data-section>
      <div className='creative-about__statement' data-split-line>
        {t('statement')}
      </div>
      <div className='creative-about__badges' data-reveal>
        {badges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>
    </section>
  )
}
