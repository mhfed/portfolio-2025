'use client'

import { ExternalLink } from 'lucide-react'
import { Badge } from './ui/badge'
import type { Project } from '@/data/projects'
import { Safari } from '@/components/magicui/safari'

interface ProjectCardProps extends Project {
  isAlternate: boolean
  index?: number
}

export function ProjectCard({
  image,
  title,
  year,
  description,
  techStack,
  liveUrl,
  githubUrl,
  isAlternate,
}: ProjectCardProps) {
  const isRight = isAlternate

  // Helper to extract domain for the address bar
  const getDomain = (url?: string) => {
    if (!url) return ''
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  return (
    <div className='pb-6 md:pb-8 last:pb-0'>
      <div
        className={`flex flex-col items-start gap-4 md:flex-row md:gap-6 ${
          isRight ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Project Image - Safari Browser Mockup */}
        {image && (
          <div className='shadow-theme-glow w-full rounded-2xl md:w-5/12 transform transition-transform duration-300 hover:scale-[1.01]'>
            <Safari
              src={image}
              url={getDomain(liveUrl) || 'project-demo.com'}
              className='w-full shadow-lg'
            />
          </div>
        )}

        {/* Content */}
        <div className='flex-1 space-y-2'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <h3 className='text-lg md:text-xl lg:text-2xl text-foreground font-semibold mb-1'>
                {title}
              </h3>
              {year && (
                <Badge variant='primary' size='sm'>
                  {year}
                </Badge>
              )}
            </div>
          </div>
          <p className='text-sm md:text-base lg:text-base text-foreground/80 leading-relaxed'>
            {description}
          </p>
          {techStack && techStack.length > 0 && (
            <div className='mt-2 flex flex-wrap gap-2'>
              {techStack.map((tech) => (
                <Badge key={tech} variant='outline' size='sm'>
                  {tech}
                </Badge>
              ))}
            </div>
          )}
          {(liveUrl || githubUrl) && (
            <div className='mt-2 flex items-center gap-4'>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs md:text-sm lg:text-sm text-[var(--theme-secondary)] hover:underline flex items-center gap-1'
                >
                  View Project
                  <ExternalLink className='w-3 h-3' />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs md:text-sm lg:text-sm text-foreground/70 hover:text-foreground hover:underline flex items-center gap-1'
                >
                  GitHub
                  <ExternalLink className='w-3 h-3' />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
