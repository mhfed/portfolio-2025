import { getTranslations } from "next-intl/server"

export async function HeroTextBlocks() {
  const t = await getTranslations('hero')

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-16 px-4">
      {/* Left text block */}
      <div className="text-left md:text-left">
        <p className="text-sm md:text-base lg:text-lg text-foreground/70 leading-relaxed">
          {t('textBlockLeft')}
        </p>
      </div>

      {/* Right text block (italic) */}
      <div className="text-left md:text-right">
        <p className="text-sm md:text-base lg:text-lg text-foreground/70 italic leading-relaxed">
          {t('textBlockRight')}
        </p>
      </div>
    </div>
  )
}

