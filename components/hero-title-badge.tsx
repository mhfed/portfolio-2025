import { getTranslations } from "next-intl/server"

export async function HeroTitleBadge() {
  const t = await getTranslations('hero')

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Vietnamese Flag Icon */}
      <div className="flex items-center">
        <svg
          className="w-5 h-4 md:w-6 md:h-5"
          viewBox="0 0 24 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Red stripe */}
          <rect y="0" width="24" height="5.33" fill="#DA020E" />
          {/* Yellow stripe */}
          <rect y="5.33" width="24" height="5.33" fill="#FFFF00" />
          {/* Red stripe */}
          <rect y="10.67" width="24" height="5.33" fill="#DA020E" />
        </svg>
      </div>
      
      {/* Title */}
      <span className="text-body-lg font-medium text-foreground/80">
        {t('developer')}
      </span>
    </div>
  )
}

