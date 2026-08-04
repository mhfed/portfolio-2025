import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import StackIcon, { type IconName } from 'tech-stack-icons'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface CapabilitiesSectionProps {
  skills: PortfolioContent['skills']
}

const toolIcons: Record<string, IconName> = {
  React: 'react',
  'Next.js': 'nextjs2',
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
  const tools = skills.groups.flatMap((group) => group.items)

  return (
    <section id='skills' className='capabilities-section section-anchor'>
      <div className='portfolio-shell'>
        <EditorialReveal>
          <h2>{skills.headline}</h2>
        </EditorialReveal>

        <EditorialReveal className='capability-marquee' delay={0.08}>
          <div className='capability-marquee__viewport'>
            <div className='capability-marquee__track'>
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className='capability-marquee__list'
                  aria-hidden={copy === 1}
                >
                  {tools.map((item) => (
                    <li
                      key={`${copy}-${item}`}
                      className='capability-tool'
                      tabIndex={copy === 0 ? 0 : -1}
                      aria-label={item}
                    >
                      <span
                        className={`capability-tool__icon${item === 'Vercel' ? ' capability-tool__icon--tinted' : ''}`}
                        aria-hidden='true'
                      >
                        <StackIcon
                          name={toolIcons[item] ?? fallbackIcon}
                          variant='light'
                        />
                      </span>
                      <span className='capability-tool__name' role='tooltip'>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </EditorialReveal>
      </div>
    </section>
  )
}
