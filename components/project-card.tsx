'use client'

import { ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'
import Image from 'next/image'

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
}: ProjectCardProps) {
  return (
    <div className='border-2 border-foreground bg-card shadow-neo-dark dark:shadow-neo group'>
      {/* Project Image */}
      {image && (
        <div className='h-64 bg-muted border-b-2 border-foreground relative overflow-hidden'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover transition-transform group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
            {liveUrl && (
              <a
                href={liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-foreground text-background px-4 py-2 mono-text font-bold'
              >
                VIEW_CASE_STUDY
              </a>
            )}
          </div>
        </div>
      )}
      <div className='p-6'>
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h3 className='text-xl font-bold uppercase'>{title}</h3>
            {year && <p className='text-sm mono-text text-primary'>{year}</p>}
          </div>
          {liveUrl && (
            <a href={liveUrl} target='_blank' rel='noopener noreferrer'>
              <ExternalLink className='w-5 h-5 text-muted-foreground hover:text-primary transition-colors' />
            </a>
          )}
        </div>
        <p className='text-muted-foreground mb-6 text-sm'>
          {description}
        </p>
        {techStack && techStack.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {techStack.map((tech) => (
              <span
                key={tech}
                className='bg-muted px-2 py-1 text-[10px] mono-text font-bold'
              >
                {tech.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
