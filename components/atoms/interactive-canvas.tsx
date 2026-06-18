'use client'

import { useEffect, useRef } from 'react'

export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduced || !canHover) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = 0
    let visible = document.visibilityState === 'visible'
    let isCanvasDisabled = false
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    }

    let activeColor = { r: 200, g: 255, b: 69 }

    const updateActiveColor = () => {
      if (typeof window === 'undefined') return
      const computed = getComputedStyle(document.documentElement).getPropertyValue('--creative-lime').trim()
      if (computed.startsWith('#')) {
        const hex = computed.substring(1)
        if (hex.length === 6) {
          activeColor = {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16),
          }
        } else if (hex.length === 3) {
          activeColor = {
            r: parseInt(hex.charAt(0) + hex.charAt(0), 16),
            g: parseInt(hex.charAt(1) + hex.charAt(1), 16),
            b: parseInt(hex.charAt(2) + hex.charAt(2), 16),
          }
        }
      } else if (computed.startsWith('rgb')) {
        const matches = computed.match(/\d+/g)
        if (matches && matches.length >= 3) {
          activeColor = {
            r: parseInt(matches[0]),
            g: parseInt(matches[1]),
            b: parseInt(matches[2]),
          }
        }
      }
    }

    const checkCanvasSettings = () => {
      const disabled = localStorage.getItem('disable-canvas') === 'true'
      isCanvasDisabled = disabled
      updateActiveColor()
      if (disabled) {
        canvas.style.display = 'none'
        if (ctx) {
          ctx.clearRect(0, 0, width, height)
        }
      } else {
        canvas.style.display = 'block'
        if (visible && animationFrameId === 0) {
          animationFrameId = requestAnimationFrame(animate)
        }
      }
    }

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleVisibilityChange = () => {
      visible = document.visibilityState === 'visible'
      if (visible && animationFrameId === 0 && !isCanvasDisabled) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('settings-updated', checkCanvasSettings)

    // Particle class
    class Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      vx: number
      vy: number
      opacity: number
      maxOpacity: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.baseX = this.x
        this.baseY = this.y
        this.size = Math.random() * 2 + 1
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.maxOpacity = Math.random() * 0.35 + 0.1
        this.opacity = 0
      }

      update() {
        // Normal drift
        this.x += this.vx
        this.y += this.vy

        // Wrap around boundaries
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0

        // Mouse interaction (repel)
        if (mouse.x > -500) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dx, dy)
            this.x += Math.sin(angle) * force * 4
            this.y += Math.cos(angle) * force * 4
          }
        }

        // Fade in opacity
        if (this.opacity < this.maxOpacity) {
          this.opacity += 0.005
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, ${this.opacity})`
        ctx.fill()
      }
    }

    // Initialize particles
    const particleCount = Math.min(Math.floor((width * height) / 14000), 80)
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!visible || isCanvasDisabled) {
        animationFrameId = 0
        return
      }

      ctx.clearRect(0, 0, width, height)
      
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Connect nearby particles to form starlight constellations
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            const lineOpacity = (1 - dist / 110) * 0.09 * Math.min(particles[i].opacity, particles[j].opacity)
            ctx.strokeStyle = `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, ${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Connect the mouse pointer to nearby stars forming gravity webs
      if (mouse.x > -500) {
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - mouse.x
          const dy = particles[i].y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouse.radius) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            const lineOpacity = (1 - dist / mouse.radius) * 0.13 * particles[i].opacity
            ctx.strokeStyle = `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, ${lineOpacity})`
            ctx.lineWidth = 0.65
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    checkCanvasSettings()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('settings-updated', checkCanvasSettings)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none fixed inset-0 -z-30 h-full w-full'
    />
  )
}
