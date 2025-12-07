import { getAllProjects } from "@/actions/project-actions";
import Link from "next/link";
import Image from "next/image";
import { DeleteButton } from "./delete-button";

export default async function AdminDashboard() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-6">
      {/* Stats */}
      <section className="rounded-lg border border-border/40 bg-muted/30 p-6">
        <div className="flex items-center gap-8">
          <div>
            <p className="mb-1 text-sm text-muted-foreground">Total projects</p>
            <p className="text-3xl font-bold text-foreground">
              {projects.length}
            </p>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="space-y-4">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/40 px-6 py-12 text-center">
            <p className="mb-3 text-sm text-muted-foreground">
              No projects yet.
            </p>
            <Link
              href="/admin/add"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col overflow-hidden rounded-lg border border-border/40 bg-card transition-colors hover:border-primary/50"
              >
                <div className="relative h-40 w-full border-b border-border/40 bg-muted">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h2 className="mb-1 text-base font-semibold text-foreground">
                      {project.title}
                    </h2>
                    {project.year && (
                      <p className="mb-1 text-xs text-muted-foreground">
                        {project.year}
                      </p>
                    )}
                    <p className="text-sm text-foreground/80">
                      {project.description}
                    </p>
                  </div>

                  {project.techStack && project.techStack.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-sm border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/edit/${project.id}`}
                      className="inline-flex items-center justify-center rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10"
                    >
                      Edit
                    </Link>
                    <DeleteButton projectId={project.id} />
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10"
                      >
                        View live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
