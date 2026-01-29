import { getTranslations } from 'next-intl/server'
import { Github, Linkedin } from 'lucide-react'
import { HeroTypingText } from './hero-typing-text'
import { HeroTextBlocks } from './hero-text-blocks'
import { ResumeDownloadButton } from './resume-download-button'
import { Button } from './ui/button'
import { TechMarquee } from './tech-marquee'
import { SocialsDock } from './socials-dock'
import Image from 'next/image'

export async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section className='flex flex-col justify-between pt-24 md:pt-20 px-6 relative'>
      {/* Main Content */}
      <div className='flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto relative z-10 px-4 md:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between gap-8 md:gap-10 items-start overflow-visible'>
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

            <div className='flex items-center gap-4'>
              <SocialsDock />
            </div>
            <ResumeDownloadButton />

            {/* Text Blocks - Below Name */}
          </div>

          {/* Download Resume Button & Social Links */}
          <div className='mt-4 relative rounded-lg overflow-hidden'>
            <Image
              src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
              alt='Hero Avatar'
              width={300}
              height={400}
              priority={true}
              className='aspect-3/4 object-cover object-top'
            />

            <div className='flex items-center gap-2 md:gap-3 absolute bottom-0 right-0 z-20 w-full justify-center bg-foreground backdrop-blur-sm'>
              {/* Vietnamese Flag Icon */}
              <div className='flex items-center'>
                <span className='text-lg md:text-xl'>🇻🇳</span>
              </div>

              {/* Title */}
              <span className='text-base md:text-lg lg:text-xl font-medium text-background'>
                {t('developer')}
              </span>
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
