'use client'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerContentSide,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './ui/drawer'
import { ScrollArea } from './ui/scroll-area'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

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
    <div>
      <div className=''>
        <div className='flex items-start gap-4 justify-between'>
          <h3 className='text-lg md:text-xl lg:text-2xl text-foreground font-semibold '>
            {company}
          </h3>
          <Badge
            variant='outline'
            className='bg-primary/50 border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/40 hover:scale-105 hover:shadow-sm active:scale-[0.98] font-medium rounded-full md:hidden'
            size='md'
          >
            {period}
          </Badge>
        </div>
        <p className='text-base md:text-base lg:text-base text-foreground/80 leading-relaxed italic mb-2'>
          {position}
        </p>

        <p className='text-sm md:text-base lg:text-base text-foreground/80 leading-relaxed line-clamp-2'>
          {description}
        </p>

        <Drawer open={isOpen} onOpenChange={setIsOpen} direction='right'>
          <DrawerTrigger asChild>
            <Button
              variant='link'
              className='px-0 h-auto font-medium mt-1 mb-2 hover:opacity-80 opacity-90'
            >
              {seeMoreText}
            </Button>
          </DrawerTrigger>
          <DrawerContentSide className='data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]'>
            <div className='w-full h-full flex flex-col'>
              <DrawerHeader className='text-left'>
                <DrawerTitle className='text-2xl font-bold'>
                  {company}
                </DrawerTitle>
                <DrawerDescription className='text-lg font-medium text-foreground/90'>
                  {position} ({period})
                </DrawerDescription>
              </DrawerHeader>
              <div className='p-4 py-0 flex-1 overflow-hidden'>
                <ScrollArea className='h-full pr-4'>
                  <div className='whitespace-pre-line text-foreground/80 leading-relaxed pb-8'>
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

        {skills && skills.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-3'>
            {skills.map((skill) => (
              <Badge key={skill} variant='primary' size='sm'>
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
