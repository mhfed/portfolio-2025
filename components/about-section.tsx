import { getTranslations } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { CoreSkillsList } from './core-skills-list'
import { Reveal } from './ui/reveal'

import { AboutClientAnimator } from './about-client-animator'

export function AboutSection() {
  return (
    <section id='about' className='relative w-full min-h-screen bg-black flex items-center py-32 px-4 md:px-12'>
      <AboutClientAnimator />
      <div className='max-w-[1400px] mx-auto w-full'>
        <p className='about-reveal-text font-serif text-[clamp(2rem,5vw,5rem)] leading-tight text-white/20 uppercase'>
          <span className='about-word'>I </span>
          <span className='about-word'>am </span>
          <span className='about-word'>a </span>
          <span className='about-word text-white italic'>Creative </span>
          <span className='about-word text-white italic'>Developer </span>
          <span className='about-word'>specializing </span>
          <span className='about-word'>in </span>
          <span className='about-word'>building </span>
          <span className='about-word'>high-end </span>
          <span className='about-word'>digital </span>
          <span className='about-word'>experiences </span>
          <span className='about-word'>with </span>
          <span className='about-word'>a </span>
          <span className='about-word'>focus </span>
          <span className='about-word'>on </span>
          <span className='about-word text-white italic'>motion, </span>
          <span className='about-word text-white italic'>interaction, </span>
          <span className='about-word'>and </span>
          <span className='about-word text-white italic'>performance.</span>
        </p>
      </div>
    </section>
  )
}
