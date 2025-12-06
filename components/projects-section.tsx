import { getTranslations } from "next-intl/server";
import { SectionTitleWrapper } from "./section-title-wrapper";
import { ProjectCard } from "./project-card";
import { db } from "@/lib/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function ProjectsSection() {
  const t = await getTranslations("projects");

  // Fetch projects from database, ordered by createdAt descending
  let dbProjects: typeof projects.$inferSelect[] = [];
  try {
    dbProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Return empty array if database query fails
    // This allows the page to render with "No projects" message
    dbProjects = [];
  }

  // Map database results to match ProjectCard interface
  const mappedProjects = dbProjects.map((project: typeof projects.$inferSelect) => ({
    image: project.imageUrl,
    title: project.title,
    year: project.year || "",
    description: project.description,
    details: project.details || "",
    liveUrl: project.liveUrl || undefined,
    githubUrl: project.githubUrl || undefined,
    techStack: project.techStack || [],
  }));

  return (
    <section
      id="projects"
      className="flex flex-col justify-center py-8 md:py-12 lg:py-16 px-4 md:px-6 scroll-mt-0 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--pink)]/5 via-transparent to-[var(--orange)]/5" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-tl from-primary/5 to-transparent" />
      </div>
      {/* Mobile: Sticky title outside grid */}
      <SectionTitleWrapper title={t("title")} sectionId="projects" mobileOnly />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Desktop: Title in grid */}
          <SectionTitleWrapper title={t("title")} desktopOnly />

          {/* Right Column - Projects */}
          <div className="md:col-span-3 space-y-6 md:space-y-8 lg:space-y-10">
            {mappedProjects.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                {t("noProjects") || "No projects available yet."}
              </p>
            ) : (
              mappedProjects.map((project, idx) => (
                <ProjectCard
                  key={project.title + idx}
                  {...project}
                  isAlternate={idx % 2 === 1}
                  index={idx}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
