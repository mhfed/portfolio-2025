'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { applyThemeMode } from '@/lib/theme'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // The 2026 portfolio is a committed luxury-light surface. Keep the global
    // app theme aligned so browser UI, form controls, and inherited tokens stay
    // consistent with the cold silver, graphite, and cobalt palette.
    applyThemeMode('light')
  }, [])

  return <>{children}</>
}
