'use client'

import { useEffect, useState } from 'react'
import {
  applyAccentTheme,
  applyThemeMode,
  DEFAULT_ACCENT_THEME,
  isAccentTheme,
  type AccentTheme,
  type ThemeMode,
} from '@/lib/theme'

export function useTheme() {
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<ThemeMode>('dark')
  const [accentTheme, setAccentThemeState] =
    useState<AccentTheme>(DEFAULT_ACCENT_THEME)

  useEffect(() => {
    const savedMode = localStorage.getItem('theme')
    const nextMode: ThemeMode = savedMode === 'light' ? 'light' : 'dark'

    const savedAccentTheme = localStorage.getItem('accent-theme')
    const nextAccentTheme = isAccentTheme(savedAccentTheme)
      ? savedAccentTheme
      : DEFAULT_ACCENT_THEME

    applyThemeMode(nextMode)
    applyAccentTheme(nextAccentTheme)

    setMode(nextMode)
    setAccentThemeState(nextAccentTheme)
    setMounted(true)
  }, [])

  const toggleMode = () => {
    const nextMode: ThemeMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    applyThemeMode(nextMode)
  }

  const setAccentTheme = (theme: AccentTheme) => {
    setAccentThemeState(theme)
    applyAccentTheme(theme)
  }

  return {
    mounted,
    mode,
    isDark: mode === 'dark',
    accentTheme,
    toggleMode,
    setAccentTheme,
  }
}

