import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'
import { HudBackdrop } from './hud-backdrop'
import { CreativeNav } from './creative-nav'
import { HudHero } from './hud-hero'
import { WorkSection } from './work-section'
import { AboutSection } from './creative-about'
import { ExperienceSection } from './creative-experience'
import { ContactSection } from './creative-contact'
import { ScrollToTop } from '@/components/molecules/scroll-to-top'

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
      <HudBackdrop projects={projects} experiences={experiences} />
      <CreativeNav email={email} />
      <HudHero email={email} />
      <AboutSection />
      <ExperienceSection experiences={experiences} />
      <WorkSection projects={projects} />
      <ContactSection email={email} locale={locale} />
      <ScrollToTop />
    </div>
  )
}
