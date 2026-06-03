import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectRepositoryCardProps {
  image: string
  title: string
  year: string
  description: string
  details: string
  liveUrl?: string
  githubUrl?: string
  techStack: string[]
  isEven?: boolean
  isFirst?: boolean
}

export function ProjectRepositoryCard({
  image,
  title,
  year,
  description,
  details,
  techStack,
  liveUrl,
  githubUrl,
  isEven = false,
  isFirst = false,
}: ProjectRepositoryCardProps) {
  // Split details/responsibilities by newlines to render formatted items
  const detailsList = details
    ? details
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
    : []

  // Extract friendly hostname for the macOS address bar
  const getDisplayDomain = (url?: string) => {
    if (!url) return "localhost:3000"
    try {
      // Remove 'www.' prefix for a cleaner address bar look
      return new URL(url).hostname.replace(/^www\./, "")
    } catch {
      return "project.local"
    }
  }

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col justify-between py-10 lg:py-16",
        isFirst ? "" : "border-t border-border/40"
      )}
    >
      <div 
        className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center"
      >
        {/* Fake MacBook Pro Mockup Container */}
        <div
          className={cn(
            "relative mx-auto w-full max-w-[540px]",
            isEven ? "lg:order-2" : "lg:order-1"
          )}
        >
          {/* Subtle accent glow behind the screen */}
          <div className="absolute inset-0 -z-10 rounded-t-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-b from-primary/15 to-transparent blur-2xl pointer-events-none" />

          {/* MacBook Screen Lid */}
          <div className="relative rounded-t-[20px] border-[10px] border-b-[14px] border-zinc-950 bg-zinc-950 p-0.5 shadow-2xl ring-1 ring-black/40 dark:ring-white/10">
            {/* Front Camera dot */}
            <div className="absolute left-1/2 top-[3px] -translate-x-1/2 z-20 flex h-2 w-2 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 dark:bg-zinc-700 ring-1 ring-white/10 flex items-center justify-center">
                <span className="h-0.5 w-0.5 rounded-full bg-sky-500/60" />
              </span>
            </div>

            {/* Display screen area with rounded corners matching modern macOS screen corners */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[8px] rounded-b-[2px] bg-[#121212] border border-black/80">
              {/* Vertical Scrolling Project Screenshot */}
              <img
                src={image}
                alt={title}
                className="absolute left-0 top-0 w-full h-auto origin-top transition-transform duration-[6000ms] ease-in-out group-hover:-translate-y-[76%] will-change-transform"
                loading="lazy"
              />
              
              {/* Subtle glass glare overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent z-10" />
            </div>
          </div>

          {/* MacBook Keyboard Base */}
          <div className="relative z-10 h-[11px] w-[110%] -left-[5%] rounded-b-[12px] bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-400 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900 border-t border-white/40 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.5)]">
            {/* Display screen opening notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[5px] bg-zinc-950 dark:bg-black rounded-b-[4px]" />
          </div>

          {/* Shadow underneath */}
          <div className="absolute -bottom-4 left-[-4%] w-[108%] h-4 bg-black/20 dark:bg-black/35 blur-md rounded-full pointer-events-none" />
        </div>

        {/* Card Metadata and details */}
        <div
          className={cn(
            "flex flex-col justify-center",
            isEven ? "lg:order-1" : "lg:order-2"
          )}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary/80">
              {year || "Selected"}
            </span>
            <span className="h-px w-8 bg-primary/30" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              Project case
            </span>
          </div>

          <h3 className="mt-3 font-display text-2xl font-bold leading-[1.1] tracking-[-0.05em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-3xl lg:text-4xl">
            {title}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            {description}
          </p>

          {/* Structured Responsibilities/Details list */}
          {detailsList.length > 0 && (
            <ul className="mt-5 space-y-2.5 border-t border-dashed border-white/10 pt-5">
              {detailsList.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs leading-relaxed text-foreground/60 md:text-sm"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack Badges */}
          {techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/10 bg-primary/[0.03] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Link Buttons */}
          {(liveUrl || githubUrl) && (
            <div className="mt-6 flex items-center gap-5 border-t border-white/5 pt-5 text-xs font-semibold md:text-sm">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary-strong dark:hover:text-primary/80"
                >
                  Launch App
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground/70 transition-colors hover:text-foreground"
                >
                  Source Code
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
