import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { BackgroundScene } from '@/components/organisms/background-scene'
import { ResumeDownloadButton } from '@/components/atoms/resume-download-button'
import { MagneticWrapper } from '@/components/atoms/magnetic-wrapper'
import { Reveal } from '@/components/ui/reveal'

export async function HeroSection() {
  const tContact = await getTranslations('hero.contact')

  return (
    <section
      id='home-top'
      className='hero-shell relative min-h-[100dvh] overflow-hidden px-4 pb-12 pt-28 md:px-6 md:pb-16 md:pt-32'
    >
      <BackgroundScene />

      <div className='mx-auto flex min-h-[calc(100dvh-9rem)] max-w-[1500px] flex-col justify-between gap-14'>
        <div className='relative flex flex-1 items-center'>
          <div className='relative z-10 max-w-[1180px]'>
            <Reveal>
              <span className='section-kicker'>Available for frontend roles</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className='mt-7 font-display text-[clamp(4.5rem,13.4vw,15rem)] font-semibold uppercase leading-[0.76] tracking-normal text-foreground'>
                Frontend
                <span className='block text-primary'>Developer</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className='mt-8 max-w-3xl text-xl font-medium leading-tight text-foreground/86 md:text-2xl lg:text-3xl'>
                Building polished web experiences with React, Next.js & motion.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className='mt-9 flex flex-wrap items-center gap-3'>
                <MagneticWrapper range={30} strength={0.28}>
                  <a href='#projects' className='cinematic-button cinematic-button--primary'>
                    <span>View Work</span>
                    <span className='cinematic-button__icon'>
                      <ArrowDownRight className='h-4 w-4' />
                    </span>
                  </a>
                </MagneticWrapper>

                <MagneticWrapper range={30} strength={0.28}>
                  <a
                    href={`mailto:${tContact('email')}`}
                    className='cinematic-button'
                  >
                    <span>Contact Me</span>
                    <span className='cinematic-button__icon'>
                      <ArrowRight className='h-4 w-4' />
                    </span>
                  </a>
                </MagneticWrapper>

                <ResumeDownloadButton />
              </div>
            </Reveal>
          </div>

          <div className='hero-sculpture' data-cursor='interactive field' aria-hidden='true'>
            <div className='hero-sculpture__ring hero-sculpture__ring--one' />
            <div className='hero-sculpture__ring hero-sculpture__ring--two' />
            <div className='hero-sculpture__core' />
            <span className='hero-sculpture__point hero-sculpture__point--one' />
            <span className='hero-sculpture__point hero-sculpture__point--two' />
            <span className='hero-sculpture__point hero-sculpture__point--three' />
          </div>
        </div>

        <Reveal delay={220}>
          <div className='hero-credits'>
            <span>5+ years</span>
            <span>React / Next.js / TypeScript</span>
            <span>UI systems / performance / motion</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
