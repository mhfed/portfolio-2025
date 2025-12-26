import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:scale-105 hover:shadow-sm',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 hover:shadow-sm',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:scale-105 hover:shadow-sm',
        outline:
          'text-foreground border-border/30 hover:border-primary/50 hover:bg-primary/5 hover:scale-105',
        primary:
          'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/40 hover:scale-105 hover:shadow-sm',
        cyan: 'bg-[var(--cyan)]/10 border-[var(--cyan)]/30 text-[var(--cyan)] hover:bg-[var(--cyan)]/20 hover:border-[var(--cyan)]/50 hover:scale-105 hover:shadow-sm hover:shadow-[var(--cyan)]/20',
        green:
          'bg-[var(--green)]/10 border-[var(--green)]/30 text-[var(--green)] hover:bg-[var(--green)]/20 hover:border-[var(--green)]/50 hover:scale-105 hover:shadow-sm hover:shadow-[var(--green)]/20',
        purple:
          'bg-[var(--purple)]/10 border-[var(--purple)]/30 text-[var(--purple)] hover:bg-[var(--purple)]/20 hover:border-[var(--purple)]/50 hover:scale-105 hover:shadow-sm hover:shadow-[var(--purple)]/20',
        blue: 'bg-[var(--blue)]/10 border-[var(--blue)]/30 text-[var(--blue)] hover:bg-[var(--blue)]/20 hover:border-[var(--blue)]/50 hover:scale-105 hover:shadow-sm hover:shadow-[var(--blue)]/20',
        magenta:
          'bg-[var(--magenta)]/10 border-[var(--magenta)]/30 text-[var(--magenta)] hover:bg-[var(--magenta)]/20 hover:border-[var(--magenta)]/50 hover:scale-105 hover:shadow-sm hover:shadow-[var(--magenta)]/20',
        yellow:
          'bg-[var(--yellow)]/10 border-[var(--yellow)]/30 text-[var(--yellow)] hover:bg-[var(--yellow)]/20 hover:border-[var(--yellow)]/50 hover:scale-105 hover:shadow-sm hover:shadow-[var(--yellow)]/20',
      },
      size: {
        default: 'px-3 py-1 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
