import Image from 'next/image'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface KageProjectsProps {
  content: Pick<PortfolioContent, 'work'>
}

const PROJECT_KANJI = ['参道', '灯籠', '月影', '借景', '静寂', '透見']

export function KageProjects({ content }: KageProjectsProps) {
  const { work } = content

  return (
    <section id='work' className='kage-sec'>
      {/* Chapter header */}
      <div className='sec-head'>
        <span className='k'>
          <b>02</b> — Still Gardens
        </span>
        <span className='rule' />
        <span className='k jp'>庭園</span>
      </div>

      <div className='mb-12 max-w-xl'>
        <h2 className='kage-display text-[clamp(28px,3.8vw,52px)] text-[var(--bone)] mb-3'>
          {work.headline}
        </h2>
        <p className='kage-body text-[#9aa5a0]'>
          Selected production storefronts, fintech engines, and Web3
          applications built with meticulous attention to performance, motion,
          and architectural restraint.
        </p>
      </div>

      {/* Asymmetric Staggered Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start'>
        {work.projects.map((project, index) => {
          const kanji = PROJECT_KANJI[index % PROJECT_KANJI.length]
          const isFlame = index % 2 === 1
          const staggerClass =
            index === 1
              ? 'lg:translate-y-8'
              : index === 2
                ? 'lg:translate-y-16'
                : ''

          return (
            <article
              key={project.id}
              className={`relative group cursor-pointer transition-transform duration-700 ${staggerClass}`}
              data-cursor
            >
              {/* Card Frame */}
              <div className='card-fr relative aspect-[4/5] rounded-sm overflow-hidden outline outline-1 outline-[var(--line-soft)] -outline-offset-1 group-hover:outline-[rgba(223,231,224,0.35)] transition-all duration-500 bg-[#0a0e12]'>
                {/* Project Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className='object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />

                {/* Dark gradient overlay */}
                <div
                  className='absolute inset-0 pointer-events-none'
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(3,6,9,0.08) 20%, rgba(3,6,9,0.78) 90%, rgba(3,6,9,0.95) 100%)',
                  }}
                />

                {/* Animated Glowing Ember/Flame */}
                <i
                  className={`glow ${isFlame ? 'glow--flame' : ''}`}
                  style={{
                    left: `${65 + (index % 3) * 8}%`,
                    top: `${25 + (index % 2) * 18}%`,
                  }}
                  aria-hidden='true'
                />

                {/* Corner Arrow */}
                <div className='absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#05070a]/70 backdrop-blur-md border border-[var(--line)] flex items-center justify-center opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-400'>
                  <ArrowUpRight size={14} className='text-[var(--bone)]' />
                </div>

                {/* Bottom Label inside frame */}
                <div className='absolute left-5 right-5 bottom-4 z-10 flex items-end justify-between gap-3'>
                  <div>
                    <b className='block text-[clamp(15px,1.2vw,19px)] font-normal tracking-[0.02em] uppercase text-[var(--bone)]'>
                      {project.title}
                    </b>
                    <p className='text-[11px] text-[var(--bone-dim)] line-clamp-1 mt-0.5'>
                      {project.role}
                    </p>
                  </div>
                  <span className='jp text-[13px] tracking-[0.3em] text-[var(--vermilion)] font-normal'>
                    {kanji}
                  </span>
                </div>
              </div>

              {/* Card Meta below frame */}
              <div className='flex justify-between items-center mt-3 text-[10px] tracking-[0.16em] uppercase text-[var(--muted)]'>
                <div className='flex items-center gap-2'>
                  <span>{project.year}</span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='inline-flex items-center gap-1 text-[var(--bone-dim)] hover:text-[var(--bone)] transition-colors'
                    >
                      <ExternalLink size={10} />
                      <span>{work.launchLabel}</span>
                    </a>
                  )}
                </div>
                <span>{`0${index + 1} / 0${work.projects.length}`}</span>
              </div>

              {/* Tech Stack Pills */}
              <div className='flex flex-wrap gap-1.5 mt-2.5'>
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className='px-2 py-0.5 text-[9px] tracking-[0.12em] uppercase border border-[var(--line-soft)] rounded-full text-[var(--bone-dim)] bg-[#05070a]/60'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
