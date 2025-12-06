import { getTranslations } from "next-intl/server";
import { SectionTitleWrapper } from "./section-title-wrapper";
import { TimelineItem } from "./timeline-item";
import { db } from "@/lib/db";
import { experiences } from "@/db/schema";
import { asc, desc } from "drizzle-orm";

interface TimelineItemProps {
  company: string;
  position: string;
  period: string;
  description: string;
  skills: string[];
}

export async function WorkExperienceSection() {
  const t = await getTranslations("experience");

  let dbExperiences: typeof experiences.$inferSelect[] = [];
  try {
    dbExperiences = await db
      .select()
      .from(experiences)
      .orderBy(asc(experiences.orderIndex), desc(experiences.createdAt));
  } catch (error) {
    console.error("Error fetching experiences:", error);
    dbExperiences = [];
  }

  const timelineItems: TimelineItemProps[] = dbExperiences.map((exp) => ({
    company: exp.company,
    position: exp.position,
    period: exp.period,
    description: exp.description,
    skills: exp.skills || [],
  }));

  return (
    <section
      id="experience"
      className="flex flex-col justify-center py-8 md:py-12 lg:py-16 px-4 md:px-6 scroll-mt-0 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-[var(--green)]/5 via-transparent to-[var(--cyan)]/5" />
        <div className="absolute top-1/2 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      </div>
      {/* Mobile: Sticky title outside grid */}
      <SectionTitleWrapper
        title={t("title")}
        sectionId="experience"
        mobileOnly
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Desktop: Title in grid */}
          <SectionTitleWrapper title={t("title")} desktopOnly />

          {/* Right Column - Timeline */}
          <div className="md:col-span-3">
            <div className="space-y-6">
              {dbExperiences.map((exp, idx) => (
                <TimelineItem key={idx} {...exp} skills={exp.skills || []} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
