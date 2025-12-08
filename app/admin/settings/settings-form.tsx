"use client";

import { useActionState, useEffect, useState } from "react";
import { updateLocaleSettings } from "@/actions/settings-actions";
import type { UpdateSettingsResult } from "@/actions/settings-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SettingsFormProps {
  locale: "en" | "vi";
  initialValues: Record<string, any>;
}

// Helper to determine if a field should be a textarea (long text)
function shouldUseTextarea(key: string, value: string): boolean {
  const longTextKeys = [
    "description",
    "description1",
    "textBlockLeft",
    "textBlockRight",
    "messagePlaceholder",
  ];
  return longTextKeys.some((k) => key.includes(k)) || value.length > 100;
}

// Recursive component to render form fields
function FormFields({
  data,
  prefix = "",
  onValueChange,
}: {
  data: Record<string, any>;
  prefix?: string;
  onValueChange: (key: string, value: string) => void;
}) {
  const fields: JSX.Element[] = [];

  for (const [key, value] of Object.entries(data)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Nested object - create a section
      fields.push(
        <div key={fullKey} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground capitalize border-b border-border/30 pb-2 mt-6 first:mt-0">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <div className="pl-4 space-y-4 border-l-2 border-border/20">
            <FormFields
              data={value}
              prefix={fullKey}
              onValueChange={onValueChange}
            />
          </div>
        </div>,
      );
    } else {
      // Leaf value - create input field
      const stringValue = String(value || "");
      const useTextarea = shouldUseTextarea(fullKey, stringValue);

      fields.push(
        <div key={fullKey} className="space-y-2">
          <Label htmlFor={fullKey} className="text-foreground/90">
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/\./g, " → ")
              .trim()}
          </Label>
          {useTextarea ? (
            <Textarea
              id={fullKey}
              name={fullKey}
              defaultValue={stringValue}
              rows={4}
              onChange={(e) => onValueChange(fullKey, e.target.value)}
              className="font-mono text-sm"
            />
          ) : (
            <Input
              id={fullKey}
              name={fullKey}
              type="text"
              defaultValue={stringValue}
              onChange={(e) => onValueChange(fullKey, e.target.value)}
              className="font-mono text-sm"
            />
          )}
        </div>,
      );
    }
  }

  return <>{fields}</>;
}

function SubmitButton({ locale }: { locale: "en" | "vi" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-md text-primary font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <span>Save {locale === "en" ? "English" : "Vietnamese"} Settings</span>
      )}
    </button>
  );
}

export function SettingsForm({ locale, initialValues }: SettingsFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [state, formAction] = useActionState<UpdateSettingsResult, FormData>(
    async (_prevState, formData) => {
      // Convert FormData to object
      const data: Record<string, any> = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Reconstruct nested structure
      const nested: Record<string, any> = {};
      for (const [key, value] of Object.entries(data)) {
        const keys = key.split(".");
        let current = nested;

        for (let i = 0; i < keys.length - 1; i++) {
          const k = keys[i];
          if (!(k in current)) {
            current[k] = {};
          }
          current = current[k];
        }

        current[keys[keys.length - 1]] = value;
      }

      return updateLocaleSettings(locale, nested);
    },
    { success: true },
  );

  const handleValueChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {state.error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{state.error}</p>
        </div>
      )}

      {state.success && !state.error && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 dark:text-green-400">
          <p className="font-semibold">Success</p>
          <p className="text-sm">Settings saved successfully!</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <FormFields
          data={initialValues}
          onValueChange={handleValueChange}
        />

        <div className="flex gap-4 pt-6 border-t border-border/30">
          <SubmitButton locale={locale} />
          <a
            href="/admin/settings"
            className="px-6 py-3 bg-background hover:bg-primary/10 border border-border/30 rounded-md text-foreground font-semibold transition-all text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </>
  );
}
