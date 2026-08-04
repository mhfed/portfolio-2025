import { ArrowUpRight, Download } from 'lucide-react'
import { EditorialReveal } from '@/components/molecules/editorial-reveal'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface PortfolioContactProps {
  contact: PortfolioContent['contact']
  location: PortfolioContent['hero']['location']
  status: string
}

export function PortfolioContact({
  contact,
  location,
  status,
}: PortfolioContactProps) {
  return (
    <footer id='contact' className='portfolio-contact section-anchor'>
      <div className='portfolio-shell'>
        <EditorialReveal className='contact-heading'>
          <p>{status}</p>
          <h2>{contact.headline}</h2>
        </EditorialReveal>

        <EditorialReveal className='contact-email' delay={0.06}>
          <a href={contact.email.href}>{contact.email.value}</a>
        </EditorialReveal>

        <div className='contact-footer'>
          <div className='contact-summary'>
            <p>{contact.description}</p>
            <p>
              {location.label} {location.value}
            </p>
          </div>

          <nav className='contact-links' aria-label={contact.title}>
            {contact.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                download={link.download ? true : undefined}
              >
                {link.label}
                {link.download ? (
                  <Download aria-hidden='true' size={16} strokeWidth={1.7} />
                ) : (
                  <ArrowUpRight
                    aria-hidden='true'
                    size={16}
                    strokeWidth={1.7}
                  />
                )}
              </a>
            ))}
          </nav>

          <p className='contact-rights'>
            © {new Date().getFullYear()} {contact.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
