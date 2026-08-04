import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'

export type PortfolioLocale = 'en' | 'vi' | 'zh-TW'

export interface PortfolioLink {
  label: string
  href: string
  external?: boolean
  download?: boolean
}

export interface PortfolioNavigationItem extends PortfolioLink {
  id: 'about' | 'work' | 'experience' | 'skills' | 'contact'
}

export interface PortfolioMetric {
  label: string
  value: string
}

export interface PortfolioSkillGroup {
  label: string
  items: string[]
}

export interface PortfolioContactPoint {
  label: string
  value: string
  href: string
}

export interface PortfolioContent {
  locale: PortfolioLocale
  fullName: string
  navigation: {
    items: PortfolioNavigationItem[]
    contactLabel: string
    theme: {
      label: string
      darkLabel: string
      lightLabel: string
      toggleLabel: string
    }
    language: {
      label: string
      changeLabel: string
    }
    skipToContentLabel: string
    primaryNavigationLabel: string
    mobileNavigationLabel: string
    menu: {
      openLabel: string
      closeLabel: string
    }
  }
  hero: {
    role: string
    headline: string
    description: string
    intro: string
    status: string
    location: {
      label: string
      value: string
    }
    email: PortfolioContactPoint
    actions: {
      viewWork: PortfolioLink
      contact: PortfolioLink
    }
  }
  about: {
    title: string
    statement: string
    description: string
    metrics: PortfolioMetric[]
  }
  work: {
    title: string
    headline: string
    launchLabel: string
    sourceLabel: string
    viewLabel: string
    projects: ProjectCaseStudy[]
  }
  experience: {
    title: string
    headline: string
    emptyLabel: string
    records: ExperienceRecord[]
  }
  skills: {
    title: string
    headline: string
    groups: PortfolioSkillGroup[]
  }
  contact: {
    title: string
    headline: string
    description: string
    email: PortfolioContactPoint
    links: PortfolioLink[]
    rights: string
  }
}
