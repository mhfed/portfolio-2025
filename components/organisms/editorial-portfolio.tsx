import Image from 'next/image'
import {
  ArrowRight,
  Code2,
  ExternalLink,
  Github,
  Heart,
  Linkedin,
  MapPin,
  Star,
  Zap,
} from 'lucide-react'
import StackIcon, { type IconName } from 'tech-stack-icons'
import { ScrollFillHeading } from '@/components/molecules/scroll-fill-heading'
import { ScrollToTop } from '@/components/molecules/scroll-to-top'
import { StoryCheckpoint } from '@/components/molecules/story-checkpoint'
import { BrilioMotionRuntime } from '@/components/organisms/brilio-motion-runtime'
import { DuoHeader } from '@/components/organisms/duo-header'
import { ScrollStoryRuntime } from '@/components/organisms/scroll-story-runtime'
import type { PortfolioContent } from '@/types/portfolio-content'
import type { StoryBeatId } from '@/types/storytelling'

const technologyIcons: Record<string, IconName> = {
  React: 'react',
  'Next.js': 'nextjs2',
  TypeScript: 'typescript',
  Tailwind: 'tailwindcss',
  'Design systems': 'figma',
  'Hệ thống UI': 'figma',
  '設計系統': 'figma',
  GSAP: 'gsap',
  ScrollTrigger: 'gsap',
  Motion: 'framer',
  Canvas: 'threejs',
  'Micro-interactions': 'framer',
  'Tương tác nhỏ': 'framer',
  '微交互': 'framer',
  'REST APIs': 'postman',
  'REST API': 'postman',
  SSE: 'postman',
  Supabase: 'supabase',
  'Auth flows': 'auth0',
  'Xác thực': 'auth0',
  '身分驗證': 'auth0',
  'Formik/Yup': 'react',
  Vercel: 'vercel',
  'GitLab CI/CD': 'gitlab',
  PM2: 'npm2',
  Vite: 'vitejs',
  Performance: 'vercel',
  'Tối ưu hiệu năng': 'vercel',
  '效能優化': 'vercel',
}

const fallbackTechnologyIcon: IconName = 'html5'

export interface EditorialPortfolioProps {
  content: PortfolioContent
}

export function EditorialPortfolio({ content }: EditorialPortfolioProps) {
  const {
    about,
    contact,
    editorialUi: ui,
    experience,
    hero,
    skills,
    story,
    work,
  } = content
  const storyBeat = (id: StoryBeatId) =>
    story.beats.find((beat) => beat.id === id) ?? story.beats[0]
  const storyChapters = story.beats.filter((beat) => beat.id !== 'top')
  const heroHeadlineParts = hero.headline.split('*')

  return (
    <div className='duo-portfolio'>
      <DuoHeader content={content} />

      <ScrollToTop />
      <BrilioMotionRuntime />
      <ScrollStoryRuntime story={story} />

      <nav
        className='duo-story-progress'
        aria-label={story.progressLabel}
        data-story-progress
      >
        {storyChapters.map((chapter, index) => (
          <a
            href={`#${chapter.id}`}
            key={chapter.id}
            data-story-progress-link={chapter.id}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{chapter.label}</strong>
          </a>
        ))}
      </nav>

      <main id='main-content' tabIndex={-1}>
        <section
          id='top'
          className='duo-hero duo-section'
          data-story-beat='top'
        >
          <div className='duo-shell duo-hero__grid'>
            <div className='duo-hero__copy'>
              <p className='duo-hero__hello'>
                {ui.hello} <strong>Hiếu</strong>
              </p>
              <h1>
                {heroHeadlineParts.map((part, index) =>
                  index % 2 === 1 ? (
                    <span key={`${part}-${index}`}>{part}</span>
                  ) : (
                    part
                  )
                )}
              </h1>
              <p className='duo-hero__description'>{hero.description}</p>
              <div className='duo-actions'>
                <a className='duo-button duo-button--green' href='#work'>
                  {hero.actions.viewWork.label} <ArrowRight size={18} />
                </a>
                <a className='duo-text-link' href='#contact'>
                  {hero.actions.contact.label} <ArrowRight size={16} />
                </a>
              </div>
              <div className='duo-hero__meta'>
                <MapPin size={16} /> {hero.location.value}
                <span />
                <Zap size={16} /> {hero.role}
              </div>
              <StoryCheckpoint beat={storyBeat('top')} />
            </div>

            <div className='duo-hero__art' aria-hidden='true'>
              <div className='duo-eyebrow duo-hero__availability'>
                <span className='duo-eyebrow__dot' /> {hero.status}
              </div>
              <div className='duo-sun' />
              <div className='duo-cloud duo-cloud--one' />
              <div className='duo-cloud duo-cloud--two' />
              <div className='duo-hero__sticker'>
                <Star size={15} fill='currentColor' /> {ui.years}
                <br />
                {ui.shipping}
              </div>
              <div className='duo-hero__ground' />
              <div className='duo-hero__avatar'>
                <Image
                  src='/images/hero-mascot-programmer.png'
                  alt=''
                  width={900}
                  height={850}
                  priority
                  className='duo-hero__mascot'
                />
              </div>
              <div className='duo-hero__badge'>
                <Code2 size={17} /> <strong>{ui.builder}</strong>
              </div>
            </div>
          </div>
        </section>

        <section
          id='about'
          className='duo-section duo-section--cream'
          data-story-beat='about'
        >
          <div className='duo-shell'>
            <div
              className='duo-section-heading duo-about__heading'
              data-brilio-reveal
            >
              <h2>{about.title}</h2>
            </div>
            <StoryCheckpoint beat={storyBeat('about')} />
            <div className='duo-about'>
              <div className='duo-about__content'>
                <ScrollFillHeading text={about.statement} />
                <p>{about.description}</p>
                <a className='duo-text-link' href='#experience'>
                  {ui.journey} <ArrowRight size={16} />
                </a>
              </div>
              <div className='duo-stats' data-brilio-reveal>
                {about.metrics.map((metric) => (
                  <div className='duo-stat' key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
                <div className='duo-stat'>
                  <strong>∞</strong>
                  <span>{ui.curious}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id='work'
          className='duo-section duo-work'
          data-story-beat='work'
        >
          <div className='duo-shell'>
            <div className='duo-section-heading' data-brilio-reveal>
              <h2>{work.headline}</h2>
              <span className='duo-section-count'>
                {work.projects.length} {ui.caseStudies}
              </span>
            </div>
            <StoryCheckpoint beat={storyBeat('work')} />
            <div className='duo-projects'>
              {work.projects.map((project, index) => (
                <article
                  className={`duo-project duo-project--${index % 2 ? 'yellow' : 'green'}`}
                  key={project.id}
                  data-brilio-reveal
                >
                  <div className='duo-project__image'>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes='(max-width: 800px) 100vw, 46vw'
                    />
                  </div>
                  <div className='duo-project__body'>
                    <div className='duo-project__top'>
                      <span>
                        {project.year} / {project.role}
                      </span>
                      <ExternalLink size={18} />
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className='duo-tags'>
                      {project.techStack.slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {project.liveUrl && (
                      <a
                        className='duo-project__link'
                        href={project.liveUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {work.viewLabel} <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id='experience'
          className='duo-section duo-section--blue'
          data-story-beat='experience'
        >
          <div className='duo-shell'>
            <div className='duo-experience-heading' data-brilio-reveal>
              <h2>{experience.title.replace(/\n/g, ' ')}</h2>
              <p>{experience.headline}</p>
            </div>
            <StoryCheckpoint beat={storyBeat('experience')} />
            <div className='duo-timeline'>
              {experience.records.map((record) => (
                <article
                  className='duo-timeline__item'
                  key={record.id}
                  data-brilio-reveal
                >
                  <div className='duo-timeline__rail' aria-hidden='true'>
                    <i />
                  </div>
                  <div className='duo-timeline__card'>
                    <div className='duo-timeline__period'>
                      {record.period} / {record.location}
                    </div>
                    <h3>{record.company}</h3>
                    <strong>{record.position}</strong>
                    <p>{record.description}</p>
                    <div className='duo-tags'>
                      {record.skills.slice(0, 5).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id='skills'
          className='duo-section duo-skills'
          data-story-beat='skills'
        >
          <div className='duo-shell'>
            <div className='duo-skills__heading' data-brilio-reveal>
              <h2>{skills.headline}</h2>
            </div>
            <StoryCheckpoint beat={storyBeat('skills')} />
            <div className='duo-tech-grid' aria-label={skills.title}>
              {skills.groups.map((group, groupIndex) => (
                <article
                  className={`duo-tech-group duo-tech-group--${groupIndex + 1}`}
                  key={group.label}
                  data-brilio-reveal
                >
                  <div className='duo-tech-group__heading'>
                    <span className='duo-tech-group__index'>
                      {String(groupIndex + 1).padStart(2, '0')}
                    </span>
                    <h3>{group.label}</h3>
                  </div>
                  <ul className='duo-tech-list'>
                    {group.items.map((item) => (
                      <li className='duo-tech-card' key={item}>
                        <span className='duo-tech-card__icon' aria-hidden='true'>
                          <StackIcon
                            name={technologyIcons[item] ?? fallbackTechnologyIcon}
                            variant='light'
                          />
                        </span>
                        <span className='duo-tech-card__name'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id='contact'
          className='duo-contact duo-section'
          data-story-beat='contact'
        >
          <div className='duo-shell duo-contact__inner'>
            <StoryCheckpoint beat={storyBeat('contact')} />
            <Image
              src='/images/mascot-contact.png'
              alt=''
              width={900}
              height={900}
              className='duo-contact__mascot'
            />
            <div data-brilio-reveal>
              <h2>{contact.headline}</h2>
              <p>{contact.description}</p>
              <a
                className='duo-button duo-button--yellow'
                href={contact.email.href}
              >
                {contact.email.label} <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <footer className='duo-shell duo-footer'>
            <span>© 2026 {content.fullName}</span>
            <div>
              {contact.links
                .filter((link) => !link.download)
                .map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {link.label}
                    {link.label === 'GitHub' ? (
                      <Github size={15} />
                    ) : (
                      <Linkedin size={15} />
                    )}
                  </a>
                ))}
            </div>
            <span className='duo-footer__heart'>
              <Heart size={14} fill='currentColor' /> {ui.madeWithCare}
            </span>
          </footer>
        </section>
      </main>
    </div>
  )
}
