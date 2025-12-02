import { getTranslations } from "next-intl/server";
import { Github, Linkedin } from "lucide-react";
import { TechMarquee } from "./tech-marquee";
import { HeroBackground } from "./hero-background";
import { HeroTypingText } from "./hero-typing-text";
import { HeroTitleBadge } from "./hero-title-badge";
import { HeroTextBlocks } from "./hero-text-blocks";
import { ResumeDownloadButton } from "./resume-download-button";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="min-h-screen flex flex-col justify-between pt-20 md:pt-10 pb-8 px-6 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <HeroBackground />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-7xl w-full mx-auto relative z-10 px-4">
        {/* Name Section with Title Badge */}
        <div className="relative w-full flex flex-col md:flex-row items-top justify-between mb-8 md:mb-12 gap-4 md:gap-20">
          {/* Name - Center */}
          <div className="flex flex-col">
            <HeroTypingText
              frontText={t("front")}
              middleText={t("middle")}
              endText={t("end")}
            />
          </div>

          {/* Title Badge - Right of Name */}
          <div className="flex items-center md:items-start md:pt-2">
            <HeroTitleBadge />
          </div>
        </div>

        {/* Text Blocks - Below Name */}
        <HeroTextBlocks />

        {/* Download Resume Button & Social Links */}
        <div className="mt-8 md:mt-12 flex flex-col items-center gap-6">
          <ResumeDownloadButton />
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mhfed"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-none hover:bg-primary/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 text-foreground" />
            </a>
            <a
              href="https://linkedin.com/in/mhfed"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-none hover:bg-primary/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-foreground" />
            </a>
          </div>
        </div>
      </div>

      {/* Tech Marquee - Bottom */}
      <div className="relative z-10">
        <TechMarquee />
      </div>
    </section>
  );
}
