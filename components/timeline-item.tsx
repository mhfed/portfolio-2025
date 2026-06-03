'use client'

import * as React from 'react'
import { Button } from './ui/button'
import { Collapsible } from './ui/collapsible'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

const TimelineItemContext = React.createContext<{
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
  isFirst: boolean
  isLast: boolean
} | null>(null)

export function TimelineItemRoot({
  children,
  isFirst = false,
  isLast = false,
}: {
  children: React.ReactNode
  isFirst?: boolean
  isLast?: boolean
}) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <TimelineItemContext.Provider
      value={{ isExpanded, setIsExpanded, isFirst, isLast }}
    >
      <article className='group relative border-t border-white/10 py-6 md:py-8 lg:py-10 first:border-t-0'>
        {children}
      </article>
    </TimelineItemContext.Provider>
  )
}

export function TimelineItemLine() {
  const context = React.use(TimelineItemContext)
  const isFirst = context?.isFirst ?? false
  const isLast = context?.isLast ?? false

  return (
    <div
      className={cn(
        'absolute left-[16px] md:left-[164px] w-px bg-linear-to-b from-white/10 via-white/20 to-white/10',
        isFirst
          ? 'top-10 bottom-0'
          : isLast
            ? 'top-0 bottom-[calc(100%-40px)]'
            : 'top-0 bottom-0'
      )}
    />
  )
}

export function TimelineItemDot() {
  return (
    <div
      className={cn(
        'absolute left-[16px] md:left-[164px] top-[38px] md:top-[46px] z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(var(--primary),0.2)] transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.6)]',
        'before:absolute before:inset-0 before:rounded-full before:bg-primary/20 before:blur-sm before:opacity-0 group-hover:before:opacity-100'
      )}
    />
  )
}

export function TimelineItemBody({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid gap-5 pl-8 md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-start md:gap-x-12 md:pl-0'>
      {children}
    </div>
  )
}

export function TimelineItemPeriod({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='font-mono text-[11px] uppercase tracking-[0.24em] text-primary/75'>
      {children}
    </div>
  )
}

export function TimelineItemContent({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='min-w-0'>{children}</div>
}

export function TimelineItemCompany({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <h3 className='font-display text-2xl font-semibold leading-tight tracking-[-0.06em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-[2rem]'>
      {children}
    </h3>
  )
}

export function TimelineItemPosition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <p className='mt-1 text-sm font-medium text-foreground/58 md:text-base'>
      {children}
    </p>
  )
}

export function TimelineItemCollapsible({
  children,
}: {
  children: React.ReactNode
}) {
  const context = React.use(TimelineItemContext)
  const isExpanded = context?.isExpanded ?? false
  const setIsExpanded = context?.setIsExpanded ?? (() => {})

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className='mt-4'
    >
      {children}
    </Collapsible>
  )
}

export function TimelineItemDescription({ html }: { html: string }) {
  const context = React.use(TimelineItemContext)
  const isExpanded = context?.isExpanded ?? false

  return (
    <div
      className={cn(
        'max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base transition-all duration-300',
        !isExpanded && 'line-clamp-4'
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function TimelineItemSkills({ skills }: { skills: string[] }) {
  if (!skills || skills.length === 0) return null
  return (
    <p className='mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50'>
      {skills.join(' / ')}
    </p>
  )
}

export function TimelineItemTrigger() {
  const context = React.use(TimelineItemContext)
  const isExpanded = context?.isExpanded ?? false
  const setIsExpanded = context?.setIsExpanded ?? (() => {})

  let seeMoreText = 'See more'
  let showLessText = 'Show less'

  try {
    const t = useTranslations('common')
    seeMoreText = t('seeMore')
    showLessText = t('showLess')
  } catch {
    // Fall back to default labels
  }

  return (
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
  )
}

// Group into Compound Component object
export const TimelineItemCompound = {
  Root: TimelineItemRoot,
  Line: TimelineItemLine,
  Dot: TimelineItemDot,
  Body: TimelineItemBody,
  Period: TimelineItemPeriod,
  Content: TimelineItemContent,
  Company: TimelineItemCompany,
  Position: TimelineItemPosition,
  Collapsible: TimelineItemCollapsible,
  Description: TimelineItemDescription,
  Skills: TimelineItemSkills,
  Trigger: TimelineItemTrigger,
}

// Backwards compatibility legacy export
export function TimelineItem({
  company,
  position,
  period,
  description,
  skills,
  isFirst = false,
  isLast = false,
}: {
  company: string
  position: string
  period: string
  description: string
  skills: string[]
  isFirst?: boolean
  isLast?: boolean
}) {
  return (
    <TimelineItemRoot isFirst={isFirst} isLast={isLast}>
      <TimelineItemLine />
      <TimelineItemDot />
      <TimelineItemBody>
        <TimelineItemPeriod>{period}</TimelineItemPeriod>
        <TimelineItemContent>
          <TimelineItemCompany>{company}</TimelineItemCompany>
          <TimelineItemPosition>{position}</TimelineItemPosition>
          <TimelineItemCollapsible>
            <TimelineItemDescription html={description} />
            <TimelineItemSkills skills={skills} />
          </TimelineItemCollapsible>
        </TimelineItemContent>
        <TimelineItemTrigger />
      </TimelineItemBody>
    </TimelineItemRoot>
  )
}
