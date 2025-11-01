import { SectionTitle } from "./section-title"

interface TechCardProps {
  icon: string
  title: string
  description: string
  isBlue?: boolean
}

function TechCard({ icon, title, description, isBlue = true }: TechCardProps) {
  const bgColor = isBlue ? "bg-primary" : "bg-accent"
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 scroll-animate">
      <div
        className={`${bgColor} rounded-xl w-24 h-24 md:w-28 md:h-28 flex items-center justify-center text-white text-4xl md:text-5xl`}
      >
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-black text-foreground mb-2">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export function TechnologiesSection() {
  const technologies: TechCardProps[] = [
    {
      icon: "💻",
      title: "FRONT END",
      description: "HTML / CSS / JS / jQuery / React",
      isBlue: true,
    },
    {
      icon: "📋",
      title: "OPTIMIZATION",
      description: "Integration of layout with Wordpress. Writing basic functionality in PHP.",
      isBlue: false,
    },
    {
      icon: "🗄️",
      title: "BACK END",
      description: "Integration of layout with Wordpress. Writing basic functionality in PHP.",
      isBlue: false,
    },
    {
      icon: "✨",
      title: "CLEAN CODE",
      description: "Integration of layout with Wordpress. Writing basic functionality in PHP.",
      isBlue: true,
    },
    {
      icon: "📱",
      title: "ADAPTIVE",
      description: "Integration of layout with Wordpress. Writing basic functionality in PHP.",
      isBlue: true,
    },
    {
      icon: "🎨",
      title: "BASIC DESIGN",
      description: "Integration of layout with Wordpress. Writing basic functionality in PHP.",
      isBlue: false,
    },
  ]

  return (
    <section
      id="technologies"
      className="min-h-screen flex flex-col justify-center py-24 px-6 bg-background scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <SectionTitle title="MY TECHNOLOGIES" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {technologies.map((tech, idx) => (
            <TechCard key={idx} {...tech} />
          ))}
        </div>
      </div>
    </section>
  )
}
