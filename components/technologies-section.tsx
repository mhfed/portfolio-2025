"use client"

import { useTranslations } from "next-intl"
import { SectionTitle } from "./section-title"

interface TechCardProps {
  icon: string
  title: string
  description: string
  isBlue?: boolean
}

function TechCard({ icon, title, description, isBlue = true }: TechCardProps) {
  const bgColor = isBlue ? "bg-primary" : "bg-accent"
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 scroll-animate">
      <div
        className={`${bgColor} rounded-none w-24 h-24 md:w-28 md:h-28 flex items-center justify-center text-white text-4xl md:text-5xl`}
      >
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-h3 text-foreground mb-2">{title}</h3>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export function TechnologiesSection() {
  const t = useTranslations('technologies')
  const technologies: TechCardProps[] = [
    {
      icon: "💻",
      title: t('frontend.title'),
      description: t('frontend.description'),
      isBlue: true,
    },
    {
      icon: "🔄",
      title: t('stateManagement.title'),
      description: t('stateManagement.description'),
      isBlue: false,
    },
    {
      icon: "🎨",
      title: t('uiLibraries.title'),
      description: t('uiLibraries.description'),
      isBlue: true,
    },
    {
      icon: "📱",
      title: t('mobile.title'),
      description: t('mobile.description'),
      isBlue: false,
    },
    {
      icon: "🔌",
      title: t('apis.title'),
      description: t('apis.description'),
      isBlue: true,
    },
    {
      icon: "🛠️",
      title: t('tools.title'),
      description: t('tools.description'),
      isBlue: false,
    },
  ]

  return (
    <section
      id="technologies"
      className="min-h-screen flex flex-col justify-center py-24 px-6 bg-background scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {technologies.map((tech, idx) => (
            <TechCard key={idx} {...tech} />
          ))}
        </div>
      </div>
    </section>
  )
}
