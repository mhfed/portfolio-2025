interface SectionTitleProps {
  title: string
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-4 md:gap-8 mb-12 md:mb-16">
      <span className="text-3xl md:text-4xl text-accent font-black tracking-tighter">&lt;</span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground">{title}</h2>
      <span className="text-3xl md:text-4xl text-accent font-black tracking-tighter">/&gt;</span>
    </div>
  )
}
