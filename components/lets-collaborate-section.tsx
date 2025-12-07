import { getTranslations } from 'next-intl/server';
import { SectionTitle } from './section-title';
import { ExternalLink } from 'lucide-react';

export async function LetsCollaborateSection() {
  const t = await getTranslations('collaborate');
  const tContact = await getTranslations('hero.contact');

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/mhfed' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/mhfed' },
    { name: 'Telegram', url: '#' },
  ];

  return (
    <section id='collaborate' className=''>
      <div className='max-w-4xl mx-auto'>
        <SectionTitle title={t('title')} />
        <div className='space-y-8'>
          <a
            href={`mailto:${tContact('email')}`}
            className='text-h2 md:text-h1 text-foreground font-medium hover:text-primary transition-colors underline decoration-foreground/30 hover:decoration-primary inline-block normal-case'
          >
            {tContact('email')}
          </a>

          {/* Footer - Copyright and Social Links */}
          <div className='pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            {/* Copyright */}
            <div className='text-body-sm text-foreground/60'>
              Copyright © 2025 Nguyen Minh Hieu. All Rights Reserved
            </div>

            {/* Social Links */}
            <div className='flex flex-wrap gap-4'>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-body-sm text-foreground/70 hover:text-foreground transition-colors underline decoration-foreground/30 hover:decoration-foreground flex items-center gap-1'
                >
                  {link.name}
                  <ExternalLink className='w-3 h-3' />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
