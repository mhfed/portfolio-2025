'use client';

import { ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import Image from 'next/image';
import type { Project } from '@/data/projects';

interface ProjectCardProps extends Project {
  isAlternate: boolean;
  index?: number;
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
  const isRight = isAlternate;

  return (
    <div className='pb-8 last:pb-0'>
      <div
        className={`flex flex-col md:flex-row gap-6 items-start ${
          isRight ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Project Image - Smaller, on left/right alternating */}
        {image && (
          <div className='relative w-full md:w-1/3 flex-shrink-0 h-40 md:h-48 overflow-hidden border-8 border-border bg-muted/50'>
            <Image
              src={image}
              alt={title}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 33vw'
            />
          </div>
        )}

        {/* Content */}
        <div className='flex-1 space-y-2'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <h3 className='text-h4 text-foreground font-semibold mb-1'>
                {title}
              </h3>
              {year && (
                <Badge variant='primary' size='sm'>
                  {year}
                </Badge>
              )}
            </div>
          </div>
          <p className='text-body text-foreground/80 leading-relaxed'>
            {description}
          </p>
          {techStack && techStack.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-3'>
              {techStack.map((tech) => (
                <Badge key={tech} variant='outline' size='sm'>
                  {tech}
                </Badge>
              ))}
            </div>
          )}
          {(liveUrl || githubUrl) && (
            <div className='flex items-center gap-4 mt-4'>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-body-sm text-primary hover:underline flex items-center gap-1'
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
                  className='text-body-sm text-foreground/70 hover:text-foreground hover:underline flex items-center gap-1'
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
  );
}
