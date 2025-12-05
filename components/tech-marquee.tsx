import StackIcon from "tech-stack-icons";

const technologies = [
  { name: "React", iconName: "react" as const, color: "primary" },
  { name: "Next.js", iconName: "nextjs" as const, color: "pink" },
  { name: "TypeScript", iconName: "typescript" as const, color: "cyan" },
  { name: "Tailwind CSS", iconName: "tailwindcss" as const, color: "green" },
  { name: "JavaScript", iconName: "js" as const, color: "yellow" },
  { name: "HTML5", iconName: "html5" as const, color: "orange" },
  { name: "CSS3", iconName: "css3" as const, color: "primary" },
  { name: "jQuery", iconName: "jquery" as const, color: "pink" },
];

const colorClasses = {
  primary: "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50",
  cyan: "bg-[var(--cyan)]/10 border-[var(--cyan)]/30 text-[var(--cyan)] hover:bg-[var(--cyan)]/20 hover:border-[var(--cyan)]/50",
  green: "bg-[var(--green)]/10 border-[var(--green)]/30 text-[var(--green)] hover:bg-[var(--green)]/20 hover:border-[var(--green)]/50",
  yellow: "bg-[var(--yellow)]/10 border-[var(--yellow)]/30 text-[var(--yellow)] hover:bg-[var(--yellow)]/20 hover:border-[var(--yellow)]/50",
  orange: "bg-[var(--orange)]/10 border-[var(--orange)]/30 text-[var(--orange)] hover:bg-[var(--orange)]/20 hover:border-[var(--orange)]/50",
  pink: "bg-[var(--pink)]/10 border-[var(--pink)]/30 text-[var(--pink)] hover:bg-[var(--pink)]/20 hover:border-[var(--pink)]/50",
};

export function TechMarquee() {
  return (
    <div className="w-full relative overflow-hidden border-y border-border/20 backdrop-blur-sm">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="py-10 md:py-12">
        {/* First row - left to right */}
        <div className="flex gap-4 mb-6 animate-marquee whitespace-nowrap">
          {[...technologies, ...technologies].map((tech, i) => (
            <div
              key={`row1-${i}`}
              className={`group shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-md border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2  ${
                colorClasses[tech.color as keyof typeof colorClasses]
              }`}
            >
              <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
                <StackIcon
                  name={tech.iconName}
                  variant="dark"
                  className="w-full h-full"
                />
              </div>
              <span className="text-sm md:text-base lg:text-lg font-semibold tracking-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Second row - right to left */}
        <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap">
          {[...technologies]
            .reverse()
            .concat([...technologies].reverse())
            .map((tech, i) => (
              <div
                key={`row2-${i}`}
                className={`group shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-md border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg  flex items-center gap-2 ${
                  colorClasses[tech.color as keyof typeof colorClasses]
                }`}
              >
                <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
                  <StackIcon
                    name={tech.iconName}
                    variant="dark"
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm md:text-base lg:text-lg font-semibold tracking-tight">
                  {tech.name}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
