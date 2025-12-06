import { getTranslations } from "next-intl/server";
import { SectionTitleWrapper } from "./section-title-wrapper";
import { Badge } from "./ui/badge";

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      className="flex flex-col justify-center py-8 md:py-12 lg:py-16 px-4 md:px-6 scroll-mt-0 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--cyan)]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[var(--green)]/5 to-transparent" />
      </div>
      {/* Mobile: Sticky title outside grid */}
      <SectionTitleWrapper title={t("title")} sectionId="about" mobileOnly />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Desktop: Title in grid */}
          <SectionTitleWrapper title={t("title")} desktopOnly />

          {/* Right Column - Content */}
          <div className="md:col-span-3">
            <div className="scroll-animate">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-4 md:space-y-6">
                  <p className="text-body-lg text-foreground">
                    {t("description1")}
                  </p>
                  <div className="pt-6">
                    <h3 className="text-h3 text-primary mb-4">
                      {t("coreSkills")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "JavaScript", variant: "yellow" as const },
                        { name: "TypeScript", variant: "cyan" as const },
                        { name: "React.js", variant: "primary" as const },
                        { name: "Next.js", variant: "pink" as const },
                        { name: "Redux", variant: "primary" as const },
                        { name: "React Native", variant: "green" as const },
                      ].map((skill) => (
                        <Badge
                          key={skill.name}
                          variant={skill.variant}
                          className="font-semibold"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Content - Stats */}
                <div className="space-y-6 md:space-y-8">
                  <div className="bg-background border border-primary/50 rounded-lg p-8 hover:border-[var(--green)]/50 transition-colors">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      5+
                    </div>
                    <p className="text-body-lg text-foreground font-semibold">
                      {t("yearsExperience")}
                    </p>
                    <p className="text-body-sm text-muted-foreground mt-2">
                      {t("yearsDescription")}
                    </p>
                  </div>

                  <div className="bg-background border border-[var(--cyan)]/50 rounded-lg p-8 hover:border-[var(--orange)]/50 transition-colors">
                    <div className="text-4xl md:text-5xl font-bold text-[var(--cyan)] mb-2">
                      100%
                    </div>
                    <p className="text-body-lg text-foreground font-semibold">
                      {t("clientSatisfaction")}
                    </p>
                    <p className="text-body-sm text-muted-foreground mt-2">
                      {t("satisfactionDescription")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
