interface SectionTitleProps {
  title: React.ReactNode
  className?: string
}

export function SectionTitle({ title, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`text-2xl md:text-3xl tracking-tight leading-tight font-bold mb-8 md:mb-12 uppercase mono-text ${className}`}
    >
      {title}
    </h2>
  )
}
