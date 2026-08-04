import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import StackIcon, { type IconName } from 'tech-stack-icons'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface CapabilitiesSectionProps {
  skills: PortfolioContent['skills']
}

const toolIcons: Record<string, IconName> = {
  React: 'react',
  'Next.js': 'nextjs',
  TypeScript: 'typescript',
  Tailwind: 'tailwindcss',
  'Design systems': 'figma',
  GSAP: 'gsap',
  ScrollTrigger: 'gsap',
  Motion: 'framer',
  Canvas: 'threejs',
  'Micro-interactions': 'framer',
  'REST APIs': 'postman',
  SSE: 'postman',
  Supabase: 'supabase',
  'Auth flows': 'auth0',
  'Formik/Yup': 'react',
  Vercel: 'vercel',
  'GitLab CI/CD': 'gitlab',
  PM2: 'npm2',
  Vite: 'vitejs',
  Performance: 'vercel',
}

const fallbackIcon: IconName = 'html5'

export function CapabilitiesSection({ skills }: CapabilitiesSectionProps) {
  return (
    <section id='skills' className='capabilities-section section-anchor'>
      <div className='portfolio-shell'>
        <EditorialReveal>
          <h2>{skills.headline}</h2>
        </EditorialReveal>

        <div className='capability-groups'>
          {skills.groups.map((group, index) => (
            <EditorialReveal
              key={group.label}
              className='capability-group'
              delay={index * 0.04}
            >
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span className='capability-icon' aria-hidden='true'>
                      <StackIcon
                        name={toolIcons[item] ?? fallbackIcon}
                        variant='light'
                      />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
