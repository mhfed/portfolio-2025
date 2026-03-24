import { getTranslations } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { CoreSkillsList } from './core-skills-list'

export async function AboutSection() {
  const t = await getTranslations('about')
  const skillItems = [
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
  }))

  return (
    <section id='about' className='scroll-mt-24 px-4 md:px-6'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='terminal-panel px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10'>
          <div className='grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
            <div className='space-y-6'>
              <SectionTitle title={t('title')} />

              <p className='max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg'>
                {t('description1')}
              </p>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-[1.25rem] border border-primary/15 bg-background/50 p-4'>
                  <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70'>
                    mission scope
                  </div>
                  <p className='mt-3 text-sm leading-relaxed text-foreground/72'>
                    {t('yearsDescription')}
                  </p>
                </div>

                <div className='rounded-[1.25rem] border border-primary/15 bg-background/50 p-4'>
                  <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70'>
                    operating style
                  </div>
                  <p className='mt-3 text-sm leading-relaxed text-foreground/72'>
                    {t('satisfactionDescription')}
                  </p>
                </div>
              </div>
            </div>

            <CoreSkillsList title={t('coreSkills')} items={skillItems} />
          </div>
        </div>
      </div>
    </section>
  )
}
