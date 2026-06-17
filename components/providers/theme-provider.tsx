'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  applyAccentTheme,
  applyThemeMode,
  DEFAULT_ACCENT_THEME,
  isAccentTheme,
} from '@/lib/theme'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Always force 'dark' theme mode for this portfolio
    applyThemeMode('dark')

    const savedAccentTheme = localStorage.getItem('accent-theme')
    const nextAccentTheme = isAccentTheme(savedAccentTheme)
      ? savedAccentTheme
      : DEFAULT_ACCENT_THEME

    applyAccentTheme(nextAccentTheme)
  }, [])

  return <>{children}</>
}
