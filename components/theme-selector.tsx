'use client'

import { Check, Palette, Sun, Moon } from 'lucide-react'
import { COLOR_THEMES, type AccentTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

interface ThemeSelectorProps {
  isDark: boolean
  accentTheme: AccentTheme
  onToggleMode: () => void
  onAccentThemeChange: (theme: AccentTheme) => void
  compact?: boolean
}

export function ThemeSelector({
  isDark,
  accentTheme,
  onToggleMode,
  onAccentThemeChange,
  compact = false,
}: ThemeSelectorProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border/60 bg-background/95 p-3 shadow-lg backdrop-blur',
        compact ? 'w-[220px]' : 'w-full'
      )}
    >
      <div className='mb-3 flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <Palette className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium text-foreground'>Color theme</span>
        </div>
        <button
          type='button'
          onClick={onToggleMode}
          className='inline-flex h-9 items-center gap-2 rounded-full border border-border/60 bg-muted/60 px-3 text-xs font-medium text-foreground transition-colors hover:bg-primary/10'
          aria-label='Toggle light and dark mode'
        >
          {isDark ? <Sun className='h-3.5 w-3.5' /> : <Moon className='h-3.5 w-3.5' />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      <div className='grid grid-cols-3 gap-2'>
        {COLOR_THEMES.map((theme) => {
          const isActive = theme.id === accentTheme

          return (
            <button
              key={theme.id}
              type='button'
              onClick={() => onAccentThemeChange(theme.id)}
              className={cn(
                'group relative overflow-hidden rounded-lg border p-2 text-left transition-all',
                isActive
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5'
              )}
              aria-pressed={isActive}
              aria-label={`Use ${theme.label} theme`}
            >
              <span
                className='mb-2 block h-8 rounded-md'
                style={{ background: theme.swatch }}
              />
              <span className='block text-xs font-medium text-foreground/80'>
                {theme.label}
              </span>
              {isActive && (
                <span className='absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm'>
                  <Check className='h-3 w-3' />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
