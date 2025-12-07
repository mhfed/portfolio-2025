import { getTranslations } from 'next-intl/server';
import { SectionTitle } from './section-title';
import { Badge } from './ui/badge';

export async function AboutSection() {
  const t = await getTranslations('about');

  return (
    <section id='about' className='px-4 md:px-6'>
      <div className='max-w-4xl mx-auto'>
        <SectionTitle title={t('title')} />
        <div className='space-y-6'>
          <p className='text-body-lg text-foreground/80 leading-relaxed'>
            {t('description1')}
          </p>
          <div>
            <h3 className='text-h4 text-foreground mb-4 font-semibold'>
              {t('coreSkills')}
            </h3>
            <div className='space-y-2'>
              {[
                'JavaScript',
                'TypeScript',
                'React.js',
                'Next.js',
                'Redux',
                'React Native',
              ].map((skill) => (
                <Badge key={skill} variant='outline' className='font-medium'>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
