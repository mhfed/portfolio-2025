"use client"

import { useState } from "react"
import { TypingAnimation } from "./typing-animation"

interface HeroTypingTextProps {
  frontText: string
  middleText: string
  endText: string
}

type AnimationStep = "front" | "middle" | "end" | "done"

export function HeroTypingText({ frontText, middleText, endText }: HeroTypingTextProps) {
  const [step, setStep] = useState<AnimationStep>("front")

  const handleFrontComplete = () => setStep("middle")
  const handleMiddleComplete = () => setStep("end")
  const handleEndComplete = () => setStep("done")

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground text-center min-h-[1.2em]">
        {step === "front" ? (
          <TypingAnimation text={frontText} speed={80} onComplete={handleFrontComplete} />
        ) : (
          <span className="text-transparent" style={{ WebkitTextStroke: "2px currentColor" }}>{frontText}</span>
        )}
        {" "}
        {step === "middle" ? (
          <TypingAnimation text={middleText} speed={80} onComplete={handleMiddleComplete} />
        ) : step !== "front" ? (
          <span className="text-transparent" style={{ WebkitTextStroke: "2px currentColor" }}>{middleText}</span>
        ) : null}
      </h1>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground text-center min-h-[1.2em]">
        {step === "end" ? (
          <TypingAnimation text={endText} speed={80} onComplete={handleEndComplete} />
        ) : step === "done" ? (
          <span className="text-transparent" style={{ WebkitTextStroke: "2px currentColor" }}>{endText}</span>
        ) : null}
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
