"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

interface TimelineItemProps {
  company: string
  position: string
  period: string
  description: string
  skills: string[]
}

export function TimelineItem({ company, position, period, description, skills }: TimelineItemProps) {
  const [isTruncated, setIsTruncated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)
  const t = useTranslations('experience')

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current
        // Check if text is truncated by comparing scrollHeight with clientHeight
        const isOverflowing = element.scrollHeight > element.clientHeight
        setIsTruncated(isOverflowing)
      }
    }

    checkTruncation()
    // Re-check on window resize
    window.addEventListener("resize", checkTruncation)
    return () => window.removeEventListener("resize", checkTruncation)
  }, [description])

  return (
    <div className="scroll-animate relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0">
      <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full transform -translate-x-1.5"></div>

      <div className="space-y-3">
        <div>
          <h3 className="text-h3 text-foreground">{position}</h3>
          <p className="text-body-lg text-primary font-semibold">{company}</p>
          <p className="text-body-sm text-muted-foreground">{period}</p>
        </div>

        <div className="space-y-2">
          <p
            ref={textRef}
            className="text-foreground text-body line-clamp-2"
          >
            {description}
          </p>
          {isTruncated && (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <button className="text-accent font-semibold text-body-sm hover:opacity-80 transition-opacity inline-flex items-center gap-1">
                  {t('readMore')}
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="overflow-y-auto">
                  <DrawerHeader className="text-left pb-4">
                    <DrawerTitle>{position}</DrawerTitle>
                    <p className="text-body-lg text-primary font-semibold mt-1">{company}</p>
                    <p className="text-body-sm text-muted-foreground mt-1">{period}</p>
                  </DrawerHeader>
                  <div className="px-6 pb-8">
                    <p className="text-body text-foreground">
                      {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

