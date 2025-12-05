"use client";

import { useActionState, useState } from "react";
import { updateProjectAction } from "@/actions/project-actions";
import type { UpdateProjectResult } from "@/actions/project-actions";
import { ImageUploadDropzone } from "@/components/admin-image-upload-dropzone";

interface EditFormProps {
  project: {
    id: number;
    title: string;
    year: string | null;
    description: string;
    details: string | null;
    imageUrl: string;
    liveUrl: string | null;
    githubUrl: string | null;
    techStack: string[] | null;
  };
}

export function EditForm({ project }: EditFormProps) {
  const [state, formAction] = useActionState<UpdateProjectResult, FormData>(
    updateProjectAction,
    { success: true }
  );
  const [imageUrl, setImageUrl] = useState(project.imageUrl);

  return (
    <>
      {state.error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-none text-destructive">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Hidden ID field */}
        <input type="hidden" name="id" value={project.id} />
        
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={project.title}
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="Project Title"
          />
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            defaultValue={project.year || ""}
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="[2023]"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            Description <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            defaultValue={project.description}
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="Short description of the project"
          />
        </div>

        {/* Details */}
        <div>
          <label
            htmlFor="details"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            Details
          </label>
          <textarea
            id="details"
            name="details"
            rows={6}
            defaultValue={project.details || ""}
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-y"
            placeholder="Detailed description of the project..."
          />
        </div>

        {/* Image upload + URL */}
        <div className="space-y-3">
          <ImageUploadDropzone
            initialUrl={project.imageUrl}
            onUploadSuccess={(url) => {
              setImageUrl(url);
            }}
            label="Project image"
            description="Drag and drop an image here, or click to browse. The Cloudinary URL will be filled in below."
          />

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-semibold text-foreground mb-3"
            >
              Image URL (Cloudinary) <span className="text-destructive">*</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              required
              className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
              placeholder="https://res.cloudinary.com/..."
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Use the uploader above or paste an existing Cloudinary image URL.
            </p>
          </div>
        </div>

        {/* Live URL */}
        <div>
          <label
            htmlFor="liveUrl"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            Live URL
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            defaultValue={project.liveUrl || ""}
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="https://example.com"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label
            htmlFor="githubUrl"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            GitHub URL
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            defaultValue={project.githubUrl || ""}
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="https://github.com/username/repo"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label
            htmlFor="techStack"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            defaultValue={
              project.techStack && project.techStack.length > 0
                ? project.techStack.join(", ")
                : ""
            }
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="React, TypeScript, Next.js"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Separate multiple technologies with commas
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={state.success === false && !state.error}
            className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all disabled:opacity-50"
          >
            Update Project
          </button>
          <a
            href="/admin"
            className="px-6 py-3 bg-background hover:bg-primary/10 border border-border/30 rounded-none text-foreground font-semibold transition-all text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </>
  );
}

