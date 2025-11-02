"use client"

import { useRef, useLayoutEffect, useState } from "react"
import { gsap } from "gsap"

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
  const containerRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const [isComplete, setIsComplete] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    if (!text || !containerRef.current) return

    // Clear previous animation
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    setIsComplete(false)
    const container = containerRef.current

    // Get computed color from container's parent
    const parentElement = container.parentElement
    const computedStyle = parentElement ? window.getComputedStyle(parentElement) : null
    const textColor = computedStyle?.color || "currentColor"

    // Clear container content
    container.innerHTML = ""

    // Split text into characters and create spans
    const characters = text.split("")
    const spans: HTMLSpanElement[] = []

    characters.forEach((char, index) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      span.style.position = "relative"
      // Style for stroke effect (outline only)
      span.style.color = "transparent"
      span.style.webkitTextStroke = `2px ${textColor}`
      
      // Set up clip-path for writing effect (reveal from left to right)
      gsap.set(span, {
        clipPath: "inset(0 100% 0 0)", // Start with 100% clipped from right
        opacity: 1,
      })
      
      container.appendChild(span)
      spans.push(span)
    })

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true)
        onComplete?.()
      },
    })

    // Animate characters with writing effect (clip-path reveal)
    tl.to(spans, {
      clipPath: "inset(0 0% 0 0)", // Reveal fully (0% clipped from right)
      duration: 0.3,
      ease: "none", // Linear for smooth writing effect
      stagger: speed / 1000, // Convert speed (ms) to seconds
    })

    timelineRef.current = tl

    // Animate cursor if enabled
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 })
      
      // Create blinking cursor animation
      const cursorTl = gsap.timeline({ repeat: -1 })
      cursorTl.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
      })
      cursorTl.to(cursorRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      })

      // Stop cursor when animation completes
      tl.call(() => {
        cursorTl.kill()
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 })
        }
      })
    }

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [text, speed, onComplete, showCursor])

  return (
    <span className={className}>
      <span ref={containerRef} style={{ display: "inline-block" }} />
      {showCursor && (
        <span
          ref={cursorRef}
          className="inline-block w-0.5 h-full bg-current ml-1"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          |
        </span>
      )}
    </span>
  )
}
