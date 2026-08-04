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

const resultById: Record<number, string> = {
  5: 'Responsive portfolio with motion-led UI.',
  4: 'Campaign site and talent application flow.',
  3: 'Trading UI with auth, forms, and live data.',
  2: 'Responsive product UI with motion and game surfaces.',
}

const roleById: Record<number, string> = {
  5: 'Frontend / interaction',
  4: 'Frontend / UX',
  3: 'Frontend / real-time UI',
  2: 'Frontend / motion',
}

export function normalizeProjects(
  records: LocalizedProjectRecord[]
): ProjectCaseStudy[] {
  return records.map((project) => ({
    id: project.id,
    title: project.title,
    year: project.year,
    description: project.description,
    result: resultById[project.id] ?? project.description,
    role: roleById[project.id] ?? 'Frontend',
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
