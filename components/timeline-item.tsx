'use client'

import React, { useState, useRef } from 'react'

export function TimelineItem({
  company,
  position,
  period,
  description,
  skills,
}: any) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <article 
      className='w-full border-t border-black/10 py-6 md:py-8 group cursor-pointer transition-colors duration-500 hover:bg-black/[0.02]'
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors">{period}</span>
          <div className="flex items-baseline gap-4 md:gap-8">
            <h3 className={`text-2xl md:text-5xl font-serif text-zinc-900 transition-all duration-300 ${isOpen ? 'italic' : 'group-hover:italic'}`}>
              {company}
            </h3>
            <span className="font-sans text-[10px] tracking-widest uppercase text-zinc-400 hidden md:block">{position}</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
          <span className="text-2xl font-light text-zinc-400">+</span>
        </div>
      </div>

      <div 
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ height: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12 cursor-auto" onClick={(e) => e.stopPropagation()}>
          <div>
            <span className="font-sans text-[10px] tracking-widest uppercase text-zinc-500 md:hidden block mb-4">{position}</span>
          </div>
          <div className="flex flex-col justify-center">
            <div 
              className="text-zinc-600 font-light leading-relaxed text-sm md:text-base prose prose-sm prose-zinc list-inside"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1 bg-black/5 text-zinc-700 text-[10px] uppercase tracking-wider rounded-full border border-black/5">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
