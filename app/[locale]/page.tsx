import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { LetsCollaborateSection } from "@/components/lets-collaborate-section"
import { ScrollObserver } from "@/components/scroll-observer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="w-full">
      <ScrollObserver />
      <Header />
      <HeroSection />
      <div className="scroll-animate">
        <AboutSection />
      </div>
      <div className="scroll-animate">
        <WorkExperienceSection />
      </div>
      <div className="scroll-animate">
        <ProjectsSection />
      </div>
      <div className="scroll-animate">
        <LetsCollaborateSection />
      </div>
      <ScrollToTop />
    </main>
  )
}
