'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Playfair_Display, Great_Vibes, Noto_Serif } from 'next/font/google'
import Image from 'next/image'

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
})
const greatVibes = Great_Vibes({
  subsets: ['latin', 'vietnamese'],
  weight: ['400'],
})
const notoSerif = Noto_Serif({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
})

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Lunar New Year 2026 Date
const TET_DATE = '2026-02-17T00:00:00+07:00'

export function CountdownClient() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const calculateTimeLeft = () => {
      const difference = +new Date(TET_DATE) - +new Date()
      let timeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      return timeLeft
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={cn(
        'relative min-h-screen w-full flex flex-col items-center justify-end pb-12 md:justify-center overflow-hidden',
        notoSerif.className
      )}
    >
      {/* Background Image - White base with Preloading */}
      <div className='absolute inset-0 w-full h-full overflow-hidden -z-10 bg-[#110000]'>
        <Image
          src='https://res.cloudinary.com/dt3epooyc/image/upload/v1768234983/portfolio/arb7ckuxyvozhwsuuwlb.png'
          alt='Lunar New Year Background'
          fill
          priority
          className='object-contain object-[center_30%] md:object-center'
          sizes='100vw'
        />
      </div>

      {/* Subtle Overlay to ensure text pop if needed (very light gradient) */}
      <div className='absolute inset-0 bg-gradient-to-b from-[#5e0c0c]/80 via-transparent to-[#5e0c0c]/80 pointer-events-none' />

      {/* Decorative Elements - Adjusted for white bg */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-radial from-[#d90429]/5 to-transparent blur-[80px]' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-radial from-[#fb8500]/5 to-transparent blur-[80px]' />
      </div>

      {/* Cloud Decors (SVG) - Darker colors */}
      <div className='absolute top-4 left-4 md:top-10 md:left-20 opacity-30 animate-[pulse_5s_ease-in-out_infinite]'>
        <CloudIcon className='w-16 h-8 md:w-48 md:h-24 text-[#cc8e35]' />
      </div>
      <div className='absolute bottom-4 right-4 md:bottom-10 md:right-20 opacity-30 animate-[pulse_7s_ease-in-out_infinite]'>
        <CloudIcon className='w-20 h-10 md:w-64 md:h-32 text-[#d90429]' flip />
      </div>

      <div className='relative z-10 flex flex-col items-center gap-6 md:gap-12 w-full px-4 animate-fade-in-up'>
        <div className='text-center space-y-2 md:space-y-4'>
          <div
            className={cn(
              'text-xl md:text-4xl text-white tracking-widest uppercase font-bold animate-scale-in', // Darker gold for visibility
              playfair.className
            )}
            style={{
              animationDelay: '0.3s',
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            Sắp Đến Tết Rồi
          </div>
          <h1
            className={cn(
              'text-5xl md:text-8xl md:leading-tight text-yellow-300 drop-shadow-sm neon-glow-text', // Removed heavy glow, clean red
              greatVibes.className
            )}
          >
            Xuân Bính Ngọ 2026
          </h1>
        </div>

        {/* Countdown Grid - Responsive Layout */}
        <div className='flex items-center justify-center gap-2 md:gap-10 w-full max-w-[95vw] md:max-w-4xl'>
          <AsianTimeUnit value={timeLeft.days} label='Ngày' />
          <AsianTimeUnit value={timeLeft.hours} label='Giờ' />
          <AsianTimeUnit value={timeLeft.minutes} label='Phút' />
          <AsianTimeUnit value={timeLeft.seconds} label='Giây' />
        </div>

        {/* Date Display */}
        <div
          className='mt-4 md:mt-8 flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white border border-[#d90429]/20 backdrop-blur-md shadow-sm animate-fade-in-up'
          style={{
            animationDelay: '1.2s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          <div className='w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d90429] animate-pulse' />
          <span
            className={cn(
              'text-base md:text-xl text-[#b45309] font-medium text-center',
              playfair.className
            )}
          >
            {new Date(TET_DATE).toLocaleDateString('vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <div className='w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d90429] animate-pulse' />
        </div>
      </div>
    </div>
  )
}

function AsianTimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className='flex flex-col items-center gap-1 md:gap-3 flex-1'>
      <div className='relative group w-full max-w-[80px] md:max-w-[140px]'>
        {/* Main Box */}
        <div className='relative aspect-[3/4] w-full bg-[rgba(0,0,0,0.8)] rounded-lg border border-[#d90429]/30 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-500 overflow-hidden'>
          {/* Inner Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-30" />

          {/* Decorative frame elements for asian look */}
          <div className='absolute top-0 left-0 w-full h-1 bg-[#d90429]/20' />
          <div className='absolute bottom-0 left-0 w-full h-1 bg-[#d90429]/20' />
          <div className='absolute top-1 left-1 w-1.5 h-1.5 md:top-2 md:left-2 md:w-2 md:h-2 border-t border-l border-[#d90429]/40' />
          <div className='absolute top-1 right-1 w-1.5 h-1.5 md:top-2 md:right-2 md:w-2 md:h-2 border-t border-r border-[#d90429]/40' />
          <div className='absolute bottom-1 left-1 w-1.5 h-1.5 md:bottom-2 md:left-2 md:w-2 md:h-2 border-b border-l border-[#d90429]/40' />
          <div className='absolute bottom-1 right-1 w-1.5 h-1.5 md:bottom-2 md:right-2 md:w-2 md:h-2 border-b border-r border-[#d90429]/40' />

          <span
            className={cn(
              'relative z-10 text-6xl md:text-7xl lg:text-8xl font-bold text-[#d90429]',
              greatVibes.className
            )}
          >
            {value < 10 ? `0${value}` : value}
          </span>
        </div>

        {/* Lantern Tassel Emulation - Simple line for clean look */}
        <div className='absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-2 md:h-4 bg-[#cc8e35]' />
      </div>
      <span
        className={cn(
          'text-[10px] md:text-lg font-bold text-[#b45309] uppercase tracking-wider',
          playfair.className
        )}
      >
        {label}
      </span>
    </div>
  )
}

function CloudIcon({
  className,
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      className={cn(className, flip && 'scale-x-[-1]')}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.5,19c-3.03,0-5.5-2.47-5.5-5.5c0-0.44,0.05-0.86,0.15-1.27C11.56,12.08,10.82,12,10,12c-2.76,0-5,2.24-5,5s2.24,5,5,5 c0.34,0,0.68-0.04,1-0.1V22h2v-2.03C13.63,20.48,14.53,20.91,15.5,21.01V22h2v-0.65C17.5,21.35,17.5,21.35,17.5,21.35V22h2v-3.03 c0.54-0.12,1.05-0.34,1.5-0.63c2.09-1.35,2.78-4.11,1.54-6.24C23.63,10.51,21.14,9.66,19,10.05V10c0-4.42-3.58-8-8-8 c-3.86,0-7.11,2.73-7.84,6.38C2.9,8.37,2.66,8.35,2.42,8.35C1.1,8.35,0.02,9.4,0,10.72c-0.01,0.67,0.25,1.29,0.7,1.75l0.02,0.02 C0.3,12.93,0,13.43,0,14c0,1.1,0.9,2,2,2h1.47c0.23,1.14,0.85,2.15,1.72,2.88'
        opacity='0.4'
      />
      <path
        d='M19.5,12c-1.32,0-2.5,0.72-3.13,1.8c-0.15-0.03-0.3-0.05-0.46-0.05c-1.29,0-2.39,0.81-2.8,1.96 c-0.15-0.02-0.3-0.04-0.46-0.04c-1.5,0-2.74,1.13-2.96,2.63C9.57,18.15,9.43,18,8.27,18c-0.57,0-1.12,0.17-1.59,0.48 C6.15,18.83,5.6,19,5,19c-1.65,0-3-1.35-3-3c0-0.42,0.09-0.82,0.24-1.19'
        opacity='0.6'
      />
    </svg>
  )
}
