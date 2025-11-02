"use client"

import { useState } from "react"
import { TypingAnimation } from "./typing-animation"

interface HeroTypingTextProps {
  frontText: string
  middleText: string
  endText: string
}

export function HeroTypingText({ frontText, middleText, endText }: HeroTypingTextProps) {
  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground text-center">
        <TypingAnimation text={frontText} speed={80} /> <TypingAnimation text={middleText} speed={80} />
      </h1>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground text-center">
        <TypingAnimation text={endText} speed={80} />
      </h1>
    </div>
  )
}

export function HeroDeveloperText({ developerText }: { developerText: string }) {
  const [showDeveloper, setShowDeveloper] = useState(false)

  return (
    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-primary min-h-[1.2em]">
      <TypingAnimation 
        text={developerText} 
        speed={100}
        onComplete={() => setShowDeveloper(true)}
      />
    </h2>
  )
}

