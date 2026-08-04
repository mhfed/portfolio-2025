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
    signal: 'Frontend architecture',
    skills: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: 'ui',
    label: 'UI',
    signal: 'UI systems',
    skills: ['Tailwind', 'shadcn/ui', 'Design systems'],
  },
  {
    id: 'motion',
    label: 'Motion',
    signal: 'Motion with intent',
    skills: ['Motion', 'GSAP', 'Canvas'],
  },
  {
    id: 'backend',
    label: 'Backend-ish',
    signal: 'APIs and real-time',
    skills: ['Supabase', 'API integration', 'SSE'],
  },
  {
    id: 'tooling',
    label: 'Tooling',
    signal: 'Ship and monitor',
    skills: ['Vercel', 'Git', 'CI/CD'],
  },
]
