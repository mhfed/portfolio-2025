import { SectionTitle } from "./section-title"

interface ProjectProps {
  image: string
  title: string
  year: string
  description: string
  details: string
}

function ProjectCard({
  image,
  title,
  year,
  description,
  details,
  isAlternate,
}: ProjectProps & { isAlternate: boolean }) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 items-center scroll-animate ${isAlternate ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="relative h-80 md:h-96 bg-muted rounded-xl overflow-hidden border border-border/20">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-primary">{title}</h3>
          <p className="text-sm text-muted-foreground">{year}</p>
        </div>
        <p className="text-foreground text-lg font-semibold">{description}</p>
        <p className="text-base text-foreground leading-relaxed">{details}</p>
        <button className="text-accent font-bold text-lg hover:opacity-80 transition-opacity mt-4">
          VIEW PROJECT →
        </button>
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const projects: ProjectProps[] = [
    {
      image: "/luxury-jewelry-store.jpg",
      title: "SVETLILY",
      year: "[2018]",
      description: "Online jewelry store",
      details:
        "To implement the online store functionality, I used the OpenCart platform, because it has many necessary features from the box.",
    },
    {
      image: "/ecommerce-website.jpg",
      title: "E-COMMERCE",
      year: "[2020]",
      description: "Premium shopping experience",
      details:
        "Built a modern e-commerce platform with React and Node.js, featuring real-time inventory management and secure payment integration.",
    },
    {
      image: "/luxury-jewelry-store.jpg",
      title: "BRAND PLATFORM",
      year: "[2023]",
      description: "Corporate brand website",
      details:
        "Designed and developed a comprehensive brand platform with custom animations, CMS integration, and multi-language support.",
    },
  ]

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-24 px-6 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto w-full space-y-20">
        <SectionTitle title="PROJECTS" />
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} isAlternate={idx % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
