import { getTranslations } from 'next-intl/server'
import { HeroClientAnimator } from './hero-client-animator'

export async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section
      id='home-top'
      className='relative w-full h-screen flex items-center justify-center overflow-hidden bg-black'
    >
      <HeroClientAnimator />
      
      <div className='z-10 text-center w-full px-4 flex flex-col items-center mix-blend-difference'>
        <div className='overflow-hidden w-full flex justify-center'>
          <svg 
            viewBox="0 0 1200 200" 
            className='hero-svg w-full max-w-[1400px] h-auto'
          >
            <text 
              x="50%" 
              y="50%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className='hero-svg-text text-[100px] font-sans font-bold tracking-tighter uppercase fill-transparent stroke-white stroke-1'
            >
              NGUYEN <tspan className='font-serif italic font-light stroke-white/50'>MINH</tspan> HIEU
            </text>
          </svg>
        </div>
        <div className='overflow-hidden mt-6 md:mt-8'>
          <h2 className='hero-subtitle font-sans text-[clamp(0.75rem,1.5vw,1.5rem)] tracking-[0.5em] text-white/40 translate-y-[100%] uppercase'>
            Creative Developer
          </h2>
        </div>
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
      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 z-20'>
        <a href="#about" className='magnetic group flex flex-col items-center gap-4 cursor-none'>
          <span className='font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors duration-300'>
            Scroll
          </span>
          <div className='w-[1px] h-12 bg-white/20 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-full bg-white animate-scroll-down' />
          </div>
        </a>
      </div>
    </section>
  )
}
