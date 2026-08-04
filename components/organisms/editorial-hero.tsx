import Image from 'next/image'
import { ArrowDownRight } from 'lucide-react'
import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface EditorialHeroProps {
  name: string
  hero: PortfolioContent['hero']
  workLabel: string
  contactLabel: string
}

function renderEmphasizedHeadline(headline: string) {
  return headline.split('*').map((part, index) =>
    index % 2 === 1 ? <em key={`${part}-${index}`}>{part}</em> : part
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
        <EditorialReveal className='hero-identity'>
          <span>{name}</span>
          <span>{hero.role}</span>
        </EditorialReveal>

        <EditorialReveal delay={0.06}>
          <h1 id='hero-title' className='hero-title'>
            {renderEmphasizedHeadline(hero.headline)}
          </h1>
        </EditorialReveal>

        <div className='hero-footer'>
          <EditorialReveal className='hero-copy' delay={0.12}>
            <p>{hero.description}</p>
            <div className='hero-actions'>
              <a className='button button--primary' href='#work'>
                {workLabel}
                <ArrowDownRight aria-hidden='true' size={17} strokeWidth={1.7} />
              </a>
              <a className='button button--secondary' href='#contact'>
                {contactLabel}
              </a>
            </div>
          </EditorialReveal>

          <EditorialReveal className='hero-media' delay={0.16}>
            <Image
              src='/images/editorial-workspace.jpg'
              alt=''
              width={1122}
              height={1402}
              sizes='(max-width: 767px) 100vw, 35vw'
              priority
            />
          </EditorialReveal>
        </div>
      </div>
    </section>
  )
}
