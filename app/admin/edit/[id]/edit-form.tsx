"use client";

import { useActionState, useState } from "react";
import { updateProjectAction } from "@/actions/project-actions";
import type { UpdateProjectResult } from "@/actions/project-actions";
import { ImageUploadDropzone } from "@/components/admin-image-upload-dropzone";
import { LocaleTabs } from "@/components/admin/locale-tabs";

interface EditFormProps {
  project: {
    id: number;
    title: string;
    titleEn: string | null;
    titleVi: string | null;
    year: string | null;
    description: string;
    descriptionEn: string | null;
    descriptionVi: string | null;
    details: string | null;
    detailsEn: string | null;
    detailsVi: string | null;
    imageUrl: string;
    liveUrl: string | null;
    githubUrl: string | null;
    techStack: string[] | null;
  };
}

export function EditForm({ project }: EditFormProps) {
  const [state, formAction] = useActionState<UpdateProjectResult, FormData>(
    updateProjectAction,
    { success: true },
  );
  const [imageUrl, setImageUrl] = useState(project.imageUrl);

  return (
    <>
      {state.error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Hidden ID field */}
        <input type="hidden" name="id" value={project.id} />

        {/* Locale Tabs for Text Fields */}
        <LocaleTabs>
          {(activeTab) => (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor={`title_${activeTab}`}
                  className="block text-sm font-semibold text-foreground mb-3"
                >
                  Title ({activeTab === "en" ? "English" : "Tiếng Việt"}){" "}
                  <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id={`title_${activeTab}`}
                  name={`title_${activeTab}`}
                  defaultValue={
                    activeTab === "en"
                      ? project.titleEn || project.title || ""
                      : project.titleVi || project.title || ""
                  }
                  className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder={
                    activeTab === "en"
                      ? "Project Title"
                      : "Tên dự án"
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor={`description_${activeTab}`}
                  className="block text-sm font-semibold text-foreground mb-3"
                >
                  Description ({activeTab === "en" ? "English" : "Tiếng Việt"}){" "}
                  <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id={`description_${activeTab}`}
                  name={`description_${activeTab}`}
                  defaultValue={
                    activeTab === "en"
                      ? project.descriptionEn || project.description || ""
                      : project.descriptionVi || project.description || ""
                  }
                  className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder={
                    activeTab === "en"
                      ? "Short description of the project"
                      : "Mô tả ngắn về dự án"
                  }
                />
              </div>

              {/* Details */}
              <div>
                <label
                  htmlFor={`details_${activeTab}`}
                  className="block text-sm font-semibold text-foreground mb-3"
                >
                  Details ({activeTab === "en" ? "English" : "Tiếng Việt"})
                </label>
                <textarea
                  id={`details_${activeTab}`}
                  name={`details_${activeTab}`}
                  rows={6}
                  defaultValue={
                    activeTab === "en"
                      ? project.detailsEn || project.details || ""
                      : project.detailsVi || project.details || ""
                  }
                  className="w-full px-4 py-3 bg-background border border-border/30 rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-y"
                  placeholder={
                    activeTab === "en"
                      ? "Detailed description of the project..."
                      : "Mô tả chi tiết về dự án..."
                  }
                />
              </div>
            </div>
          )}
        </LocaleTabs>

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
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="[2023]"
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
              className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
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
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
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
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
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
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
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
            className="px-6 py-3 bg-background hover:bg-primary/10 border border-border/30 rounded-md text-foreground font-semibold transition-all text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </>
  );
}
