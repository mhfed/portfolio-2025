"use client";

import { useTranslations } from "next-intl";
import { SectionTitle } from "./section-title";

interface TechCardProps {
  icon: string;
  title: string;
  description: string;
  isBlue?: boolean;
}

function TechCard({ icon, title, description, isBlue = true }: TechCardProps) {
  const colors = [
    "bg-primary text-primary-foreground",
    "bg-[var(--cyan)] text-[var(--cyan-foreground)]",
    "bg-[var(--green)] text-[var(--green-foreground)]",
    "bg-[var(--pink)] text-[var(--pink-foreground)]",
    "bg-[var(--orange)] text-[var(--orange-foreground)]",
    "bg-[var(--yellow)] text-[var(--yellow-foreground)]",
  ];
  const bgColor = isBlue ? colors[0] : colors[1];
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 scroll-animate">
      <div
        className={`${bgColor} rounded-lg w-24 h-24 md:w-28 md:h-28 flex items-center justify-center text-4xl md:text-5xl`}
      >
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-h3 text-foreground mb-2">{title}</h3>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function TechnologiesSection() {
  const t = useTranslations("technologies");
  const technologies: TechCardProps[] = [
    {
      icon: "💻",
      title: t("frontend.title"),
      description: t("frontend.description"),
      isBlue: true,
    },
    {
      icon: "🔄",
      title: t("stateManagement.title"),
      description: t("stateManagement.description"),
      isBlue: false,
    },
    {
      icon: "🎨",
      title: t("uiLibraries.title"),
      description: t("uiLibraries.description"),
      isBlue: true,
    },
    {
      icon: "📱",
      title: t("mobile.title"),
      description: t("mobile.description"),
      isBlue: false,
    },
    {
      icon: "🔌",
      title: t("apis.title"),
      description: t("apis.description"),
      isBlue: true,
    },
    {
      icon: "🛠️",
      title: t("tools.title"),
      description: t("tools.description"),
      isBlue: false,
    },
  ];

  return (
    <section
      id="technologies"
      className="min-h-screen flex flex-col justify-center py-24 px-6 scroll-mt-16 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[var(--green)]/5 via-transparent to-[var(--yellow)]/5" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[var(--cyan)]/5 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">
        <SectionTitle title={t("title")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {technologies.map((tech, idx) => {
            const colors = [
              { isBlue: true },
              { isBlue: false },
              { isBlue: true },
              { isBlue: false },
              { isBlue: true },
              { isBlue: false },
            ];
            return (
              <TechCard
                key={idx}
                {...tech}
                isBlue={colors[idx % colors.length].isBlue}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
