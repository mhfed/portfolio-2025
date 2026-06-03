import { getTranslations } from 'next-intl/server'
import { HeroClientAnimator } from './hero-client-animator'
import { Magnetic } from './ui/magnetic'

export async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section 
      id='hero' 
      className='relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 pt-24'
    >
      <HeroClientAnimator />
      
      <div className='z-10 text-center w-full px-4 flex flex-col items-center pt-32'>
        <Magnetic>
          <div className='inline-block mb-6 md:mb-12 cursor-pointer'>
            <span className='font-mono text-sm tracking-[0.3em] uppercase text-zinc-900/50 block mb-4 animate-fade-in'>
              {t('developer')}
            </span>
            <h1 className='font-serif italic font-light text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[11vw] leading-[0.8] tracking-[-0.04em] text-zinc-900 animate-slide-up-fade'>
              Nguyen <br className="md:hidden" />Minh Hieu
            </h1>
          </div>
        </Magnetic>

        <p className='max-w-2xl text-lg md:text-2xl text-zinc-500 font-light tracking-wide mt-8 animate-slide-up-fade' style={{ animationDelay: '0.2s' }}>
          {t('textBlockLeft')}
        </p>
      </div>

      {/* Interactive Image Trail (6 images buffer) */}
      <div className='hero-trail-container absolute inset-0 pointer-events-none z-0 overflow-hidden'>
        {[
          'https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg',
          'https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg',
          'https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg',
          'https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg',
          'https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg',
          'https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
        ].map((src, i) => (
          <div key={i} className='trail-item absolute top-0 left-0 w-[200px] md:w-[350px] aspect-[4/5] opacity-0 scale-50'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt='Trail' className='w-full h-full object-cover grayscale opacity-70' />
          </div>
        ))}
      </div>

      {/* Spinning Badge */}
      <div className='absolute right-8 bottom-8 md:right-16 md:bottom-16 z-20 pointer-events-none mix-blend-difference'>
        <div className='relative w-24 h-24 md:w-32 md:h-32 animate-[spin_15s_linear_infinite]'>
          <svg viewBox="0 0 100 100" className='w-full h-full'>
            <path id="textPath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text className='font-mono text-[10px] uppercase tracking-widest fill-white font-bold'>
              <textPath href="#textPath" startOffset="0%">
                • CREATIVE DEVELOPER • BASED IN VIETNAM
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex'>
          <div className='w-[1px] h-12 bg-zinc-900/20 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-full bg-zinc-900 animate-scroll-down' />
          </div>
          <span className='font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300'>
            Scroll
          </span>
        </div>
    </section>
  )
}
