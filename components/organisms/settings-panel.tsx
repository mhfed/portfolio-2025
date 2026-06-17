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

    const handleOutsideClick = (event: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
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
    return '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
  }

  return (
    <div className="portfolio-settings fixed bottom-6 right-6 max-sm:bottom-4 max-sm:right-4 z-60 font-sans" ref={panelRef}>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`settings-trigger flex items-center justify-center w-13 h-13 rounded-full border border-creative-line bg-[#080907]/76 text-creative-ink backdrop-blur-[16px] cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-creative-lime hover:text-creative-lime hover:scale-105 ${
          isOpen ? 'bg-creative-lime text-[#080907] border-creative-lime' : ''
        }`}
        aria-label={t('openThemeSettings')}
        title={t('openThemeSettings')}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5 animate-spin-slow" />}
      </button>

      {/* Settings Panel */}
      <div className={`settings-panel absolute bottom-16 right-0 w-70 max-sm:w-[calc(100vw-2rem)] border border-creative-line rounded-2xl bg-[#080907]/82 backdrop-blur-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.5)] origin-bottom-right transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
        isOpen ? 'opacity-100 pointer-events-auto translate-y-0 scale-100' : 'opacity-0 pointer-events-none translate-y-4 scale-95'
      }`}>
        <div className="settings-panel__header pt-4 px-5 pb-3 border-b border-creative-line">
          <h3 className="m-0 font-display text-[0.88rem] font-extrabold uppercase tracking-widest text-creative-ink">{t('openThemeSettings')}</h3>
        </div>

        <div className="settings-panel__body p-5 flex flex-col gap-5">
          {/* Theme Mode Option */}
          <div className="settings-option flex items-center justify-between w-full">
            <span className="settings-option__label font-mono text-[0.68rem] font-extrabold uppercase tracking-widest text-creative-dim">{t('themeMode')}</span>
            <button
              onClick={toggleTheme}
              className="settings-toggle-btn flex items-center gap-1.5 border border-creative-line rounded-full bg-[rgba(243,240,223,0.04)] px-3.5 py-2 text-creative-ink font-mono text-[0.72rem] font-extrabold cursor-pointer transition-all duration-200 hover:border-[rgba(243,240,223,0.3)] hover:bg-[rgba(243,240,223,0.08)]"
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
          <div className="settings-option flex items-center justify-between w-full flex-col items-start gap-2">
            <span className="settings-option__label font-mono text-[0.68rem] font-extrabold uppercase tracking-widest text-creative-dim">{t('colorTheme')}</span>
            <div className="accent-grid grid grid-cols-6 gap-2 w-full">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleAccentChange(theme.id)}
                  className={`accent-swatch flex items-center justify-center aspect-square rounded-full border border-white/10 cursor-pointer p-0 transition-all duration-200 hover:scale-[1.12] hover:border-white/40 ${
                    activeAccent === theme.id ? 'border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]' : ''
                  }`}
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
          <div className="settings-option flex items-center justify-between w-full flex-col items-start gap-2">
            <div className="flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-creative-dim" />
              <span className="settings-option__label font-mono text-[0.68rem] font-extrabold uppercase tracking-widest text-creative-dim">{t('changeLanguage')}</span>
            </div>
            <div className="language-selector flex w-full border border-creative-line rounded-lg overflow-hidden bg-[rgba(243,240,223,0.02)]">
              {(['en', 'vi', 'zh-TW'] as const).map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLanguageChange(locale)}
                  className={`lang-btn flex-1 border-0 bg-transparent py-2 px-0 text-creative-dim font-mono text-[0.72rem] font-extrabold cursor-pointer transition-all duration-200 hover:text-creative-ink hover:bg-[rgba(243,240,223,0.04)] ${
                    currentLocale === locale ? '!text-[#080907] !bg-creative-lime font-black' : ''
                  }`}
                >
                  {locale === 'en' ? 'EN' : locale === 'vi' ? 'VI' : '繁中'}
                </button>
              ))}
            </div>
          </div>

          {/* FX Settings (Cursor & Canvas) */}
          <div className="settings-option flex items-center justify-between w-full flex-col items-start gap-2">
            <span className="settings-option__label font-mono text-[0.68rem] font-extrabold uppercase tracking-widest text-creative-dim">VFX / Graphics</span>
            <div className="flex flex-col w-full gap-1.5">
              <button
                onClick={toggleCanvas}
                className={`settings-fx-btn flex items-center justify-between w-full border rounded-lg bg-[rgba(243,240,223,0.02)] px-3 py-2 text-[0.74rem] cursor-pointer transition-all duration-200 hover:bg-[rgba(243,240,223,0.04)] ${
                  canvasEnabled
                    ? 'border-creative-lime/28 text-creative-ink'
                    : 'border-creative-line text-creative-muted hover:border-[rgba(243,240,223,0.22)]'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${canvasEnabled ? 'text-creative-lime' : 'text-inherit'}`} />
                <span>Constellations Web</span>
                <span className={`fx-status font-mono text-[0.65rem] font-black px-1.5 py-0.5 rounded-sm ${
                  canvasEnabled ? 'bg-creative-lime/16 text-creative-lime' : 'bg-[rgba(243,240,223,0.08)] text-inherit'
                }`}>{canvasEnabled ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={toggleCursor}
                className={`settings-fx-btn flex items-between justify-between w-full border rounded-lg bg-[rgba(243,240,223,0.02)] px-3 py-2 text-[0.74rem] cursor-pointer transition-all duration-200 hover:bg-[rgba(243,240,223,0.04)] ${
                  cursorEnabled
                    ? 'border-creative-lime/28 text-creative-ink'
                    : 'border-creative-line text-creative-muted hover:border-[rgba(243,240,223,0.22)]'
                }`}
              >
                <MousePointer className={`w-4 h-4 ${cursorEnabled ? 'text-creative-lime' : 'text-inherit'}`} />
                <span>Custom Ring Cursor</span>
                <span className={`fx-status font-mono text-[0.65rem] font-black px-1.5 py-0.5 rounded-sm ${
                  cursorEnabled ? 'bg-creative-lime/16 text-creative-lime' : 'bg-[rgba(243,240,223,0.08)] text-inherit'
                }`}>{cursorEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* CV / Resume Actions */}
          <div className="settings-panel__footer pt-3 mt-1 border-t border-creative-line">
            <a
              href={getResumeUrl()}
              download
              className="settings-resume-btn w-full inline-flex items-center justify-center gap-2 border border-creative-line rounded-full bg-creative-lime px-4 py-2.5 text-[#10120c] text-[0.78rem] font-black no-underline cursor-pointer transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(200,255,69,0.2)]"
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
