'use client'

import { useTranslations } from 'next-intl'
import { MagneticLink } from './magnetic-link'

export function HeroSection({ email }: { email: string }) {
  const t = useTranslations('hero')
  const headlineText = t('headline')
  const cleanHeadline = headlineText.replace(/\*/g, '')
  const heroWords = headlineText.split(' ')

  return (
    <section
      id='top'
      className='creative-hero relative flex min-h-[100dvh] items-end overflow-hidden px-[clamp(1rem,4vw,4rem)]'
      data-section
      data-waypoint='hero'
    >
      {/* Cinematic Background */}
      <div className='absolute inset-0 z-0' aria-hidden='true'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.05] grayscale contrast-125 mix-blend-luminosity'
          style={{
            backgroundImage:
              'url(https://picsum.photos/seed/devstudio/1920/1080)',
          }}
        />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,transparent_0%,rgba(8,9,7,0.5)_50%,rgba(8,9,7,0.95)_100%)]' />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--creative-bg)]' />
      </div>

      {/* Main Content - Asymmetric Split */}
      <div
        className='relative z-20 w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-end pb-[clamp(3rem,8vh,6rem)] pt-32'
        data-hero-stage
      >
        {/* Left: Headline */}
        <div className='flex flex-col gap-8'>
          <h1
            className='max-w-[18ch] m-0 text-creative-ink font-display font-black tracking-tighter leading-[0.92] uppercase'
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)' }}
            data-hero-headline
          >
            <span className='sr-only'>{cleanHeadline}</span>
            <span aria-hidden='true' className='inline'>
              {heroWords.flatMap((word, index) => {
                const isAccent = word.startsWith('*') && word.endsWith('*')
                const cleanWord = isAccent ? word.slice(1, -1) : word

                const elements: React.ReactNode[] = []

                elements.push(
                  <span
                    key={`${word}-${index}`}
                    className={isAccent ? 'text-creative-lime' : undefined}
                    data-hero-word
                  >
                    {cleanWord}
                  </span>
                )

                if (index < heroWords.length - 1) {
                  elements.push(<span key={`space-${index}`}> </span>)
                }

                return elements
              })}
            </span>
          </h1>

          {/* CTAs */}
          <div className='flex flex-wrap gap-4' data-reveal data-hero-ctas>
            <MagneticLink href='#work'>{t('viewWork')}</MagneticLink>
            <MagneticLink href={`mailto:${email}`} variant='dark'>
              {t('contactMe')}
            </MagneticLink>
          </div>
        </div>

        {/* Right: Description + Status */}
        <div className='flex flex-col gap-8 lg:pb-3'>
          <p
            className='max-w-[38ch] m-0 text-creative-muted text-body-lg font-light leading-relaxed'
            data-reveal
            data-hero-copy
          >
            {t('description')}
          </p>

          <div
            className='flex items-center gap-3 text-creative-dim'
            data-reveal
            data-hero-top
          >
            <span className='w-2 h-2 rounded-full bg-creative-lime animate-pulse' />
            <p className='m-0 font-mono text-[0.72rem] font-bold tracking-[0.15em] uppercase'>
              {t('status')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
