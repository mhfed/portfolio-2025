import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
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

      <div className='grid grid-cols-1 lg:grid-cols-[1.1fr_0.8fr] gap-6 lg:gap-16 items-end mb-14 lg:mb-20 pb-6 border-b border-[var(--line-soft)]'>
        <div>
          <h2 className='kage-display text-[clamp(28px,3.8vw,52px)] text-[var(--bone)]'>
            {work.headline}
          </h2>
        </div>
        <div className='flex items-center justify-between lg:justify-end gap-6 text-[11px] tracking-[0.2em] uppercase text-[var(--muted)] font-mono'>
          <span>Selected Works</span>
          <span>(2020 — 2026)</span>
        </div>
      </div>

      {/* Spacious 2-Column Editorial Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-x-20 lg:gap-y-28 items-start'>
        {work.projects.map((project, index) => {
          const kanji = PROJECT_KANJI[index % PROJECT_KANJI.length]
          const isFlame = index % 2 === 1
          const num = String(index + 1).padStart(2, '0')

          return (
            <article
              key={project.id}
              className='kage-glass-card group relative flex flex-col rounded-xl p-5 sm:p-6 lg:p-7 overflow-hidden'
              data-cursor
            >
              {/* Optical Glass Diagonal Sheen Highlight */}
              <div
                className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.07] via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500'
                aria-hidden='true'
              />

              {/* Meta Header bar above visual frame */}
              <div className='relative z-10 flex items-center justify-between mb-4 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--muted)]'>
                <div className='flex items-center gap-3'>
                  <span className='text-[var(--vermilion)] font-medium'>{num}</span>
                  <span className='text-[var(--line-soft)]'>/</span>
                  <span className='jp text-[12px] tracking-[0.2em] text-[var(--bone-dim)] font-normal'>
                    {kanji}
                  </span>
                </div>
                <span>{project.year}</span>
              </div>

              {/* Cinematic Translucent Visual Frame */}
              <div className='card-fr relative aspect-[16/10] rounded-lg overflow-hidden border border-[rgba(223,231,224,0.1)] group-hover:border-[rgba(223,231,224,0.25)] transition-all duration-500 bg-black/20'>
                {/* Project Image with subtle transparency so 3D background subtly shines through */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className='object-cover opacity-70 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
                />

                {/* Ambient subtle vignette overlay */}
                <div
                  className='absolute inset-0 pointer-events-none'
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(3,6,9,0.02) 0%, rgba(3,6,9,0.12) 60%, rgba(3,6,9,0.55) 100%)',
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

                {/* Corner Action Arrow */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={`${work.launchLabel} - ${project.title}`}
                    className='absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-[#05070a]/65 backdrop-blur-md border border-[rgba(223,231,224,0.18)] flex items-center justify-center text-[var(--bone-dim)] opacity-80 group-hover:opacity-100 group-hover:text-[var(--bone)] group-hover:border-[var(--vermilion)] transition-all duration-300 shadow-md'
                  >
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>

              {/* Content & Typography below frame */}
              <div className='relative z-10 mt-5 flex flex-col gap-2'>
                {/* Title & Live Action Link */}
                <div className='flex items-baseline justify-between gap-4'>
                  <h3 className='kage-display text-[clamp(20px,1.6vw,26px)] tracking-[0.02em] text-[var(--bone)] group-hover:text-[var(--vermilion)] transition-colors duration-300'>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='hover:underline decoration-[var(--vermilion)] decoration-1 underline-offset-4'
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.14em] uppercase text-[var(--bone-dim)] hover:text-[var(--bone)] transition-colors flex-shrink-0'
                    >
                      <span>{work.launchLabel}</span>
                      <ArrowUpRight size={12} className='text-[var(--vermilion)]' />
                    </a>
                  )}
                </div>

                {/* Role / Highlight line */}
                <p className='text-[13px] text-[#b4bfb7] font-light leading-relaxed'>
                  <span className='text-[var(--bone)] font-normal'>{project.role}</span>
                  {project.result && (
                    <>
                      <span className='mx-2 text-[var(--muted)]'>—</span>
                      <span className='text-[var(--bone-dim)]'>{project.result}</span>
                    </>
                  )}
                </p>

                {/* Tech Stack - Clean Monospace Dot-Separated */}
                <p className='text-[11px] font-mono text-[var(--muted)] tracking-[0.06em] mt-1'>
                  {project.techStack.join('  ·  ')}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

