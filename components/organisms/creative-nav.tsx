'use client'

import { FileText, Briefcase, User, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/hooks/use-locale'

const LOCALES: { code: 'en' | 'vi' | 'zh-TW'; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
  { code: 'zh-TW', label: 'TW' },
]

const PANEL_BG = 'rgba(8, 9, 7, 0.82)'

export function CreativeNav({ email }: { email: string }) {
  const t = useTranslations()
  const { locale: currentLocale, setLocale } = useLocale()

  const navItems = [
    { label: t('header.nav.projects'), href: '#work', icon: Briefcase },
    { label: t('header.nav.about'), href: '#about', icon: User },
    { label: t('header.nav.experience'), href: '#experience', icon: Calendar },
  ]

  return (
    <>
      {/* Desktop HUD bar */}
      <header className='creative-nav pointer-events-none fixed left-1/2 top-5 z-50 -translate-x-1/2 max-sm:left-3 max-sm:right-3 max-sm:top-3 max-sm:translate-x-0'>
        <div
          className='hud-panel pointer-events-auto flex items-center gap-1 rounded-lg px-2 py-1.5 backdrop-blur-xl max-sm:justify-between'
          style={{ background: PANEL_BG }}
        >
          {/* Brand mark */}
          <a
            href='#top'
            className='inline-flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-creative-ink no-underline transition-colors duration-300 hover:bg-white/5'
            aria-label='Back to top'
          >
            <span className='grid h-8 w-8 place-items-center rounded-[4px] bg-creative-green font-mono text-[10px] font-black tracking-tight text-creative-bg'>
              MH
            </span>
            <span className='hidden flex-col leading-none lg:flex'>
              <span className='font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-creative-ink'>
                N.M.HIEU
              </span>
              <span className='mt-0.5 flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-creative-dim'>
                <span className='h-1 w-1 rounded-full bg-creative-green' />
                {t('header.developer')}
              </span>
            </span>
          </a>

          <span
            className='mx-1 hidden h-6 w-px bg-creative-line lg:block'
            aria-hidden='true'
          />

          {/* Nav links */}
          <nav
            className='hidden items-center gap-0.5 lg:flex'
            aria-label='Primary navigation'
          >
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className='relative rounded-md px-3.5 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-creative-muted no-underline transition-colors duration-300 hover:text-creative-green after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-px after:origin-left after:scale-x-0 after:bg-creative-green after:transition-transform after:duration-300 hover:after:scale-x-100'
              >
                <span className='mr-1.5 text-creative-line'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          <span
            className='mx-1 hidden h-6 w-px bg-creative-line lg:block'
            aria-hidden='true'
          />

          {/* Locale switcher */}
          <div
            className='hidden items-center gap-0.5 lg:flex'
            aria-label='Language switcher'
          >
            {LOCALES.map(({ code, label }) => {
              const active = currentLocale === code
              return (
                <button
                  key={code}
                  onClick={() => setLocale(code)}
                  className='rounded-[4px] px-2.5 py-1.5 font-mono text-[9.5px] font-black uppercase tracking-[0.12em] transition-colors duration-200'
                  style={{
                    color: active ? 'var(--creative-bg)' : 'var(--creative-dim)',
                    background: active ? 'var(--creative-green)' : 'transparent',
                  }}
                  aria-pressed={active}
                  aria-label={`Switch language to ${label}`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <span
            className='mx-1 hidden h-6 w-px bg-creative-line lg:block'
            aria-hidden='true'
          />

          {/* Actions */}
          <div className='flex items-center gap-1'>
            <a
              href='/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
              download
              className='inline-flex items-center gap-2 rounded-md border border-creative-line px-3 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-creative-muted no-underline transition-colors duration-300 hover:border-creative-green/40 hover:text-creative-ink max-sm:h-9 max-sm:w-9 max-sm:justify-center max-sm:border-0 max-sm:p-0'
              aria-label='Download resume'
            >
              <FileText className='h-3.5 w-3.5 shrink-0' aria-hidden='true' />
              <span className='max-sm:hidden'>{t('header.downloadResume')}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className='inline-flex items-center gap-2 rounded-md bg-creative-green px-3.5 py-2 font-mono text-[10.5px] font-black uppercase tracking-[0.1em] text-creative-bg no-underline transition-transform duration-300 hover:scale-[1.03] max-sm:h-9 max-sm:w-9 max-sm:justify-center max-sm:p-0'
              aria-label={`Email ${email}`}
            >
              <span className='max-sm:hidden'>{t('header.contact')}</span>
              <span className='hidden max-sm:inline' aria-hidden='true'>
                @
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile bottom HUD nav */}
      <div
        className='hud-panel pointer-events-auto fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg backdrop-blur-xl lg:hidden'
        style={{ background: PANEL_BG }}
        aria-label='Mobile navigation'
      >
        <nav className='flex items-center gap-0.5 p-1.5'>
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className='flex items-center gap-1.5 rounded-md px-3.5 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-creative-muted transition-colors duration-200 hover:text-creative-ink active:scale-95'
              >
                <IconComponent
                  className='h-3.5 w-3.5 text-creative-green'
                  aria-hidden='true'
                />
                <span className='hidden sm:inline'>{item.label}</span>
              </a>
            )
          })}

          {LOCALES.map(({ code, label }) => {
            const active = currentLocale === code
            return (
              <button
                key={code}
                onClick={() => setLocale(code)}
                className='rounded-[4px] px-2.5 py-2 font-mono text-[9px] font-black uppercase tracking-[0.1em] transition-colors duration-200 active:scale-95'
                style={{
                  color: active ? 'var(--creative-bg)' : 'var(--creative-dim)',
                  background: active ? 'var(--creative-green)' : 'transparent',
                }}
                aria-pressed={active}
                aria-label={`Switch to ${label}`}
              >
                {label}
              </button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
