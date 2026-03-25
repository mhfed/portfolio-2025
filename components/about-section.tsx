import { getTranslations } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { CoreSkillsList } from './core-skills-list'
import { Reveal } from './ui/reveal'

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
    <section id='about' className='section-shell scroll-mt-24 px-4 md:px-6'>
      <div className='mx-auto max-w-[1280px]'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]'>
          <div className='space-y-6'>
            <Reveal>
              <SectionTitle title={t('title')} />
            </Reveal>

            <Reveal delay={120}>
              <p className='max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg'>
                {t('description1')}
              </p>
            </Reveal>

            <div className='grid gap-3 sm:grid-cols-2'>
              <Reveal delay={220} variant='left'>
                <div className='border-t border-white/10 pt-4'>
                  <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75'>
                    Focus
                  </div>
                  <p className='mt-3 text-sm leading-relaxed text-foreground/72 md:text-base'>
                    {t('yearsDescription')}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={320} variant='left'>
                <div className='border-t border-white/10 pt-4'>
                  <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75'>
                    Approach
                  </div>
                  <p className='mt-3 text-sm leading-relaxed text-foreground/72 md:text-base'>
                    {t('satisfactionDescription')}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={180} variant='right'>
            <CoreSkillsList title={t('coreSkills')} items={skillItems} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
