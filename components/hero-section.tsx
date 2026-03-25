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
        <div className='grid gap-10 lg:min-h-[75svh] lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20'>
          <div className='max-w-[52rem]'>
            <Reveal>
              <span className='section-kicker'>
                Available for selected product & frontend work
              </span>
            </Reveal>

            <h1 className='mt-6 font-display text-[3rem] font-semibold leading-[0.85] tracking-[-0.092em] text-foreground sm:text-[4.5rem] lg:text-[5.25rem] xl:text-[5.75rem]'>
              <span className='hero-line'>
                {t('front')} {t('middle')} {t('end')}
              </span>
            </h1>

            <Reveal delay={120}>
              <p className='mt-6 text-base font-medium text-foreground/84 md:text-xl lg:text-[1.45rem]'>
                {t('developer')}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className='mt-5 max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base lg:text-[1.05rem]'>
                {t('textBlockLeft')}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className='mt-8 flex flex-wrap gap-4'>
                <ResumeDownloadButton />
                <Button variant='secondary' size='lg' asChild className='h-12 px-8'>
                  <a href={`mailto:${tContact('email')}`} className='inline-flex items-center gap-2'>
                    {tContact('sayHello')}
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className='mt-8'>
                <SocialsDock />
              </div>
            </Reveal>
          </div>

          <Reveal variant='right' delay={180}>
            <div className='relative mx-auto w-full max-w-[32rem] lg:ml-auto'>
              <div className='absolute -right-8 -top-8 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl' />
              <div className='absolute -bottom-8 -left-8 -z-10 h-48 w-48 rounded-full bg-[color:color-mix(in_srgb,var(--theme-tertiary)_15%,transparent)] blur-3xl' />

              <div className='relative overflow-hidden border border-white/10 bg-background/20 p-6 backdrop-blur-md md:p-8'>
                <div className='flex flex-col gap-6 sm:flex-row sm:items-start'>
                  <div className='relative h-48 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-52 md:w-40'>
                    <Image
                      src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
                      alt='Hero Avatar'
                      fill
                      priority
                      className='object-cover object-top transition duration-700 hover:scale-110'
                      sizes='(max-width: 768px) 144px, 160px'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent' />
                  </div>

                  <div className='min-w-0 flex-1'>
                    <p className='font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-primary/80'>
                      Profile
                    </p>
                    <h2 className='mt-3 font-display text-[2rem] font-semibold leading-[0.9] tracking-[-0.06em] text-foreground md:text-[2.25rem]'>
                      {t('developer')}
                    </h2>
                    <p className='mt-4 text-sm leading-relaxed text-foreground/60 md:text-[0.95rem]'>
                      Building high-end digital experiences with a focus on
                      performance, accessibility, and polished UI systems.
                    </p>

                    <div className='mt-5 flex flex-wrap gap-2'>
                      {miniHighlights.map((item) => (
                        <span
                          key={item}
                          className='inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-[0.15em] text-foreground/70'
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='mt-8 border-t border-white/10 pt-6'>
                  <div className='space-y-4'>
                    {profileMeta.map((item) => (
                      <div
                        key={item.label}
                        className='flex items-center justify-between gap-4 text-sm'
                      >
                        <span className='font-mono text-[11px] uppercase tracking-[0.25em] text-primary/70'>
                          {item.label}
                        </span>
                        <span className='font-medium text-foreground/80'>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className='mt-6 border-t border-white/10 pt-6'>
                    <div className='flex items-center justify-between gap-4 text-sm'>
                      <span className='font-mono text-[11px] uppercase tracking-[0.25em] text-primary/70'>
                        Contact
                      </span>
                      <a
                        href={`mailto:${tContact('email')}`}
                        className='font-medium text-foreground/80 transition-colors hover:text-primary'
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
          <div className='soft-divider mt-16' />
        </Reveal>

        <div className='mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <Reveal delay={120}>
            <p className='max-w-xl text-base leading-relaxed text-foreground/60 md:text-lg lg:text-[1.125rem]'>
              {t('textBlockRight')}
            </p>
          </Reveal>

          <Reveal delay={220} variant='right'>
            <div className='divide-y divide-white/10 border-y border-white/10'>
              <div className='flex items-center justify-between gap-4 py-4 text-sm'>
                <span className='font-mono text-[11px] uppercase tracking-[0.25em] text-primary/70'>
                  Core stack
                </span>
                <span className='text-right font-medium text-foreground/80'>
                  React, Next.js, TS, Tailwind
                </span>
              </div>
              <div className='flex items-center justify-between gap-4 py-4 text-sm'>
                <span className='font-mono text-[11px] uppercase tracking-[0.25em] text-primary/70'>
                  Working style
                </span>
                <span className='text-right font-medium text-foreground/80'>
                  Product thinking & polished UI
                </span>
              </div>
              <div className='flex items-center justify-between gap-4 py-4 text-sm'>
                <span className='font-mono text-[11px] uppercase tracking-[0.25em] text-primary/70'>
                  Availability
                </span>
                <span className='text-right font-medium text-foreground/80'>
                  Open to new opportunities
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
