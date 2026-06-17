'use client'

import { Mail, FileText, Briefcase, User, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function CreativeNav({ email, locale }: { email: string; locale: string }) {
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
      <header className='creative-nav'>
        {/* Brand logo double bezel */}
        <div className="p-[2px] rounded-full bg-[#080907]/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all pointer-events-auto">
          <a href='#top' className='creative-nav__brand !border-0 !bg-transparent !p-1' aria-label='Back to top'>
            <span>MH</span>
            <small className="pr-2">{t('header.developer')}</small>
          </a>
        </div>

        {/* Nav links double bezel */}
        <div className="p-[2px] rounded-full bg-[#080907]/80 backdrop-blur-md border border-white/10 pointer-events-auto max-lg:hidden">
          <nav className='creative-nav__links !border-0 !bg-transparent !p-0.5' aria-label='Primary navigation'>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:!bg-creative-lime hover:!text-black font-extrabold text-[10px] tracking-wider uppercase px-4 py-2 rounded-full transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Actions wrapper double bezel */}
        <div className='creative-nav__actions-wrapper'>
          <div className="p-[2px] rounded-full bg-[#080907]/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all">
            <a className='creative-nav__resume !border-0 !bg-transparent lg:!py-2 lg:!px-3.5' href={getResumeUrl()} download>
              <FileText className="w-3.5 h-3.5" aria-hidden='true' />
              <span>{t('header.downloadResume')}</span>
            </a>
          </div>
          <div className="p-[2px] rounded-full bg-[#080907]/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all">
            <a className='creative-nav__mail !border-0 !bg-transparent lg:!py-2 lg:!px-3.5' href={`mailto:${email}`}>
              <Mail className="w-3.5 h-3.5" aria-hidden='true' />
              <span>{t('header.contact')}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Floating Bottom Nav for Mobile/Tablet */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-[2.5px] rounded-full bg-[#080907]/85 backdrop-blur-lg border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.6)] pointer-events-auto lg:hidden">
        <nav className="flex items-center gap-0.5 p-0.5" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-1 text-[9.5px] font-extrabold tracking-wider uppercase px-3.5 py-2 rounded-full text-white/70 hover:text-white active:scale-95 transition-all"
              >
                <IconComponent className="w-3.5 h-3.5 text-creative-lime" aria-hidden="true" />
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            )
          })}
          <a
            href="#contact"
            className="flex items-center gap-1 text-[9.5px] font-extrabold tracking-wider uppercase px-3.5 py-2 rounded-full text-white/70 hover:text-white active:scale-95 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-creative-lime" aria-hidden="true" />
            <span className="hidden sm:inline">{t('header.contact')}</span>
          </a>
        </nav>
      </div>
    </>
  )
}
