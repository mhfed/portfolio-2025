import type { PortfolioSceneContent } from '@/types/scene-content'
import { AboutSection } from './creative-about'
import { ContactSection } from './creative-contact'
import { ExperienceSection } from './creative-experience'
import { CreativeNav } from './creative-nav'
import { PortfolioHero } from './portfolio-hero'
import { TechStackSection } from './tech-stack-section'
import { TestimonialsSection } from './testimonials-section'
import { WorkSection } from './work-section'

export interface CreativePortfolioProps {
  sceneContent: PortfolioSceneContent
}

export function CreativePortfolio({ sceneContent }: CreativePortfolioProps) {
  const { email, experiences, projects } = sceneContent

  return (
    <div className='creative-portfolio'>
      <CreativeNav email={email} />
      <PortfolioHero email={email} />
      <AboutSection />
      <WorkSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <TechStackSection />
      <TestimonialsSection />
      <ContactSection email={email} />
    </div>
  )
}
