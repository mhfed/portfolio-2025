import type { ProjectCaseStudy } from '@/data/projects'
import type { ExperienceRecord } from '@/types/experience'

export type SceneLocale = 'en' | 'vi' | 'zh-TW'

export interface SceneCapability {
  label: string
  value: string
}

export interface SceneLink {
  href: string
  label: string
}

export interface PortfolioSceneContent {
  locale: SceneLocale
  email: string
  hero: {
    role: string
    namePrimary: string
    nameAccent: string
    description: string
    viewWorkLabel: string
    contactLabel: string
  }
  work: {
    title: string
    emptyLabel: string
    launchLabel: string
    sourceLabel: string
  }
  about: {
    title: string
    statement: string
    description: string
    yearsValue: string
    yearsLabel: string
    deliveryValue: string
    deliveryLabel: string
    capabilitiesLabel: string
    capabilities: SceneCapability[]
    badges: string[]
  }
  experience: {
    title: string
    emptyLabel: string
  }
  contact: {
    title: string
    headline: string
    description: string
    availability: string
    location: string
    emailLabel: string
    links: SceneLink[]
  }
  projects: ProjectCaseStudy[]
  experiences: ExperienceRecord[]
}
