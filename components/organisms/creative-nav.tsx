'use client'

import { Mail, FileText, Briefcase, User, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function CreativeNav({
  email,
  locale,
}: {
  email: string
  locale: string
}) {
  const t = useTranslations()

  const navItems = [
    { label: t('header.nav.projects'), href: '#work', icon: Briefcase },
    { label: t('header.nav.about'), href: '#about', icon: User },
    { label: t('header.nav.experience'), href: '#experience', icon: Calendar },
  ]

  const getResumeUrl = () => {
    return '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf'
  }

  return (
    <>
      {/* Floating Glass Pill Navigation */}
      <header className='creative-nav fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none max-sm:top-3 max-sm:left-3 max-sm:right-3 max-sm:translate-x-0'>
        <div className='pointer-events-auto p-[2px] rounded-full bg-[#080907]/70 backdrop-blur-xl border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] max-sm:rounded-2xl'>
          <div className='flex items-center gap-1 px-2 py-1.5 max-sm:justify-between'>
            {/* Brand */}
            <a
              href='#top'
              className='inline-flex items-center gap-2.5 rounded-full px-3 py-2 text-creative-ink no-underline transition-all duration-300 hover:bg-white/5'
              aria-label='Back to top'
            >
              <span className='grid w-8 h-8 place-items-center rounded-full bg-creative-lime text-[#10120c] font-mono font-black text-[10px] tracking-tight'>
                MH
              </span>
              <span className='text-creative-muted text-[11px] font-bold tracking-wide max-sm:hidden'>
                {t('header.developer')}
              </span>
            </a>

            {/* Desktop Nav Links */}
            <nav
              className='hidden lg:flex items-center gap-0.5 mx-4'
              aria-label='Primary navigation'
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className='relative text-[10.5px] font-extrabold tracking-[0.08em] uppercase px-4 py-2 rounded-full text-creative-muted no-underline transition-all duration-300 hover:text-creative-ink hover:bg-white/5 active:scale-[0.97]'
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Separator */}
            <div className='hidden lg:block w-[1px] h-5 bg-white/10 mx-1' />

            {/* Actions */}
            <div className='flex items-center gap-1'>
              <a
                className='inline-flex items-center gap-2 rounded-full text-[10.5px] tracking-[0.06em] uppercase font-black text-creative-muted no-underline transition-all duration-300 hover:text-creative-lime hover:bg-white/5 py-2 px-3 max-sm:w-9 max-sm:h-9 max-sm:justify-center max-sm:p-0'
                href={getResumeUrl()}
                download
              >
                <FileText className='w-3.5 h-3.5 shrink-0' aria-hidden='true' />
                <span className='max-sm:hidden'>
                  {t('header.downloadResume')}
                </span>
              </a>
              <a
                className='inline-flex items-center gap-2 rounded-full text-[10.5px] tracking-[0.06em] uppercase font-black bg-creative-lime/10 text-creative-lime no-underline transition-all duration-300 hover:bg-creative-lime hover:text-black py-2 px-3.5 max-sm:w-9 max-sm:h-9 max-sm:justify-center max-sm:p-0'
                href={`mailto:${email}`}
              >
                <Mail className='w-3.5 h-3.5 shrink-0' aria-hidden='true' />
                <span className='max-sm:hidden'>{t('header.contact')}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Bottom Nav for Mobile/Tablet */}
      <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-[2px] rounded-full bg-[#080907]/85 backdrop-blur-xl border border-white/8 shadow-[0_12px_40px_rgba(0,0,0,0.65)] pointer-events-auto lg:hidden'>
        <nav
          className='flex items-center gap-0.5 p-1'
          aria-label='Mobile navigation'
        >
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className='flex items-center gap-1.5 text-[9px] font-extrabold tracking-wider uppercase px-3.5 py-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-200'
              >
                <IconComponent
                  className='w-3.5 h-3.5 text-creative-lime'
                  aria-hidden='true'
                />
                <span className='hidden sm:inline'>{item.label}</span>
              </a>
            )
          })}
          <a
            href='#contact'
            className='flex items-center gap-1.5 text-[9px] font-extrabold tracking-wider uppercase px-3.5 py-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-200'
          >
            <Mail
              className='w-3.5 h-3.5 text-creative-lime'
              aria-hidden='true'
            />
            <span className='hidden sm:inline'>{t('header.contact')}</span>
          </a>
        </nav>
      </div>
    </>
  )
}
