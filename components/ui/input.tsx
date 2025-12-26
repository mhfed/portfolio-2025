import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/30',
  {
    variants: {
      variant: {
        default:
          'border-border/30 focus-visible:border-primary focus-visible:shadow-md focus-visible:shadow-primary/10',
        error:
          'border-destructive focus-visible:border-destructive focus-visible:shadow-md focus-visible:shadow-destructive/10',
      },
      size: {
        default: 'h-10',
        sm: 'h-9 text-xs',
        lg: 'h-11 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
