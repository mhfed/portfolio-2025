import { getTranslations } from "next-intl/server"

export async function HeroContactInfo() {
  const t = await getTranslations('hero.contact')

  return (
    <div className="absolute top-0 left-0 p-6 md:p-8 z-20">
      <div className="flex flex-row gap-8 md:gap-12">
        {/* Based in */}
        <div className="flex flex-col gap-1">
          <span className="text-xs md:text-sm text-foreground/60 font-medium uppercase tracking-wider">
            {t('basedIn')}
          </span>
          <span className="text-sm md:text-base text-foreground/80 font-semibold">
            {t('location')}
          </span>
        </div>

        {/* Say hello */}
        <div className="flex flex-col gap-1">
          <span className="text-xs md:text-sm text-foreground/60 font-medium uppercase tracking-wider">
            {t('sayHello')}
          </span>
          <a
            href={`mailto:${t('email')}`}
            className="text-sm md:text-base text-foreground/80 font-semibold underline hover:text-primary transition-colors"
          >
            {t('email')}
          </a>
        </div>
      </div>
    </div>
  )
}

