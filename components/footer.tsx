import { getTranslations } from 'next-intl/server'
import { SocialsDock } from './socials-dock'
import Link from 'next/link'

interface FooterProps {
  locale: string
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations('collaborate')
  const tContact = await getTranslations('hero.contact')
  const tBlog = await getTranslations('blog')

  const footerLinks = [
    { name: tBlog('home'), href: `/${locale}` },
    { name: tBlog('allPosts'), href: `/${locale}/blog` },
  ]

  return (
    <footer
      id='collaborate'
      className='mt-8 px-4 md:mt-12 md:px-6 lg:mt-16'
    >
      <div className='max-w-5xl mx-auto py-6 md:py-8'>
        <div className='space-y-8 md:space-y-10'>
          {/* Collaborate Section */}
          <div className='space-y-4'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary'>
              {t('title')}
            </h2>
            <p className='text-base md:text-lg lg:text-xl text-foreground/70'>
              {t('description') ||
                "Have an exciting project in mind? I'd love to hear about it."}
            </p>
            <a
              href={`mailto:${tContact('email')}`}
              className='text-base md:text-lg lg:text-xl md:lg:text-2xl text-foreground hover:text-primary transition-colors inline-block'
            >
              {tContact('email')}
            </a>
          </div>

          {/* Socials Dock */}
          <div className='flex justify-center md:justify-end'>
            <SocialsDock />
          </div>

          {/* Footer Links & Copyright */}
          <div className='space-y-3 border-t border-border/30 pt-5 md:pt-6'>
            {/* Quick Links */}
            <nav className='flex flex-wrap gap-4 justify-center md:justify-start'>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-sm text-foreground/60 hover:text-primary transition-colors'
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <div className='text-xs md:text-sm text-foreground/60 text-center md:text-left'>
              Copyright © {new Date().getFullYear()} Nguyen Minh Hieu. All
              Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
