import { MoveUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ContactSection({ email, locale }: { email: string; locale: string }) {
  const t = useTranslations('collaborate')

  return (
    <footer id='contact' className='creative-contact' data-section>
      <p className='creative-kicker' data-reveal>
        {t('kicker')}
      </p>
      <h2 data-split-line>{t('poeticHeadline')}</h2>
      <div className='creative-contact__actions' data-reveal>
        <a href={`mailto:${email}`} className='creative-contact__email'>
          {email}
          <MoveUpRight aria-hidden='true' />
        </a>
        <a href='https://github.com/mhfed' target='_blank' rel='noreferrer'>
          GitHub
        </a>
        <a href='https://linkedin.com/in/mhfed' target='_blank' rel='noreferrer'>
          LinkedIn
        </a>
      </div>
      <div className='creative-contact__meta'>
        <span>Nguyen Minh Hieu</span>
        <span>{locale.toUpperCase()}</span>
        <span>Ha Noi, Viet Nam</span>
      </div>
    </footer>
  )
}
