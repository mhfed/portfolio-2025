'use client'

import React, { useState } from 'react'

export function ExperienceInteractiveList({ timelineItems }: { timelineItems: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (timelineItems.length === 0) {
    return <p className='px-4 py-8 text-center text-muted-foreground'>No work experience yet.</p>
  }

  return (
    <div className='flex flex-col lg:flex-row gap-12 lg:gap-24 w-full'>
       {/* Left: List of Companies */}
       <div className='w-full lg:w-1/2 flex flex-col'>
         {timelineItems.map((item, idx) => (
           <div 
             key={idx} 
             onMouseEnter={() => setActiveIndex(idx)}
             onClick={() => setActiveIndex(idx)}
             className={`py-8 lg:py-12 border-b border-black/10 cursor-pointer transition-colors duration-500 group ${activeIndex === idx ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
           >
             <h3 className={`font-serif text-4xl lg:text-6xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === idx ? 'italic text-zinc-900 lg:translate-x-8' : 'text-zinc-600'}`}>
               {item.company}
             </h3>
             <span className={`font-mono text-xs tracking-widest uppercase mt-4 block transition-all duration-700 ${activeIndex === idx ? 'text-zinc-900 lg:translate-x-8' : 'text-zinc-400'}`}>
               {item.period}
             </span>
             
             {/* Mobile active content (Accordion style) */}
             <div className={`lg:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === idx ? 'max-h-[1000px] mt-8 opacity-100' : 'max-h-0 opacity-0'}`}>
               <span className='font-sans text-[10px] tracking-widest uppercase text-zinc-500 mb-4 block'>
                 {item.position}
               </span>
               <div 
                 className='text-zinc-600 font-light leading-relaxed text-sm prose prose-sm prose-zinc list-inside mb-6'
                 dangerouslySetInnerHTML={{ __html: item.description }}
               />
               <div className='flex flex-wrap gap-2'>
                 {item.skills.map((skill: string) => (
                   <span key={skill} className='px-3 py-1 bg-black/5 text-zinc-700 text-[10px] uppercase tracking-wider rounded-full border border-black/5'>
                     {skill}
                   </span>
                 ))}
               </div>
             </div>
           </div>
         ))}
       </div>
       
       {/* Right: Sticky Details (Desktop Only) */}
       <div className='hidden lg:block w-full lg:w-1/2 relative'>
         <div className='sticky top-32 p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] transition-all duration-700 min-h-[500px] flex flex-col'>
           <div className='absolute top-4 left-6 text-[12rem] font-serif italic text-black/[0.02] pointer-events-none leading-none select-none transition-all duration-700'>
             0{activeIndex + 1}
           </div>
           
           <div className='relative z-10 h-full flex flex-col justify-between flex-1'>
             <div>
               <span className='font-sans text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-3 block'>
                 Role
               </span>
               <h4 className='font-serif italic text-4xl text-zinc-900 mb-10'>
                 {timelineItems[activeIndex].position}
               </h4>
               
               <div 
                 key={`desc-${activeIndex}`}
                 className='animate-fade-in text-zinc-600 font-light text-lg leading-relaxed prose prose-zinc list-inside'
                 dangerouslySetInnerHTML={{ __html: timelineItems[activeIndex].description }}
               />
             </div>
             
             {/* Skills */}
             <div className='mt-12 pt-8 border-t border-black/5'>
                <span className='font-sans text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-5 block'>
                  Technologies Used
                </span>
                <div className='flex flex-wrap gap-2 animate-slide-up-fade'>
                  {timelineItems[activeIndex].skills.map((skill: string) => (
                    <span key={skill} className='px-4 py-2 bg-white/50 text-zinc-700 text-xs tracking-[0.1em] rounded-full border border-white/60 shadow-sm hover:bg-white/80 transition-colors cursor-default'>
                      {skill}
                    </span>
                  ))}
                </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  )
}
