interface SectionTitleProps {
  title: string
  className?: string
}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex items-center gap-3 md:gap-4 lg:gap-8 mb-8 md:mb-12 lg:mb-16 ${className}`}>
      <span className="text-2xl md:text-3xl lg:text-4xl text-accent font-black tracking-tighter">&lt;</span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-foreground">{title}</h2>
      <span className="text-2xl md:text-3xl lg:text-4xl text-accent font-black tracking-tighter">/&gt;</span>
    </div>
  )
}
