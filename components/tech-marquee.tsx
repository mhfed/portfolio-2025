import StackIcon from "tech-stack-icons";

const technologies = [
  { name: "React", iconName: "react" as const, color: "blue" },
  { name: "Next.js", iconName: "nextjs" as const, color: "slate" },
  { name: "TypeScript", iconName: "typescript" as const, color: "cyan" },
  { name: "Tailwind CSS", iconName: "tailwindcss" as const, color: "emerald" },
  { name: "JavaScript", iconName: "js" as const, color: "amber" },
  { name: "HTML5", iconName: "html5" as const, color: "orange" },
  { name: "CSS3", iconName: "css3" as const, color: "indigo" },
  { name: "jQuery", iconName: "jquery" as const, color: "purple" },
];

const colorClasses = {
  blue: "bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50",
  slate:
    "bg-slate-500/10 border-slate-500/30 text-slate-400 hover:bg-slate-500/20 hover:border-slate-500/50",
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50",
  emerald:
    "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50",
  amber:
    "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50",
  orange:
    "bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50",
  indigo:
    "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/50",
  purple:
    "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/50",
};

export function TechMarquee() {
  return (
    <div className="w-full relative overflow-hidden border-y border-border/20 bg-gradient-to-r from-background via-primary/5 to-background backdrop-blur-sm">
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
