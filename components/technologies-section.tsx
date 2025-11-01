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
      description: "HTML, CSS, JavaScript, TypeScript, React.js, Next.js",
      isBlue: true,
    },
    {
      icon: "🔄",
      title: "STATE MANAGEMENT",
      description: "Redux for efficient application state management",
      isBlue: false,
    },
    {
      icon: "🎨",
      title: "UI LIBRARIES",
      description: "Material-UI, Ant Design, Tailwind CSS, Bootstrap, Sass",
      isBlue: true,
    },
    {
      icon: "📱",
      title: "MOBILE",
      description: "React Native, RN Reanimated for mobile app development",
      isBlue: false,
    },
    {
      icon: "🔌",
      title: "APIS & PROTOCOLS",
      description: "RESTful APIs, WebSockets, SSE for real-time features",
      isBlue: true,
    },
    {
      icon: "🛠️",
      title: "TOOLS & UTILITIES",
      description: "Git, Webpack, Babel, Firebase, Axios, i18n",
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
