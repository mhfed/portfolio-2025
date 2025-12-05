import { getTranslations } from "next-intl/server";
import { SectionTitleWrapper } from "./section-title-wrapper";
import { ProjectCard } from "./project-card";
import { db } from "@/lib/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function ProjectsSection() {
  const t = await getTranslations("projects");

  // Fetch projects from database, ordered by createdAt descending
  let dbProjects = [];
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
  const mappedProjects = dbProjects.map((project) => ({
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
      className="min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0"
    >
      {/* Mobile: Sticky title outside grid */}
      <SectionTitleWrapper title={t("title")} sectionId="projects" mobileOnly />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* Desktop: Title in grid */}
          <SectionTitleWrapper title={t("title")} desktopOnly />

          {/* Right Column - Projects */}
          <div className="md:col-span-3 space-y-12 md:space-y-16 lg:space-y-20">
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
