'use client'

import { Button } from './ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContentSide,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './ui/drawer'
import { ScrollArea } from './ui/scroll-area'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { cn } from '@/lib/utils'

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
  const [isOpen, setIsOpen] = useState(false)

  let seeMoreText = 'See more'
  let closeText = 'Close'

  try {
    const t = useTranslations('common')
    seeMoreText = t('seeMore')
    closeText = t('close')
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
          <div
            className='line-clamp-5 mt-4 max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base'
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {skills && skills.length > 0 && (
            <p className='mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50'>
              {skills.join(' / ')}
            </p>
          )}
        </div>

        <Drawer open={isOpen} onOpenChange={setIsOpen} direction='right'>
          <DrawerTrigger asChild>
            <Button
              variant='ghost'
              className='shrink-0 rounded-full border border-white/10 px-4 hover:border-primary/30'
            >
              {seeMoreText}
            </Button>
          </DrawerTrigger>
          <DrawerContentSide className='border-white/10 bg-card/95 backdrop-blur-xl data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]'>
            <div className='flex h-full w-full flex-col'>
              <DrawerHeader className='text-left'>
                <DrawerTitle className='font-display text-2xl font-semibold tracking-[-0.05em]'>
                  {company}
                </DrawerTitle>
                <DrawerDescription className='text-sm text-foreground/62'>
                  {position} · {period}
                </DrawerDescription>
              </DrawerHeader>
              <div className='flex-1 overflow-hidden px-4 pb-2'>
                <ScrollArea className='h-full pr-4'>
                  <div
                    className='pb-8 text-sm leading-relaxed text-foreground/80 md:text-base'
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </ScrollArea>
              </div>
              <DrawerFooter className='pt-2'>
                <DrawerClose asChild>
                  <Button variant='outline'>{closeText}</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContentSide>
        </Drawer>
      </div>
    </article>
  )
}
