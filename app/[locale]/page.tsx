import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { WorkExperienceSection } from '@/components/work-experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { BlogSection } from '@/components/blog-section'
import { Footer } from '@/components/footer'
import { ScrollObserver } from '@/components/scroll-observer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { FloatingCTA } from '@/components/floating-cta'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { getLocale } from 'next-intl/server'

export default async function Home() {
  const locale = await getLocale()

  return (
    <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden'>
      <div className='layout-container flex h-full grow flex-col items-center'>
        <Header />

        <main className='w-full flex-1'>
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AboutSection />

          {/* Work Experience Section */}
          <WorkExperienceSection />

          {/* Projects Section */}
          <ProjectsSection />

          {/* Blog Section */}
          <BlogSection />
        </main>

        {/* Collaborate & Footer */}
        <Footer locale={locale} />

        {/* Floating Actions */}
        <FloatingCTA />
        <ScrollToTop />
      </div>
    </div>
  )
}
