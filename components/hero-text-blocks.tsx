import { getTranslations } from 'next-intl/server'

export async function HeroTextBlocks() {
  const t = await getTranslations('hero')

  return (
    <div className='mt-8 grid w-full grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-8'>
      {/* Left text block */}
      <div className='text-left md:text-left'>
        <p className='text-base md:text-lg lg:text-xl text-foreground/70'>
          {t('textBlockLeft')}
        </p>
      </div>

      {/* Right text block (italic) */}
      <div className='text-left md:text-right'>
        <p className='text-base md:text-lg lg:text-xl text-foreground/70 italic'>
          {t('textBlockRight')}
        </p>
      </div>
    </div>
  )
}
