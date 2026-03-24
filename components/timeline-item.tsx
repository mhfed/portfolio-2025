'use client'

import { Badge } from './ui/badge'
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

  // Use a safe fallback for translations if next-intl context is not available or fails
  let seeMoreText = 'See more'
  let closeText = 'Close'

  try {
    const t = useTranslations('common')
    seeMoreText = t('seeMore')
    closeText = t('close')
  } catch (e) {
    // Fallback if useTranslations fails or isn't wrapped in Provider
  }

  // Determine if we show the button (only if details exist)
  // For demo purposes, if details is missing but we want to show it, we can assume it might be added later.
  // But strictly, we should only show if details is present.

  return (
    <article className='rounded-[1.4rem] border border-primary/12 bg-card/80 p-5 md:p-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
        <div className='min-w-0'>
          <div className='mb-3 flex flex-wrap items-center gap-2'>
            <Badge
              variant='outline'
              className='rounded-full border-primary/20 bg-primary/10 font-mono text-[10px] uppercase tracking-[0.24em] text-primary hover:bg-primary/10'
              size='sm'
            >
              {period}
            </Badge>
          </div>

          <h3 className='text-xl font-semibold tracking-[-0.04em] text-foreground md:text-2xl'>
            {company}
          </h3>
          <p className='mt-1 text-sm uppercase tracking-[0.18em] text-foreground/55 md:text-[13px]'>
            {position}
          </p>
        </div>

        <Drawer open={isOpen} onOpenChange={setIsOpen} direction='right'>
          <DrawerTrigger asChild>
            <Button
              variant='outline'
              className='shrink-0 rounded-full font-mono text-[10px] uppercase tracking-[0.24em]'
            >
              {seeMoreText}
            </Button>
          </DrawerTrigger>
          <DrawerContentSide className='border-primary/15 bg-card/95 backdrop-blur-xl data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]'>
            <div className='flex h-full w-full flex-col'>
              <DrawerHeader className='text-left'>
                <DrawerTitle className='text-2xl font-semibold tracking-[-0.05em]'>
                  {company}
                </DrawerTitle>
                <DrawerDescription className='font-mono text-xs uppercase tracking-[0.2em] text-primary/80'>
                  {position} / {period}
                </DrawerDescription>
              </DrawerHeader>
              <div className='flex-1 overflow-hidden px-4 pb-2'>
                <ScrollArea className='h-full pr-4'>
                  <div className='whitespace-pre-line pb-8 text-sm leading-relaxed text-foreground/80 md:text-base'>
                    {description}
                  </div>
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

      <p className='mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/75 md:text-base'>
        {description}
      </p>

      {skills && skills.length > 0 && (
        <div className='mt-4 flex flex-wrap gap-2'>
          {skills.map((skill) => (
            <Badge key={skill} variant='primary' size='sm'>
              {skill}
            </Badge>
          ))}
        </div>
      )}
    </article>
  )
}
