"use client"

import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  variant?: "default" | "hero" | "project" | "timeline" | "text"
}

export function LoadingSkeleton({ className = "", variant = "default" }: LoadingSkeletonProps) {
  if (variant === "hero") {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="space-y-8">
          <div className="h-16 bg-muted rounded-none w-3/4 mx-auto" />
          <div className="h-16 bg-muted rounded-none w-2/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded-none w-full" />
              <div className="h-4 bg-muted rounded-none w-5/6" />
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-4/5" />
            </div>
          </div>
          <div className="h-12 bg-muted rounded-none w-48 mx-auto" />
        </div>
      </div>
    )
  }

  if (variant === "project") {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="h-80 md:h-96 bg-muted rounded-none" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded-none w-3/4" />
            <div className="h-4 bg-muted rounded-none w-1/4" />
            <div className="h-6 bg-muted rounded-none w-full" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded-none w-full" />
              <div className="h-4 bg-muted rounded-none w-5/6" />
            </div>
            <div className="h-6 bg-muted rounded-none w-32" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "timeline") {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="relative pl-8 pb-8 border-l-2 border-muted">
          <div className="absolute left-0 top-0 w-4 h-4 bg-muted rounded-none transform -translate-x-1.5" />
          <div className="space-y-3">
            <div className="h-6 bg-muted rounded-none w-1/3" />
            <div className="h-5 bg-muted rounded-none w-1/4" />
            <div className="h-4 bg-muted rounded-none w-1/5" />
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-muted rounded-none w-full" />
              <div className="h-4 bg-muted rounded-none w-5/6" />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="h-6 bg-muted rounded-none w-20" />
              <div className="h-6 bg-muted rounded-none w-24" />
              <div className="h-6 bg-muted rounded-none w-16" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "text") {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="space-y-2">
        <div className="h-4 bg-muted rounded-none w-full" />
        <div className="h-4 bg-muted rounded-none w-5/6" />
        <div className="h-4 bg-muted rounded-none w-4/5" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("animate-pulse", className)}>
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded-none w-3/4" />
        <div className="h-4 bg-muted rounded-none w-1/2" />
        <div className="h-4 bg-muted rounded-none w-5/6" />
      </div>
    </div>
  )
}

export function PageLoadingSkeleton() {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-muted rounded-none w-32 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-8 w-8 bg-muted rounded-none animate-pulse" />
            <div className="h-8 w-8 bg-muted rounded-none animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 mt-12">
          <div className="h-12 bg-muted rounded-none w-full animate-pulse" />
          <div className="h-6 bg-muted rounded-none w-3/4 animate-pulse" />
          <div className="h-6 bg-muted rounded-none w-5/6 animate-pulse" />
          <div className="h-6 bg-muted rounded-none w-2/3 animate-pulse" />
        </div>

        {/* Progress indicator */}
        <div className="mt-8">
          <div className="h-1 bg-muted rounded-none overflow-hidden">
            <div className="h-full bg-primary rounded-none animate-[loading_1.5s_ease-in-out_infinite] origin-left" style={{ width: "30%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
