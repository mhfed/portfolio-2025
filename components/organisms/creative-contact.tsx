'use client'

import { useState, useEffect, useRef } from 'react'
import { MoveUpRight, Send, Check, ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useToast } from '@/hooks/use-toast'
import { loadGSAP } from '@/lib/gsap-utils'

export function ContactSection({
  email,
  locale,
}: {
  email: string
  locale: string
}) {
  const t = useTranslations()
  const { toast } = useToast()
  const sectionRef = useRef<HTMLElement>(null)

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  // GSAP entrance animations
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let active = true

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (!active) return

      const headline = section.querySelector('[data-contact-headline]')
      const formEl = section.querySelector('[data-contact-form]')
      const links = gsap.utils.toArray(
        '[data-contact-link]',
        section
      ) as HTMLElement[]
      const meta = gsap.utils.toArray(
        '[data-contact-meta]',
        section
      ) as HTMLElement[]

      if (headline) {
        gsap.fromTo(
          headline,
          { yPercent: 40, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (formEl) {
        gsap.fromTo(
          formEl,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (links.length) {
        ScrollTrigger.batch(links, {
          start: 'top 85%',
          interval: 0.06,
          onEnter: (elements: Element[]) => {
            gsap.fromTo(
              elements,
              { x: -20, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
              }
            )
          },
        })
      }

      if (meta.length) {
        ScrollTrigger.batch(meta, {
          start: 'top 92%',
          interval: 0.04,
          onEnter: (elements: Element[]) => {
            gsap.fromTo(
              elements,
              { y: 12, opacity: 0 },
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.06,
                ease: 'power2.out',
              }
            )
          },
        })
      }
    })

    return () => {
      active = false
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: locale === 'vi' ? 'Lỗi' : 'Error',
        description:
          locale === 'vi'
            ? 'Vui lòng điền đầy đủ các thông tin.'
            : 'Please fill in all fields.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setIsSent(true)
    toast({
      title: t('collaborate.form.messageSent'),
      description:
        locale === 'vi'
          ? 'Tôi sẽ phản hồi bạn sớm nhất có thể.'
          : 'I will get back to you as soon as possible.',
    })

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setIsSent(false)
    }, 4000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { label: email, href: `mailto:${email}`, external: false },
    { label: 'GitHub', href: 'https://github.com/mhfed', external: true },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/mhfed',
      external: true,
    },
  ]

  return (
    <footer
      ref={sectionRef}
      id='contact'
      className='creative-contact relative py-32 md:py-48 px-[clamp(1.5rem,5vw,5rem)]'
      data-section
      data-waypoint='contact'
    >
      {/* Top divider */}
      <div className='absolute top-0 left-[clamp(1.5rem,5vw,5rem)] right-[clamp(1.5rem,5vw,5rem)] h-px bg-gradient-to-r from-transparent via-creative-line to-transparent' />

      <div className='max-w-screen-xl mx-auto'>
        {/* Massive CTA Headline */}
        <div className='mb-20 md:mb-28' data-contact-headline>
          <h2
            className='font-display font-black tracking-tight leading-[1.05] uppercase'
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
          >
            <span className='block text-creative-ink'>
              {t('collaborate.poeticHeadline')}
            </span>
          </h2>
        </div>

        {/* Two-column layout: Form + Links */}
        <div className='grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24'>
          {/* Left: Contact Form */}
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-8 max-w-[38rem]'
            data-contact-form
          >
            {/* Name field */}
            <div className='group relative'>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder=' '
                className='peer w-full bg-transparent border-0 border-b border-white/10 py-4 text-creative-ink text-[1.1rem] font-sans outline-none transition-colors duration-300 focus:border-b-[var(--creative-lime)] placeholder-transparent disabled:opacity-40'
                disabled={isSubmitting || isSent}
              />
              <label
                htmlFor='name'
                className='absolute left-0 top-4 text-creative-dim text-[1rem] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--creative-lime)] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-creative-muted'
              >
                {t('collaborate.form.yourName')}
              </label>
              <div className='absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--creative-lime)] transition-all duration-500 peer-focus:w-full' />
            </div>

            {/* Email field */}
            <div className='group relative'>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder=' '
                className='peer w-full bg-transparent border-0 border-b border-white/10 py-4 text-creative-ink text-[1.1rem] font-sans outline-none transition-colors duration-300 focus:border-b-[var(--creative-lime)] placeholder-transparent disabled:opacity-40'
                disabled={isSubmitting || isSent}
              />
              <label
                htmlFor='email'
                className='absolute left-0 top-4 text-creative-dim text-[1rem] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--creative-lime)] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-creative-muted'
              >
                {t('collaborate.form.emailAddress')}
              </label>
              <div className='absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--creative-lime)] transition-all duration-500 peer-focus:w-full' />
            </div>

            {/* Message field */}
            <div className='group relative'>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder=' '
                className='peer w-full bg-transparent border-0 border-b border-white/10 py-4 text-creative-ink text-[1.1rem] font-sans outline-none transition-colors duration-300 focus:border-b-[var(--creative-lime)] placeholder-transparent disabled:opacity-40 resize-none'
                disabled={isSubmitting || isSent}
              />
              <label
                htmlFor='message'
                className='absolute left-0 top-4 text-creative-dim text-[1rem] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--creative-lime)] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-creative-muted'
              >
                {t('collaborate.form.message')}
              </label>
              <div className='absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--creative-lime)] transition-all duration-500 peer-focus:w-full' />
            </div>

            {/* Submit button */}
            <button
              type='submit'
              disabled={isSubmitting || isSent}
              className={`group/btn relative mt-4 flex items-center gap-3 w-fit px-8 py-4 rounded-full font-bold text-[0.9rem] tracking-wide uppercase transition-all duration-300 disabled:opacity-50 ${
                isSent
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/[0.04] text-creative-ink border border-white/10 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.97]'
              }`}
            >
              {isSubmitting ? (
                <span className='text-creative-muted'>Sending...</span>
              ) : isSent ? (
                <>
                  <Check className='w-4 h-4' />
                  <span>{t('collaborate.form.messageSent')}</span>
                </>
              ) : (
                <>
                  <Send className='w-4 h-4 text-[var(--creative-lime)] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5' />
                  <span>{t('collaborate.form.sendMessage')}</span>
                </>
              )}
            </button>
          </form>

          {/* Right: Links & Metadata */}
          <div className='flex flex-col gap-12 lg:pt-2'>
            {/* Direct Links */}
            <div className='flex flex-col gap-4'>
              <span className='font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-creative-dim'>
                {t('collaborate.directLinks')}
              </span>
              <div className='flex flex-col'>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className='group/link flex items-center justify-between border-b border-white/[0.06] py-4 text-creative-ink no-underline transition-all duration-300 hover:border-[var(--creative-lime)]/30 hover:pl-2'
                    data-contact-link
                  >
                    <span className='text-[clamp(1rem,1.3vw,1.35rem)] font-semibold tracking-tight transition-colors duration-300 group-hover/link:text-[var(--creative-lime)]'>
                      {link.label}
                    </span>
                    <MoveUpRight className='w-4 h-4 text-creative-dim transition-all duration-300 group-hover/link:text-[var(--creative-lime)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5' />
                  </a>
                ))}
              </div>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className='group/top flex items-center gap-2 text-creative-dim hover:text-creative-ink transition-colors duration-300 w-fit mt-auto'
              data-contact-meta
            >
              <ArrowUp className='w-4 h-4 transition-transform duration-300 group-hover/top:-translate-y-1' />
              <span className='font-mono text-[0.75rem] font-bold uppercase tracking-[0.15em]'>
                Back to top
              </span>
            </button>
          </div>
        </div>

        {/* Footer meta bar */}
        <div className='mt-24 pt-6 border-t border-white/[0.06]'>
          <div
            className='flex flex-wrap justify-between gap-4 text-creative-dim font-mono text-[0.7rem] font-bold tracking-[0.15em] uppercase'
            data-contact-meta
          >
            <span>Nguyen Minh Hieu</span>
            <span>{locale.toUpperCase()}</span>
            <span>
              {t('collaborate.allRightsReserved')} &copy;{' '}
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
