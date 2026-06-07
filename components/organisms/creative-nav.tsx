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
      <a href='#top' className='creative-nav__brand' aria-label='Back to top'>
        <span>MH</span>
        <small>{t('developer')}</small>
      </a>

      <nav className='creative-nav__links' aria-label='Primary navigation'>
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className='creative-nav__actions-wrapper'>
        <a className='creative-nav__resume' href={getResumeUrl()} download>
          <FileText aria-hidden='true' />
          <span>{t('downloadResume')}</span>
        </a>
        <a className='creative-nav__mail' href={`mailto:${email}`}>
          <Mail aria-hidden='true' />
          <span>{t('contact')}</span>
        </a>
      </div>
    </header>
  )
}
