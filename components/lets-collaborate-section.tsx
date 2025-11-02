import { getTranslations } from "next-intl/server"
import { SectionTitleWrapper } from "./section-title-wrapper"
import { ContactForm } from "./contact-form"
import { SocialLinks } from "./social-links"

export async function LetsCollaborateSection() {
  const t = await getTranslations('collaborate')

  const socialLinks = [
    { name: "GitHub", icon: "github", url: "https://github.com/mhfed" },
    { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/mhfed" },
    { name: "Twitter", icon: "twitter", url: "#" },
    { name: "Dribbble", icon: "dribbble", url: "#" },
  ]

  return (
    <section id="collaborate" className="py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Title */}
          <SectionTitleWrapper 
            title={t('title')}
            desktopContent={
              <p className="text-lg text-foreground/70 mt-6">
                {t('description')}
              </p>
            }
          />

          {/* Mobile: Description below title */}
          <div className="md:hidden mb-6">
            <p className="text-base md:text-lg text-foreground/70">
              {t('description')}
            </p>
          </div>

          {/* Right Column - Contact Form */}
          <div className="md:col-span-2">
            <div className="scroll-animate">
              {/* Contact Card */}
              <div className="bg-background border border-border/30 rounded-2xl p-8 md:p-12 space-y-8">
                {/* Contact Form */}
                <ContactForm />

                {/* Social Links */}
                <SocialLinks
                  links={socialLinks}
                  orConnectText={t('orConnect')}
                  reachDirectlyText={t('reachDirectly')}
                  email="nmhieu04091999@gmail.com"
                  phoneText={t('phone')}
                  phone="0982084197"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
