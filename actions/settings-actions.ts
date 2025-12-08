"use server";

import { db } from "@/lib/db";
import { localeSettings } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
// Messages type - matches the structure of messages JSON files
type Messages = Record<string, any>;

export interface UpdateSettingsResult {
  success: boolean;
  error?: string;
}

// Helper function to flatten nested object
function flattenObject(
  obj: Record<string, any>,
  prefix = "",
): Record<string, string> {
  const flattened: Record<string, string> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value, newKey));
      } else {
        flattened[newKey] = String(value);
      }
    }
  }

  return flattened;
}

// Helper function to reconstruct nested object from flattened keys
function unflattenObject(
  flattened: Record<string, string>,
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in flattened) {
    if (Object.prototype.hasOwnProperty.call(flattened, key)) {
      const keys = key.split(".");
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in current)) {
          current[k] = {};
        }
        current = current[k];
      }

      current[keys[keys.length - 1]] = flattened[key];
    }
  }

  return result;
}

export async function getLocaleSettings(
  locale: "en" | "vi",
): Promise<Record<string, string>> {
  try {
    const settings = await db
      .select()
      .from(localeSettings)
      .where(eq(localeSettings.locale, locale));

    const flattened: Record<string, string> = {};
    for (const setting of settings) {
      flattened[setting.key] = setting.value;
    }

    return flattened;
  } catch (error) {
    console.error("Error fetching locale settings:", error);
    return {};
  }
}

export async function getAllLocaleSettings(): Promise<{
  en: Record<string, string>;
  vi: Record<string, string>;
}> {
  try {
    const allSettings = await db.select().from(localeSettings);

    const result: {
      en: Record<string, string>;
      vi: Record<string, string>;
    } = {
      en: {},
      vi: {},
    };

    for (const setting of allSettings) {
      if (setting.locale === "en" || setting.locale === "vi") {
        result[setting.locale][setting.key] = setting.value;
      }
    }

    return result;
  } catch (error) {
    console.error("Error fetching all locale settings:", error);
    return { en: {}, vi: {} };
  }
}

export async function updateLocaleSettings(
  locale: "en" | "vi",
  settings: Record<string, any>,
): Promise<UpdateSettingsResult> {
  try {
    // Flatten the nested settings object
    const flattened = flattenObject(settings);

    // Get existing settings for this locale
    const existingSettings = await db
      .select()
      .from(localeSettings)
      .where(eq(localeSettings.locale, locale));

    const existingKeys = new Set(existingSettings.map((s) => s.key));

    // Prepare updates and inserts
    const updates: Promise<any>[] = [];

    for (const [key, value] of Object.entries(flattened)) {
      if (existingKeys.has(key)) {
        // Update existing setting
        updates.push(
          db
            .update(localeSettings)
            .set({
              value: String(value),
              updatedAt: new Date(),
            })
            .where(
              and(
                eq(localeSettings.locale, locale),
                eq(localeSettings.key, key),
              ),
            ),
        );
      } else {
        // Insert new setting
        updates.push(
          db.insert(localeSettings).values({
            locale,
            key,
            value: String(value),
          }),
        );
      }
    }

    // Execute all updates/inserts
    await Promise.all(updates);

    // Revalidate all locale paths
    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/vi");
    revalidatePath("/admin/settings");

    return { success: true };
  } catch (error) {
    console.error("Error updating locale settings:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update locale settings",
    };
  }
}

// Get merged settings (DB + JSON fallback)
export async function getMergedLocaleSettings(
  locale: "en" | "vi",
): Promise<Record<string, any>> {
  try {
    // Load JSON messages as fallback
    const jsonMessages = (await import(`../messages/${locale}.json`))
      .default as Messages;

    // Get database overrides
    const dbSettings = await getLocaleSettings(locale);

    // If no DB settings, return JSON
    if (Object.keys(dbSettings).length === 0) {
      return jsonMessages;
    }

    // Merge: DB values override JSON values
    const merged = unflattenObject({
      ...flattenObject(jsonMessages),
      ...dbSettings,
    });

    return merged;
  } catch (error) {
    console.error("Error getting merged locale settings:", error);
    // Fallback to JSON
    try {
      return (await import(`../messages/${locale}.json`)).default as Messages;
    } catch {
      return {};
    }
  }
}
