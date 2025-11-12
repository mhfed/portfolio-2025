interface SectionTitleProps {
  title: string
  className?: string
}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex items-center gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16 min-w-0 ${className}`}>
      <span className="text-h3 md:text-h2 lg:text-h2 text-primary flex-shrink-0">&lt;</span>
      <h2 className="text-h2 text-primary break-words min-w-0 flex-1">{title}</h2>
      <span className="text-h3 md:text-h2 lg:text-h2 text-primary flex-shrink-0">/&gt;</span>
    </div>
  )
}
