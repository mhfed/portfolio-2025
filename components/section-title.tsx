interface SectionTitleProps {
  title: React.ReactNode
  className?: string
}

export function SectionTitle({ title, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`mb-4 text-2xl font-bold uppercase leading-tight tracking-tight text-primary md:mb-6 md:text-3xl lg:text-4xl ${className}`}
    >
      {title}
    </h2>
  )
}
