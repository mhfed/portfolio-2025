import type React from "react"
import { SectionTitle } from "./section-title"

interface SectionTitleWrapperProps {
  title: string
  desktopContent?: React.ReactNode
  className?: string
  sectionId?: string
  mobileOnly?: boolean
  desktopOnly?: boolean
}

export function SectionTitleWrapper({ 
  title, 
  desktopContent, 
  className = "", 
  sectionId,
  mobileOnly = false,
  desktopOnly = false 
}: SectionTitleWrapperProps) {
  return (
    <>
      {/* Mobile: Full width sticky title - positioned outside grid to stick right below header */}
      {!desktopOnly && (
        <div 
          className={`md:hidden scroll-animate sticky z-40 w-screen py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/10 ${className}`} 
          style={{ 
            top: 'var(--header-height)',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <SectionTitle title={title} />
          </div>
        </div>
      )}

      {/* Desktop: Left Column - Title */}
      {!mobileOnly && (
        <div className={`hidden md:block scroll-animate sticky top-[var(--header-height)] self-start min-w-0 max-w-full ${className}`}>
          <SectionTitle title={title} />
          {desktopContent}
        </div>
      )}
    </>
  )
}

