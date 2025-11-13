import { getTranslations } from "next-intl/server"
import { SectionTitleWrapper } from "./section-title-wrapper"
import { ExternalLink } from "lucide-react"

export async function LetsCollaborateSection() {
  const t = await getTranslations('collaborate')
  const tContact = await getTranslations('hero.contact')

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/mhfed" },
    { name: "LinkedIn", url: "https://linkedin.com/in/mhfed" },
    { name: "Telegram", url: "#" },
  ]

  return (
    <section id="collaborate" className="py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0">
      {/* Mobile: Sticky title outside grid */}
      <SectionTitleWrapper title={t('title')} sectionId="collaborate" mobileOnly />
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Desktop: Title in grid */}
          <SectionTitleWrapper 
            title={t('title')}
            desktopOnly
          />

          {/* Right Column - Email */}
          <div className="md:col-span-2">
            <div className="scroll-animate">
              {/* Email Address */}
              <a
                href={`mailto:${tContact('email')}`}
                className="text-h2 md:text-h1 text-foreground font-bold hover:text-primary transition-colors underline decoration-foreground/30 hover:decoration-primary"
              >
                {tContact('email')}
              </a>
            </div>
          </div>
        </div>

        {/* Footer - Copyright and Social Links */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Copyright */}
          <div className="text-body-sm text-foreground/60">
            Copyright © 2025 Nguyen Minh Hieu. All Rights Reserved
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-foreground hover:text-primary transition-colors underline decoration-foreground/30 hover:decoration-primary flex items-center gap-1"
              >
                {link.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
