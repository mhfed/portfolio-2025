'use client'

import { Button } from './ui/button'
import { Collapsible } from './ui/collapsible'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TimelineItemProps {
  company: string
  position: string
  period: string
  description: string
  skills: string[]
  isFirst?: boolean
  isLast?: boolean
}

export function TimelineItem({
  company,
  position,
  period,
  description,
  skills,
  isFirst,
  isLast,
}: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  let seeMoreText = 'See more'
  let showLessText = 'Show less'

  try {
    const t = useTranslations('common')
    seeMoreText = t('seeMore')
    showLessText = t('showLess')
  } catch {
    // Fall back to the default labels if the provider is unavailable.
  }

  return (
    <article className='group relative border-t border-white/10 py-6 md:py-8 lg:py-10 first:border-t-0'>
      {/* Vertical Timeline Line */}
      <div
        className={cn(
          'absolute left-[16px] md:left-[164px] w-px bg-linear-to-b from-white/10 via-white/20 to-white/10',
          isFirst ? 'top-10 bottom-0' : isLast ? 'top-0 bottom-[calc(100%-40px)]' : 'top-0 bottom-0'
        )}
      />

      {/* Timeline Dot */}
      <div
        className={cn(
          'absolute left-[16px] md:left-[164px] top-[38px] md:top-[46px] z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(var(--primary),0.2)] transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.6)]',
          'before:absolute before:inset-0 before:rounded-full before:bg-primary/20 before:blur-sm before:opacity-0 group-hover:before:opacity-100'
        )}
      />

      <div className='grid gap-5 pl-8 md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-start md:gap-x-12 md:pl-0'>
        <div className='font-mono text-[11px] uppercase tracking-[0.24em] text-primary/75'>
          {period}
        </div>

        <div className='min-w-0'>
          <h3 className='font-display text-2xl font-semibold leading-tight tracking-[-0.06em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-[2rem]'>
            {company}
          </h3>
          <p className='mt-1 text-sm font-medium text-foreground/58 md:text-base'>
            {position}
          </p>
          
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className='mt-4'>
            <div
              className={cn(
                'max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base transition-all duration-300',
                !isExpanded && 'line-clamp-4'
              )}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {skills && skills.length > 0 && (
              <p className='mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50'>
                {skills.join(' / ')}
              </p>
            )}
          </Collapsible>
        </div>

        <Button
          variant='ghost'
          onClick={() => setIsExpanded(!isExpanded)}
          className='shrink-0 rounded-full border border-white/10 px-4 hover:border-primary/30 inline-flex items-center gap-1.5'
        >
          <span>{isExpanded ? showLessText : seeMoreText}</span>
          {isExpanded ? (
            <ChevronUp className='h-3.5 w-3.5 transition-transform' />
          ) : (
            <ChevronDown className='h-3.5 w-3.5 transition-transform' />
          )}
        </Button>
      </div>
    </article>
  )
}
