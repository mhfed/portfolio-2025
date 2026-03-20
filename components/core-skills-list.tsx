'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
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
  const initialCount = 4

  const visibleItems = items.slice(0, initialCount)
  const hiddenItems = items.slice(initialCount)
  const hasMore = items.length > initialCount

  return (
    <div className='ml-2 md:ml-4'>
      <h3 className='mb-3 text-lg font-semibold italic text-muted-foreground md:text-xl lg:text-xl'>
        {title}
      </h3>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className='ml-4 flex flex-col gap-2 md:ml-6'>
          <ul className='flex flex-col gap-2'>
            {visibleItems.map((item) => (
              <li
                key={item.id}
                className='text-sm md:text-base list-disc text-muted-foreground'
              >
                <span className='font-bold text-muted-foreground'>
                  {item.label}:
                </span>{' '}
                <span className='leading-relaxed'>{item.value}</span>
              </li>
            ))}
          </ul>

          <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
            <ul className='flex flex-col gap-2'>
              {hiddenItems.map((item) => (
                <li
                  key={item.id}
                  className='text-sm md:text-base list-disc text-muted-foreground'
                >
                  <span className='font-bold text-muted-foreground'>
                    {item.label}:
                  </span>{' '}
                  <span className='leading-relaxed'>{item.value}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </div>

        {hasMore && (
          <div className='mt-3 ml-4 md:ml-6'>
            <CollapsibleTrigger asChild>
              <Button
                variant='link'
                className='p-0 h-auto font-medium text-foreground/60 hover:text-primary flex items-center gap-1 group'
              >
                {isExpanded ? t('showLess') : t('seeMore')}
                {isExpanded ? (
                  <ChevronUp className='w-4 h-4 group-hover:-translate-y-0.5 transition-transform' />
                ) : (
                  <ChevronDown className='w-4 h-4 group-hover:translate-y-0.5 transition-transform' />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        )}
      </Collapsible>
    </div>
  )
}
