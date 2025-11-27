import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { WorkExperienceSection } from "@/components/work-experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { LetsCollaborateSection } from "@/components/lets-collaborate-section";
import { ScrollObserver } from "@/components/scroll-observer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FloatingCTA } from "@/components/floating-cta";
import { SectionDivider } from "@/components/section-divider";

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
      <AboutSection />

      {/* Divider */}
      <SectionDivider />

      {/* Work Experience Section */}
      <WorkExperienceSection />

      {/* Divider */}
      <SectionDivider />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Divider */}
      <SectionDivider />

      {/* Collaborate Section */}
      <LetsCollaborateSection />

      {/* Floating Actions */}
      <FloatingCTA />
      <ScrollToTop />
    </main>
  );
}
