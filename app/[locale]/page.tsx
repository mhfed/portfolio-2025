import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { LetsCollaborateSection } from "@/components/lets-collaborate-section"
import { ScrollObserver } from "@/components/scroll-observer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingCTA } from "@/components/floating-cta"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <main className="w-full">
      <ScrollObserver />
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Divider */}
      <SectionDivider />
      
      {/* About Section */}
      <div className="scroll-animate">
        <AboutSection />
      </div>
      
      {/* Divider */}
      <SectionDivider />
      
      {/* Work Experience Section */}
      <div className="scroll-animate">
        <WorkExperienceSection />
      </div>
      
      {/* Divider */}
      <SectionDivider />
      
      {/* Projects Section */}
      <div className="scroll-animate">
        <ProjectsSection />
      </div>
      
      {/* Divider */}
      <SectionDivider />
      
      {/* Collaborate Section */}
      <div className="scroll-animate">
        <LetsCollaborateSection />
      </div>
      
      {/* Floating Actions */}
      <FloatingCTA />
      <ScrollToTop />
    </main>
  )
}
