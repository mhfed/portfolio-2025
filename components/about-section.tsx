import { getTranslations } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { CoreSkillsList } from './core-skills-list'

export async function AboutSection() {
  const t = await getTranslations('about')

  return (
    <section id='about' className='px-4 md:px-6'>
      <div className='max-w-5xl mx-auto'>
        <SectionTitle title={t('title')} />
        <div className='space-y-6'>
          <p className='text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed'>
            {t('description1')}
          </p>

          <CoreSkillsList
            title={t('coreSkills')}
            items={[
              'frontend',
              'state',
              'performance',
              'devops',
              'mobile',
              'agile',
              'codeQuality',
              'productMindset',
              'leadership',
            ].map((key) => ({
              id: key,
              label: t(`skillList.${key}.label`),
              value: t(`skillList.${key}.value`),
            }))}
          />
        </div>
      </div>
    </section>
  )
}
