import { getTranslations } from 'next-intl/server'
import { SocialsDock } from './socials-dock'
import Link from 'next/link'
import { Reveal } from './ui/reveal'
import { FooterClientAnimator } from './footer-client-animator'

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
    <footer id='collaborate' className='w-full bg-background p-4 md:p-8 relative overflow-hidden h-full'>
      <div className="relative w-full h-full min-h-[500px] bg-white rounded-[2rem] shadow-xl shadow-black/5 border border-zinc-200 overflow-hidden flex flex-col justify-between">
      <FooterClientAnimator />
      
      {/* Massive Background Text */}
      <div className='absolute inset-0 z-0 flex items-center justify-center font-display text-[15vw] font-black uppercase tracking-tighter text-zinc-200 pointer-events-none whitespace-nowrap select-none overflow-hidden'>
        LET'S TALK
      </div>

      <div className='mx-auto max-w-[1400px] relative z-10 pt-16 md:pt-24'>
        <div className='border-t border-black/10 pt-10 md:pt-12'>
          <div className='grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end'>
            <Reveal>
              <div className='space-y-5'>
                <span className='section-kicker'>let&apos;s work together</span>
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

            <Reveal delay={180} variant='right'>
              <div className='grid gap-8 sm:grid-cols-2'>
                <div>
                  <div className='font-mono text-[10px] uppercase tracking-[0.24em] text-primary/75'>
                    quick links
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
                    direct links
                  </div>
                  <SocialsDock />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={260}>
            <div className='mt-10 flex flex-col gap-3 border-t border-black/10 pt-5 text-sm text-foreground/56 md:flex-row md:items-center md:justify-between'>
              <div>© {new Date().getFullYear()} Nguyen Minh Hieu</div>
              <div className='flex items-center gap-3'>
                <span>{locale.toUpperCase()}</span>
                <span>All rights reserved</span>
              </div>
            </div>
          </Reveal>
        </div>
        </div>
      </div>
    </footer>
  )
}
