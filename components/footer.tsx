import { getTranslations } from 'next-intl/server'
import { SocialsDock } from './socials-dock'
import Link from 'next/link'
import { Reveal } from './ui/reveal'

interface FooterProps {
  locale: string
}

export async function Footer({ locale }: FooterProps) {
  const [t, tContact, tCommon] = await Promise.all([
    getTranslations('collaborate'),
    getTranslations('hero.contact'),
    getTranslations('common'),
  ])

  const footerLinks = [
    { name: tCommon('home'), href: `/${locale}` },
  ]

  return (
    <footer id='collaborate' className='section-shell px-4 pb-8 md:px-6'>
      <div className='mx-auto max-w-[1280px]'>
        <div className='border-t border-white/10 pt-10 md:pt-12'>
          <div className='grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end'>
            <Reveal>
              <div className='space-y-5'>
                <span className='section-kicker'>{t('kicker')}</span>
                <h2 className='max-w-3xl font-display text-3xl font-semibold leading-[0.92] tracking-[-0.07em] text-foreground md:text-5xl lg:text-[4.5rem]'>
                  {t('title')}
                </h2>
                <p className='max-w-2xl text-base leading-relaxed text-foreground/72 md:text-lg'>
                  {t('description') ||
                    "Have an exciting project in mind? I'd love to hear about it."}
                </p>
                <a
                  href={`mailto:${tContact('email')}`}
                  className='inline-block text-lg text-primary transition-colors hover:text-primary/80 md:text-[1.75rem]'
                >
                  {tContact('email')}
                </a>
              </div>
            </Reveal>

            <Reveal delay={80} variant='right'>
              <div className='grid gap-8 sm:grid-cols-2'>
                <div>
                  <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75'>
                    {t('quickLinks')}
                  </div>
                  <nav className='mt-4 space-y-3'>
                    {footerLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className='block text-base text-foreground/68 transition-colors hover:text-foreground'
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div>
                  <div className='mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75'>
                    {t('directLinks')}
                  </div>
                  <SocialsDock />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className='mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-foreground/56 md:flex-row md:items-center md:justify-between'>
              <div>© {new Date().getFullYear()} Nguyen Minh Hieu</div>
              <div className='flex items-center gap-3'>
                <span>{locale.toUpperCase()}</span>
                <span>{t('allRightsReserved')}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  )
}
