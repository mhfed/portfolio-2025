'use client'

import { useEffect, useRef } from 'react'

export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
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

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

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
        ctx.fillStyle = `rgba(184, 220, 240, ${this.opacity})` // subtle light blue/teal
        ctx.fill()
      }
    }

    // Initialize particles
    const particleCount = Math.min(Math.floor((width * height) / 9000), 120)
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw subtle gradient behind particles
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      )
      
      // Get background variables if available, otherwise fallback
      ctx.fillStyle = 'rgba(7, 10, 16, 0.05)'
      
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
            ctx.strokeStyle = `rgba(180, 220, 240, ${lineOpacity})`
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
            ctx.strokeStyle = `rgba(180, 220, 240, ${lineOpacity})`
            ctx.lineWidth = 0.65
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
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
