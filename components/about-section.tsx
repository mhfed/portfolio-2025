import { getTranslations } from 'next-intl/server'
import { SectionTitle } from './section-title'
import { CoreSkillsList } from './core-skills-list'
import { Reveal } from './ui/reveal'

import { AboutClientAnimator } from './about-client-animator'

export async function AboutSection() {
  const t = await getTranslations('about')
  
  const skills = [
    { id: '1', label: t('skillList.frontend.label'), value: t('skillList.frontend.value') },
    { id: '2', label: t('skillList.state.label'), value: t('skillList.state.value') },
    { id: '3', label: t('skillList.performance.label'), value: t('skillList.performance.value') },
    { id: '4', label: t('skillList.devops.label'), value: t('skillList.devops.value') },
  ]

  return (
    <section id='about' className='relative w-full min-h-[40vh] flex flex-col items-center py-16 md:py-24 px-4 md:px-12 z-10'>
      <AboutClientAnimator />
      <div className='max-w-[1400px] mx-auto w-full'>
        <p className='about-reveal-text font-serif text-[clamp(2rem,5vw,5rem)] leading-tight text-zinc-300 uppercase'>
          <span className='about-word'>I </span>
          <span className='about-word'>am </span>
          <span className='about-word'>a </span>
          <span className='about-word neon opacity-20 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-rose-500 to-violet-500 italic'>Creative </span>
          <span className='about-word neon opacity-20 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-teal-400 to-violet-500 italic'>Developer </span>
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
          <span className='about-word text-black italic'>motion, </span>
          <span className='about-word text-black italic'>interaction, </span>
          <span className='about-word'>and </span>
          <span className='about-word text-black italic'>performance.</span>
        </p>
        <CoreSkillsList title={t('coreSkills')} items={skills} />
      </div>
    </section>
  )
}
