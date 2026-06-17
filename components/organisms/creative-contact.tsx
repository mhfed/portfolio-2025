'use client'

import { useState, useEffect } from 'react'
import { MoveUpRight, Send, Clock, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useToast } from '@/hooks/use-toast'

export function ContactSection({ email, locale }: { email: string; locale: string }) {
  const t = useTranslations()
  const { toast } = useToast()

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [localTime, setLocalTime] = useState('')

  // Live Clock for Hanoi (GMT+7)
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      const formatter = new Intl.DateTimeFormat('en-US', options)
      setLocalTime(formatter.format(new Date()))
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: locale === 'vi' ? 'Lỗi' : 'Error',
        description: locale === 'vi' ? 'Vui lòng điền đầy đủ các thông tin.' : 'Please fill in all fields.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setIsSent(true)
    toast({
      title: t('collaborate.form.messageSent'),
      description: locale === 'vi' ? 'Tôi sẽ phản hồi bạn sớm nhất có thể.' : 'I will get back to you as soon as possible.',
    })

    // Reset after some time
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setIsSent(false)
    }, 4000)
  }

  return (
    <footer
      id='contact'
      className='creative-contact flex flex-col justify-end gap-[clamp(1.5rem,4vw,3rem)] px-[clamp(1rem,4vw,4rem)] pt-[clamp(3.5rem,8vw,8rem)] pb-[clamp(2rem,4vw,4rem)] bg-[radial-gradient(circle_at_80%_30%,rgba(255,94,188,0.12),transparent_26rem)] after:content-[""] after:absolute after:inset-0 after:z-[-1] after:bg-gradient-to-b after:from-transparent after:to-[rgba(200,255,69,0.07)]'
      data-section
      data-waypoint='contact'
    >
      <div className='contact-layout grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-[clamp(3rem,8vw,8rem)] w-full max-w-screen-2xl mx-auto'>
        {/* Left Column: Form & Poetic Headline */}
        <div className='contact-layout__form-side flex flex-col'>
          <p className='creative-kicker max-w-[34rem] text-creative-muted font-mono text-kicker font-extrabold tracking-widest leading-relaxed uppercase' data-reveal>
            {t('collaborate.kicker')}
          </p>
          <h2 data-split-line className='contact-headline m-0 text-creative-ink font-display text-display-lg max-sm:text-display-lg-xs font-black tracking-tight leading-[1.25] uppercase [text-wrap:balance] max-w-[24ch] !mb-10'>
            {t('collaborate.poeticHeadline')}
          </h2>

          <form onSubmit={handleSubmit} className='contact-form flex flex-col gap-8 max-w-[36rem] w-full' data-reveal>
            <div className='form-group relative w-full'>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder=' ' // Required for floating label placeholder-shown CSS check
                className='form-input peer w-full border-0 border-b border-creative-line bg-transparent py-3 text-creative-ink font-sans text-[1.05rem] outline-none transition-all duration-300 focus:border-b-creative-lime focus:shadow-[0_1px_0_var(--creative-lime)] disabled:opacity-50'
                disabled={isSubmitting || isSent}
              />
              <label htmlFor='name' className='form-label absolute left-0 top-3 text-creative-dim text-[1.05rem] pointer-events-none transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] origin-left-top peer-focus:-translate-y-[1.35rem] peer-focus:scale-[0.78] peer-focus:text-creative-lime peer-[:not(:placeholder-shown)]:-translate-y-[1.35rem] peer-[:not(:placeholder-shown)]:scale-[0.78] peer-[:not(:placeholder-shown)]:text-creative-lime'>
                {t('collaborate.form.yourName')}
              </label>
            </div>

            <div className='form-group relative w-full'>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder=' '
                className='form-input peer w-full border-0 border-b border-creative-line bg-transparent py-3 text-creative-ink font-sans text-[1.05rem] outline-none transition-all duration-300 focus:border-b-creative-lime focus:shadow-[0_1px_0_var(--creative-lime)] disabled:opacity-50'
                disabled={isSubmitting || isSent}
              />
              <label htmlFor='email' className='form-label absolute left-0 top-3 text-creative-dim text-[1.05rem] pointer-events-none transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] origin-left-top peer-focus:-translate-y-[1.35rem] peer-focus:scale-[0.78] peer-focus:text-creative-lime peer-[:not(:placeholder-shown)]:-translate-y-[1.35rem] peer-[:not(:placeholder-shown)]:scale-[0.78] peer-[:not(:placeholder-shown)]:text-creative-lime'>
                {t('collaborate.form.emailAddress')}
              </label>
            </div>

            <div className='form-group relative w-full'>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder=' '
                className='form-input peer w-full border-0 border-b border-creative-line bg-transparent py-3 text-creative-ink font-sans text-[1.05rem] outline-none transition-all duration-300 focus:border-b-creative-lime focus:shadow-[0_1px_0_var(--creative-lime)] disabled:opacity-50 form-textarea resize-none'
                disabled={isSubmitting || isSent}
              />
              <label htmlFor='message' className='form-label absolute left-0 top-3 text-creative-dim text-[1.05rem] pointer-events-none transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] origin-left-top peer-focus:-translate-y-[1.35rem] peer-focus:scale-[0.78] peer-focus:text-creative-lime peer-[:not(:placeholder-shown)]:-translate-y-[1.35rem] peer-[:not(:placeholder-shown)]:scale-[0.78] peer-[:not(:placeholder-shown)]:text-creative-lime'>
                {t('collaborate.form.message')}
              </label>
            </div>

            <div className={`p-[2px] rounded-full transition-all duration-300 w-fit ${
              isSent
                ? 'bg-green-500/20 border border-green-500/40'
                : 'bg-white/5 border border-white/10 hover:border-white/25'
            }`}>
              <button
                type='submit'
                className={`submit-btn flex items-center justify-center gap-2.5 font-black text-[0.88rem] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] disabled:opacity-50 !border-0 !bg-transparent !py-3 !px-6 transition-all duration-200 ${
                  isSent
                    ? '!bg-green-500 text-black font-extrabold'
                    : '!bg-[#080907]/90 hover:!bg-[#10120c] text-creative-ink font-bold'
                }`}
                disabled={isSubmitting || isSent}
              >
                {isSubmitting ? (
                  <span className="text-xs uppercase tracking-wider">Sending...</span>
                ) : isSent ? (
                  <>
                    <Check className='w-4 h-4 text-black' aria-hidden='true' />
                    <span className="text-xs uppercase tracking-wider">{t('collaborate.form.messageSent')}</span>
                  </>
                ) : (
                  <>
                    <Send className='w-4 h-4 text-creative-lime' aria-hidden='true' />
                    <span className="text-xs uppercase tracking-wider">{t('collaborate.form.sendMessage')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Connection Links & Metadata details */}
        <div className='contact-layout__info-side flex flex-col gap-14 pt-[clamp(2rem,5vw,6rem)] max-lg:pt-0' data-reveal>
          <div className='contact-info-block flex flex-col gap-5'>
            <span className='info-label font-mono text-[0.68rem] font-black uppercase tracking-widest text-creative-dim'>{t('collaborate.directLinks')}</span>
            <div className='direct-links-grid flex flex-col gap-2.5'>
              <a href={`mailto:${email}`} className='contact-link-row flex items-center justify-between border-b border-creative-line py-3.5 text-creative-ink no-underline text-link-lg font-semibold transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-b-creative-lime hover:text-creative-lime hover:pl-[0.35rem]'>
                <span className='link-name'>{email}</span>
                <MoveUpRight className='w-4 h-4' aria-hidden='true' />
              </a>
              <a href='https://github.com/mhfed' target='_blank' rel='noreferrer' className='contact-link-row flex items-center justify-between border-b border-creative-line py-3.5 text-creative-ink no-underline text-link-lg font-semibold transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-b-creative-lime hover:text-creative-lime hover:pl-[0.35rem]'>
                <span className='link-name'>GitHub</span>
                <MoveUpRight className='w-4 h-4' aria-hidden='true' />
              </a>
              <a href='https://linkedin.com/in/mhfed' target='_blank' rel='noreferrer' className='contact-link-row flex items-center justify-between border-b border-creative-line py-3.5 text-creative-ink no-underline text-link-lg font-semibold transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-b-creative-lime hover:text-creative-lime hover:pl-[0.35rem]'>
                <span className='link-name'>LinkedIn</span>
                <MoveUpRight className='w-4 h-4' aria-hidden='true' />
              </a>
            </div>
          </div>

          <div className='contact-info-block clock-block border-t border-creative-line pt-8'>
            <span className='info-label font-mono text-[0.68rem] font-black uppercase tracking-widest text-creative-dim'>{locale === 'vi' ? 'Thời gian local' : 'Local time'}</span>
            <div className='live-clock flex items-center gap-2.5 text-creative-ink'>
              <Clock className='w-4 h-4 text-creative-lime animate-pulse' aria-hidden='true' />
              <strong className='font-mono text-[1.45rem] tracking-[0.02em]'>{localTime || '--:--:--'}</strong>
              <small className='text-creative-dim'>HA NOI, GMT+7</small>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full max-w-screen-2xl mx-auto border-t border-creative-line pt-5'>
        <div className='creative-contact__meta flex flex-wrap justify-between gap-4 text-creative-dim font-mono text-[0.72rem] font-black tracking-widest uppercase'>
          <span>Nguyen Minh Hieu</span>
          <span>{locale.toUpperCase()}</span>
          <span>{t('collaborate.allRightsReserved')} &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

