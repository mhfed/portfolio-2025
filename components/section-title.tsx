interface SectionTitleProps {
  title: React.ReactNode;
  className?: string;
}

export function SectionTitle({ title, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`text-h2 md:text-h1 text-foreground font-bold mb-8 md:mb-12 ${className}`}
    >
      {title}
    </h2>
  );
}
