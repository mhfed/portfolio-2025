import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border/30",
        primary:
          "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20",
        cyan: "bg-[var(--cyan)]/10 border-[var(--cyan)]/20 text-[var(--cyan)] hover:bg-[var(--cyan)]/20",
        green: "bg-[var(--green)]/10 border-[var(--green)]/20 text-[var(--green)] hover:bg-[var(--green)]/20",
        pink: "bg-[var(--pink)]/10 border-[var(--pink)]/20 text-[var(--pink)] hover:bg-[var(--pink)]/20",
        orange: "bg-[var(--orange)]/10 border-[var(--orange)]/20 text-[var(--orange)] hover:bg-[var(--orange)]/20",
        yellow: "bg-[var(--yellow)]/10 border-[var(--yellow)]/20 text-[var(--yellow)] hover:bg-[var(--yellow)]/20",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
