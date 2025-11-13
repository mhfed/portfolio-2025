import { Suspense } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { LetsCollaborateSection } from "@/components/lets-collaborate-section"
import { ScrollObserver } from "@/components/scroll-observer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { FloatingCTA } from "@/components/floating-cta"

export default function Home() {
  return (
    <main className="w-full">
      <ScrollObserver />
      <Header />
      <Suspense fallback={<LoadingSkeleton variant="hero" className="min-h-screen flex items-center justify-center" />}>
        <HeroSection />
      </Suspense>
      <div className="border-t border-border/20"></div>
      <div className="scroll-animate">
        <Suspense fallback={<LoadingSkeleton variant="text" className="min-h-screen flex items-center justify-center" />}>
          <AboutSection />
        </Suspense>
      </div>
      <div className="border-t border-border/20"></div>
      <div className="scroll-animate">
        <Suspense fallback={<LoadingSkeleton variant="timeline" className="min-h-screen flex items-center justify-center" />}>
          <WorkExperienceSection />
        </Suspense>
      </div>
      <div className="border-t border-border/20"></div>
      <div className="scroll-animate">
        <Suspense fallback={<LoadingSkeleton variant="project" className="min-h-screen flex items-center justify-center" />}>
          <ProjectsSection />
        </Suspense>
      </div>
      <div className="border-t border-border/20"></div>
      <div className="scroll-animate">
        <Suspense fallback={<LoadingSkeleton variant="text" className="min-h-screen flex items-center justify-center" />}>
          <LetsCollaborateSection />
        </Suspense>
      </div>
      <FloatingCTA />
      <ScrollToTop />
    </main>
  )
}
