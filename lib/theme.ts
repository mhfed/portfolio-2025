export type ThemeMode = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'
export const THEME_CHANGE_EVENT = 'portfolio-theme-change'

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark'
}

export function getPreferredThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  try {
    const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (isThemeMode(savedMode)) return savedMode
  } catch {
    // Storage can be unavailable in hardened or private browsing contexts.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function getAppliedThemeMode(): ThemeMode {
  if (typeof document === 'undefined') return getPreferredThemeMode()

  const currentMode = document.documentElement.dataset.theme
  if (isThemeMode(currentMode)) return currentMode

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function applyThemeMode(mode: ThemeMode): ThemeMode {
  if (typeof document === 'undefined') return mode

  const root = document.documentElement

  root.classList.toggle('dark', mode === 'dark')
  root.dataset.theme = mode
  root.style.colorScheme = mode

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    // Applying the theme must still succeed if storage is unavailable.
  }

  window.dispatchEvent(
    new CustomEvent<ThemeMode>(THEME_CHANGE_EVENT, { detail: mode })
  )

  return mode
}

export function toggleThemeMode(): ThemeMode {
  const nextMode = getAppliedThemeMode() === 'dark' ? 'light' : 'dark'
  return applyThemeMode(nextMode)
}
