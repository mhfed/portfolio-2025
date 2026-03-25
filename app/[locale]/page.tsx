import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { WorkExperienceSection } from '@/components/work-experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { BlogSection } from '@/components/blog-section'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { getLocale } from 'next-intl/server'

export default async function Home() {
  const locale = await getLocale()

  return (
    <main className='w-full pb-10 md:pb-14'>
      <Header />

      <HeroSection />

      <div className='mx-auto max-w-[1280px] space-y-16 px-4 pb-10 md:px-6 md:pb-14 lg:space-y-24'>
        <AboutSection />
        <ProjectsSection />
        <WorkExperienceSection />
        <BlogSection />
        <Footer locale={locale} />
      </div>

      <ScrollToTop />
    </main>
  )
}
