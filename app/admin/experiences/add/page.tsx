import { ExperienceForm } from "./experience-form";

export default function AddExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Add experience
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to add a new work experience entry.
        </p>
      </div>
      <ExperienceForm />
    </div>
  );
}
