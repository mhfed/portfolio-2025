import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface ProjectRepositoryCardProps {
  image: string
  title: string
  year: string
  description: string
  details: string
  liveUrl?: string
  githubUrl?: string
  techStack: string[]
  featured?: boolean
  index?: number
}

export function ProjectRepositoryCard({
  image,
  title,
  year,
  description,
  details,
  techStack,
  liveUrl,
  githubUrl,
  index = 1,
}: ProjectRepositoryCardProps) {
  const formattedIndex = index < 10 ? `0${index}` : index.toString()

  return (
    <article className='magnetic relative group flex flex-col md:flex-row md:items-center justify-between border-b border-white/20 py-8 md:py-12 cursor-none transition-colors duration-500 hover:bg-white/[0.02]'>
      
      {/* List Content */}
      <div className='flex items-center gap-8 md:gap-16 z-10 pointer-events-none'>
        <span className='font-mono text-xs md:text-sm text-white/30 group-hover:text-white/60 transition-colors mt-2 md:mt-4'>
          {formattedIndex}
        </span>
        <div className='relative transition-transform duration-500 group-hover:translate-x-4'>
          <h3 className='font-sans font-bold text-4xl md:text-6xl lg:text-[5rem] uppercase tracking-tighter text-white/70 group-hover:opacity-0 transition-opacity duration-500'>
            {title}
          </h3>
          <h3 className='absolute top-0 left-0 font-sans font-bold text-4xl md:text-6xl lg:text-[5rem] uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-teal-400 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500' aria-hidden="true">
            {title}
          </h3>
        </div>
      </div>

      <div className='mt-6 md:mt-0 z-10 flex items-center gap-8 md:gap-16 pointer-events-none'>
        <span className='font-serif italic text-lg md:text-2xl text-white/50 group-hover:text-white/80 transition-colors hidden lg:block'>
          {techStack.slice(0, 3).join(' — ')}
        </span>
        <span className='font-mono text-xs text-white/30 group-hover:text-white/60 uppercase tracking-widest'>
          {year || '2025'}
        </span>
      </div>

      {/* Hover Image Reveal */}
      <div className='fixed top-1/2 left-1/2 w-[300px] md:w-[450px] aspect-[4/5] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out z-0 overflow-hidden mix-blend-difference'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className='w-full h-full object-cover grayscale opacity-80 scale-125 group-hover:scale-100 transition-transform duration-1000'
        />
      </div>

      {/* Invisible clickable overlay */}
      {(liveUrl || githubUrl) && (
        <a 
          href={liveUrl || githubUrl} 
          target='_blank' 
          rel='noopener noreferrer' 
          className='absolute inset-0 z-20'
          aria-label={`View ${title}`}
        />
      )}
    </article>
  )
}
