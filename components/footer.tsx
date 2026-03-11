import { getTranslations } from 'next-intl/server'
import { SocialsDock } from './socials-dock'
import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  locale: string
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations('collaborate')
  const tContact = await getTranslations('hero.contact')
  const tBlog = await getTranslations('blog')

  const footerLinks = [
    { name: tBlog('home'), href: `/${locale}` },
    { name: tBlog('allPosts'), href: `/${locale}/blog` },
  ]

  return (
    <>
      {/* Collaborate Section - Full-bleed Orange */}
      <section
        id='collaborate'
        className='w-full bg-primary py-24 px-6 border-y-4 border-foreground overflow-hidden relative'
      >
        {/* Grid overlay background */}
        <div className='absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none'>
          <div className='grid grid-cols-12 h-full'>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className='border-r border-white h-full' />
            ))}
          </div>
        </div>

        <div className='max-w-[1000px] mx-auto relative z-10'>
          <div className='bg-card text-foreground border-4 border-foreground shadow-neo-dark flex flex-col md:flex-row items-stretch overflow-hidden'>
            {/* Portrait */}
            <div className='md:w-1/2 aspect-square md:aspect-auto border-b-4 md:border-b-0 md:border-r-4 border-foreground overflow-hidden grayscale contrast-125'>
              <Image
                src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
                alt='Minh Hieu portrait'
                width={500}
                height={600}
                className='w-full h-full object-cover'
              />
            </div>
            {/* Content */}
            <div className='md:w-1/2 p-8 md:p-12 flex flex-col justify-center'>
              <span className='mono-text font-bold mb-4 block text-primary'>/connection/establish</span>
              <h2 className='text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6'>
                {t('title').split(' ').slice(0, 2).join(' ')}<br />
                {t('title').split(' ').slice(2).join(' ')}
              </h2>
              <p className='text-lg mb-8 text-muted-foreground'>
                {t('description')}
              </p>
              <div className='flex flex-col gap-4'>
                <a
                  href={`mailto:${tContact('email')}`}
                  className='bg-foreground text-background px-8 py-4 font-bold mono-text hover:opacity-90 transition-colors text-center shadow-neo-sm'
                >
                  SEND_MESSAGE.EXE
                </a>
                <div className='grid grid-cols-2 gap-4'>
                  <a
                    href='https://github.com/mhfed'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-muted p-3 border-2 border-foreground text-center mono-text font-bold text-sm hover:bg-primary hover:text-white transition-all'
                  >
                    GITHUB
                  </a>
                  <a
                    href='https://linkedin.com/in/mhfed'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-muted p-3 border-2 border-foreground text-center mono-text font-bold text-sm hover:bg-primary hover:text-white transition-all'
                  >
                    LINKEDIN
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='w-full max-w-[1200px] mx-auto mt-12 p-6 border-t-2 border-foreground flex flex-col md:flex-row justify-between items-center gap-6 pb-12'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold uppercase'>
            Minh Hieu © {new Date().getFullYear()}
          </h2>
          <p className='mono-text text-xs opacity-50'>BUILT_WITH_PRECISION_AND_PASSION</p>
        </div>
        <div className='flex items-center gap-6 mono-text text-sm'>
          <a className='hover:text-primary transition-colors' href='https://github.com/mhfed' target='_blank' rel='noopener noreferrer'>GITHUB</a>
          <a className='hover:text-primary transition-colors' href='https://linkedin.com/in/mhfed' target='_blank' rel='noopener noreferrer'>LINKEDIN</a>
          <a className='hover:text-primary transition-colors' href={`mailto:${tContact('email')}`}>E-MAIL</a>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs mono-text'>LATEST_SYNC:</span>
          <span className='text-xs mono-text font-bold bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-1'>SUCCESSFUL</span>
        </div>
      </footer>
    </>
  )
}
