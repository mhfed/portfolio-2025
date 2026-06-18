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
    <div className='creative-portfolio relative' data-creative-root>
      {/* Global Background Spotlight Follower */}
      <div
        id='global-spotlight'
        className='pointer-events-none fixed h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 opacity-0 lg:opacity-100 hidden lg:block'
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--creative-lime) 16%, transparent) 0%, color-mix(in srgb, var(--creative-lime) 4%, transparent) 45%, transparent 70%)',
          left: '0px',
          top: '0px',
          zIndex: 0,
          mixBlendMode: 'screen',
        }}
      />

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
