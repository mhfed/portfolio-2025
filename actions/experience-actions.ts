"use server";

import { db } from "@/lib/db";
import { experiences } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { asc, desc, eq } from "drizzle-orm";

export interface CreateExperienceResult {
  success: boolean;
  error?: string;
}

export interface UpdateExperienceResult {
  success: boolean;
  error?: string;
}

export interface DeleteExperienceResult {
  success: boolean;
  error?: string;
}

export async function createExperience(
  _prevState: CreateExperienceResult,
  formData: FormData,
): Promise<CreateExperienceResult> {
  try {
    // Extract form data - locale fields
    const companyEn = formData.get("company_en") as string | null;
    const companyVi = formData.get("company_vi") as string | null;
    const positionEn = formData.get("position_en") as string | null;
    const positionVi = formData.get("position_vi") as string | null;
    const descriptionEn = formData.get("description_en") as string | null;
    const descriptionVi = formData.get("description_vi") as string | null;
    const locationEn = formData.get("location_en") as string | null;
    const locationVi = formData.get("location_vi") as string | null;
    
    // Legacy fields for backward compatibility
    const company = formData.get("company") as string | null;
    const position = formData.get("position") as string | null;
    const description = formData.get("description") as string | null;
    const location = formData.get("location") as string | null;
    
    // Non-locale fields
    const period = formData.get("period") as string;
    const skillsInput = formData.get("skills") as string | null;
    const orderIndexRaw = formData.get("orderIndex") as string | null;

    // Validate: at least one locale must have required fields
    const finalCompanyEn = companyEn?.trim() || company?.trim() || "";
    const finalCompanyVi = companyVi?.trim() || company?.trim() || "";
    const finalPositionEn = positionEn?.trim() || position?.trim() || "";
    const finalPositionVi = positionVi?.trim() || position?.trim() || "";
    const finalDescriptionEn = descriptionEn?.trim() || description?.trim() || "";
    const finalDescriptionVi = descriptionVi?.trim() || description?.trim() || "";

    if (!finalCompanyEn && !finalCompanyVi) {
      return { success: false, error: "Company is required (at least in one language)" };
    }

    if (!finalPositionEn && !finalPositionVi) {
      return { success: false, error: "Position is required (at least in one language)" };
    }

    if (!period || period.trim() === "") {
      return { success: false, error: "Period is required" };
    }

    if (!finalDescriptionEn && !finalDescriptionVi) {
      return { success: false, error: "Description is required (at least in one language)" };
    }

    const skills = skillsInput
      ? skillsInput
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0)
      : null;

    let orderIndex: number | null = null;
    if (orderIndexRaw && orderIndexRaw.trim() !== "") {
      const parsed = Number.parseInt(orderIndexRaw, 10);
      if (!Number.isNaN(parsed)) {
        orderIndex = parsed;
      }
    }

    await db.insert(experiences).values({
      company: finalCompanyEn || finalCompanyVi || "",
      companyEn: finalCompanyEn || null,
      companyVi: finalCompanyVi || null,
      position: finalPositionEn || finalPositionVi || "",
      positionEn: finalPositionEn || null,
      positionVi: finalPositionVi || null,
      period: period.trim(),
      location: locationEn?.trim() || locationVi?.trim() || location?.trim() || null,
      locationEn: locationEn?.trim() || null,
      locationVi: locationVi?.trim() || null,
      description: finalDescriptionEn || finalDescriptionVi || "",
      descriptionEn: finalDescriptionEn || null,
      descriptionVi: finalDescriptionVi || null,
      skills: skills && skills.length > 0 ? skills : null,
      orderIndex,
    });

    revalidatePath("/");
    revalidatePath("/admin/experiences");

    redirect("/admin/experiences");
  } catch (error) {
    if (
      error instanceof Error &&
      typeof (error as any).digest === "string" &&
      (error as any).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Error creating experience:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create experience",
    };
  }
}

export async function getAllExperiences() {
  try {
    const rows = await db
      .select()
      .from(experiences)
      .orderBy(asc(experiences.orderIndex), desc(experiences.createdAt));

    return rows;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function getExperienceById(id: number) {
  try {
    const row = await db
      .select()
      .from(experiences)
      .where(eq(experiences.id, id))
      .limit(1);

    return row[0] || null;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return null;
  }
}

export async function updateExperienceAction(
  _prevState: UpdateExperienceResult,
  formData: FormData,
): Promise<UpdateExperienceResult> {
  const id = Number.parseInt(formData.get("id") as string, 10);

  if (Number.isNaN(id)) {
    return { success: false, error: "Invalid experience ID" };
  }

  return updateExperience(id, formData);
}

export async function updateExperience(
  id: number,
  formData: FormData,
): Promise<UpdateExperienceResult> {
  try {
    // Extract form data - locale fields
    const companyEn = formData.get("company_en") as string | null;
    const companyVi = formData.get("company_vi") as string | null;
    const positionEn = formData.get("position_en") as string | null;
    const positionVi = formData.get("position_vi") as string | null;
    const descriptionEn = formData.get("description_en") as string | null;
    const descriptionVi = formData.get("description_vi") as string | null;
    const locationEn = formData.get("location_en") as string | null;
    const locationVi = formData.get("location_vi") as string | null;
    
    // Legacy fields for backward compatibility
    const company = formData.get("company") as string | null;
    const position = formData.get("position") as string | null;
    const description = formData.get("description") as string | null;
    const location = formData.get("location") as string | null;
    
    // Non-locale fields
    const period = formData.get("period") as string;
    const skillsInput = formData.get("skills") as string | null;
    const orderIndexRaw = formData.get("orderIndex") as string | null;

    // Validate: at least one locale must have required fields
    const finalCompanyEn = companyEn?.trim() || company?.trim() || "";
    const finalCompanyVi = companyVi?.trim() || company?.trim() || "";
    const finalPositionEn = positionEn?.trim() || position?.trim() || "";
    const finalPositionVi = positionVi?.trim() || position?.trim() || "";
    const finalDescriptionEn = descriptionEn?.trim() || description?.trim() || "";
    const finalDescriptionVi = descriptionVi?.trim() || description?.trim() || "";

    if (!finalCompanyEn && !finalCompanyVi) {
      return { success: false, error: "Company is required (at least in one language)" };
    }

    if (!finalPositionEn && !finalPositionVi) {
      return { success: false, error: "Position is required (at least in one language)" };
    }

    if (!period || period.trim() === "") {
      return { success: false, error: "Period is required" };
    }

    if (!finalDescriptionEn && !finalDescriptionVi) {
      return { success: false, error: "Description is required (at least in one language)" };
    }

    const skills = skillsInput
      ? skillsInput
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0)
      : null;

    let orderIndex: number | null = null;
    if (orderIndexRaw && orderIndexRaw.trim() !== "") {
      const parsed = Number.parseInt(orderIndexRaw, 10);
      if (!Number.isNaN(parsed)) {
        orderIndex = parsed;
      }
    }

    await db
      .update(experiences)
      .set({
        company: finalCompanyEn || finalCompanyVi || "",
        companyEn: finalCompanyEn || null,
        companyVi: finalCompanyVi || null,
        position: finalPositionEn || finalPositionVi || "",
        positionEn: finalPositionEn || null,
        positionVi: finalPositionVi || null,
        period: period.trim(),
        location: locationEn?.trim() || locationVi?.trim() || location?.trim() || null,
        locationEn: locationEn?.trim() || null,
        locationVi: locationVi?.trim() || null,
        description: finalDescriptionEn || finalDescriptionVi || "",
        descriptionEn: finalDescriptionEn || null,
        descriptionVi: finalDescriptionVi || null,
        skills: skills && skills.length > 0 ? skills : null,
        orderIndex,
      })
      .where(eq(experiences.id, id));

    revalidatePath("/");
    revalidatePath("/admin/experiences");

    redirect("/admin/experiences");
  } catch (error) {
    if (
      error instanceof Error &&
      typeof (error as any).digest === "string" &&
      (error as any).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Error updating experience:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update experience",
    };
  }
}

export async function deleteExperience(
  id: number,
): Promise<DeleteExperienceResult> {
  try {
    await db.delete(experiences).where(eq(experiences.id, id));

    revalidatePath("/");
    revalidatePath("/admin/experiences");

    return { success: true };
  } catch (error) {
    console.error("Error deleting experience:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete experience",
    };
  }
}
