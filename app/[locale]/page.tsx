import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { WorkExperienceSection } from '@/components/work-experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { BlogSection } from '@/components/blog-section'
import { LetsCollaborateSection } from '@/components/lets-collaborate-section'
import { ScrollObserver } from '@/components/scroll-observer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { FloatingCTA } from '@/components/floating-cta'
import { Separator } from '@/components/ui/separator'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function Home() {
  return (
    <main className='w-full pb-20 md:pb-24 lg:pb-28'>
      {/* <ScrollObserver /> */}

      <Header />

      {/* Hero Section */}
      <HeroSection />

      <Separator className='my-12' />

      {/* About Section */}
      <AboutSection />

      <Separator className='my-12' />

      {/* Work Experience Section */}
      <WorkExperienceSection />

      <Separator className='my-12' />

      {/* Projects Section */}
      <ProjectsSection />

      <Separator className='my-12' />

      {/* Blog Section */}
      <BlogSection />

      <Separator className='my-12' />

      {/* Collaborate Section */}
      <LetsCollaborateSection />

      {/* Floating Actions */}
      <FloatingCTA />
      <ScrollToTop />
    </main>
  )
}
