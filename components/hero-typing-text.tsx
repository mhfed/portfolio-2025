"use client"

import { useState } from "react"
import { TypingAnimation } from "./typing-animation"

interface HeroTypingTextProps {
  frontText: string
  endText: string
}

export function HeroTypingText({ frontText, endText }: HeroTypingTextProps) {

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground">
        <TypingAnimation text={frontText} speed={80} />
      </h1>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-3 h-3 md:w-4 md:h-4 bg-accent rounded-xs" />
        ))}
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground">
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

