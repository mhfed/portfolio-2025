import { CapabilitiesSection } from '@/components/organisms/capabilities-section'
import { EditorialHero } from '@/components/organisms/editorial-hero'
import { ExperienceStory } from '@/components/organisms/experience-story'
import { ImpactSection } from '@/components/organisms/impact-section'
import { PortfolioContact } from '@/components/organisms/portfolio-contact'
import { PortfolioNavigation } from '@/components/organisms/portfolio-navigation'
import { ProjectShowcase } from '@/components/organisms/project-showcase'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface EditorialPortfolioProps {
  content: PortfolioContent
}

export function EditorialPortfolio({ content }: EditorialPortfolioProps) {
  const resumeLabel =
    content.contact.links.find((link) => link.download)?.label || 'Resume'
  const workLabel =
    content.navigation.items.find((item) => item.id === 'work')?.label ||
    content.hero.actions.viewWork.label

  return (
    <div className='editorial-portfolio'>
      <PortfolioNavigation
        name={content.fullName}
        locale={content.locale}
        items={content.navigation.items.filter((item) => item.id !== 'contact')}
        contactLabel={content.navigation.contactLabel}
        resumeLabel={resumeLabel}
        languageLabel={content.navigation.language.changeLabel}
        themeLabel={content.navigation.theme.toggleLabel}
        openMenuLabel={content.navigation.menu.openLabel}
        closeMenuLabel={content.navigation.menu.closeLabel}
      />
      <main>
        <EditorialHero
          name={content.fullName}
          hero={content.hero}
          workLabel={workLabel}
          contactLabel={content.navigation.contactLabel}
        />
        <ImpactSection about={content.about} />
        <ProjectShowcase work={content.work} />
        <ExperienceStory experience={content.experience} />
        <CapabilitiesSection skills={content.skills} />
      </main>
      <PortfolioContact
        contact={content.contact}
        location={content.hero.location}
        status={content.hero.status}
      />
    </div>
  )
}
