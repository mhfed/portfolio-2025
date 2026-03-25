interface SectionTitleProps {
  title: React.ReactNode
  className?: string
}

export function SectionTitle({ title, className = '' }: SectionTitleProps) {
  return (
    <div className={`mb-5 md:mb-7 ${className}`}>
      <span className='section-kicker mb-3'>overview</span>
      <h2 className='font-display text-3xl font-semibold leading-[0.95] tracking-[-0.06em] text-foreground md:text-4xl lg:text-5xl'>
        {title}
      </h2>
      <div className='soft-divider mt-4' />
    </div>
  )
}
