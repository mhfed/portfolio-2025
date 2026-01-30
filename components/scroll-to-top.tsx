'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLenis } from 'lenis/react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleScroll = ({ scroll }: { scroll: number }) => {
      // Show button when page is scrolled down 300px
      setIsVisible(scroll > 300)
    }

    lenis.on('scroll', handleScroll)
    // Check initial state
    setIsVisible(lenis.scroll > 300)

    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis])

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    }
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label='Scroll to top'
    >
      <ArrowUp className='w-5 h-5 md:w-6 md:h-6' />
    </button>
  )
}
