'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

export interface CreativeNavProps {
  email: string
}

const LOCALES: { code: 'en' | 'vi' | 'zh-TW'; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
  { code: 'zh-TW', label: 'TW' },
]

export function CreativeNav({ email }: CreativeNavProps) {
  const t = useTranslations()
  const { locale: currentLocale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const navItems = [
    { label: t('header.nav.about'), href: '#about' },
    { label: t('header.nav.projects'), href: '#work' },
    { label: t('header.nav.experience'), href: '#experience' },
  ]

  return (
    <header className='fixed inset-x-0 top-0 z-40 border-b border-portfolio-line bg-portfolio-bg/88 backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12'>
        <a
          href='#top'
          className='inline-flex items-center gap-2.5 text-portfolio-ink no-underline transition-colors hover:text-portfolio-accent focus-visible:outline-2 focus-visible:outline-offset-2'
          aria-label='Back to top'
        >
          <span className='grid h-7 w-7 place-items-center bg-portfolio-ink font-mono text-[0.62rem] font-bold tracking-[-0.06em] text-portfolio-bg'>
            MH
          </span>
          <span className='hidden text-sm font-semibold tracking-[-0.04em] sm:block'>
            Minh Hieu
          </span>
        </a>

        <nav
          className='hidden items-center gap-1 lg:flex'
          aria-label='Primary navigation'
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className='px-3 py-2 text-sm text-portfolio-muted no-underline transition-colors hover:text-portfolio-ink focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className='flex items-center gap-1.5'>
          <div className='hidden items-center divide-x divide-portfolio-line border-x border-portfolio-line md:flex'>
            {LOCALES.map(({ code, label }) => (
              <button
                key={code}
                type='button'
                onClick={() => setLocale(code)}
                className={cn(
                  'px-2 py-1 font-mono text-[0.62rem] font-semibold tracking-[0.1em] transition-colors',
                  currentLocale === code
                    ? 'text-portfolio-ink'
                    : 'text-portfolio-dim hover:text-portfolio-ink'
                )}
                aria-label={`Switch language to ${label}`}
                aria-pressed={currentLocale === code}
              >
                {label}
              </button>
            ))}
          </div>
          <a
            href={`mailto:${email}`}
            className='hidden bg-portfolio-ink px-3.5 py-2 text-sm font-semibold text-portfolio-bg no-underline transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.98] sm:inline-flex'
          >
            {t('header.contact')}
          </a>
          <button
            type='button'
            onClick={() => setOpen((value) => !value)}
            className='grid h-9 w-9 place-items-center border border-portfolio-line text-portfolio-ink lg:hidden'
            aria-label='Toggle navigation'
            aria-expanded={open}
          >
            {open ? <X size={17} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'border-b border-portfolio-line bg-portfolio-bg/98 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
          open
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        )}
        aria-hidden={!open}
      >
        <nav
          className='mx-auto grid max-w-[90rem] gap-1 px-5 py-4 sm:px-8'
          aria-label='Mobile navigation'
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className='border-b border-portfolio-line py-3 text-base font-medium text-portfolio-ink no-underline transition-colors hover:text-portfolio-accent'
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${email}`}
            className='mt-2 bg-portfolio-ink px-4 py-3 text-base font-semibold text-portfolio-bg no-underline'
          >
            {t('header.contact')}
          </a>
          <div className='mt-3 flex divide-x divide-portfolio-line border-x border-portfolio-line'>
            {LOCALES.map(({ code, label }) => (
              <button
                key={code}
                type='button'
                onClick={() => setLocale(code)}
                className={cn(
                  'px-3 py-2 font-mono text-xs font-semibold tracking-[0.1em]',
                  currentLocale === code
                    ? 'text-portfolio-ink'
                    : 'text-portfolio-dim'
                )}
                aria-pressed={currentLocale === code}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
