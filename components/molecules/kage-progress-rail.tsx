'use client'

import { useEffect, useState } from 'react'

interface ChapterItem {
  id: string
  label: string
}

const CHAPTERS: ChapterItem[] = [
  { id: 'hero', label: '00' },
  { id: 'about', label: '01' },
  { id: 'work', label: '02' },
  { id: 'experience', label: '03' },
  { id: 'skills', label: '04' },
  { id: 'contact', label: '05' },
]

export function KageProgressRail() {
  const [activeChapter, setActiveChapter] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id)
        if (el && el.offsetTop <= scrollPosition) {
          setActiveChapter(CHAPTERS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className='rail' aria-label='Chapter Rail'>
      {CHAPTERS.map((ch) => (
        <button
          key={ch.id}
          type='button'
          className={activeChapter === ch.id ? 'on' : ''}
          onClick={() => scrollTo(ch.id)}
          aria-label={`Jump to Chapter ${ch.label}`}
          data-cursor
        >
          <i />
        </button>
      ))}
    </nav>
  )
}
