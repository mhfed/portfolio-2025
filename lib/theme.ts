export const DEFAULT_ACCENT_THEME = 'cobalt'

export const COLOR_THEMES = [
  {
    id: 'teal',
    label: 'Teal',
    swatch: 'linear-gradient(135deg, #0f766e 0%, #34d399 100%)',
  },
  {
    id: 'cobalt',
    label: 'Cobalt',
    swatch: 'linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    swatch: 'linear-gradient(135deg, #047857 0%, #34d399 100%)',
  },
  {
    id: 'coral',
    label: 'Coral',
    swatch: 'linear-gradient(135deg, #dc2626 0%, #fb7185 100%)',
  },
  {
    id: 'violet',
    label: 'Violet',
    swatch: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
  },
  {
    id: 'amber',
    label: 'Amber',
    swatch: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
  },
] as const

export type AccentTheme = (typeof COLOR_THEMES)[number]['id']
export type ThemeMode = 'light' | 'dark'

export function isAccentTheme(value: string | null): value is AccentTheme {
  return COLOR_THEMES.some((theme) => theme.id === value)
}

export function applyThemeMode(mode: ThemeMode) {
  if (typeof document === 'undefined') return

  document.documentElement.classList.toggle('dark', mode === 'dark')
  localStorage.setItem('theme', mode)
}

export function applyAccentTheme(theme: AccentTheme) {
  if (typeof document === 'undefined') return

  document.documentElement.dataset.accentTheme = theme
  localStorage.setItem('accent-theme', theme)
}
