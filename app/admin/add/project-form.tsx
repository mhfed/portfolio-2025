"use client";

import { useActionState, useState } from "react";
import { createProject } from "@/actions/project-actions";
import type { CreateProjectResult } from "@/actions/project-actions";
import { SubmitButton } from "./submit-button";
import { ImageUploadDropzone } from "@/components/admin-image-upload-dropzone";
import { LocaleTabs } from "@/components/admin/locale-tabs";

export function ProjectForm() {
  const [state, formAction] = useActionState<CreateProjectResult, FormData>(
    createProject,
    { success: true },
  );
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      {state.error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
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
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="[2023]"
          />
        </div>

        {/* Image upload + URL */}
        <div className="space-y-3">
          <ImageUploadDropzone
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
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="React, TypeScript, Next.js"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Separate multiple technologies with commas
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <SubmitButton />
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
