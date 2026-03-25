import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { ResumeDownloadButton } from './resume-download-button'
import { SocialsDock } from './socials-dock'
import { Button } from './ui/button'
import { Reveal } from './ui/reveal'
import { TechMarquee } from './tech-marquee'

export async function HeroSection() {
  const t = await getTranslations('hero')
  const tContact = await getTranslations('hero.contact')

  return (
    <section
      id='home-top'
      className='section-shell scroll-mt-24 px-4 pt-4 md:px-6 md:pt-6 lg:pt-8'
    >
      <div className='hero-shell mx-auto max-w-[1280px]'>
        <div className='grid gap-8 lg:min-h-[72svh] lg:grid-cols-[minmax(0,1fr)_minmax(280px,32vw)] lg:items-center lg:gap-10 xl:gap-12'>
          <div className='max-w-[52rem]'>
            <Reveal>
              <span className='section-kicker'>
                Available for selected product & frontend work
              </span>
            </Reveal>

            <h1 className='mt-4 font-display text-[2.85rem] font-semibold leading-[0.86] tracking-[-0.095em] text-foreground sm:text-[4.15rem] lg:text-[5.15rem] xl:text-[5.6rem]'>
              <span className='hero-line'>
                {t('front')} {t('middle')}
              </span>
              <span className='hero-line hero-accent-text'>{t('end')}</span>
              <span className='hero-line text-foreground/84'>
                Frontend systems
              </span>
            </h1>

            <Reveal delay={120}>
              <p className='mt-4 text-base font-medium text-foreground/84 md:text-xl lg:text-[1.35rem]'>
                {t('developer')}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className='mt-4 max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base lg:text-[1.025rem]'>
                {t('textBlockLeft')}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className='mt-6 flex flex-wrap gap-3'>
                <ResumeDownloadButton />
                <Button variant='outline' size='lg' asChild>
                  <a href={`mailto:${tContact('email')}`}>
                    {tContact('sayHello')}
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className='mt-5'>
                <SocialsDock />
              </div>
            </Reveal>
          </div>

          <Reveal variant='right' delay={180}>
            <div className='relative space-y-3'>
              <div className='absolute inset-x-[14%] bottom-[10%] top-[20%] -z-10 rounded-full bg-primary/14 blur-[64px]' />

              <div className='relative aspect-[5/6] overflow-hidden rounded-[1.9rem]'>
                <Image
                  src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
                  alt='Hero Avatar'
                  fill
                  priority
                  className='object-cover object-top transition duration-700 hover:scale-[1.04]'
                  sizes='(min-width: 1280px) 33vw, (min-width: 1024px) 36vw, 100vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-background/72 via-background/8 to-transparent' />
              </div>

              <div className='space-y-0 border-t border-white/10 pr-1'>
                <div className='flex items-start justify-between gap-4 border-b border-white/10 py-3 text-sm'>
                  <span className='font-mono uppercase tracking-[0.22em] text-primary/72'>
                    Based in
                  </span>
                  <span className='max-w-[16rem] text-right text-foreground/74'>
                    {tContact('location')}
                  </span>
                </div>

                <div className='flex items-start justify-between gap-4 border-b border-white/10 py-3 text-sm'>
                  <span className='font-mono uppercase tracking-[0.22em] text-primary/72'>
                    Contact
                  </span>
                  <a
                    href={`mailto:${tContact('email')}`}
                    className='max-w-[16rem] break-all text-right text-foreground/74 transition-colors hover:text-primary'
                  >
                    {tContact('email')}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <div className='soft-divider mt-10' />
        </Reveal>

        <div className='mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-8'>
          <Reveal delay={120}>
            <p className='max-w-2xl text-base leading-relaxed text-foreground/68 md:text-lg'>
              {t('textBlockRight')}
            </p>
          </Reveal>

          <Reveal delay={220} variant='right'>
            <div className='space-y-0'>
              <div className='flex items-start justify-between gap-4 border-t border-white/10 py-3 text-sm'>
                <span className='font-mono uppercase tracking-[0.22em] text-primary/72'>
                  Core stack
                </span>
                <span className='max-w-[18rem] text-right text-foreground/72'>
                  React, Next.js, TypeScript, Tailwind CSS
                </span>
              </div>
              <div className='flex items-start justify-between gap-4 border-t border-white/10 py-3 text-sm'>
                <span className='font-mono uppercase tracking-[0.22em] text-primary/72'>
                  Working style
                </span>
                <span className='max-w-[18rem] text-right text-foreground/72'>
                  Product thinking, polished UI, maintainable frontend systems
                </span>
              </div>
              <div className='flex items-start justify-between gap-4 border-y border-white/10 py-3 text-sm'>
                <span className='font-mono uppercase tracking-[0.22em] text-primary/72'>
                  Availability
                </span>
                <span className='max-w-[18rem] text-right text-foreground/72'>
                  Open to product, platform, and interface-focused work
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={280}>
        <div className='marquee-shell mt-8 -mx-4 border-y border-white/10 bg-background/28 md:-mx-6'>
          <TechMarquee />
        </div>
      </Reveal>
    </section>
  )
}
