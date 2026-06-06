import { useTranslations } from 'next-intl'
import { MagneticLink } from './magnetic-link'

function AbstractMotionField() {
  return (
    <div className='motion-field' aria-hidden='true' data-parallax='field'>
      <svg viewBox='0 0 520 520' role='presentation'>
        <path
          className='motion-field__path motion-field__path--one'
          d='M76 286C44 188 142 78 258 88c116 10 186 102 155 206-31 104-150 144-249 102-41-17-75-50-88-110Z'
        />
        <path
          className='motion-field__path motion-field__path--two'
          d='M116 192c78-112 258-92 304 30 48 128-82 254-222 204C92 388 56 278 116 192Z'
        />
        <path
          className='motion-field__path motion-field__path--three'
          d='M150 266c-4-68 56-126 132-118 74 8 122 70 104 140-18 69-94 106-164 79-43-17-69-52-72-101Z'
        />
      </svg>
      <span className='motion-field__dot motion-field__dot--one' />
      <span className='motion-field__dot motion-field__dot--two' />
      <span className='motion-field__dot motion-field__dot--three' />
    </div>
  )
}

export function HeroSection({ email }: { email: string }) {
  const t = useTranslations('hero')
  const headlineText = t('headline')
  const cleanHeadline = headlineText.replace(/\*/g, '')
  const heroWords = headlineText.split(' ')

  return (
    <section id='top' className='creative-hero' data-section>
      <div className='creative-hero__content'>
        <div className='creative-hero__top' data-reveal>
          <p className='creative-kicker'>{t('status')}</p>
          <span className='creative-hero__name'>Nguyen Minh Hieu 🇻🇳</span>
        </div>

        <h1 className='creative-hero__headline'>
          <span className='sr-only'>{cleanHeadline}</span>
          <span aria-hidden='true'>
            {heroWords.flatMap((word, index) => {
              const isAccent = word.startsWith('*') && word.endsWith('*')
              const cleanWord = isAccent ? word.slice(1, -1) : word
              return [
                <span
                  key={`${word}-${index}`}
                  className={isAccent ? 'is-accent' : undefined}
                  data-hero-word
                >
                  {cleanWord}
                </span>,
                index < heroWords.length - 1 ? ' ' : null,
              ]
            })}
          </span>
        </h1>

        <div className='creative-hero__bottom'>
          <p data-reveal>
            {t('description')}
          </p>
          <div className='creative-hero__actions' data-reveal>
            <MagneticLink href='#work'>{t('viewWork')}</MagneticLink>
            <MagneticLink href={`mailto:${email}`} variant='dark'>
              {t('contactMe')}
            </MagneticLink>
          </div>
        </div>
      </div>

      <AbstractMotionField />

      <div className='creative-marquee creative-marquee--hero' aria-hidden='true'>
        <div>
          <span>React</span>
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>GSAP</span>
          <span>Performance</span>
          <span>UI Polish</span>
        </div>
        <div>
          <span>React</span>
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>GSAP</span>
          <span>Performance</span>
          <span>UI Polish</span>
        </div>
      </div>
    </section>
  )
}
