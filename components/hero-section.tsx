import { getTranslations } from 'next-intl/server'
import { ResumeDownloadButton } from './resume-download-button'
import { Button } from './ui/button'
import { TechMarquee } from './tech-marquee'
import { SocialsDock } from './socials-dock'
import Image from 'next/image'

export async function HeroSection() {
  const t = await getTranslations('hero')
  const tContact = await getTranslations('hero.contact')

  return (
    <section
      id='home-top'
      className='scroll-mt-24 px-4 pt-6 md:px-6 md:pt-8 lg:pt-10'
    >
      <div className='mx-auto flex w-full max-w-[1200px] flex-col gap-6'>
        <div className='grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]'>
          <div className='terminal-panel terminal-grid px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10'>
            <div className='mb-6 flex flex-wrap items-center gap-3'>
              <span className='terminal-label'>
                system initialization successful
              </span>
              <span className='rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-primary'>
                {t('developer')}
              </span>
            </div>

            <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]'>
              <div>
                <h1 className='font-display text-[3rem] font-semibold uppercase leading-[0.82] tracking-[-0.1em] text-foreground sm:text-[4.25rem] lg:text-[5.5rem]'>
                  {t('front')}
                  <br />
                  {t('middle')}
                  <br />
                  <span className='text-glow text-primary'>{t('end')}</span>
                </h1>

                <p className='mt-6 max-w-2xl text-base leading-relaxed text-foreground/72 md:text-lg'>
                  {t('textBlockLeft')}
                </p>

                <div className='mt-6 flex flex-wrap gap-3'>
                  <ResumeDownloadButton />
                  <Button variant='outline' size='lg' asChild>
                    <a href={`mailto:${tContact('email')}`}>CONTACT_SYS.EXE</a>
                  </Button>
                </div>

                <div className='mt-6'>
                  <SocialsDock />
                </div>
              </div>

              <div className='grid gap-3 self-start'>
                <div className='rounded-[1.25rem] border border-primary/15 bg-background/55 p-4'>
                  <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70'>
                    role
                  </div>
                  <div className='mt-2 text-lg font-semibold text-foreground'>
                    {t('developer')}
                  </div>
                </div>

                <div className='rounded-[1.25rem] border border-primary/15 bg-background/55 p-4'>
                  <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70'>
                    {tContact('basedIn')}
                  </div>
                  <div className='mt-2 text-sm leading-relaxed text-foreground/80'>
                    {tContact('location')}
                  </div>
                </div>

                <div className='rounded-[1.25rem] border border-primary/15 bg-background/55 p-4'>
                  <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70'>
                    {tContact('sayHello')}
                  </div>
                  <a
                    href={`mailto:${tContact('email')}`}
                    className='mt-2 block break-all text-sm leading-relaxed text-foreground/80 transition-colors hover:text-primary'
                  >
                    {tContact('email')}
                  </a>
                </div>
              </div>
            </div>

            <div className='terminal-divider my-6' />

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='rounded-[1.25rem] border border-primary/15 bg-background/45 p-4'>
                <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70'>
                  core directive
                </div>
                <p className='mt-3 text-sm leading-relaxed text-foreground/72 md:text-base'>
                  {t('textBlockLeft')}
                </p>
              </div>

              <div className='rounded-[1.25rem] border border-primary/15 bg-background/45 p-4'>
                <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70'>
                  long range vision
                </div>
                <p className='mt-3 text-sm leading-relaxed text-foreground/72 md:text-base'>
                  {t('textBlockRight')}
                </p>
              </div>
            </div>
          </div>

          <div className='terminal-panel terminal-scanlines overflow-hidden border-primary/20'>
            <Image
              src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
              alt='Hero Avatar'
              width={640}
              height={880}
              priority={true}
              className='h-full min-h-[420px] w-full object-cover object-top'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent' />

            <div className='absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-primary/20 bg-background/75 p-5 backdrop-blur-md'>
              <div className='font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80'>
                architect profile
              </div>
              <div className='mt-2 text-2xl font-semibold tracking-[-0.05em] text-foreground'>
                {t('developer')}
              </div>
              <div className='mt-4 grid gap-3 text-sm text-foreground/72'>
                <div className='flex items-center justify-between gap-3 border-b border-primary/10 pb-3'>
                  <span className='font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/55'>
                    Region
                  </span>
                  <span>{tContact('location')}</span>
                </div>
                <div className='flex items-center justify-between gap-3'>
                  <span className='font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/55'>
                    Status
                  </span>
                  <span className='text-primary'>Ready for collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='terminal-panel px-4 py-4 md:px-5'>
          <div className='mb-4 flex items-center justify-between gap-4'>
            <span className='terminal-label'>stack protocols</span>
            <span className='font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/55'>
              synchronized modules
            </span>
          </div>
          <TechMarquee />
        </div>
      </div>
    </section>
  )
}
