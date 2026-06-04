import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'
import { SocialsDock } from '@/components/molecules/socials-dock'

interface FooterProps {
  locale: string
}

export async function Footer({ locale }: FooterProps) {
  const [t, tContact, tCommon] = await Promise.all([
    getTranslations('collaborate'),
    getTranslations('hero.contact'),
    getTranslations('common'),
  ])

  return (
    <footer id='collaborate' className='contact-credits section-shell scroll-mt-28 px-4 py-28 md:px-6 lg:py-40'>
      <div className='mx-auto max-w-[1500px]'>
        <Reveal>
          <div>
            <div className='flex min-h-[72dvh] flex-col justify-end gap-10'>
              <div>
                <span className='section-kicker'>{t('kicker')}</span>
                <h2 className='mt-6 max-w-5xl font-display text-[clamp(3rem,7.2vw,8.5rem)] font-semibold uppercase leading-[0.84] tracking-normal text-foreground'>
                  Let&apos;s ship something with presence.
                </h2>
                <p className='mt-7 max-w-2xl text-base leading-8 text-foreground/68 md:text-lg'>
                  {t('description')}
                </p>
              </div>

              <div className='space-y-8'>
                <a
                  href={`mailto:${tContact('email')}`}
                  className='group inline-flex max-w-full items-center gap-3 break-all text-[clamp(1.35rem,2.4vw,2.75rem)] font-semibold leading-tight text-primary transition-colors hover:text-foreground'
                >
                  {tContact('email')}
                  <span className='grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1'>
                    <ArrowUpRight className='h-5 w-5' />
                  </span>
                </a>
                <div>
                  <SocialsDock />
                </div>
              </div>
            </div>

            <div className='mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-foreground/54 md:flex-row md:items-center md:justify-between'>
              <div>© {new Date().getFullYear()} Nguyen Minh Hieu</div>
              <div className='flex flex-wrap items-center gap-4'>
                <Link href={`/${locale}`} className='transition-colors hover:text-foreground'>
                  {tCommon('home')}
                </Link>
                <span>{locale.toUpperCase()}</span>
                <span>{t('allRightsReserved')}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
