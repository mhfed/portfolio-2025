'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Settings,
  Languages,
  Sun,
  Moon,
  MousePointer,
  Sparkles,
  Download,
  Check,
  X,
} from 'lucide-react'
import { COLOR_THEMES, applyAccentTheme, applyThemeMode, type AccentTheme, type ThemeMode } from '@/lib/theme'

export function SettingsPanel() {
  const t = useTranslations('header')
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const currentLocale = (params.locale as string) || 'en'

  const [isOpen, setIsOpen] = useState(false)
  const [activeAccent, setActiveAccent] = useState<AccentTheme>('cobalt')
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark')
  const [cursorEnabled, setCursorEnabled] = useState(true)
  const [canvasEnabled, setCanvasEnabled] = useState(true)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load configuration on mount
  useEffect(() => {
    const savedAccent = localStorage.getItem('accent-theme') as AccentTheme
    if (savedAccent) {
      setActiveAccent(savedAccent)
    }

    const savedTheme = localStorage.getItem('theme') as ThemeMode
    if (savedTheme) {
      setThemeMode(savedTheme)
    } else {
      const isDark = document.documentElement.classList.contains('dark')
      setThemeMode(isDark ? 'dark' : 'light')
    }

    const cursorDisabled = localStorage.getItem('disable-cursor') === 'true'
    setCursorEnabled(!cursorDisabled)

    const canvasDisabled = localStorage.getItem('disable-canvas') === 'true'
    setCanvasEnabled(!canvasDisabled)
  }, [])

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleOutsideClick = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  const handleLanguageChange = (nextLocale: 'en' | 'vi' | 'zh-TW') => {
    router.replace(pathname, { locale: nextLocale })
  };

  const handleAccentChange = (accent: AccentTheme) => {
    setActiveAccent(accent)
    applyAccentTheme(accent)
  }

  const toggleTheme = () => {
    const nextTheme: ThemeMode = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(nextTheme)
    applyThemeMode(nextTheme)
  }

  const toggleCursor = () => {
    const nextVal = !cursorEnabled
    setCursorEnabled(nextVal)
    localStorage.setItem('disable-cursor', String(!nextVal))
    window.dispatchEvent(new Event('settings-updated'))
  }

  const toggleCanvas = () => {
    const nextVal = !canvasEnabled
    setCanvasEnabled(nextVal)
    localStorage.setItem('disable-canvas', String(!nextVal))
    window.dispatchEvent(new Event('settings-updated'))
  }

  // Find resume filename or path based on locale
  const getResumeUrl = () => {
    // Return relative path to public resumes
    if (currentLocale === 'vi') return '/resumes/Nguyen_Minh_Hieu_CV_vi.pdf'
    if (currentLocale === 'zh-TW') return '/resumes/Nguyen_Minh_Hieu_CV_zh.pdf'
    return '/resumes/Nguyen_Minh_Hieu_CV_en.pdf'
  }

  return (
    <div className="portfolio-settings" ref={panelRef}>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`settings-trigger ${isOpen ? 'is-active' : ''}`}
        aria-label={t('openThemeSettings')}
        title={t('openThemeSettings')}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5 animate-spin-slow" />}
      </button>

      {/* Settings Panel */}
      <div className={`settings-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="settings-panel__header">
          <h3>{t('openThemeSettings')}</h3>
        </div>

        <div className="settings-panel__body">
          {/* Theme Mode Option */}
          <div className="settings-option">
            <span className="settings-option__label">{t('themeMode')}</span>
            <button
              onClick={toggleTheme}
              className="settings-toggle-btn"
              aria-label={t('toggleTheme')}
            >
              {themeMode === 'dark' ? (
                <>
                  <Moon className="w-4 h-4 text-primary" />
                  <span>{t('dark')}</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>{t('light')}</span>
                </>
              )}
            </button>
          </div>

          {/* Accent Color Palette Selection */}
          <div className="settings-option flex-col items-start gap-2">
            <span className="settings-option__label">{t('colorTheme')}</span>
            <div className="accent-grid">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleAccentChange(theme.id)}
                  className={`accent-swatch ${activeAccent === theme.id ? 'is-active' : ''}`}
                  style={{ background: theme.swatch }}
                  title={theme.label}
                  aria-label={t('useTheme', { theme: theme.label })}
                >
                  {activeAccent === theme.id && (
                    <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Languages Selector */}
          <div className="settings-option flex-col items-start gap-2">
            <div className="flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-creative-dim" />
              <span className="settings-option__label">{t('changeLanguage')}</span>
            </div>
            <div className="language-selector">
              {(['en', 'vi', 'zh-TW'] as const).map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLanguageChange(locale)}
                  className={`lang-btn ${currentLocale === locale ? 'is-active' : ''}`}
                >
                  {locale === 'en' ? 'EN' : locale === 'vi' ? 'VI' : '繁中'}
                </button>
              ))}
            </div>
          </div>

          {/* FX Settings (Cursor & Canvas) */}
          <div className="settings-option flex-col items-start gap-2">
            <span className="settings-option__label">VFX / Graphics</span>
            <div className="flex flex-col w-full gap-1.5">
              <button
                onClick={toggleCanvas}
                className={`settings-fx-btn ${canvasEnabled ? 'is-active' : ''}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Constellations Web</span>
                <span className="fx-status">{canvasEnabled ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={toggleCursor}
                className={`settings-fx-btn ${cursorEnabled ? 'is-active' : ''}`}
              >
                <MousePointer className="w-4 h-4" />
                <span>Custom Ring Cursor</span>
                <span className="fx-status">{cursorEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* CV / Resume Actions */}
          <div className="settings-panel__footer pt-3 mt-1 border-t border-creative-line">
            <a
              href={getResumeUrl()}
              download
              className="settings-resume-btn w-full"
            >
              <Download className="w-4 h-4" />
              <span>{t('downloadResume')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
