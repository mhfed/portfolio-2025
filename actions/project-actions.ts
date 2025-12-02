"use server";

import { db } from "@/lib/db";
import { projects } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface CreateProjectResult {
  success: boolean;
  error?: string;
}

export async function createProject(
  formData: FormData
): Promise<CreateProjectResult> {
  try {
    // Extract form data
    const title = formData.get("title") as string;
    const year = formData.get("year") as string | null;
    const description = formData.get("description") as string;
    const details = formData.get("details") as string | null;
    const imageUrl = formData.get("imageUrl") as string;
    const liveUrl = formData.get("liveUrl") as string | null;
    const githubUrl = formData.get("githubUrl") as string | null;
    const techStackInput = formData.get("techStack") as string | null;

    // Validate required fields
    if (!title || title.trim() === "") {
      return { success: false, error: "Title is required" };
    }

    if (!description || description.trim() === "") {
      return { success: false, error: "Description is required" };
    }

    if (!imageUrl || imageUrl.trim() === "") {
      return { success: false, error: "Image URL is required" };
    }

    // Parse tech stack (comma-separated values)
    const techStack = techStackInput
      ? techStackInput
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech.length > 0)
      : null;

    // Insert into database
    await db.insert(projects).values({
      title: title.trim(),
      year: year?.trim() || null,
      description: description.trim(),
      details: details?.trim() || null,
      imageUrl: imageUrl.trim(),
      liveUrl: liveUrl?.trim() || null,
      githubUrl: githubUrl?.trim() || null,
      techStack: techStack && techStack.length > 0 ? techStack : null,
    });

    // Revalidate the homepage to show new project
    revalidatePath("/");

    // Redirect to homepage
    redirect("/");
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create project",
    };
  }
}

