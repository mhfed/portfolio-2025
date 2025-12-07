import { getTranslations } from 'next-intl/server';

export async function HeroTitleBadge() {
  const t = await getTranslations('hero');

  return (
    <div className='flex items-center gap-2 md:gap-3'>
      {/* Vietnamese Flag Icon */}
      <div className='flex items-center'>
        <span className='text-lg md:text-xl'>🇻🇳</span>
      </div>

      {/* Title */}
      <span className='text-base md:text-lg lg:text-xl font-medium text-foreground/80'>
        {t('developer')}
      </span>
    </div>
  );
}
