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
    <footer id='collaborate' className='mt-10 px-4 pb-20 md:mt-14 md:px-6'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='terminal-panel px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10'>
          <div className='grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end'>
            <div className='space-y-4'>
              <span className='terminal-label'>collaboration channel</span>
              <h2 className='font-display text-3xl font-semibold uppercase leading-[0.95] tracking-[-0.06em] text-foreground md:text-4xl lg:text-5xl'>
                {t('title')}
              </h2>
              <p className='max-w-2xl text-base leading-relaxed text-foreground/72 md:text-lg'>
                {t('description') ||
                  "Have an exciting project in mind? I'd love to hear about it."}
              </p>
              <a
                href={`mailto:${tContact('email')}`}
                className='inline-block text-lg text-primary transition-colors hover:text-primary/80 md:text-2xl'
              >
                {tContact('email')}
              </a>
            </div>

            <div className='space-y-6'>
              <div>
                <div className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/75'>
                  quick links
                </div>
                <nav className='mt-3 flex flex-wrap gap-3'>
                  {footerLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className='rounded-full border border-primary/15 bg-background/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary'
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <div className='mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/75'>
                  direct links
                </div>
                <SocialsDock />
              </div>
            </div>
          </div>

          <div className='terminal-divider mt-8' />
        </div>
      </div>

      <div className='fixed inset-x-0 bottom-0 z-40 border-t border-primary/15 bg-background/80 backdrop-blur-xl'>
        <div className='mx-auto flex h-12 max-w-[1600px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8'>
          <div className='flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em]'>
            <span className='text-primary'>sys_status: ready</span>
            <span className='hidden text-foreground/50 sm:inline'>
              locale: {locale}
            </span>
            <span className='hidden text-foreground/50 md:inline'>
              channel: encrypted
            </span>
          </div>

          <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50'>
            © {new Date().getFullYear()} Nguyen Minh Hieu // All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
