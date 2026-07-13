export type ThemeMode = 'light' | 'dark'

export function applyThemeMode(mode: ThemeMode) {
  if (typeof document === 'undefined') return

  document.documentElement.classList.toggle('dark', mode === 'dark')
  localStorage.setItem('theme', mode)
}
