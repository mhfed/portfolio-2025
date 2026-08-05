import Image from 'next/image'
import { ArrowDownRight } from 'lucide-react'
import { KineticHeadline } from '@/components/molecules/kinetic-headline'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface EditorialHeroProps {
  name: string
  hero: PortfolioContent['hero']
  workLabel: string
  contactLabel: string
}

function HeroKineticField() {
  return (
    <div className='hero-kinetic-field' aria-hidden='true'>
      <svg
        className='hero-kinetic-path'
        viewBox='0 0 1200 420'
        fill='none'
        preserveAspectRatio='none'
      >
        <path
          data-hero-path
          d='M38 310C196 86 388 56 552 202C704 338 900 344 1162 92'
        />
      </svg>
      <span
        className='hero-kinetic-shape hero-kinetic-shape--orb'
        data-hero-shape
      />
      <span
        className='hero-kinetic-shape hero-kinetic-shape--capsule'
        data-hero-shape
      />
      <span
        className='hero-kinetic-shape hero-kinetic-shape--cross'
        data-hero-shape
      >
        <i />
        <i />
      </span>
    </div>
  )
}

export function EditorialHero({
  name,
  hero,
  workLabel,
  contactLabel,
}: EditorialHeroProps) {
  return (
    <section id='top' className='editorial-hero' aria-labelledby='hero-title'>
      <div className='portfolio-shell editorial-hero__inner'>
        <HeroKineticField />
        <div className='hero-identity' data-hero-intro>
          <span>{name}</span>
          <span>{hero.role}</span>
        </div>

        <KineticHeadline text={hero.headline} />

        <div className='hero-footer'>
          <div className='hero-copy' data-hero-intro>
            <p>{hero.description}</p>
            <div className='hero-actions'>
              <a className='button button--primary' href='#work'>
                {workLabel}
                <ArrowDownRight
                  aria-hidden='true'
                  size={17}
                  strokeWidth={1.7}
                />
              </a>
              <a className='button button--secondary' href='#contact'>
                {contactLabel}
              </a>
            </div>
          </div>

          <div className='hero-media' data-hero-intro data-spotlight-surface>
            <Image
              data-hero-image
              src='/images/editorial-workspace.jpg'
              alt=''
              width={1122}
              height={1402}
              sizes='(max-width: 767px) 100vw, 35vw'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
