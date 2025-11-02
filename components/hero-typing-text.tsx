"use client"

import { useRef, useLayoutEffect } from "react"
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
    const line1Wrappers: HTMLSpanElement[] = []
    const line1Fills: HTMLSpanElement[] = []
    
    line1Text.split("").forEach((char) => {
      // Create wrapper
      const wrapper = document.createElement("span")
      wrapper.style.display = "inline-block"
      wrapper.style.position = "relative"
      
      // Create stroke layer (always visible)
      const stroke = document.createElement("span")
      stroke.textContent = char === " " ? "\u00A0" : char
      stroke.style.position = "absolute"
      stroke.style.left = "0"
      stroke.style.top = "0"
      stroke.style.color = "transparent"
      stroke.style.webkitTextStroke = `2px ${textColor}`
      
      // Create fill layer (fade in)
      const fill = document.createElement("span")
      fill.textContent = char === " " ? "\u00A0" : char
      fill.style.position = "relative"
      fill.style.color = textColor
      fill.style.opacity = "0"
      
      wrapper.appendChild(stroke)
      wrapper.appendChild(fill)
      
      gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" })
      
      line1.appendChild(wrapper)
      line1Wrappers.push(wrapper)
      line1Fills.push(fill)
    })

    // Split text into characters for line 2 (endText)
    const line2Wrappers: HTMLSpanElement[] = []
    const line2Fills: HTMLSpanElement[] = []
    
    endText.split("").forEach((char) => {
      // Create wrapper
      const wrapper = document.createElement("span")
      wrapper.style.display = "inline-block"
      wrapper.style.position = "relative"
      
      // Create stroke layer
      const stroke = document.createElement("span")
      stroke.textContent = char === " " ? "\u00A0" : char
      stroke.style.position = "absolute"
      stroke.style.left = "0"
      stroke.style.top = "0"
      stroke.style.color = "transparent"
      stroke.style.webkitTextStroke = `2px ${textColor}`
      
      // Create fill layer
      const fill = document.createElement("span")
      fill.textContent = char === " " ? "\u00A0" : char
      fill.style.position = "relative"
      fill.style.color = textColor
      fill.style.opacity = "0"
      
      wrapper.appendChild(stroke)
      wrapper.appendChild(fill)
      
      gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" })
      
      line2.appendChild(wrapper)
      line2Wrappers.push(wrapper)
      line2Fills.push(fill)
    })

    const allFills = [...line1Fills, ...line2Fills]

    // Create animation timeline
    const tl = gsap.timeline()

    // Animate line 1 characters (writing effect)
    tl.to(line1Wrappers, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.3,
      ease: "none",
      stagger: 0.08,
    })

    // Animate line 2 characters (writing effect)
    tl.to(line2Wrappers, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.3,
      ease: "none",
      stagger: 0.08,
    }, "-=0.2")

    // Fill color by fading in the fill layer
    tl.to(allFills, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
    }, "+=0.2")

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
    const wrappers: HTMLSpanElement[] = []
    const fills: HTMLSpanElement[] = []
    
    developerText.split("").forEach((char) => {
      // Create wrapper
      const wrapper = document.createElement("span")
      wrapper.style.display = "inline-block"
      wrapper.style.position = "relative"
      
      // Create stroke layer
      const stroke = document.createElement("span")
      stroke.textContent = char === " " ? "\u00A0" : char
      stroke.style.position = "absolute"
      stroke.style.left = "0"
      stroke.style.top = "0"
      stroke.style.color = "transparent"
      stroke.style.webkitTextStroke = `2px ${textColor}`
      
      // Create fill layer
      const fill = document.createElement("span")
      fill.textContent = char === " " ? "\u00A0" : char
      fill.style.position = "relative"
      fill.style.color = textColor
      fill.style.opacity = "0"
      
      wrapper.appendChild(stroke)
      wrapper.appendChild(fill)
      
      gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" })
      
      container.appendChild(wrapper)
      wrappers.push(wrapper)
      fills.push(fill)
    })

    // Animate
    const tl = gsap.timeline()
    
    // Writing effect
    tl.to(wrappers, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.3,
      ease: "none",
      stagger: 0.1,
    })

    // Fill color by fading in
    tl.to(fills, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
    }, "+=0.2")

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
