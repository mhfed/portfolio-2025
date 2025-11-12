"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

interface ProjectCardProps {
  image: string
  title: string
  year: string
  description: string
  details: string
  isAlternate: boolean
}

export function ProjectCard({
  image,
  title,
  year,
  description,
  details,
  isAlternate,
}: ProjectCardProps) {
  const [isTruncated, setIsTruncated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)
  const t = useTranslations('projects')

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
  }, [details])

  return (
    <div
      className={`grid md:grid-cols-2 gap-8 items-center scroll-animate ${isAlternate ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="relative h-80 md:h-96 bg-muted rounded-xl overflow-hidden border border-border/20">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-h3 text-primary">{title}</h3>
          <p className="text-body-sm text-muted-foreground">{year}</p>
        </div>
        <p className="text-foreground text-body-lg font-semibold">{description}</p>
        <div className="space-y-2">
          <p
            ref={textRef}
            className="text-body text-foreground line-clamp-2"
          >
            {details}
          </p>
          {isTruncated && (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <button className="text-accent font-semibold text-body-lg hover:opacity-80 transition-opacity mt-4">
                  {t('viewProject')}
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="overflow-y-auto">
                  <DrawerHeader className="text-left pb-4">
                    <DrawerTitle>{title}</DrawerTitle>
                    <p className="text-body-sm text-muted-foreground mt-1">{year}</p>
                  </DrawerHeader>
                  <div className="px-6 pb-8">
                    <p className="text-body text-foreground">
                      {details}
                    </p>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
    </div>
  )
}

