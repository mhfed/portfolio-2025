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
import { Reveal } from '@/components/ui/reveal'
import { motion } from 'motion/react'
import { TiltWrapper } from '@/components/atoms/tilt-wrapper'

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
  const tAbout = useTranslations('about')
  const [isExpanded, setIsExpanded] = useState(false)
  const initialCount = 4

  const visibleItems = items.slice(0, initialCount)
  const hiddenItems = items.slice(initialCount)
  const hasMore = items.length > initialCount

  const parseSkills = (val: string) => {
    return val.split(',').map((s) => s.trim()).filter(Boolean)
  }

  return (
    <div>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <div>
          <span className='section-kicker'>{tAbout('capabilities')}</span>
          <h3 className='mt-2.5 font-display text-2xl font-bold tracking-[-0.04em] text-foreground md:text-3xl'>
            {title}
          </h3>
        </div>
        <span className='hidden rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-xs text-foreground/50 sm:inline-flex'>
          {tAbout('itemsCount', { count: items.length })}
        </span>
      </div>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className='grid gap-4 sm:grid-cols-2 border-t border-white/[0.06] pt-6'>
          {visibleItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 50} variant='scale'>
              <TiltWrapper
                className='h-full rounded-2xl'
                spotlightColor='color-mix(in srgb, var(--primary) 10%, transparent)'
                maxRotate={5}
                scale={1.01}
              >
                <div className='relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 shadow-sm h-full'>
                  <div>
                    <div className='text-xs font-bold uppercase tracking-wider text-primary/80 mb-3'>
                      {item.label}
                    </div>
                    <div className='flex flex-wrap gap-1.5'>
                      {parseSkills(item.value).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className='inline-flex items-center rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-foreground/70 hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-200 cursor-default'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltWrapper>
            </Reveal>
          ))}
        </div>

        <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
          <div className='grid gap-4 sm:grid-cols-2 pt-4'>
            {hiddenItems.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 50} variant='scale'>
                <TiltWrapper
                  className='h-full rounded-2xl'
                  spotlightColor='color-mix(in srgb, var(--primary) 10%, transparent)'
                  maxRotate={5}
                  scale={1.01}
                >
                  <div className='relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 shadow-sm h-full'>
                    <div>
                      <div className='text-xs font-bold uppercase tracking-wider text-primary/80 mb-3'>
                        {item.label}
                      </div>
                      <div className='flex flex-wrap gap-1.5'>
                        {parseSkills(item.value).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className='inline-flex items-center rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-foreground/70 hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-200 cursor-default'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltWrapper>
              </Reveal>
            ))}
          </div>
        </CollapsibleContent>

        {hasMore && (
          <div className='mt-6 flex justify-start'>
            <CollapsibleTrigger asChild>
              <Button
                variant='outline'
                className='group h-10 px-5 rounded-full border border-white/[0.08] hover:border-primary/20 hover:bg-white/[0.02] text-xs font-semibold text-foreground/80 hover:text-primary transition-all duration-300'
              >
                <span>{isExpanded ? t('showLess') : t('seeMore')}</span>
                {isExpanded ? (
                  <ChevronUp className='h-4 w-4 transition-transform group-hover:-translate-y-0.5 text-primary/80' />
                ) : (
                  <ChevronDown className='h-4 w-4 transition-transform group-hover:translate-y-0.5 text-primary/80' />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        )}
      </Collapsible>
    </div>
  )
}
