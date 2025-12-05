import { getTranslations } from "next-intl/server";
import { SectionTitleWrapper } from "./section-title-wrapper";

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--cyan)]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[var(--green)]/5 to-transparent" />
      </div>
      {/* Mobile: Sticky title outside grid */}
      <SectionTitleWrapper title={t("title")} sectionId="about" mobileOnly />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* Desktop: Title in grid */}
          <SectionTitleWrapper title={t("title")} desktopOnly />

          {/* Right Column - Content */}
          <div className="md:col-span-3">
            <div className="scroll-animate">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <p className="text-body-lg text-foreground">
                    {t("description1")}
                  </p>
                  <div className="pt-6">
                    <h3 className="text-h3 text-primary mb-4">
                      {t("coreSkills")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "JavaScript", color: "yellow" },
                        { name: "TypeScript", color: "cyan" },
                        { name: "React.js", color: "primary" },
                        { name: "Next.js", color: "pink" },
                        { name: "Redux", color: "purple" },
                        { name: "React Native", color: "green" },
                      ].map((skill) => {
                        const colorClasses = {
                          primary: "bg-primary/10 border-primary/30 text-primary",
                          cyan: "bg-[var(--cyan)]/10 border-[var(--cyan)]/30 text-[var(--cyan)]",
                          green: "bg-[var(--green)]/10 border-[var(--green)]/30 text-[var(--green)]",
                          yellow: "bg-[var(--yellow)]/10 border-[var(--yellow)]/30 text-[var(--yellow)]",
                          pink: "bg-[var(--pink)]/10 border-[var(--pink)]/30 text-[var(--pink)]",
                          purple: "bg-primary/10 border-primary/30 text-primary",
                        };
                        return (
                          <div
                            key={skill.name}
                            className={`px-4 py-2 border rounded-sm font-semibold ${colorClasses[skill.color as keyof typeof colorClasses]}`}
                          >
                            {skill.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Content - Stats */}
                <div className="space-y-8">
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
