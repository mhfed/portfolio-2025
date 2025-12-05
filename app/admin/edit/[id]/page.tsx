import { getProjectById } from "@/actions/project-actions";
import { EditForm } from "./edit-form";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const projectId = parseInt(id, 10);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Edit project</h2>
        <p className="text-sm text-muted-foreground">
          Update the information for this portfolio project.
        </p>
      </div>
      <EditForm
        project={{
          id: project.id,
          title: project.title,
          year: project.year,
          description: project.description,
          details: project.details,
          imageUrl: project.imageUrl,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          techStack: project.techStack,
        }}
      />
    </div>
  );
}




