'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { applyThemeMode } from '@/lib/theme'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // This portfolio is a committed dark "Financial HUD" world — force dark
    // mode and let the fixed palette in globals.css stand (no accent swapping).
    applyThemeMode('dark')
  }, [])

  return <>{children}</>
}
