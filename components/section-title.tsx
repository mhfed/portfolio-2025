interface SectionTitleProps {
  title: React.ReactNode
  className?: string
}

export function SectionTitle({ title, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`text-2xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-primary font-bold mb-8 md:mb-12 uppercase ${className}`}
    >
      {title}
    </h2>
  )
}
