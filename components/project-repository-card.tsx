import React from 'react'
import Image from 'next/image'

export function ProjectRepositoryCard({
  title,
  year,
  description,
  techStack,
  image,
  index
}: any) {
  const formattedIndex = index < 10 ? `0${index}` : index.toString()

  return (
    <article className='magnetic relative group flex flex-col justify-center border-b border-black/10 py-12 md:py-20 cursor-pointer transition-colors duration-500 hover:bg-black/[0.02] overflow-hidden'>
      
      {/* Title */}
      <div className='relative z-10 flex items-center justify-between pointer-events-none'>
        <div className='flex items-baseline gap-4 md:gap-8'>
          <span className='font-mono text-sm md:text-base text-zinc-400 group-hover:text-zinc-600 transition-colors'>
            {formattedIndex}
          </span>
          <h3 className='font-serif font-light text-4xl md:text-6xl lg:text-[7rem] tracking-tighter text-zinc-900 transition-all duration-700'>
            {title}
          </h3>
        </div>
        <span className='font-sans text-sm text-zinc-400 group-hover:text-zinc-600 uppercase tracking-widest hidden md:block'>
          {techStack?.[0] || 'Web'}
        </span>
      </div>

      {/* Hover Image Reveal */}
      <div className='absolute top-1/2 left-[70%] w-[40vw] max-w-[500px] aspect-[16/9] -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rotate-6 group-hover:rotate-0 scale-75 group-hover:scale-100 shadow-2xl overflow-hidden rounded-lg'>
        <div className='relative w-full h-full overflow-hidden'>
          <div className='absolute inset-0 bg-white/20 z-10 transition-opacity duration-300 group-hover:opacity-0 backdrop-blur-sm' />
          <Image 
            src={image || '/placeholder.jpg'} 
            alt={title}
            fill
            className='object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-125 group-hover:scale-100'
          />
        </div>
      </div>
    </article>
  )
}
