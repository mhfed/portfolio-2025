'use client'

import { FileText, Briefcase, User, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/hooks/use-locale'

const LOCALES: { code: 'en' | 'vi' | 'zh-TW'; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
  { code: 'zh-TW', label: 'TW' },
]

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
      {/* Floating Glass Pill Navigation — desktop */}
      <header className='creative-nav fixed top-5 left-1/2 z-50 -translate-x-1/2 pointer-events-none max-sm:top-3 max-sm:left-3 max-sm:right-3 max-sm:translate-x-0'>
        <div className='pointer-events-auto rounded-full border border-white/8 bg-[#080907]/75 p-[2px] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl max-sm:rounded-2xl'>
          <div className='flex items-center gap-1 px-2 py-1.5 max-sm:justify-between'>
            {/* Brand mark */}
            <a
              href='#top'
              className='inline-flex items-center gap-2.5 rounded-full px-3 py-2 text-creative-ink no-underline transition-all duration-300 hover:bg-white/5'
              aria-label='Back to top'
            >
              <span className='grid h-8 w-8 place-items-center rounded-full bg-[var(--creative-lime)] font-mono text-[10px] font-black tracking-tight text-[#10120c]'>
                MH
              </span>
              <span className='hidden text-[11px] font-bold tracking-wide text-creative-muted lg:inline'>
                {t('header.developer')}
              </span>
            </a>

            {/* Desktop nav links */}
            <nav
              className='mx-4 hidden items-center gap-0.5 lg:flex'
              aria-label='Primary navigation'
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className='relative rounded-full px-4 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-creative-muted no-underline transition-all duration-300 hover:bg-white/5 hover:text-creative-ink active:scale-[0.97]'
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Separator */}
            <div
              className='mx-1 hidden h-5 w-[1px] bg-white/10 lg:block'
              aria-hidden='true'
            />

            {/* Locale switcher */}
            <div
              className='hidden items-center gap-0.5 lg:flex'
              aria-label='Language switcher'
            >
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLocale(code)}
                  className='rounded-full px-2.5 py-1.5 font-mono text-[9.5px] font-black uppercase tracking-[0.1em] transition-all duration-200 active:scale-95'
                  style={{
                    color:
                      currentLocale === code
                        ? '#10120c'
                        : 'rgba(248,248,245,0.4)',
                    background:
                      currentLocale === code
                        ? 'var(--creative-lime)'
                        : 'transparent',
                  }}
                  aria-pressed={currentLocale === code}
                  aria-label={`Switch language to ${label}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div
              className='mx-1 hidden h-5 w-[1px] bg-white/10 lg:block'
              aria-hidden='true'
            />

            {/* Actions */}
            <div className='flex items-center gap-1'>
              <a
                href='/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
                download
                className='inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-[0.06em] text-creative-muted no-underline transition-all duration-300 hover:bg-white/5 hover:text-creative-ink max-sm:h-9 max-sm:w-9 max-sm:justify-center max-sm:p-0'
                aria-label='Download resume'
              >
                <FileText className='h-3.5 w-3.5 shrink-0' aria-hidden='true' />
                <span className='max-sm:hidden'>
                  {t('header.downloadResume')}
                </span>
              </a>
              <a
                href={`mailto:${email}`}
                className='inline-flex items-center gap-2 rounded-full bg-[var(--creative-lime)]/10 px-3.5 py-2 font-mono text-[10.5px] font-black uppercase tracking-[0.06em] text-[var(--creative-lime)] no-underline transition-all duration-300 hover:bg-[var(--creative-lime)] hover:text-black max-sm:h-9 max-sm:w-9 max-sm:justify-center max-sm:p-0'
                aria-label={`Email ${email}`}
              >
                <span className='max-sm:hidden'>{t('header.contact')}</span>
                <span
                  className='max-sm:inline hidden text-[var(--creative-lime)]'
                  aria-hidden='true'
                >
                  @
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <div
        className='pointer-events-auto fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/8 bg-[#080907]/85 p-[2px] shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl lg:hidden'
        aria-label='Mobile navigation'
      >
        <nav className='flex items-center gap-0.5 p-1'>
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className='flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[9px] font-extrabold uppercase tracking-wider text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white active:scale-95'
              >
                <IconComponent
                  className='h-3.5 w-3.5 text-[var(--creative-lime)]'
                  aria-hidden='true'
                />
                <span className='hidden sm:inline'>{item.label}</span>
              </a>
            )
          })}

          {/* Mobile locale toggles */}
          {LOCALES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLocale(code)}
              className='rounded-full px-2.5 py-2 font-mono text-[9px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95'
              style={{
                color:
                  currentLocale === code ? '#10120c' : 'rgba(248,248,245,0.35)',
                background:
                  currentLocale === code
                    ? 'var(--creative-lime)'
                    : 'transparent',
              }}
              aria-pressed={currentLocale === code}
              aria-label={`Switch to ${label}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
