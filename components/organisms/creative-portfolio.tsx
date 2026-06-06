import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'
import { CreativePortfolioEffects } from './creative-portfolio-effects'
import { CreativeNav } from './creative-nav'
import { HeroSection } from './creative-hero'
import { WorkSection } from './work-section'
import { AboutSection } from './creative-about'
import { ExperienceSection } from './creative-experience'
import { SkillsSection } from './creative-skills'
import { ContactSection } from './creative-contact'

type CreativePortfolioProps = {
  locale: string
  projects: ProjectCaseStudy[]
  experiences: ExperienceRecord[]
  email: string
}

export type { ExperienceRecord }

export function CreativePortfolio({
  locale,
  projects,
  experiences,
  email,
}: CreativePortfolioProps) {
  return (
    <div className='creative-portfolio' data-creative-root>
      <CreativePortfolioEffects />
      <CreativeNav email={email} />
      <HeroSection email={email} />
      <WorkSection projects={projects} />
      <AboutSection />
      <ExperienceSection experiences={experiences} />
      <SkillsSection />
      <ContactSection email={email} locale={locale} />
    </div>
  )
}
