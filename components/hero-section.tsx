import { TechStack } from "./tech-stack"
import { DesktopIcons } from "./desktop-icons"
import { TechMarquee } from "./tech-marquee"

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Main Content */}
      <div className="max-w-5xl w-full flex flex-col items-center gap-8 md:gap-12">
        {/* Main Heading */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground">FRONT</h1>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-3 h-3 md:w-4 md:h-4 bg-accent rounded-xs" />
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground">END</h1>
          </div>

          {/* Desktop Icons Box */}
          <DesktopIcons />
        </div>

        {/* Tech Stack & Developer Text */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <TechStack />
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-primary">DEVELOPER</h2>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <TechMarquee />
      </div>
    </section>
  )
}
