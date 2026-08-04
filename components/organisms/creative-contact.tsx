'use client'

import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ScanReveal } from '@/components/molecules/reveal-kit'
import { MagneticLink } from './magnetic-link'

export interface ContactSectionProps {
  email: string
}

const links = [
  { label: 'GitHub', href: 'https://github.com/nmhieu1896' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hieunm09/' },
  { label: 'Resume', href: '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf' },
]

export function ContactSection({ email }: ContactSectionProps) {
  const t = useTranslations('collaborate')

  return (
    <section
      id='contact'
      className='mx-auto max-w-[90rem] px-5 pb-7 pt-28 sm:px-8 md:pt-36 lg:px-12'
    >
      <ScanReveal>
        <div className='relative overflow-hidden border-y border-portfolio-line py-14 sm:py-20'>
          <div
            className='pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-portfolio-accent-soft blur-3xl'
            aria-hidden='true'
          />
          <div className='relative max-w-[54rem]'>
            <p className='font-mono text-xs text-portfolio-accent'>
              {t('title')}
            </p>
            <h2 className='mt-6 max-w-[14ch] font-display text-[clamp(3.1rem,7vw,7.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-portfolio-ink'>
              {t('poeticHeadline')}
            </h2>
            <p className='mt-7 max-w-[38rem] text-[1.04rem] leading-relaxed text-portfolio-muted'>
              {t('description')}
            </p>
            <div className='mt-9'>
              <MagneticLink href={`mailto:${email}`}>{email}</MagneticLink>
            </div>
          </div>
        </div>
      </ScanReveal>

      <footer className='flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-sm text-portfolio-dim'>© 2026 Nguyen Minh Hieu</p>
        <div className='flex flex-wrap gap-x-5 gap-y-3'>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              download={link.href.endsWith('.pdf') ? true : undefined}
              className='group inline-flex items-center gap-1.5 text-sm text-portfolio-muted no-underline transition-colors hover:text-portfolio-ink'
            >
              {link.label}
              <ArrowUpRight
                size={14}
                className='transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                aria-hidden='true'
              />
            </a>
          ))}
        </div>
      </footer>
    </section>
  )
}
