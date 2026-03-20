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
import { Separator } from '@/components/ui/separator'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { getLocale } from 'next-intl/server'

export default async function Home() {
  const locale = await getLocale()

  return (
    <main className='w-full pb-12 md:pb-16 lg:pb-20'>
      {/* <ScrollObserver /> */}

      <Header />

      {/* Hero Section */}
      <HeroSection />

      <Separator className='my-6 md:my-8 lg:my-10' />

      {/* About Section */}
      <AboutSection />

      <Separator className='my-6 md:my-8 lg:my-10' />

      {/* Work Experience Section */}
      <WorkExperienceSection />

      <Separator className='my-6 md:my-8 lg:my-10' />

      {/* Projects Section */}
      <ProjectsSection />

      <Separator className='my-6 md:my-8 lg:my-10' />

      {/* Blog Section */}
      <BlogSection />

      <Separator className='my-6 md:my-8 lg:my-10' />

      {/* Footer with Collaborate Section */}
      <Footer locale={locale} />

      {/* Floating Actions */}
      <FloatingCTA />
      <ScrollToTop />
    </main>
  )
}
