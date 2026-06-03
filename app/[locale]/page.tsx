import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { WorkExperienceSection } from '@/components/work-experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { BlogSection } from '@/components/blog-section'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { getLocale } from 'next-intl/server'
import { GlobalSpotlight } from '@/components/global-spotlight'
import { TechMarquee } from '@/components/tech-marquee'

export default async function Home() {
  const locale = await getLocale()

  return (
    <>
      <GlobalSpotlight />
      
      {/* Main Content Wrapper (z-10 to slide over the footer) */}
      <main className='relative z-10 w-full bg-background shadow-[0_20px_50px_rgba(0,0,0,0.8)] pb-10 md:pb-14'>
        <Header />

        <HeroSection />

        <div className='mx-auto max-w-7xl space-y-16 px-4 pb-10 md:px-6 md:pb-14 lg:space-y-24'>
          <AboutSection />
        </div>
        
        <TechMarquee />

        <div className='mx-auto max-w-7xl space-y-16 px-4 pb-10 md:px-6 md:pb-14 lg:space-y-24 mt-16 lg:mt-24'>
          <WorkExperienceSection />
          <ProjectsSection />
          <BlogSection />
        </div>

        <ScrollToTop />
      </main>

      {/* Curtain Footer (Fixed at bottom, z-0) */}
      <div className="fixed bottom-0 left-0 w-full z-0 footer-curtain-wrapper">
        <Footer locale={locale} />
      </div>
    </>
  )
}
