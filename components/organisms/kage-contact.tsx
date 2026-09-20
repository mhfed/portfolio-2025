import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface KageContactProps {
  content: Pick<PortfolioContent, 'contact'>
}

export function KageContact({ content }: KageContactProps) {
  const { contact } = content

  return (
    <section
      id='contact'
      className='kage-sec min-h-[85vh] flex flex-col justify-center items-center text-center'
    >
      <div className='kage-eyebrow mb-6'>
        <span className='dot' />
        <span>Chapter 05 — Afterlight</span>
      </div>

      <h2 className='kage-display text-[clamp(42px,8vw,120px)] leading-[0.92] text-[var(--bone)] mb-6'>
        Afterlight
      </h2>

      <p className='kage-lead max-w-[48ch] mx-auto text-[#b4bfb7] mb-4'>
        {contact.headline ||
          'The gate does not close behind you. Let us build digital experiences where still elegance and technical vigor endure.'}
      </p>

      <p className='kage-body max-w-[44ch] mx-auto text-[#78837c] mb-8'>
        {contact.description}
      </p>

      {/* Pill CTA Button with sliding fill */}
      <a href={contact.email.href} className='cta' data-cursor>
        <i />
        <span>{contact.email.label}</span>
        <ArrowUpRight size={14} stroke='currentColor' />
      </a>

      {/* Social Links */}
      <div className='flex items-center gap-6 mt-12 text-[11px] tracking-[0.2em] uppercase text-[var(--bone-dim)]'>
        {contact.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            download={link.download}
            className='inline-flex items-center gap-1.5 hover:text-[var(--bone)] transition-colors'
            data-cursor
          >
            {link.label === 'GitHub' && <Github size={13} />}
            {link.label === 'LinkedIn' && <Linkedin size={13} />}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
