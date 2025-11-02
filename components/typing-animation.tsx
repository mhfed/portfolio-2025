"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  text: string
  speed?: number
  className?: string
  showCursor?: boolean
  onComplete?: () => void
}

export function TypingAnimation({
  text,
  speed = 100,
  className = "",
  showCursor = true,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text) return

    setDisplayedText("")
    setIsComplete(false)

    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(timer)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-full bg-current ml-1 ${
            isComplete ? "opacity-0" : "animate-pulse"
          }`}
          aria-hidden="true"
        >
          |
        </span>
      )}
    </span>
  )
}
