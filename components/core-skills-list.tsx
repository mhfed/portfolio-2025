'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { useTranslations } from 'next-intl'

interface SkillItem {
  id: string
  label: string
  value: string
}

interface CoreSkillsListProps {
  title: string
  items: SkillItem[]
}

export function CoreSkillsList({ title, items }: CoreSkillsListProps) {
  const t = useTranslations('common')
  const [isExpanded, setIsExpanded] = useState(false)
  const initialCount = 6

  const visibleItems = items.slice(0, initialCount)
  const hiddenItems = items.slice(initialCount)
  const hasMore = items.length > initialCount

  return (
    <div className='rounded-[1.5rem] border border-primary/15 bg-background/45 p-5 md:p-6'>
      <div className='mb-5 flex items-center justify-between gap-4'>
        <div>
          <span className='terminal-label'>capability matrix</span>
          <h3 className='mt-3 font-display text-2xl font-semibold tracking-[-0.05em] text-foreground md:text-3xl'>
            {title}
          </h3>
        </div>
        <span className='hidden rounded-full border border-primary/15 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-primary sm:inline-flex'>
          {items.length} modules
        </span>
      </div>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className='grid gap-3 md:grid-cols-2'>
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className='rounded-[1.25rem] border border-primary/12 bg-card/80 p-4'
            >
              <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75'>
                {item.label}
              </div>
              <p className='mt-3 text-sm leading-relaxed text-foreground/72'>
                {item.value}
              </p>
            </article>
          ))}
        </div>

        <CollapsibleContent className='overflow-hidden pt-3 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
          <div className='grid gap-3 md:grid-cols-2'>
            {hiddenItems.map((item) => (
              <article
                key={item.id}
                className='rounded-[1.25rem] border border-primary/12 bg-card/80 p-4'
              >
                <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75'>
                  {item.label}
                </div>
                <p className='mt-3 text-sm leading-relaxed text-foreground/72'>
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </CollapsibleContent>

        {hasMore && (
          <div className='mt-4'>
            <CollapsibleTrigger asChild>
              <Button
                variant='link'
                className='group h-auto p-0 font-mono text-[11px] uppercase tracking-[0.24em] text-primary hover:text-primary/80'
              >
                {isExpanded ? t('showLess') : t('seeMore')}
                {isExpanded ? (
                  <ChevronUp className='h-4 w-4 transition-transform group-hover:-translate-y-0.5' />
                ) : (
                  <ChevronDown className='h-4 w-4 transition-transform group-hover:translate-y-0.5' />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        )}
      </Collapsible>
    </div>
  )
}
