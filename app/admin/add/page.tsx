import { ProjectForm } from "./project-form";

export default function AddProjectPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-h1 text-foreground mb-8">Add New Project</h1>
        <ProjectForm />
      </div>
    </div>
  );
}

