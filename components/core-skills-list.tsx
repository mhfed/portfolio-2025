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
import { Reveal } from './ui/reveal'

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
    <div>
      <div className='mb-5 flex items-center justify-between gap-4'>
        <div>
          <span className='section-kicker'>capabilities</span>
          <h3 className='mt-3 font-display text-2xl font-semibold tracking-[-0.05em] text-foreground md:text-3xl'>
            {title}
          </h3>
        </div>
        <span className='hidden rounded-full border border-white/10 bg-background/55 px-3 py-1 text-sm text-foreground/68 sm:inline-flex'>
          {items.length} items
        </span>
      </div>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className='space-y-0 border-t border-white/10'>
          {visibleItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 70} variant='scale'>
              <article className='grid gap-2 border-b border-white/10 py-4 md:grid-cols-[180px_minmax(0,1fr)] md:gap-6'>
                <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75 md:pt-1'>
                  {item.label}
                </div>
                <p className='text-sm leading-relaxed text-foreground/72 md:text-[15px]'>
                  {item.value}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <CollapsibleContent className='overflow-hidden pt-3 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
          <div className='space-y-0'>
            {hiddenItems.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 70} variant='scale'>
                <article className='grid gap-2 border-b border-white/10 py-4 md:grid-cols-[180px_minmax(0,1fr)] md:gap-6'>
                  <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75 md:pt-1'>
                    {item.label}
                  </div>
                  <p className='text-sm leading-relaxed text-foreground/72 md:text-[15px]'>
                    {item.value}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </CollapsibleContent>

        {hasMore && (
          <div className='mt-4'>
            <CollapsibleTrigger asChild>
              <Button
                variant='link'
                className='group h-auto p-0 text-sm font-medium text-primary hover:text-primary/80'
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
