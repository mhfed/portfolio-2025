'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Collapsible } from '@/components/ui/collapsible'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'motion/react'

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
  const elementRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let gsapInstance: any
    let scrollTriggerInstance: any

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsapInstance = gsap
      scrollTriggerInstance = ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      gsap.set(element, {
        opacity: 0.1,
        y: 50,
        rotateX: -12,
        transformPerspective: 1000,
      })

      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 94%',
          end: 'top 78%',
          scrub: 0.8,
        },
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: 'power2.out',
      })
    })

    return () => {
      if (scrollTriggerInstance) {
        const triggers = scrollTriggerInstance.getAll()
        triggers.forEach((t: any) => {
          if (t.trigger === element) {
            t.kill()
          }
        })
      }
    }
  }, [])

  return (
    <TimelineItemContext.Provider
      value={{ isExpanded, setIsExpanded, isFirst, isLast }}
    >
      <article
        ref={elementRef}
        className='group relative border-t border-white/10 py-8 md:py-10 lg:py-12 first:border-t-0 transform-style-3d backface-hidden'
      >
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
        'absolute left-[16px] md:left-[164px] w-px bg-linear-to-b from-white/[0.04] via-white/[0.12] to-white/[0.04]',
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
        'absolute left-[16px] md:left-[164px] top-[38px] md:top-[46px] z-20 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/40 group-hover:bg-primary transition-all duration-300 group-hover:scale-110 shadow-xs border border-background'
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
    <h3 className='font-display text-3xl font-semibold uppercase leading-[0.9] tracking-normal text-foreground transition-colors duration-300 group-hover:text-primary md:text-5xl'>
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
    <p className='mt-3 text-sm font-medium text-foreground/58 md:text-base'>
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
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | string>('auto')
  const [isTruncated, setIsTruncated] = React.useState(false)

  React.useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const checkTruncation = () => {
      const scrollHeight = element.scrollHeight
      const collapsedHeight = 96 // 4 lines approx
      setIsTruncated(scrollHeight > collapsedHeight)
      
      if (isExpanded) {
        setHeight(scrollHeight)
      } else {
        setHeight(Math.min(scrollHeight, collapsedHeight))
      }
    }

    checkTruncation()

    const resizeObserver = new ResizeObserver(() => {
      checkTruncation()
    })
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [isExpanded, html])

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className='relative overflow-hidden'
    >
      <div
        ref={containerRef}
        className='max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base'
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isTruncated && !isExpanded && (
        <div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none' />
      )}
    </motion.div>
  )
}

export function TimelineItemSkills({ skills }: { skills: string[] }) {
  if (!skills || skills.length === 0) return null
  return (
    <div className='mt-5 flex flex-wrap gap-x-4 gap-y-2'>
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className='font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/48'
        >
          {skill}
        </span>
      ))}
    </div>
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
      className='shrink-0 h-9 rounded-none border-0 bg-transparent px-0 hover:bg-transparent inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60 hover:text-primary transition-all duration-300'
    >
      <span>{isExpanded ? showLessText : seeMoreText}</span>
      {isExpanded ? (
        <ChevronUp className='h-3.5 w-3.5 transition-transform text-primary/80' />
      ) : (
        <ChevronDown className='h-3.5 w-3.5 transition-transform text-primary/80' />
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
