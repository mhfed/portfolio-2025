"use client"

import { useRef, useLayoutEffect, useState } from "react"
import { gsap } from "gsap"

interface HeroTypingTextProps {
  frontText: string
  middleText: string
  endText: string
}

export function HeroTypingText({ frontText, middleText, endText }: HeroTypingTextProps) {
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!line1Ref.current || !line2Ref.current) return

    const line1 = line1Ref.current
    const line2 = line2Ref.current

    // Clear previous content
    line1.innerHTML = ""
    line2.innerHTML = ""

    // Get text color
    const textColor = window.getComputedStyle(line1).color

    // Split text into characters for line 1 (frontText + middleText)
    const line1Text = `${frontText} ${middleText}`
    const line1Chars: HTMLSpanElement[] = []
    
    line1Text.split("").forEach((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      span.style.color = "transparent"
      span.style.webkitTextStroke = `2px ${textColor}`
      gsap.set(span, { clipPath: "inset(0 100% 0 0)" })
      line1.appendChild(span)
      line1Chars.push(span)
    })

    // Split text into characters for line 2 (endText)
    const line2Chars: HTMLSpanElement[] = []
    
    endText.split("").forEach((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      span.style.color = "transparent"
      span.style.webkitTextStroke = `2px ${textColor}`
      gsap.set(span, { clipPath: "inset(0 100% 0 0)" })
      line2.appendChild(span)
      line2Chars.push(span)
    })

    // Create animation timeline
    const tl = gsap.timeline()

    // Animate line 1 characters
    tl.to(line1Chars, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.3,
      ease: "none",
      stagger: 0.08,
    })

    // Animate line 2 characters
    tl.to(line2Chars, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.3,
      ease: "none",
      stagger: 0.08,
    }, "-=0.2") // Overlap slightly

    return () => {
      tl.kill()
    }
  }, [frontText, middleText, endText])

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <h1 
        ref={line1Ref}
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground text-center min-h-[1.2em]"
      />
      <h1 
        ref={line2Ref}
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground text-center min-h-[1.2em]"
      />
    </div>
  )
}

export function HeroDeveloperText({ developerText }: { developerText: string }) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    if (!textRef.current) return

    const container = textRef.current
    container.innerHTML = ""

    const textColor = window.getComputedStyle(container).color

    // Split into characters
    const chars: HTMLSpanElement[] = []
    developerText.split("").forEach((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      span.style.color = "transparent"
      span.style.webkitTextStroke = `2px ${textColor}`
      gsap.set(span, { clipPath: "inset(0 100% 0 0)" })
      container.appendChild(span)
      chars.push(span)
    })

    // Animate
    const tl = gsap.timeline()
    tl.to(chars, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.3,
      ease: "none",
      stagger: 0.1,
    })

    return () => {
      tl.kill()
    }
  }, [developerText])

  return (
    <h2 
      ref={textRef}
      className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-primary min-h-[1.2em]"
    />
  )
}
