import { getAllProjects } from "@/actions/project-actions";
import Link from "next/link";
import Image from "next/image";
import { DeleteButton } from "./delete-button";

export default async function AdminDashboard() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-h1 text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your portfolio projects
            </p>
          </div>
          <Link
            href="/admin/add"
            className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all text-center inline-block"
          >
            Add New Project
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 p-6 bg-muted/30 border border-border/30">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Projects
              </p>
              <p className="text-3xl font-bold text-foreground">
                {projects.length}
              </p>
            </div>
          </div>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects yet.</p>
            <Link
              href="/admin/add"
              className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all inline-block"
            >
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-6 bg-muted/30 border border-border/30 hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-1">
                          {project.title}
                        </h2>
                        {project.year && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {project.year}
                          </p>
                        )}
                        <p className="text-foreground/80 mb-2">
                          {project.description}
                        </p>
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-primary/10 text-primary border border-primary/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">
                      <Link
                        href={`/admin/edit/${project.id}`}
                        className="px-4 py-2 bg-background hover:bg-primary/10 border border-border/30 text-foreground font-semibold transition-all"
                      >
                        Edit
                      </Link>
                      <DeleteButton projectId={project.id} />
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-background hover:bg-primary/10 border border-border/30 text-foreground font-semibold transition-all"
                        >
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-background hover:bg-primary/10 border border-border/30 text-foreground font-semibold transition-all"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



