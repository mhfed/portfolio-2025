export type SkillGroupId = 'core' | 'ui' | 'motion' | 'backend' | 'tooling'

export interface SkillGroup {
  id: SkillGroupId
  label: string
  signal: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    label: 'Core',
    signal: 'Product-grade frontend architecture',
    skills: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: 'ui',
    label: 'UI',
    signal: 'Reusable UI systems and polished interfaces',
    skills: ['Tailwind', 'shadcn/ui', 'Design systems'],
  },
  {
    id: 'motion',
    label: 'Motion',
    signal: 'Measured interaction and scroll choreography',
    skills: ['Motion', 'GSAP', 'Canvas'],
  },
  {
    id: 'backend',
    label: 'Backend-ish',
    signal: 'Integration work that keeps products moving',
    skills: ['Supabase', 'API integration', 'SSE'],
  },
  {
    id: 'tooling',
    label: 'Tooling',
    signal: 'Delivery, observability, and production workflows',
    skills: ['Vercel', 'Git', 'CI/CD'],
  },
]
