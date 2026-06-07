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
      className='creative-contact'
      data-section
      data-waypoint='contact'
    >
      <div className='contact-layout'>
        {/* Left Column: Form & Poetic Headline */}
        <div className='contact-layout__form-side'>
          <p className='creative-kicker' data-reveal>
            {t('collaborate.kicker')}
          </p>
          <h2 data-split-line className='contact-headline'>
            {t('collaborate.poeticHeadline')}
          </h2>

          <form onSubmit={handleSubmit} className='contact-form' data-reveal>
            <div className='form-group'>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder=' ' // Required for floating label placeholder-shown CSS check
                className='form-input'
                disabled={isSubmitting || isSent}
              />
              <label htmlFor='name' className='form-label'>
                {t('collaborate.form.yourName')}
              </label>
            </div>

            <div className='form-group'>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder=' '
                className='form-input'
                disabled={isSubmitting || isSent}
              />
              <label htmlFor='email' className='form-label'>
                {t('collaborate.form.emailAddress')}
              </label>
            </div>

            <div className='form-group'>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder=' '
                className='form-input form-textarea'
                disabled={isSubmitting || isSent}
              />
              <label htmlFor='message' className='form-label'>
                {t('collaborate.form.message')}
              </label>
            </div>

            <button
              type='submit'
              className={`submit-btn ${isSent ? 'is-success' : ''}`}
              disabled={isSubmitting || isSent}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : isSent ? (
                <>
                  <Check className='w-4 h-4 text-black' aria-hidden='true' />
                  <span>{t('collaborate.form.messageSent')}</span>
                </>
              ) : (
                <>
                  <Send className='w-4 h-4' aria-hidden='true' />
                  <span>{t('collaborate.form.sendMessage')}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Connection Links & Metadata details */}
        <div className='contact-layout__info-side' data-reveal>
          <div className='contact-info-block'>
            <span className='info-label'>{t('collaborate.directLinks')}</span>
            <div className='direct-links-grid'>
              <a href={`mailto:${email}`} className='contact-link-row'>
                <span className='link-name'>{email}</span>
                <MoveUpRight className='w-4 h-4' aria-hidden='true' />
              </a>
              <a href='https://github.com/mhfed' target='_blank' rel='noreferrer' className='contact-link-row'>
                <span className='link-name'>GitHub</span>
                <MoveUpRight className='w-4 h-4' aria-hidden='true' />
              </a>
              <a href='https://linkedin.com/in/mhfed' target='_blank' rel='noreferrer' className='contact-link-row'>
                <span className='link-name'>LinkedIn</span>
                <MoveUpRight className='w-4 h-4' aria-hidden='true' />
              </a>
            </div>
          </div>

          <div className='contact-info-block clock-block'>
            <span className='info-label'>{locale === 'vi' ? 'Thời gian local' : 'Local time'}</span>
            <div className='live-clock'>
              <Clock className='w-4 h-4 text-creative-lime animate-pulse' aria-hidden='true' />
              <strong className='font-mono text-lg'>{localTime || '--:--:--'}</strong>
              <small className='text-creative-dim'>HA NOI, GMT+7</small>
            </div>
          </div>
        </div>
      </div>

      <div className='creative-contact__meta'>
        <span>Nguyen Minh Hieu</span>
        <span>{locale.toUpperCase()}</span>
        <span>{t('collaborate.allRightsReserved')} &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
