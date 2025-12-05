"use server";

import { db } from "@/lib/db";
import { projects } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";

export interface CreateProjectResult {
  success: boolean;
  error?: string;
}

export interface UpdateProjectResult {
  success: boolean;
  error?: string;
}

export interface DeleteProjectResult {
  success: boolean;
  error?: string;
}

export async function createProject(
  _prevState: CreateProjectResult,
  formData: FormData,
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

    // Revalidate the homepage and admin page to show new project
    revalidatePath("/");
    revalidatePath("/admin");

    // Redirect to admin dashboard
    redirect("/admin");
  } catch (error) {
    // Let Next.js handle redirect errors without logging them as failures
    if (
      error instanceof Error &&
      typeof (error as any).digest === "string" &&
      (error as any).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Error creating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create project",
    };
  }
}

export async function getAllProjects() {
  try {
    const dbProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return dbProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectById(id: number) {
  try {
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    return project[0] || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function updateProjectAction(
  _prevState: UpdateProjectResult,
  formData: FormData,
): Promise<UpdateProjectResult> {
  const id = parseInt(formData.get("id") as string, 10);
  
  if (isNaN(id)) {
    return { success: false, error: "Invalid project ID" };
  }

  return updateProject(id, formData);
}

export async function updateProject(
  id: number,
  formData: FormData
): Promise<UpdateProjectResult> {
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

    // Update project in database
    await db
      .update(projects)
      .set({
        title: title.trim(),
        year: year?.trim() || null,
        description: description.trim(),
        details: details?.trim() || null,
        imageUrl: imageUrl.trim(),
        liveUrl: liveUrl?.trim() || null,
        githubUrl: githubUrl?.trim() || null,
        techStack: techStack && techStack.length > 0 ? techStack : null,
      })
      .where(eq(projects.id, id));

    // Revalidate the homepage and admin page
    revalidatePath("/");
    revalidatePath("/admin");

    // Redirect to admin dashboard
    redirect("/admin");
  } catch (error) {
    // Let Next.js handle redirect errors without logging them as failures
    if (
      error instanceof Error &&
      typeof (error as any).digest === "string" &&
      (error as any).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Error updating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update project",
    };
  }
}

export async function deleteProject(
  id: number
): Promise<DeleteProjectResult> {
  try {
    // Delete project from database
    await db.delete(projects).where(eq(projects.id, id));

    // Revalidate the homepage and admin page
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete project",
    };
  }
}

