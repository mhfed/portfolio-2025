import { useTranslations } from 'next-intl'
import { MagneticLink } from './magnetic-link'

function AbstractMotionField() {
  return (
    <div className='motion-field absolute right-[clamp(-11rem,-8vw,-4rem)] top-[16%] md:top-[24%] max-sm:top-[32%] max-sm:right-[-12rem] w-[clamp(20rem,42vw,48rem)] max-sm:w-[28rem] aspect-square pointer-events-none filter drop-shadow-[0_0_45px_rgba(200,255,69,0.16)] max-sm:opacity-35 md:opacity-60' aria-hidden='true' data-parallax='field'>
      <svg className="w-full h-full overflow-visible" viewBox='0 0 520 520' role='presentation'>
        <path
          className='motion-field__path fill-none stroke-linecap-round stroke-linejoin-round [vector-effect:non-scaling-stroke] origin-center stroke-creative-lime stroke-[8px] [animation:creative-spin_18s_linear_infinite]'
          d='M76 286C44 188 142 78 258 88c116 10 186 102 155 206-31 104-150 144-249 102-41-17-75-50-88-110Z'
        />
        <path
          className='motion-field__path fill-none stroke-linecap-round stroke-linejoin-round [vector-effect:non-scaling-stroke] origin-center stroke-[rgba(243,240,223,0.78)] stroke-[2px] [stroke-dasharray:10_18] [animation:creative-spin_26s_linear_infinite_reverse]'
          d='M116 192c78-112 258-92 304 30 48 128-82 254-222 204C92 388 56 278 116 192Z'
        />
        <path
          className='motion-field__path fill-none stroke-linecap-round stroke-linejoin-round [vector-effect:non-scaling-stroke] origin-center stroke-creative-orange stroke-[4px] [animation:creative-pulse_5s_ease-in-out_infinite]'
          d='M150 266c-4-68 56-126 132-118 74 8 122 70 104 140-18 69-94 106-164 79-43-17-69-52-72-101Z'
        />
      </svg>
      <span className='motion-field__dot absolute block rounded-full bg-creative-lime shadow-[0_0_28px_rgba(200,255,69,0.55)] top-[18%] left-[25%] w-4 h-4' />
      <span className='motion-field__dot absolute block rounded-full bg-creative-lime shadow-[0_0_28px_rgba(200,255,69,0.55)] right-[18%] bottom-[28%] w-3 h-3 bg-creative-pink' />
      <span className='motion-field__dot absolute block rounded-full bg-creative-lime shadow-[0_0_28px_rgba(200,255,69,0.55)] left-[44%] bottom-[12%] w-6 h-6 bg-creative-orange' />
    </div>
  )
}

export function HeroSection({ email }: { email: string }) {
  const t = useTranslations('hero')
  const headlineText = t('headline')
  const cleanHeadline = headlineText.replace(/\*/g, '')
  const heroWords = headlineText.split(' ')

  return (
    <section id='top' className='creative-hero relative flex min-h-[100dvh] items-stretch overflow-hidden pt-28 max-sm:pt-24 pb-8 px-[clamp(1rem,4vw,4rem)]' data-section data-waypoint='hero'>
      <div className='creative-hero__content relative z-20 flex w-full max-w-[1500px] mx-auto flex-col justify-between gap-8' data-hero-stage>
        <div className='creative-hero__top flex justify-between items-start gap-6 max-md:flex-col-reverse max-md:items-start max-md:gap-2' data-reveal data-hero-top>
          <p className='creative-kicker max-w-[34rem] text-creative-muted font-mono text-[clamp(0.72rem,1vw,0.82rem)] font-extrabold tracking-widest leading-relaxed uppercase'>{t('status')}</p>
          <span className='creative-hero__name text-creative-ink font-mono text-[clamp(0.72rem,1vw,0.82rem)] font-black tracking-widest uppercase whitespace-nowrap'>Nguyen Minh Hieu 🇻🇳</span>
        </div>

        <h1 className='creative-hero__headline max-w-[16ch] m-0 text-creative-ink font-display text-[clamp(2.5rem,6.5vw,6.2rem)] max-sm:text-[clamp(2.2rem,9vw,3.8rem)] font-black tracking-tighter leading-[0.92] max-sm:leading-[0.95] uppercase' data-hero-headline>
          <span className='sr-only'>{cleanHeadline}</span>
          <span aria-hidden='true'>
            {heroWords.flatMap((word, index) => {
              const isAccent = word.startsWith('*') && word.endsWith('*')
              const cleanWord = isAccent ? word.slice(1, -1) : word
              return [
                <span
                  key={`${word}-${index}`}
                  className={isAccent ? 'text-creative-lime' : undefined}
                  data-hero-word
                >
                  {cleanWord}
                </span>,
                index < heroWords.length - 1 ? ' ' : null,
              ]
            })}
          </span>
        </h1>

        <div className='creative-hero__bottom grid grid-cols-1 lg:grid-cols-[minmax(0,34rem)_minmax(0,24rem)] items-end gap-8 lg:gap-[clamp(2rem,5vw,6rem)]' data-hero-copy>
          <p className="m-0 text-creative-muted text-[clamp(1rem,1.45vw,1.35rem)] font-light leading-relaxed" data-reveal>
            {t('description')}
          </p>
          <div className='creative-hero__actions flex flex-wrap justify-start gap-3' data-reveal>
            <MagneticLink href='#work'>{t('viewWork')}</MagneticLink>
            <MagneticLink href={`mailto:${email}`} variant='dark'>
              {t('contactMe')}
            </MagneticLink>
          </div>
        </div>
      </div>

      <div data-hero-field className="relative z-0">
        <AbstractMotionField />
      </div>

      <div
        className='creative-marquee creative-marquee--hero marquee-mask absolute left-[-2rem] bottom-5 max-sm:bottom-1.5 z-[1] text-[rgba(243,240,223,0.035)] text-[clamp(3rem,8vw,8rem)] max-sm:text-[3.2rem] pointer-events-none flex w-max font-display font-black uppercase whitespace-nowrap'
        aria-hidden='true'
        data-hero-marquee
      >
        <div className="flex min-w-max [animation:creative-marquee_calc(24s/var(--marquee-speed,1))_linear_infinite]">
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">React</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">Next.js</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">TypeScript</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">GSAP</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">Performance</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">UI Polish</span>
        </div>
        <div className="flex min-w-max [animation:creative-marquee_calc(24s/var(--marquee-speed,1))_linear_infinite]">
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">React</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">Next.js</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">TypeScript</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">GSAP</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">Performance</span>
          <span className="inline-flex items-center after:content-[''] after:w-[0.42em] after:h-[0.42em] after:mx-[0.38em] after:rounded-full after:bg-creative-lime">UI Polish</span>
        </div>
      </div>
    </section>
  )
}

