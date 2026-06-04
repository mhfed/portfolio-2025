import { getTranslations } from 'next-intl/server'
import { Reveal } from '@/components/ui/reveal'

export async function AboutSection() {
  const t = await getTranslations('about')
  const highlights = ['React', 'Next.js', 'TypeScript', 'UI systems', 'Performance', 'Animation']

  return (
    <section id='about' className='section-shell scroll-mt-28 px-4 py-28 md:px-6 lg:py-40'>
      <div className='mx-auto max-w-[1500px]'>
        <div className='grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start'>
          <Reveal>
            <div className='sticky top-28 space-y-5'>
              <span className='section-kicker'>About</span>
              <h2 className='max-w-2xl font-display text-[clamp(3rem,7.2vw,8.5rem)] font-semibold uppercase leading-[0.84] tracking-normal text-foreground'>
                Product pressure. Visual craft.
              </h2>
            </div>
          </Reveal>

          <div className='space-y-12'>
            <Reveal delay={80}>
              <p className='about-lede'>
                I build frontend systems that feel sharp on first glance and
                hold up under production traffic.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p className='max-w-4xl text-lg leading-9 text-foreground/68 md:text-2xl md:leading-[1.55]'>
                {t('description1')} My strongest work sits around React,
                Next.js, TypeScript, UI systems, performance tuning, and motion
                that makes products feel polished without slowing them down.
              </p>
            </Reveal>

            <div className='about-index'>
              {highlights.map((item, index) => (
                <Reveal key={item} delay={180 + index * 45} variant='up'>
                  <span>{item}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
