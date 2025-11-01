"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { LetsCollaborateSection } from "@/components/lets-collaborate-section"
import { ScrollObserver } from "@/components/scroll-observer"

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
        <PortfolioSection />
      </div>
      <div className="scroll-animate">
        <LetsCollaborateSection />
      </div>
    </main>
  )
}
