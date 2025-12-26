import { getTranslations } from 'next-intl/server'
import { Github, Linkedin } from 'lucide-react'
import { HeroTypingText } from './hero-typing-text'
import { HeroTitleBadge } from './hero-title-badge'
import { HeroTextBlocks } from './hero-text-blocks'
import { ResumeDownloadButton } from './resume-download-button'
import { Button } from './ui/button'
import { TechMarquee } from './tech-marquee'
import { SocialsDock } from './socials-dock'

export async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section className='flex flex-col justify-between pt-24 md:pt-28 px-6 relative'>
      {/* Main Content */}
      <div className='flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto relative z-10 px-4 md:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 md:gap-10 items-start overflow-visible'>
          {/* Left column: Name + Text blocks */}
          <div className='space-y-8 md:space-y-10 overflow-visible'>
            {/* Name Section */}
            <div className='relative w-full flex flex-col gap-4 md:gap-6 overflow-visible'>
              <HeroTypingText
                frontText={t('front')}
                middleText={t('middle')}
                endText={t('end')}
              />
            </div>
            {/* Text Blocks - Below Name */}
          </div>

          {/* Right column: Title badge + actions */}
          <div className='flex flex-col items-start md:items-end gap-6 md:gap-8'>
            {/* Title Badge - Right of Name */}
            <div className='flex items-center md:items-start md:pt-2'>
              <HeroTitleBadge />
            </div>

            {/* Download Resume Button & Social Links */}
            <div className='mt-4 md:mt-8 flex flex-col items-start md:items-end gap-6'>
              <ResumeDownloadButton />
              <div className='flex items-center gap-4'>
                <SocialsDock />
              </div>
            </div>
          </div>
        </div>
        <HeroTextBlocks />
      </div>

      {/* Tech Marquee */}
      <TechMarquee />
    </section>
  )
}
