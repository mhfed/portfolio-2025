'use client'

import { useEffect } from 'react'

export function ScrollObserver() {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        const element = document.querySelector(target.hash)
        if (element) {
          e.preventDefault()
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll as EventListener)
    })

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Support old scroll-animate class
          if (entry.target.classList.contains('scroll-animate')) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
          // Support new reveal classes
          if (entry.target.classList.contains('scroll-reveal')) {
            entry.target.classList.add('revealed')
          }
          if (entry.target.classList.contains('scroll-reveal-left')) {
            entry.target.classList.add('revealed')
          }
          if (entry.target.classList.contains('scroll-reveal-right')) {
            entry.target.classList.add('revealed')
          }
          if (entry.target.classList.contains('scroll-reveal-scale')) {
            entry.target.classList.add('revealed')
          }
          // Support highlight class
          if (entry.target.classList.contains('scroll-highlight')) {
            entry.target.classList.add('highlighted')
          }
        }
      })
    }, observerOptions)

    // Observe all animation elements
    document
      .querySelectorAll(
        '.scroll-animate, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-highlight'
      )
      .forEach((el) => {
        observer.observe(el)
      })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll as EventListener)
      })
      observer.disconnect()
    }
  }, [])

  return null
}
