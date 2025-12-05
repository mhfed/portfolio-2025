import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center gap-2 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        primary:
          "px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-md text-primary transition-all hover:scale-105",
        ghost:
          "px-4 py-2 bg-background hover:bg-primary/10 border border-border/30 rounded-md text-foreground transition-all hover:scale-105",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

const UiLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      size,
      href,
      external = false,
      children,
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        {children}
        {external && <ExternalLink className="h-4 w-4" />}
      </>
    );

    if (external || href.startsWith("http")) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkVariants({ variant, size }), className)}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </Link>
    );
  },
);
UiLink.displayName = "Link";

export { UiLink, linkVariants };
