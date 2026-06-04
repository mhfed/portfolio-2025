import { Header } from '@/components/organisms/header'
import { HeroSection } from '@/components/organisms/hero-section'
import { AboutSection } from '@/components/organisms/about-section'
import { SkillsSection } from '@/components/organisms/skills-section'
import { WorkExperienceSection } from '@/components/organisms/work-experience-section'
import { ProjectsSection } from '@/components/organisms/projects-section'
import { Footer } from '@/components/organisms/footer'
import { ScrollToTop } from '@/components/atoms/scroll-to-top'
import { getLocale } from 'next-intl/server'

export default async function Home() {
  const locale = await getLocale()

  return (
    <main className='w-full'>
      <Header />

      <div>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkExperienceSection />
        <ProjectsSection />
        <Footer locale={locale} />
      </div>

      <ScrollToTop />
    </main>
  )
}
