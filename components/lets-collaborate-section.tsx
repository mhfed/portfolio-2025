import { getTranslations } from 'next-intl/server';
import { SectionTitle } from './section-title';
import { SocialsDock } from './socials-dock';

export async function LetsCollaborateSection() {
  const t = await getTranslations('collaborate');
  const tContact = await getTranslations('hero.contact');

  return (
    <section id='collaborate' className='px-4 md:px-6'>
      <div className='max-w-4xl mx-auto'>
        <SectionTitle title={t('title')} />
        <div className='space-y-12'>
          {/* Email */}
          <div className='space-y-4'>
            <p className='text-body-lg text-foreground/70'>
              {t('description') ||
                "Have an exciting project in mind? I'd love to hear about it."}
            </p>
            <a
              href={`mailto:${tContact('email')}`}
              className='text-body-lg md:text-h4 text-foreground hover:text-primary transition-colors inline-block'
            >
              {tContact('email')}
            </a>
          </div>

          {/* Socials Dock */}
          <div className='flex justify-center md:justify-end'>
            <SocialsDock />
          </div>

          {/* Footer - Copyright */}
          <div className='pt-8 border-t border-border/30'>
            <div className='text-body-sm text-foreground/60 text-center md:text-left'>
              Copyright © 2025 Nguyen Minh Hieu. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
