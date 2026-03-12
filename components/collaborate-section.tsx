import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export async function CollaborateSection() {
  const t = await getTranslations('collaborate')
  const tContact = await getTranslations('hero.contact')

  return (
    <section id='collaborate' className='w-full px-6 py-12 max-w-[1200px] mx-auto'>
      <div className='bg-primary border-4 border-foreground shadow-neo-dark relative overflow-hidden'>
        <div className='p-8 md:p-16 flex flex-col md:flex-row items-center gap-8'>
          {/* Text Content */}
          <div className='flex-1 text-white w-full'>
            <span className='mono-text font-bold mb-4 md:mb-6 block text-white/80 text-sm'>/connection/establish</span>
            <h2 className='text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 md:mb-8'>
              LET&apos;S<br />COLLABORATE
            </h2>
            <p className='text-base md:text-lg mb-8 md:mb-10 text-white/80 max-w-md'>
              {t('description')}
            </p>
            <div className='flex flex-wrap gap-3 md:gap-4'>
              <a
                href={`mailto:${tContact('email')}`}
                className='bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 font-bold mono-text text-sm hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'
              >
                SEND_MESSAGE
              </a>
              <a
                href='https://github.com/mhfed'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-transparent text-white px-6 md:px-8 py-3 md:py-4 font-bold mono-text text-sm border-2 border-white hover:bg-white hover:text-primary transition-all'
              >
                GITHUB.IO
              </a>
            </div>
          </div>

          {/* Portrait - floating tilted frame */}
          <div className='shrink-0 self-end md:self-auto'>
            <div className='relative rotate-3 hover:rotate-0 transition-transform duration-300'>
              <div className='border-4 md:border-8 border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden w-40 h-48 md:w-64 md:h-72 grayscale contrast-125'>
                <Image
                  src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
                  alt='Minh Hieu portrait'
                  width={300}
                  height={350}
                  className='w-full h-full object-cover object-top'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
