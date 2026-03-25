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
  const profileMeta = [
    { label: tContact('basedIn'), value: tContact('location') },
    { label: 'Focus', value: 'UI systems' },
    { label: 'Experience', value: '4.5+ years' },
  ]

  const miniHighlights = ['React', 'Next.js', 'TypeScript']

  return (
    <section
      id='home-top'
      className='section-shell scroll-mt-24 px-4 py-4 md:px-6 md:py-6 lg:py-8'
    >
      <div className='hero-shell mx-auto max-w-7xl'>
        <div className='grid gap-10 lg:min-h-[72svh] lg:grid-cols-[minmax(0,1.06fr)_minmax(360px,0.94fr)] lg:items-center lg:gap-12 xl:gap-14'>
          <div className='max-w-[50rem]'>
            <Reveal>
              <span className='section-kicker'>
                Available for selected product & frontend work
              </span>
            </Reveal>

            <h1 className='mt-4 font-display text-[2.85rem] font-semibold leading-[0.88] tracking-[-0.092em] text-foreground sm:text-[4rem] lg:text-[4.85rem] xl:text-[5.25rem]'>
              <span className='hero-line'>
                {t('front')} {t('middle')}
              </span>
              <span className='hero-line hero-accent-text'>{t('end')}</span>
              <span className='hero-line text-foreground/78'>
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
            <div className='relative mx-auto w-full max-w-[34rem] lg:mr-0 lg:ml-auto'>
              <div className='absolute right-[-8%] top-[8%] -z-10 h-44 w-44 rounded-full bg-primary/14 blur-3xl' />
              <div className='absolute bottom-[12%] left-[-4%] -z-10 h-28 w-28 rounded-full bg-[color:color-mix(in_srgb,var(--theme-tertiary)_22%,transparent)] blur-2xl' />

              <div className='border border-white/10 bg-background/14 p-5 backdrop-blur-sm md:p-6'>
                <div className='flex items-start gap-5'>
                  <div className='relative h-36 w-28 shrink-0 overflow-hidden rounded-[1.2rem] border border-white/10 md:h-40 md:w-32'>
                    <Image
                      src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
                      alt='Hero Avatar'
                      fill
                      priority
                      className='object-cover object-top transition duration-700 hover:scale-[1.04]'
                      sizes='160px'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-background/72 via-transparent to-transparent' />
                  </div>

                  <div className='min-w-0 flex-1'>
                    <p className='font-mono text-[10px] uppercase tracking-[0.3em] text-primary/72'>
                      Profile
                    </p>
                    <h2 className='mt-2 font-display text-[1.8rem] font-semibold leading-[0.95] tracking-[-0.06em] text-foreground md:text-[2rem]'>
                      {t('developer')}
                    </h2>
                    <p className='mt-3 max-w-[18rem] text-sm leading-relaxed text-foreground/66 md:text-[0.96rem]'>
                      Building clean interfaces and frontend systems with strong
                      product taste.
                    </p>

                    <div className='mt-4 flex flex-wrap gap-2'>
                      {miniHighlights.map((item) => (
                        <span
                          key={item}
                          className='inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/68'
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='mt-5 border-t border-white/10 pt-4'>
                  <div className='space-y-3'>
                    {profileMeta.map((item) => (
                      <div
                        key={item.label}
                        className='flex items-start justify-between gap-4 text-sm'
                      >
                        <span className='font-mono uppercase tracking-[0.22em] text-primary/68'>
                          {item.label}
                        </span>
                        <span className='max-w-[12.5rem] text-right text-foreground/72'>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className='mt-4 border-t border-white/10 pt-4'>
                    <div className='flex items-start justify-between gap-4 text-sm'>
                      <span className='font-mono uppercase tracking-[0.22em] text-primary/68'>
                        Contact
                      </span>
                      <a
                        href={`mailto:${tContact('email')}`}
                        className='max-w-[12.5rem] break-all text-right text-foreground/72 transition-colors hover:text-primary'
                      >
                        {tContact('email')}
                      </a>
                    </div>
                  </div>
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
