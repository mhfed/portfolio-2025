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
}: TimelineItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article 
      onClick={() => setIsOpen(!isOpen)}
      className='group relative border-t border-white/20 cursor-pointer transition-colors duration-500 hover:bg-white/[0.02]'
    >
      {/* Header Row */}
      <div className='flex flex-col lg:flex-row lg:items-center justify-between py-8 md:py-12 px-4'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-16 pointer-events-none'>
          <span className='font-mono text-xs md:text-sm text-white/30 uppercase tracking-widest min-w-[120px]'>
            {period}
          </span>
          <div className='flex items-center gap-6'>
            <div className='relative'>
              <h3 className='font-sans font-bold text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-white/70 group-hover:opacity-0 transition-opacity duration-500'>
                {company}
              </h3>
              <h3 className='absolute top-0 left-0 font-sans font-bold text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-teal-400 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500' aria-hidden="true">
                {company}
              </h3>
            </div>
            {/* Hover Slide In Role (Desktop only) */}
            <span className='hidden lg:block font-serif italic text-2xl text-white/50 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500'>
              {position}
            </span>
          </div>
        </div>

        {/* Mobile position fallback */}
        <span className='lg:hidden mt-2 font-serif italic text-lg text-white/50 block pointer-events-none'>
          {position}
        </span>
        
        {/* Plus/Minus Icon */}
        <div className='absolute right-4 md:right-8 top-12 lg:top-1/2 lg:-translate-y-1/2 text-white/30 group-hover:text-white transition-colors pointer-events-none'>
          <span className='text-3xl font-light'>{isOpen ? '−' : '+'}</span>
        </div>
      </div>

      {/* Accordion Content */}
      <div 
        className={cn(
          'grid transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]', 
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-12 px-4' : 'grid-rows-[0fr] opacity-0 pb-0 px-4'
        )}
      >
        <div className='overflow-hidden'>
          <div className='max-w-3xl ml-0 lg:ml-[184px] pt-4 border-t border-white/10 lg:border-none lg:pt-0'>
            <div 
              className='text-lg md:text-xl font-serif italic text-white/70 leading-relaxed space-y-4'
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {skills && skills.length > 0 && (
              <p className='mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40'>
                {skills.join(' / ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
