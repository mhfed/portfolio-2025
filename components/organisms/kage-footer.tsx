import type { PortfolioContent } from '@/types/portfolio-content'

export interface KageFooterProps {
  content: Pick<PortfolioContent, 'fullName' | 'contact' | 'navigation'>
}

export function KageFooter({ content }: KageFooterProps) {
  const { contact, fullName, navigation } = content

  return (
    <footer className='relative px-[var(--pad)] pt-16 pb-10 border-t border-[var(--line-soft)] bg-[#030508]/80'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16'>
        {/* Brand & summary */}
        <div className='lg:col-span-1'>
          <div className='flex items-center gap-3 mb-4'>
            <svg viewBox='0 0 44 44' fill='none' className='w-8 h-8'>
              <circle
                cx='22'
                cy='25'
                r='8.6'
                fill='var(--vermilion)'
                fillOpacity='0.95'
              />
              <path
                d='M5 13h34M9 18.4h26M22 8.5v27'
                stroke='var(--bone)'
                strokeWidth='1.5'
              />
            </svg>
            <b className='text-[12px] font-medium tracking-[0.24em] text-[var(--bone)]'>
              {fullName}
            </b>
          </div>
          <p className='text-[12px] leading-relaxed text-[#79847e] max-w-[32ch]'>
            A five-chapter architectural journey through frontend engineering,
            systems architecture, and creative motion.
          </p>
        </div>

        {/* Chapters */}
        <div>
          <h4 className='text-[10px] font-medium tracking-[0.22em] uppercase text-[var(--muted)] mb-4'>
            Chapters
          </h4>
          <ul className='flex flex-col gap-2.5 text-[12px] text-[#8f9a93]'>
            {navigation.items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className='hover:text-[var(--bone)] transition-colors'
                  data-cursor
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture & Stack */}
        <div>
          <h4 className='text-[10px] font-medium tracking-[0.22em] uppercase text-[var(--muted)] mb-4'>
            Architecture
          </h4>
          <ul className='flex flex-col gap-2.5 text-[12px] text-[#8f9a93]'>
            <li>Next.js 16 (App Router)</li>
            <li>React 19 & TypeScript</li>
            <li>Three.js WebGL Sanctuary</li>
            <li>Tailwind CSS v4</li>
            <li>GSAP & Lenis Motion</li>
          </ul>
        </div>

        {/* Elsewhere */}
        <div>
          <h4 className='text-[10px] font-medium tracking-[0.22em] uppercase text-[var(--muted)] mb-4'>
            Elsewhere
          </h4>
          <ul className='flex flex-col gap-2.5 text-[12px] text-[#8f9a93]'>
            {contact.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  download={link.download}
                  className='hover:text-[var(--bone)] transition-colors'
                  data-cursor
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Foot base */}
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[var(--line-soft)] text-[10px] tracking-[0.16em] uppercase text-[var(--muted)]'>
        <span>© 2026 {fullName}</span>
        <span className='jp text-[var(--bone-dim)] font-normal text-[12px] tracking-[0.3em]'>
          静けさは一つの技である
        </span>
        <span>WebGL · Onest · Kyoto Spirit</span>
      </div>
    </footer>
  )
}
