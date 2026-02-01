'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SafariProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string
  src?: string
}

export const Safari = React.forwardRef<HTMLDivElement, SafariProps>(
  ({ className, url, src, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-md border bg-background shadow-xl',
          className
        )}
        {...props}
      >
        <div className='flex h-9 items-center justify-start border-b bg-muted/40 px-3'>
          <div className='flex space-x-1.5'>
            <div className='h-3 w-3 rounded-full bg-red-500/80' />
            <div className='h-3 w-3 rounded-full bg-yellow-500/80' />
            <div className='h-3 w-3 rounded-full bg-green-500/80' />
          </div>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-6 w-full max-w-[50%] items-center justify-center rounded-md bg-background/50 text-[10px] font-medium text-muted-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.05)]'>
            {url}
          </div>
        </div>
        <div className='relative w-full aspect-16/10 bg-muted/20'>
          {src && (
            <Image
              src={src}
              alt='Safari Content'
              fill
              className='object-cover object-top'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          )}
        </div>
      </div>
    )
  }
)
Safari.displayName = 'Safari'
