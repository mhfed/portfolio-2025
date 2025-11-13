import { getTranslations } from "next-intl/server"
import { SectionTitleWrapper } from "./section-title-wrapper"
import { ProjectCard } from "./project-card"
import { projects } from "@/data/projects"

export async function ProjectsSection() {
  const t = await getTranslations('projects')

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Title */}
          <SectionTitleWrapper title={t('title')} />

          {/* Right Column - Projects */}
          <div className="md:col-span-2 space-y-12 md:space-y-16 lg:space-y-20">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} isAlternate={idx % 2 === 1} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
