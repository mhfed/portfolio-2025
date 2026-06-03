import { Header } from '@/components/organisms/header'
import { HeroSection } from '@/components/organisms/hero-section'
import { AboutSection } from '@/components/organisms/about-section'
import { WorkExperienceSection } from '@/components/organisms/work-experience-section'
import { ProjectsSection } from '@/components/organisms/projects-section'
import { Footer } from '@/components/organisms/footer'
import { ScrollToTop } from '@/components/atoms/scroll-to-top'
import { getLocale } from 'next-intl/server'

export default async function Home() {
  const locale = await getLocale()

  return (
    <main className='w-full pb-10 md:pb-14'>
      <Header />

      <HeroSection />

      <div className='mx-auto max-w-7xl space-y-16 px-4 pt-16 pb-10 md:px-6 md:pt-20 md:pb-14 lg:space-y-24 lg:pt-24'>
        <AboutSection />
        <WorkExperienceSection />
        <ProjectsSection />
        <Footer locale={locale} />
      </div>

      <ScrollToTop />
    </main>
  )
}
