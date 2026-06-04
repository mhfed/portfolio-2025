import { getTranslations } from 'next-intl/server'
import { Reveal } from '@/components/ui/reveal'

const highlights = [
  'React',
  'Next.js',
  'TypeScript',
  'UI systems',
  'Performance',
  'Animation',
]


function AboutHighlights() {
  return (
    <div className='flex flex-wrap border-t border-white/10'>
      {highlights.map((item, index) => (
        <Reveal
          key={item}
          className='flex-[1_1_13rem]'
          delay={180 + index * 45}
          variant='up'
        >
          <span className='block border-b border-white/10 py-4 pr-5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/60'>{item}</span>
        </Reveal>
      ))}
    </div>
  )
}

export async function AboutSection() {
  const t = await getTranslations('about')

  return (
    <section id='about' className='section-shell scroll-mt-28 px-4 py-28 md:px-6 lg:py-40'>
      <div className='mx-auto max-w-[1500px]'>
        <div className='grid gap-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-20 xl:gap-28'>
          <Reveal>
            <div className='sticky top-28 space-y-7'>
              <span className='section-kicker'>About</span>
              <h2 className='max-w-[13ch] font-display text-[clamp(3rem,6.6vw,7rem)] font-semibold uppercase leading-[0.92] tracking-normal text-foreground'>
                Product pressure. Visual craft.
              </h2>
            </div>
          </Reveal>

          <div className='space-y-14 lg:pt-10 xl:pt-14'>
            <Reveal delay={80}>
              <p className='max-w-[58rem] font-display text-[clamp(2rem,4.35vw,4.9rem)] font-semibold leading-[1.08] text-foreground'>
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

            <AboutHighlights />
          </div>
        </div>
      </div>
    </section>
  )
}
