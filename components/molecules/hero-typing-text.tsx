'use client'

import { FluidReveal } from './fluid-reveal'

interface HeroTypingTextProps {
  frontText: string
  middleText: string
  endText: string
}

export function HeroTypingText({
  frontText,
  middleText,
  endText,
}: HeroTypingTextProps) {
  return (
    <div className='hero-title-container flex flex-col items-start gap-1 md:gap-2.5 overflow-hidden w-full'>
      <FluidReveal
        text={`${frontText} ${middleText}`}
        className='font-display text-[2.8rem] font-bold leading-[0.9] tracking-[-0.05em] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] w-full uppercase text-foreground select-none'
        delay={0.05}
      />
      <FluidReveal
        text={endText}
        className='font-display text-[2.8rem] font-bold leading-[0.9] tracking-[-0.05em] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] w-full uppercase text-foreground select-none'
        delay={0.25}
      />
    </div>
  )
}
