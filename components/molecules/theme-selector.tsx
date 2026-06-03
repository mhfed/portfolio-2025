'use client'

import { Check, Palette } from 'lucide-react'
import { COLOR_THEMES, type AccentTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface ThemeSelectorProps {
  accentTheme: AccentTheme
  onAccentThemeChange: (theme: AccentTheme) => void
  compact?: boolean
}

export function ThemeSelector({
  accentTheme,
  onAccentThemeChange,
  compact = false,
}: ThemeSelectorProps) {
  const tHeader = useTranslations('header')
  return (
    <div
      className={cn(
        'rounded-xl border border-border/60 bg-background/95 p-3 shadow-lg backdrop-blur',
        compact ? 'w-[220px]' : 'w-full'
      )}
    >
      <div className='mb-3 flex items-center gap-2'>
        <Palette className='h-4 w-4 text-primary' />
        <span className='text-sm font-medium text-foreground'>{tHeader('colorTheme')}</span>
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
                  ? 'border-primary bg-theme-soft shadow-theme-glow'
                  : 'border-border/60 bg-card hover:border-primary/40 hover:bg-theme-soft'
              )}
              aria-pressed={isActive}
              aria-label={tHeader('useTheme', { theme: theme.label })}
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
