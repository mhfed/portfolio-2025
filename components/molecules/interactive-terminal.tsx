'use client'

import { useEffect, useRef, useState } from 'react'

const TABS = [
  {
    name: 'creative_engine.ts',
    lang: 'typescript',
    code: `import { loadGSAP } from '@/lib/gsap-utils';

export async function initMotion() {
  const { gsap } = await loadGSAP();
  
  return gsap.timeline()
    .fromTo('.reveal-el', 
      { y: 32, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.08, 
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)' 
      }
    );
}`,
  },
  {
    name: 'globals.css',
    lang: 'css',
    code: `@theme inline {
  --color-creative-lime: var(--creative-lime);
  --font-display: Space Grotesk, sans-serif;
  --transition-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}

.custom-cursor-ring {
  border-color: var(--creative-lime);
  transition: transform var(--transition-smooth);
}`,
  },
  {
    name: 'about_me.json',
    lang: 'json',
    code: `{
  "name": "Nguyen Minh Hieu",
  "role": "Frontend Developer",
  "experience": "5+ Years",
  "core_stack": ["React", "Next.js", "TS", "Tailwind"],
  "focus": "High-Performance UI & Motion Systems",
  "status": "Available For Opportunities"
}`,
  },
]

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState(0)
  const [displayedCode, setDisplayedCode] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const codeIndexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Typing animation
  useEffect(() => {
    const currentCode = TABS[activeTab].code
    setDisplayedCode('')
    codeIndexRef.current = 0

    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      if (codeIndexRef.current < currentCode.length) {
        setDisplayedCode(
          (prev) => prev + currentCode.charAt(codeIndexRef.current)
        )
        codeIndexRef.current++
      } else {
        if (timerRef.current) clearInterval(timerRef.current)
        // Wait 4 seconds and cycle to the next tab
        setTimeout(() => {
          setActiveTab((prev) => (prev + 1) % TABS.length)
        }, 4000)
      }
    }, 12)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeTab])

  // Mouse reactive grid canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let width = (canvas.width = container.clientWidth)
    let height = (canvas.height = container.clientHeight)

    const mouse = { x: -1000, y: -1000 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const handleResize = () => {
      width = canvas.width = container.clientWidth
      height = canvas.height = container.clientHeight
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    const cols = 22
    const rows = 16
    const points: { x: number; y: number; baseX: number; baseY: number }[] = []

    // Populate points
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = (width / (cols - 1)) * c
        const y = (height / (rows - 1)) * r
        points.push({ x, y, baseX: x, baseY: y })
      }
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height)

      // Fetch dynamic active color
      const computedColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--creative-green')
          .trim() || '#73ff87'

      points.forEach((pt) => {
        const dx = mouse.x - pt.baseX
        const dy = mouse.y - pt.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 80

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist
          const angle = Math.atan2(dy, dx)
          pt.x = pt.baseX + Math.cos(angle) * force * 15
          pt.y = pt.baseY + Math.sin(angle) * force * 15
        } else {
          pt.x += (pt.baseX - pt.x) * 0.15
          pt.y += (pt.baseY - pt.y) * 0.15
        }

        // Draw node dot
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 1, 0, Math.PI * 2)
        ctx.fillStyle =
          dist < maxDist ? computedColor : 'rgba(255, 255, 255, 0.05)'
        ctx.fill()

        // Connect to neighbors if within distance
        if (dist < maxDist) {
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2)
          ctx.strokeStyle = computedColor
          ctx.lineWidth = 0.5
          ctx.globalAlpha = ((maxDist - dist) / maxDist) * 0.2
          ctx.stroke()
          ctx.globalAlpha = 1.0
        }
      })

      animationId = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='relative flex flex-col w-full h-full rounded-2xl bg-creative-bg/90 border border-creative-line/40 overflow-hidden group select-none font-mono'
    >
      {/* Grid Canvas Background */}
      <canvas
        ref={canvasRef}
        className='absolute inset-0 pointer-events-none z-0'
      />

      {/* Terminal Title Bar */}
      <div className='relative z-10 flex items-center justify-between px-4 py-3 border-b border-creative-line/40 bg-creative-panel/95'>
        {/* Windows Dot Controls */}
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 rounded-full bg-[#ff5f56]' />
          <span className='w-3 h-3 rounded-full bg-[#ffbd2e]' />
          <span className='w-3 h-3 rounded-full bg-[#27c93f]' />
        </div>
        {/* Terminal Title */}
        <span className='text-[10px] tracking-wider text-creative-dim/80'>
          nmhieu_fe_engine.sh
        </span>
        <div className='w-12' /> {/* spacer */}
      </div>

      {/* File Tabs Bar */}
      <div className='relative z-10 flex border-b border-creative-line/40 bg-creative-bg/85'>
        {TABS.map((tab, idx) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] border-r border-creative-line/40 cursor-pointer transition-colors duration-200 ${
              activeTab === idx
                ? 'bg-creative-panel text-[var(--creative-green)] font-bold'
                : 'text-creative-dim hover:text-creative-ink hover:bg-white/[0.02]'
            }`}
          >
            <span className='text-[9px] opacity-60'>
              {idx === 0 ? 'TS' : idx === 1 ? 'CSS' : '{}'}
            </span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Terminal Code Workspace */}
      <div className='relative z-10 flex-1 p-5 overflow-auto custom-scrollbar bg-creative-bg/70'>
        <pre className='m-0 text-[11px] leading-relaxed text-creative-muted font-mono whitespace-pre-wrap'>
          {displayedCode}
          <span className='inline-block w-1.5 h-3.5 ml-0.5 bg-[var(--creative-green)] animate-pulse vertical-middle' />
        </pre>
      </div>

      {/* Compiler Status Bar */}
      <div className='relative z-10 flex items-center justify-between px-4 py-2 border-t border-creative-line/40 bg-creative-panel/95 text-[9px] text-creative-dim'>
        <div className='flex items-center gap-1.5'>
          <span className='w-1.5 h-1.5 rounded-full bg-[var(--creative-green)] animate-pulse' />
          <span>compiler: active</span>
        </div>
        <span>lines: {displayedCode.split('\n').length}</span>
      </div>
    </div>
  )
}
