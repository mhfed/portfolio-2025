import { Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function CreativeNav({ email }: { email: string }) {
  const t = useTranslations('header')

  const navItems = [
    { label: t('nav.projects'), href: '#work' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.skills'), href: '#skills' },
  ]

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

      <a className='creative-nav__mail' href={`mailto:${email}`}>
        <Mail aria-hidden='true' />
        <span>{t('contact')}</span>
      </a>
    </header>
  )
}
