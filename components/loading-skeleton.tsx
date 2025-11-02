"use client"

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className = "" }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-5/6" />
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
          <div className="h-8 bg-muted rounded w-32 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-8 w-8 bg-muted rounded animate-pulse" />
            <div className="h-8 w-8 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 mt-12">
          <div className="h-12 bg-muted rounded w-full animate-pulse" />
          <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-muted rounded w-5/6 animate-pulse" />
          <div className="h-6 bg-muted rounded w-2/3 animate-pulse" />
        </div>

        {/* Progress indicator */}
        <div className="mt-8">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-[loading_1.5s_ease-in-out_infinite] origin-left" style={{ width: "30%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
