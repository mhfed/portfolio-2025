import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'
import { CreativePortfolioEffects } from './creative-portfolio-effects'
import { CreativeWaypointsScene } from './creative-waypoints-scene'
import { CreativeNav } from './creative-nav'
import { HeroSection } from './creative-hero'
import { WorkSection } from './work-section'
import { AboutSection } from './creative-about'
import { ExperienceSection } from './creative-experience'
import { SkillsSection } from './creative-skills'
import { ContactSection } from './creative-contact'
import { SettingsPanel } from './settings-panel'

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
      <CreativeWaypointsScene />
      <CreativePortfolioEffects />
      <CreativeNav email={email} />
      <HeroSection email={email} />
      <AboutSection locale={locale} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection />
      <WorkSection projects={projects} />
      <ContactSection email={email} locale={locale} />
      <SettingsPanel />
    </div>
  )
}
