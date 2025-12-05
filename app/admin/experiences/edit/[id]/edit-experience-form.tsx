"use client";

import { useActionState } from "react";
import {
  updateExperienceAction,
  type UpdateExperienceResult,
} from "@/actions/experience-actions";

interface EditExperienceFormProps {
  experience: {
    id: number;
    company: string;
    position: string;
    period: string;
    location: string | null;
    description: string;
    skills: string[] | null;
    orderIndex: number | null;
  };
}

export function EditExperienceForm({ experience }: EditExperienceFormProps) {
  const [state, formAction] = useActionState<UpdateExperienceResult, FormData>(
    updateExperienceAction,
    { success: true },
  );

  return (
    <>
      {state.error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" value={experience.id} />

        <div>
          <label
            htmlFor="company"
            className="mb-3 block text-sm font-semibold text-foreground"
          >
            Company <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            defaultValue={experience.company}
            className="w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors"
            placeholder="Company name"
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="mb-3 block text-sm font-semibold text-foreground"
          >
            Position <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            required
            defaultValue={experience.position}
            className="w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors"
            placeholder="Frontend Developer"
          />
        </div>

        <div>
          <label
            htmlFor="period"
            className="mb-3 block text-sm font-semibold text-foreground"
          >
            Period <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="period"
            name="period"
            required
            defaultValue={experience.period}
            className="w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors"
            placeholder="8/2022 - 11/2023"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-3 block text-sm font-semibold text-foreground"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={experience.location || ""}
            className="w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors"
            placeholder="Ha Noi, Viet Nam"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-3 block text-sm font-semibold text-foreground"
          >
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            required
            defaultValue={experience.description}
            className="w-full resize-y rounded-none border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors"
            placeholder="Describe your responsibilities, impact, and key contributions..."
          />
        </div>

        <div>
          <label
            htmlFor="skills"
            className="mb-3 block text-sm font-semibold text-foreground"
          >
            Skills / Technologies (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            defaultValue={
              experience.skills && experience.skills.length > 0
                ? experience.skills.join(", ")
                : ""
            }
            className="w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors"
            placeholder="React, TypeScript, Next.js"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Separate multiple skills with commas.
          </p>
        </div>

        <div>
          <label
            htmlFor="orderIndex"
            className="mb-3 block text-sm font-semibold text-foreground"
          >
            Order index
          </label>
          <input
            type="number"
            id="orderIndex"
            name="orderIndex"
            defaultValue={
              typeof experience.orderIndex === "number"
                ? experience.orderIndex
                : ""
            }
            className="w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors"
            placeholder="Lower numbers appear higher in the list"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all"
          >
            Update experience
          </button>
          <a
            href="/admin/experiences"
            className="px-6 py-3 bg-background hover:bg-primary/10 border border-border/30 rounded-md text-foreground font-semibold transition-all text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </>
  );
}
