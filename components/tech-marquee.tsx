const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "jQuery"]

export function TechMarquee() {
  return (
    <div className="w-full bg-gradient-to-r from-background via-primary/5 to-background py-8 overflow-hidden border-y border-border/20">
      {/* First row - left to right */}
      <div className="flex gap-8 mb-6 animate-marquee whitespace-nowrap">
        {[...technologies, ...technologies].map((tech, i) => (
          <span key={`row1-${i}`} className="text-lg md:text-xl font-bold text-primary/80 flex items-center gap-8">
            {tech}
            <span className="w-2 h-2 bg-accent rounded-full" />
          </span>
        ))}
      </div>

      {/* Second row - right to left */}
      <div className="flex gap-8 animate-marquee-reverse whitespace-nowrap">
        {[...technologies].reverse().map((tech, i) => (
          <span key={`row2-${i}`} className="text-lg md:text-xl font-bold text-accent/80 flex items-center gap-8">
            {tech}
            <span className="w-2 h-2 bg-primary rounded-full" />
          </span>
        ))}
      </div>
    </div>
  )
}
