'use client'

import Image from 'next/image'
import {
  Boxes,
  Cpu,
  ExternalLink,
  FolderOpen,
  Globe,
  Radar,
} from 'lucide-react'
import type { Project } from '@/data/projects'
import { Badge } from './ui/badge'

interface ProjectRepositoryCardProps extends Project {
  featured?: boolean
  index: number
}

const projectIcons = [FolderOpen, Boxes, Cpu, Radar, Globe]

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
  index,
}: ProjectRepositoryCardProps) {
  const Icon = projectIcons[index % projectIcons.length]

  if (featured) {
    return (
      <article className='group relative overflow-hidden rounded-[1.6rem] border border-primary/15 bg-card/85 md:col-span-2 xl:row-span-2'>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0'
            sizes='(min-width: 1280px) 48vw, (min-width: 768px) 66vw, 100vw'
          />
        )}

        <div className='absolute inset-0 bg-gradient-to-br from-background/55 via-background/45 to-background/90' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_18%,transparent)_0%,transparent_32%)]' />

        <div className='relative flex h-full min-h-[420px] flex-col justify-between p-6 md:p-8'>
          <div className='flex items-start justify-between gap-4'>
            <div className='rounded-full border border-primary/20 bg-background/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-primary backdrop-blur-md'>
              {year || 'active module'}
            </div>

            <div className='flex items-center gap-2'>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-background/60 text-foreground/75 backdrop-blur transition-colors hover:border-primary/40 hover:text-primary'
                  aria-label={`Open ${title}`}
                >
                  <ExternalLink className='h-4 w-4' />
                </a>
              )}
            </div>
          </div>

          <div className='max-w-2xl'>
            <div className='mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80'>
              featured repository
            </div>
            <h3 className='text-3xl font-semibold uppercase tracking-[-0.06em] text-foreground md:text-4xl'>
              {title}
            </h3>
            <p className='mt-3 max-w-xl text-sm leading-relaxed text-foreground/78 md:text-base'>
              {description}
            </p>
            {details && (
              <p className='mt-3 line-clamp-4 max-w-2xl text-sm leading-relaxed text-foreground/62'>
                {details}
              </p>
            )}

            {techStack.length > 0 && (
              <div className='mt-5 flex flex-wrap gap-2'>
                {techStack.slice(0, 6).map((tech) => (
                  <Badge
                    key={tech}
                    variant='outline'
                    className='border-primary/20 bg-background/55 text-foreground/80 hover:bg-background/55'
                    size='sm'
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className='terminal-panel flex h-full flex-col p-5 md:p-6'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary'>
          <Icon className='h-5 w-5' />
        </div>
        {year && (
          <Badge
            variant='outline'
            className='rounded-full border-primary/15 bg-background/55 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/72 hover:bg-background/55'
            size='sm'
          >
            {year}
          </Badge>
        )}
      </div>

      <div className='mt-6'>
        <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/75'>
          module_{String(index + 1).padStart(2, '0')}
        </div>
        <h3 className='mt-3 text-2xl font-semibold uppercase tracking-[-0.05em] text-foreground'>
          {title}
        </h3>
        <p className='mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/72'>
          {description}
        </p>
      </div>

      <div className='mt-auto pt-5'>
        {techStack.length > 0 && (
          <div className='mb-4 flex flex-wrap gap-2'>
            {techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant='primary' size='sm'>
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {(liveUrl || githubUrl) && (
          <div className='flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.24em]'>
            {liveUrl && (
              <a
                href={liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary transition-colors hover:text-primary/80'
              >
                open live
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-foreground/62 transition-colors hover:text-primary'
              >
                source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
