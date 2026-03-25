import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

interface ProjectRepositoryCardProps extends Project {
  featured?: boolean
}

export function ProjectRepositoryCard({
  image,
  title,
  year,
  description,
  details,
  techStack,
  liveUrl,
  githubUrl,
  featured = false,
}: ProjectRepositoryCardProps) {
  if (featured) {
    return (
      <article className='group border-t border-white/10 py-8 md:py-10 lg:py-12'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.8fr)] lg:items-start lg:gap-12'>
          <div className='max-w-2xl'>
            {year && (
              <span className='font-mono text-[11px] uppercase tracking-[0.24em] text-primary/72'>
                {year}
              </span>
            )}

            <h3 className='mt-4 font-display text-4xl font-semibold leading-[0.92] tracking-[-0.08em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-5xl lg:text-[4.25rem]'>
              {title}
            </h3>

            <p className='mt-5 text-base leading-relaxed text-foreground/74 md:text-lg'>
              {description}
            </p>

            {details && (
              <p className='mt-4 max-w-xl text-sm leading-relaxed text-foreground/58 md:text-base'>
                {details}
              </p>
            )}

            {techStack.length > 0 && (
              <p className='mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50'>
                {techStack.slice(0, 6).join(' / ')}
              </p>
            )}

            {(liveUrl || githubUrl) && (
              <div className='mt-7 flex flex-wrap gap-5 text-sm font-medium'>
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80'
                  >
                    View project
                    <ExternalLink className='h-4 w-4' />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 text-foreground/68 transition-colors hover:text-foreground'
                  >
                    Source
                    <ExternalLink className='h-4 w-4' />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className='space-y-4'>
            <div className='relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white/[0.04]'>
              <Image
                src={image}
                alt={title}
                fill
                className='object-cover transition duration-900 group-hover:scale-[1.04]'
                sizes='(min-width: 1024px) 42vw, 100vw'
              />
            </div>

            <div className='flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/42'>
              <span>Featured build</span>
              <span>
                {techStack.length > 0
                  ? `${techStack.length} tools`
                  : 'In production'}
              </span>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className='group border-t border-white/10 py-6 md:py-7 lg:py-8'>
      <div className='grid gap-6 lg:grid-cols-[110px_minmax(0,1fr)_280px] lg:items-start lg:gap-8'>
        <span className='font-mono text-[11px] uppercase tracking-[0.24em] text-primary/72'>
          {year || 'Selected'}
        </span>

        <div className='min-w-0'>
          <h3 className='font-display text-2xl font-semibold leading-tight tracking-[-0.06em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-[2rem]'>
            {title}
          </h3>

          <p className='mt-3 max-w-2xl text-sm leading-relaxed text-foreground/74 md:text-base'>
            {description}
          </p>

          {details && (
            <p className='mt-3 max-w-2xl text-sm leading-relaxed text-foreground/58'>
              {details}
            </p>
          )}

          {techStack.length > 0 && (
            <p className='mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50'>
              {techStack.slice(0, 5).join(' / ')}
            </p>
          )}
        </div>

        <div className='grid gap-4'>
          <div className='relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white/[0.04]'>
            <Image
              src={image}
              alt={title}
              fill
              className='object-cover transition duration-900 group-hover:scale-[1.05]'
              sizes='(min-width: 1280px) 22vw, (min-width: 1024px) 280px, 100vw'
            />
          </div>

          {(liveUrl || githubUrl) && (
            <div className='flex flex-wrap gap-4 text-sm font-medium lg:justify-end'>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80'
                >
                  View
                  <ExternalLink className='h-4 w-4' />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-foreground/68 transition-colors hover:text-foreground'
                >
                  Source
                  <ExternalLink className='h-4 w-4' />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
