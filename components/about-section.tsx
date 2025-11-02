import { getTranslations } from "next-intl/server"
import { SectionTitleWrapper } from "./section-title-wrapper"

export async function AboutSection() {
  const t = await getTranslations('about')

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Title */}
          <SectionTitleWrapper title={t('title')} />

          {/* Right Column - Content */}
          <div className="md:col-span-2">
            <div className="scroll-animate">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <p className="text-lg text-foreground leading-relaxed">
                    {t('description1')}
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    {t('description2')}
                  </p>
                  <div className="pt-6">
                    <h3 className="text-xl font-bold text-primary mb-4">{t('coreSkills')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["JavaScript", "TypeScript", "React.js", "Next.js", "Redux", "React Native"].map((skill) => (
                        <div
                          key={skill}
                          className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary font-semibold"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Content - Stats */}
                <div className="space-y-8">
                  <div className="bg-background border border-border/30 rounded-2xl p-8">
                    <div className="text-5xl font-black text-primary mb-2">5+</div>
                    <p className="text-lg text-foreground font-semibold">{t('yearsExperience')}</p>
                    <p className="text-sm text-muted-foreground mt-2">{t('yearsDescription')}</p>
                  </div>

                  <div className="bg-background border border-border/30 rounded-2xl p-8">
                    <div className="text-5xl font-black text-primary mb-2">100%</div>
                    <p className="text-lg text-foreground font-semibold">{t('clientSatisfaction')}</p>
                    <p className="text-sm text-muted-foreground mt-2">{t('satisfactionDescription')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
