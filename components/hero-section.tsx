import { getTranslations } from 'next-intl/server'
import { Github, Linkedin } from 'lucide-react'
import { HeroTypingText } from './hero-typing-text'
import { HeroTextBlocks } from './hero-text-blocks'
import { ResumeDownloadButton } from './resume-download-button'
import { Button } from './ui/button'
import { TechMarquee } from './tech-marquee'
import { SocialsDock } from './socials-dock'
import Image from 'next/image'
import HeroOutlineFill from './hero-name'
import HeroName from './hero-name'

export async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section className='relative flex flex-col justify-between px-4 pt-16 md:px-6 md:pt-12 lg:pt-16'>
      {/* Main Content */}
      <div className='relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-0 md:px-2 lg:px-4'>
        <div className='flex flex-col items-start justify-between gap-6 overflow-visible md:flex-row md:gap-6 lg:gap-8'>
          {/* Left column: Name + Text blocks */}
          <div className='space-y-5 md:space-y-6 overflow-visible'>
            {/* Name Section */}
            <div className='relative flex w-full flex-col gap-2 overflow-visible md:gap-4'>
              {/* <HeroTypingText
                frontText={t('front')}
                middleText={t('middle')}
                endText={t('end')}
              /> */}
              <HeroName />
            </div>

            <div className='flex items-center gap-2 md:gap-3'>
              <SocialsDock />
            </div>
            <ResumeDownloadButton />

            {/* Text Blocks - Below Name */}
          </div>

          {/* Download Resume Button & Social Links */}
          <div className='relative overflow-hidden rounded-lg'>
            <Image
              src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
              alt='Hero Avatar'
              width={300}
              height={400}
              priority={true}
              className='aspect-3/4 w-full max-w-[240px] object-cover object-top md:max-w-[260px] lg:max-w-[280px]'
            />

            <div className='absolute bottom-0 right-0 z-20 flex w-full items-center justify-center gap-2 bg-foreground backdrop-blur-sm md:gap-3'>
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
