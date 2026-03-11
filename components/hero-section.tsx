import { getTranslations } from 'next-intl/server'
import { HeroTextBlocks } from './hero-text-blocks'
import { ResumeDownloadButton } from './resume-download-button'
import { TechMarquee } from './tech-marquee'
import { SocialsDock } from './socials-dock'
import Image from 'next/image'
import { CoreSkillsList } from './core-skills-list'

export async function HeroSection() {
  const t = await getTranslations('hero')
  const tAbout = await getTranslations('about')

  return (
    <section className='w-full max-w-[1200px] mx-auto px-6 py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24'>
        {/* Left column - Hero + Tech Stack */}
        <div className='lg:col-span-8 flex flex-col gap-8'>
          {/* Hero Card */}
          <div className='bg-card border-2 border-foreground p-8 shadow-neo-dark dark:shadow-neo relative overflow-hidden'>
            <div className='absolute top-0 right-0 p-2 opacity-10'>
              <span className='text-[120px] font-bold mono-text'>&lt;/&gt;</span>
            </div>
            <div className='relative z-10'>
              <span className='mono-text text-primary font-bold mb-4 block'>// GREETING_SEQUENCE</span>
              <h1 className='text-5xl md:text-6xl font-bold mb-6 tracking-tighter uppercase leading-[0.9]'>
                {t('front')} <br /> <span className='text-primary'>{t('middle')} {t('end')}</span>
              </h1>
              <p className='text-xl max-w-2xl text-muted-foreground leading-relaxed mb-8'>
                {t('textBlockLeft')}{' '}
                <span className='underline decoration-primary decoration-4 underline-offset-4'>
                  {t('textBlockRight').split(' ').slice(0, 3).join(' ')}
                </span>
              </p>
              <div className='flex flex-wrap gap-4'>
                <a
                  href={`mailto:${t('contact.email')}`}
                  className='bg-primary text-white px-8 py-3 font-bold mono-text shadow-neo-dark transition-all hover:-translate-y-1'
                >
                  INITIATE_CONTACT
                </a>
                <div className='flex items-center gap-2 px-4 py-3 border-2 border-foreground font-bold mono-text text-sm'>
                  <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></span>
                  AVAILABLE_FOR_PROJECTS
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between border-b-2 border-foreground/10 pb-2'>
              <h2 className='text-2xl font-bold mono-text'>/root/tech-stack</h2>
              <span className='text-xs mono-text text-muted-foreground'>
                {tAbout('coreSkills')}
              </span>
            </div>
            <TechMarquee />
          </div>
        </div>

        {/* Right column - Profile & Activity */}
        <aside className='lg:col-span-4 flex flex-col gap-8'>
          {/* Profile Card */}
          <div className='border-2 border-foreground bg-background p-6 shadow-neo-dark dark:shadow-neo'>
            <div className='aspect-square bg-muted mb-6 border-2 border-foreground overflow-hidden grayscale contrast-125'>
              <Image
                src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
                alt='Profile of Minh Hieu'
                width={400}
                height={400}
                priority={true}
                className='w-full h-full object-cover object-top'
              />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='border-l-4 border-primary pl-4'>
                <p className='text-xs mono-text uppercase text-muted-foreground'>{t('contact.basedIn')}</p>
                <p className='font-bold'>{t('contact.location')}</p>
              </div>
              <div className='border-l-4 border-primary pl-4'>
                <p className='text-xs mono-text uppercase text-muted-foreground'>Experience</p>
                <p className='font-bold'>5+ Years Coding</p>
              </div>
              <div className='border-l-4 border-primary pl-4'>
                <p className='text-xs mono-text uppercase text-muted-foreground'>Specialty</p>
                <p className='font-bold'>{t('developer')}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className='border-2 border-foreground p-6 flex flex-col gap-4'>
            <h3 className='font-bold mono-text border-b border-foreground/10 pb-2'>/links/social</h3>
            <SocialsDock />
          </div>
        </aside>
      </div>
    </section>
  )
}
