'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  applyAccentTheme,
  applyThemeMode,
  DEFAULT_ACCENT_THEME,
  isAccentTheme,
  type ThemeMode,
} from '@/lib/theme'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const savedMode = localStorage.getItem('theme')
    const nextMode: ThemeMode = savedMode === 'light' ? 'light' : 'dark'

    const savedAccentTheme = localStorage.getItem('accent-theme')
    const nextAccentTheme = isAccentTheme(savedAccentTheme)
      ? savedAccentTheme
      : DEFAULT_ACCENT_THEME

    applyThemeMode(nextMode)
    applyAccentTheme(nextAccentTheme)
  }, [])

  return <>{children}</>
}
