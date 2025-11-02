import { getTranslations } from "next-intl/server"
import { TechStack } from "./tech-stack"
import { DesktopIcons } from "./desktop-icons"
import { TechMarquee } from "./tech-marquee"
import { HeroBackground } from "./hero-background"
import { HeroTypingText, HeroDeveloperText } from "./hero-typing-text"

export async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <HeroBackground />

      {/* Main Content */}
      <div className="max-w-5xl w-full flex flex-col items-center gap-8 md:gap-12 relative z-10">
        {/* Main Heading */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <HeroTypingText 
            frontText={t('front')} 
            endText={t('end')}
          />

          {/* Desktop Icons Box */}
          <DesktopIcons />
        </div>

        {/* Tech Stack & Developer Text */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <TechStack />
          <HeroDeveloperText developerText={t('developer')} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <TechMarquee />
      </div>
    </section>
  )
}
