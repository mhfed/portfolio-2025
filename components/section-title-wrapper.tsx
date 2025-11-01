import type React from "react"
import { SectionTitle } from "./section-title"

interface SectionTitleWrapperProps {
  title: string
  desktopContent?: React.ReactNode
  className?: string
}

export function SectionTitleWrapper({ title, desktopContent, className = "" }: SectionTitleWrapperProps) {
  return (
    <>
      {/* Mobile: Full width sticky title */}
      <div className={`md:hidden scroll-animate sticky top-[var(--header-height)] z-40 -mx-4 px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/10 mb-6 ${className}`}>
        <SectionTitle title={title} />
      </div>

      {/* Desktop: Left Column - Title */}
      <div className={`hidden md:block scroll-animate sticky top-[var(--header-height)] self-start ${className}`}>
        <SectionTitle title={title} />
        {desktopContent}
      </div>
    </>
  )
}

