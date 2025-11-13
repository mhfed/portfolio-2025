import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { LetsCollaborateSection } from "@/components/lets-collaborate-section"
import { ScrollObserver } from "@/components/scroll-observer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingCTA } from "@/components/floating-cta"

export default function Home() {
  return (
    <main className="w-full">
      <ScrollObserver />
      <Header />
      <HeroSection />
      <div className="border-t border-border/20"></div>
      <div className="scroll-animate">
        <AboutSection />
      </div>
      <div className="border-t border-border/20"></div>
      <div className="scroll-animate">
        <WorkExperienceSection />
      </div>
      <div className="border-t border-border/20"></div>
      <div className="scroll-animate">
        <ProjectsSection />
      </div>
      <div className="border-t border-border/20"></div>
      <div className="scroll-animate">
        <LetsCollaborateSection />
      </div>
      <FloatingCTA />
      <ScrollToTop />
    </main>
  )
}
