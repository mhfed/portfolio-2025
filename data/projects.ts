export interface LocalizedProjectRecord {
  id: number
  title: string
  year: string
  description: string
  details: string
  imageUrl: string
  liveUrl: string | null
  githubUrl: string | null
  techStack: string[]
}

export interface ProjectCaseStudy {
  id: number
  title: string
  year: string
  description: string
  result: string
  role: string
  image: string
  liveUrl?: string
  githubUrl?: string
  techStack: string[]
  details: string[]
}

const resultByTitle: Record<string, string> = {
  'Portfolio Designer': 'Delivered a polished portfolio experience with fast navigation and responsive visual storytelling.',
  Starlento: 'Shipped a campaign-ready talent platform with smooth application flows and production-ready UI.',
  'CGSI, Iress Wealth, Admin Portal Equix':
    'Built authenticated trading workflows, CMS operations, filtering, and theme tooling for financial products.',
  'Metacity System, Landing Page':
    'Produced responsive Web3 product surfaces with animation, game UI customization, and cross-browser support.',
}

const roleByTitle: Record<string, string> = {
  'Portfolio Designer': 'Frontend implementation, interaction design, responsive UI',
  Starlento: 'Frontend development, UI implementation, application flow',
  'CGSI, Iress Wealth, Admin Portal Equix':
    'Frontend development, auth flow, form systems, real-time UI',
  'Metacity System, Landing Page':
    'Frontend development, animation, responsive implementation',
}

export function normalizeProjects(
  records: LocalizedProjectRecord[]
): ProjectCaseStudy[] {
  return records.map((project) => ({
    id: project.id,
    title: project.title,
    year: project.year,
    description: project.description,
    result: resultByTitle[project.title] ?? project.description,
    role: roleByTitle[project.title] ?? 'Frontend development',
    image: project.imageUrl,
    liveUrl: project.liveUrl ?? undefined,
    githubUrl: project.githubUrl ?? undefined,
    techStack: project.techStack,
    details: project.details
      ? project.details
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
      : [],
  }))
}
