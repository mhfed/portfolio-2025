interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={`w-full h-px bg-border/60 relative z-10 ${className}`}
      aria-hidden="true"
      role="separator"
    />
  );
}
