import Image from 'next/image'
import {
  ArrowRight,
  Check,
  Code2,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Heart,
  Linkedin,
  MapPin,
  Star,
  Zap,
} from 'lucide-react'
import { ScrollToTop } from '@/components/molecules/scroll-to-top'
import { StoryCheckpoint } from '@/components/molecules/story-checkpoint'
import { ScrollStoryRuntime } from '@/components/organisms/scroll-story-runtime'
import type { PortfolioContent } from '@/types/portfolio-content'
import type { StoryBeatId } from '@/types/storytelling'

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
    navigation,
    skills,
    story,
    work,
  } = content
  const resume = contact.links.find((link) => link.download)
  const storyBeat = (id: StoryBeatId) =>
    story.beats.find((beat) => beat.id === id) ?? story.beats[0]
  const storyChapters = story.beats.filter((beat) => beat.id !== 'top')
  const alternateLocale = content.locale === 'vi' ? 'en' : 'vi'

  return (
    <div className='duo-portfolio'>
      <a className='duo-skip' href='#main-content'>
        {navigation.skipToContentLabel}
      </a>

      <header className='duo-header'>
        <a className='duo-brand' href='#top' aria-label={content.fullName}>
          <span className='duo-brand__mark' aria-hidden='true'>
            <Image
              src='/images/story/mascot-top.png'
              alt=''
              width={52}
              height={49}
              className='duo-brand__mascot'
            />
          </span>
          <span>
            HIEU<span className='duo-brand__dot'>.</span>
          </span>
        </a>

        <nav className='duo-nav' aria-label={navigation.primaryNavigationLabel}>
          {navigation.items
            .filter((item) => item.id !== 'contact')
            .map((item) => (
              <a key={item.id} href={item.href}>
                {item.label}
              </a>
            ))}
        </nav>

        <div className='duo-header__actions'>
          <a
            className='duo-language'
            href={`/${alternateLocale}`}
            aria-label={navigation.language.changeLabel}
          >
            <Globe2 size={16} /> {alternateLocale.toUpperCase()}
          </a>
          {resume && (
            <a
              className='duo-button duo-button--nav'
              href={resume.href}
              download
            >
              <Download size={15} /> {resume.label}
            </a>
          )}
        </div>
      </header>

      <ScrollToTop />
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
              <h1>{hero.headline.replace(/\*/g, '')}</h1>
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
            <div className='duo-section-heading duo-about__heading'>
              <h2>{about.title}</h2>
            </div>
            <StoryCheckpoint beat={storyBeat('about')} />
            <div className='duo-about'>
              <div className='duo-about__content'>
                <h3>{about.statement}</h3>
                <p>{about.description}</p>
                <a className='duo-text-link' href='#experience'>
                  {ui.journey} <ArrowRight size={16} />
                </a>
              </div>
              <div className='duo-stats'>
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
            <div className='duo-section-heading'>
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
            <div className='duo-experience-heading'>
              <h2>{experience.title.replace(/\n/g, ' ')}</h2>
              <p>{experience.headline}</p>
            </div>
            <StoryCheckpoint beat={storyBeat('experience')} />
            <div className='duo-timeline'>
              {experience.records.map((record) => (
                <article className='duo-timeline__item' key={record.id}>
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
            <div className='duo-skills__heading'>
              <h2>{skills.headline}</h2>
            </div>
            <StoryCheckpoint beat={storyBeat('skills')} />
            <div className='duo-skill-grid'>
              {skills.groups.map((group, index) => (
                <div
                  className={`duo-skill-group duo-skill-group--${index + 1}`}
                  key={group.label}
                >
                  <h3>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <Check size={15} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
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
            <div>
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
