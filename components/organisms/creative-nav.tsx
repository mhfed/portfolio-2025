'use client'

import { Mail, FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function CreativeNav({ email, locale }: { email: string; locale: string }) {
  const t = useTranslations('header')

  const navItems = [
    { label: t('nav.projects'), href: '#work' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.skills'), href: '#skills' },
  ]

  const getResumeUrl = () => {
    if (locale === 'vi') return '/resumes/Nguyen_Minh_Hieu_CV_vi.pdf'
    if (locale === 'zh-TW') return '/resumes/Nguyen_Minh_Hieu_CV_zh.pdf'
    return '/resumes/Nguyen_Minh_Hieu_CV_en.pdf'
  }

  return (
    <header className='creative-nav'>
      {/* Brand logo double bezel */}
      <div className="p-[2px] rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all pointer-events-auto">
        <a href='#top' className='creative-nav__brand !border-0 !bg-transparent !p-1' aria-label='Back to top'>
          <span>MH</span>
          <small className="pr-2">{t('developer')}</small>
        </a>
      </div>

      {/* Nav links double bezel */}
      <div className="p-[2px] rounded-full bg-white/5 border border-white/10 pointer-events-auto max-lg:hidden">
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
        <div className="p-[2px] rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all">
          <a className='creative-nav__resume !border-0 !bg-transparent !py-2 !px-3.5' href={getResumeUrl()} download>
            <FileText className="w-3.5 h-3.5" aria-hidden='true' />
            <span>{t('downloadResume')}</span>
          </a>
        </div>
        <div className="p-[2px] rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all">
          <a className='creative-nav__mail !border-0 !bg-transparent !py-2 !px-3.5' href={`mailto:${email}`}>
            <Mail className="w-3.5 h-3.5" aria-hidden='true' />
            <span>{t('contact')}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
