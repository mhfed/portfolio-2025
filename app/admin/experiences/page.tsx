import { getAllExperiences } from "@/actions/experience-actions";
import Link from "next/link";
import { DeleteExperienceButton } from "./delete-experience-button";

export default async function ExperiencesAdminPage() {
  const experiences = await getAllExperiences();

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border/40 bg-muted/30 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm text-muted-foreground">Total experiences</p>
            <p className="text-3xl font-bold text-foreground">
              {experiences.length}
            </p>
          </div>
          <Link
            href="/admin/experiences/add"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Add experience
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        {experiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/40 px-6 py-12 text-center">
            <p className="mb-3 text-sm text-muted-foreground">
              No experiences yet.
            </p>
            <Link
              href="/admin/experiences/add"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Create your first experience
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="flex flex-col gap-3 rounded-lg border border-border/40 bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <h2 className="mb-1 text-base font-semibold text-foreground">
                      {exp.position}
                    </h2>
                    <p className="text-sm font-medium text-primary">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">{exp.period}</p>
                    {exp.location && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {exp.location}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/experiences/edit/${exp.id}`}
                      className="inline-flex items-center justify-center rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10"
                    >
                      Edit
                    </Link>
                    <DeleteExperienceButton experienceId={exp.id} />
                  </div>
                </div>

                {exp.description && (
                  <p className="text-sm text-foreground/80 line-clamp-2">
                    {exp.description}
                  </p>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="rounded-sm border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {typeof exp.orderIndex === "number" && (
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Order: {exp.orderIndex}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
