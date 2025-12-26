import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 resize-none hover:border-primary/30',
  {
    variants: {
      variant: {
        default:
          'border-border/30 focus-visible:border-primary focus-visible:shadow-md focus-visible:shadow-primary/10',
        error:
          'border-destructive focus-visible:border-destructive focus-visible:shadow-md focus-visible:shadow-destructive/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
