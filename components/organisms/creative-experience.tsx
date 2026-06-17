'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import type { ExperienceRecord } from '@/types/experience'
import { loadGSAP } from '@/lib/gsap-utils'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function splitExperienceDescription(description: string) {
  return description
    .split(/<br\s*\/?>|\n/gi)
    .map((line) => line.trim())
    .filter(Boolean)
}

function FormatDescriptionLine({ line }: { line: string }) {
  const colonIndex = line.indexOf(':')
  if (colonIndex > 0 && colonIndex < 35) {
    const heading = line.substring(0, colonIndex)
    const content = line.substring(colonIndex + 1)
    return (
      <span className='block text-[0.85rem] leading-[1.65]'>
        <strong className='text-creative-lime font-mono text-[0.75rem] font-bold uppercase tracking-wider mr-1.5'>
          {heading}:
        </strong>
        <span className='text-creative-muted font-light'>{content}</span>
      </span>
    )
  }
  return (
    <span className='block text-[0.85rem] leading-[1.65] text-creative-muted font-light'>
      {line}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Scrollable Description with custom scrollbar                       */
/* ------------------------------------------------------------------ */

function ScrollableDescription({ lines }: { lines: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [showScrollbar, setShowScrollbar] = useState(false)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScroll = useRef(0)

  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollHeight, clientHeight, scrollTop } = el
    if (scrollHeight <= clientHeight) {
      setShowScrollbar(false)
      return
    }
    setShowScrollbar(true)
    const ratio = clientHeight / scrollHeight
    const trackHeight = trackRef.current?.clientHeight ?? clientHeight
    const height = Math.max(ratio * trackHeight, 24)
    const top =
      (scrollTop / (scrollHeight - clientHeight)) * (trackHeight - height)
    setThumbHeight(height)
    setThumbTop(top)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateThumb()
    el.addEventListener('scroll', updateThumb, { passive: true })
    const ro = new ResizeObserver(updateThumb)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateThumb)
      ro.disconnect()
    }
  }, [updateThumb])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    isDragging.current = true
    dragStartY.current = e.clientY
    dragStartScroll.current = scrollRef.current?.scrollTop ?? 0
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !scrollRef.current || !trackRef.current) return
      const deltaY = e.clientY - dragStartY.current
      const { scrollHeight, clientHeight } = scrollRef.current
      const trackHeight = trackRef.current.clientHeight
      const scrollRatio =
        (scrollHeight - clientHeight) / (trackHeight - thumbHeight)
      scrollRef.current.scrollTop =
        dragStartScroll.current + deltaY * scrollRatio
    },
    [thumbHeight]
  )

  const onPointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <div className='relative flex gap-2'>
      <div
        ref={scrollRef}
        data-lenis-prevent
        className='flex flex-col gap-3 max-h-[175px] overflow-y-auto pr-1 scrollbar-none'
      >
        {lines.map((line) => (
          <FormatDescriptionLine key={line} line={line} />
        ))}
      </div>

      {showScrollbar && (
        <div
          ref={trackRef}
          className='relative w-[3px] shrink-0 rounded-full bg-creative-line/30 self-stretch'
        >
          <div
            ref={thumbRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className='absolute left-0 w-full rounded-full bg-creative-lime/50 hover:bg-creative-lime/80 transition-colors duration-200 cursor-grab active:cursor-grabbing'
            style={{ height: thumbHeight, top: thumbTop }}
          />
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function ExperienceSection({
  experiences,
}: {
  experiences: ExperienceRecord[]
}) {
  const t = useTranslations('experience')
  const orderedExperiences = [...experiences].reverse()

  const [activeIndex, setActiveIndex] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)

  /* GSAP ScrollTrigger: Pin left column while right scrolls */
  useEffect(() => {
    let active = true
    let mm: any

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      const section = sectionRef.current
      const leftCol = leftColRef.current
      if (!section || !leftCol) return

      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (reduced) return

      mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        // Pin the left title column
        ScrollTrigger.create({
          trigger: section,
          start: 'top 15%',
          end: 'bottom 85%',
          pin: leftCol,
          pinSpacing: false,
        })

        // Track active card
        const cards = gsap.utils.toArray('.experience-card-vertical', section)
        cards.forEach((card: any, idx: number) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 50%',
            end: 'bottom 50%',
            onToggle: (self: any) => {
              if (self.isActive) setActiveIndex(idx)
            },
          })

          // Scale & fade entrance
          gsap.fromTo(
            card,
            { opacity: 0.3, scale: 0.97, y: 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 0.8,
              },
            }
          )
        })

        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      })
    })

    return () => {
      active = false
      mm?.revert()
    }
  }, [orderedExperiences.length])

  return (
    <section
      ref={sectionRef}
      id='experience'
      className='creative-section creative-experience w-full relative py-32 md:py-48'
      data-section
      data-waypoint='experience'
    >
      <div className='max-w-screen-2xl mx-auto px-[clamp(1rem,4vw,4rem)]'>
        {/* Desktop: Pinned Left / Scrolling Right */}
        <div className='hidden lg:grid lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] gap-[clamp(3rem,6vw,8rem)]'>
          {/* Left Column (Pinned) */}
          <div ref={leftColRef} className='flex flex-col gap-8 pt-4'>
            <h2
              className='m-0 text-creative-ink font-display font-black tracking-tight leading-[1.1] uppercase [text-wrap:balance]'
              style={{ fontSize: 'clamp(1.45rem, 2.4vw, 2.8rem)' }}
            >
              {t('headline')}
            </h2>

            {/* Active indicator - company names, no numbers */}
            <div className='flex flex-col gap-3 mt-6'>
              {orderedExperiences.map((exp, idx) => (
                <button
                  key={`nav-${exp.id}`}
                  onClick={() => {
                    const card = document.querySelector(
                      `[data-exp-index="${idx}"]`
                    )
                    if (card)
                      card.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      })
                  }}
                  className={`text-left font-mono text-[0.72rem] font-bold tracking-wider uppercase transition-all duration-300 border-none bg-transparent outline-none cursor-pointer py-1 ${
                    activeIndex === idx
                      ? 'text-creative-lime pl-3'
                      : 'text-creative-dim hover:text-creative-ink pl-0'
                  }`}
                  style={{
                    borderLeft:
                      activeIndex === idx
                        ? '2px solid var(--creative-lime)'
                        : '2px solid transparent',
                  }}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (Scrolling Cards) */}
          <div className='flex flex-col gap-16 pb-20'>
            {orderedExperiences.map((experience, index) => {
              const descriptionLines = splitExperienceDescription(
                experience.description
              )
              const isCurrent = activeIndex === index

              return (
                <div
                  key={experience.id}
                  data-exp-index={index}
                  className={`experience-card-vertical relative bg-creative-panel/40 backdrop-blur-md border rounded-2xl p-8 flex flex-col gap-5 overflow-hidden transition-[border-color,box-shadow] duration-500 will-change-transform ${
                    isCurrent
                      ? 'border-creative-lime/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
                      : 'border-creative-line hover:border-creative-lime/20'
                  }`}
                >
                  {/* Meta Row - clean, no icons, no numbering */}
                  <div className='flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.72rem] font-bold tracking-widest text-creative-dim uppercase'>
                    <strong className='text-creative-ink'>
                      {experience.period}
                    </strong>
                    <span>{experience.location}</span>
                  </div>

                  {/* Company + Role */}
                  <div className='flex flex-col gap-1 border-t border-creative-line pt-5'>
                    <h3 className='m-0 text-creative-ink font-display text-2xl font-black uppercase tracking-tight'>
                      {experience.company}
                    </h3>
                    <p className='m-0 text-creative-lime text-base font-semibold leading-normal'>
                      {experience.position}
                    </p>
                  </div>

                  {/* Scrollable Description */}
                  <ScrollableDescription lines={descriptionLines} />

                  {/* Skills */}
                  <div className='flex flex-wrap gap-1.5 pt-4 border-t border-creative-line'>
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className='border border-creative-line rounded-full px-2.5 py-1 text-creative-muted font-mono text-[0.68rem] font-bold tracking-wider leading-none uppercase transition-all duration-300 hover:border-creative-lime hover:text-creative-lime'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Layout */}
        <div className='lg:hidden flex flex-col w-full gap-8'>
          <div className='flex flex-col gap-3'>
            <h2
              className='m-0 text-creative-ink font-display font-black tracking-tight leading-[1.12] uppercase [text-wrap:balance]'
              style={{ fontSize: 'clamp(1.3rem, 5.5vw, 2.2rem)' }}
            >
              {t('headline')}
            </h2>
          </div>

          {/* Timeline */}
          <div className='mobile-timeline-wrapper relative flex flex-col py-2'>
            <div className='absolute left-[17px] top-6 bottom-6 w-[1px] bg-creative-line z-0' />

            <div className='flex flex-col gap-8 relative pl-10'>
              {orderedExperiences.map((experience, idx) => {
                const descriptionLines = splitExperienceDescription(
                  experience.description
                )
                const isCurrent = activeIndex === idx

                return (
                  <div
                    key={`mobile-${experience.id}`}
                    className='mobile-experience-card relative flex flex-col gap-3'
                  >
                    {/* Timeline node - simple, no pinging animation */}
                    <div
                      className={`absolute left-[-34px] top-1.5 w-[22px] h-[22px] rounded-full border-2 bg-creative-bg flex items-center justify-center transition-all duration-300 z-10 ${
                        isCurrent
                          ? 'border-creative-lime scale-110'
                          : 'border-creative-dim'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 ${
                          isCurrent
                            ? 'bg-creative-lime scale-100'
                            : 'bg-creative-dim scale-75'
                        }`}
                      />
                    </div>

                    {/* Meta */}
                    <div className='flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.72rem] tracking-wider text-creative-dim uppercase items-center'>
                      <span className='text-creative-lime font-black'>
                        {experience.period}
                      </span>
                      <span>{experience.location}</span>
                    </div>

                    {/* Card */}
                    <div
                      className={`border rounded-2xl p-5 bg-creative-panel/40 backdrop-blur-sm flex flex-col gap-4 relative overflow-hidden transition-all duration-300 ${
                        isCurrent
                          ? 'border-creative-lime/30'
                          : 'border-creative-line'
                      }`}
                    >
                      <div>
                        <h3 className='m-0 text-creative-ink font-display text-xl font-black uppercase tracking-tight'>
                          {experience.company}
                        </h3>
                        <p className='m-0 text-creative-lime text-sm font-semibold leading-normal mt-0.5'>
                          {experience.position}
                        </p>
                      </div>

                      <div className='flex flex-col gap-3 mt-1'>
                        {descriptionLines.map((line) => (
                          <FormatDescriptionLine key={line} line={line} />
                        ))}
                      </div>

                      <div className='flex flex-wrap gap-1.5 mt-2 pt-4 border-t border-creative-line'>
                        {experience.skills.map((skill) => (
                          <span
                            key={skill}
                            className='border border-creative-line rounded-full px-2 py-0.5 text-creative-muted font-mono text-[0.65rem] font-bold tracking-wider leading-none uppercase'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
