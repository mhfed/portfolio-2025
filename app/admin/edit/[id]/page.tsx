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
    <div className="min-h-screen bg-background py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-h1 text-foreground mb-8">Edit Project</h1>
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
    </div>
  );
}



