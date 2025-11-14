export function TechStack() {
  const icons = [
    { name: "Figma", icon: "◐" },
    { name: "CSS", icon: "{}" },
    { name: "React", icon: "⚛" },
  ]

  return (
    <div className="border-2 border-foreground/30 dark:border-primary/50 rounded-none px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3 hover:border-primary/60 transition-colors">
      {icons.map((item, index) => (
        <div key={item.name} className="flex items-center justify-center">
          {index > 0 && <div className="w-px h-6 md:h-8 bg-border/40 mx-1 md:mx-2" />}
          <span className="text-sm md:text-base font-semibold text-foreground/80 min-w-6 text-center">{item.icon}</span>
        </div>
      ))}
    </div>
  )
}
