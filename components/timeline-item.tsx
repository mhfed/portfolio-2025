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

interface TimelineItemProps {
  company: string
  position: string
  period: string
  description: string
  skills: string[]
}

export function TimelineItem({
  company,
  position,
  period,
  description,
  skills,
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
    <article className='group border-t border-white/10 py-6 md:py-7 lg:py-8'>
      <div className='grid gap-5 md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-start md:gap-6'>
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
          <p
            className='mt-4 max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base'
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
