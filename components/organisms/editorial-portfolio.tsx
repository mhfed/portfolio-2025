import { ScrollToTop } from '@/components/molecules/scroll-to-top'
import { KageCursor } from '@/components/molecules/kage-cursor'
import { KageProgressRail } from '@/components/molecules/kage-progress-rail'
import { KageAbout } from '@/components/organisms/kage-about'
import { KageContact } from '@/components/organisms/kage-contact'
import { KageExperience } from '@/components/organisms/kage-experience'
import { KageFooter } from '@/components/organisms/kage-footer'
import { KageHeader } from '@/components/organisms/kage-header'
import { KageHero } from '@/components/organisms/kage-hero'
import { KageProjects } from '@/components/organisms/kage-projects'
import { KageSkills } from '@/components/organisms/kage-skills'
import { KageSanctuaryCanvas } from '@/components/three/kage-sanctuary-canvas'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface EditorialPortfolioProps {
  content: PortfolioContent
}

export function EditorialPortfolio({ content }: EditorialPortfolioProps) {
  const { about, contact, editorialUi, experience, hero, navigation, skills, work } =
    content

  return (
    <div className='kage-portfolio'>
      {/* Three.js Live WebGL Sanctuary Background */}
      <KageSanctuaryCanvas />

      {/* Vignette & Film Grain Overlay Layers */}
      <div id='vignette' aria-hidden='true' />
      <div id='grain' aria-hidden='true' />

      {/* Interactive Custom Cursor */}
      <KageCursor />

      {/* Right Progress Rail Indicator */}
      <KageProgressRail />

      {/* Navigation Header */}
      <KageHeader content={{ fullName: content.fullName, locale: content.locale, navigation, contact }} />

      {/* Scroll to top helper */}
      <ScrollToTop />

      {/* Main Page Document */}
      <main id='top' className='kage-page'>
        <KageHero content={{ hero, work }} />
        <KageAbout content={{ about, editorialUi }} />
        <KageProjects content={{ work }} />
        <KageExperience content={{ experience }} />
        <KageSkills content={{ skills }} />
        <KageContact content={{ contact }} />
        <KageFooter content={{ fullName: content.fullName, contact, navigation }} />
      </main>
    </div>
  )
}
