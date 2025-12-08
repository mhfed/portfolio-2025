"use client";

import { useState } from "react";
import { SettingsForm } from "./settings-form";
import { cn } from "@/lib/utils";

interface TabsContentProps {
  enValues: Record<string, any>;
  viValues: Record<string, any>;
}

export function TabsContent({ enValues, viValues }: TabsContentProps) {
  const [activeTab, setActiveTab] = useState<"en" | "vi">("en");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-border/30">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("en")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "en"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-primary/50",
            )}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("vi")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "vi"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-primary/50",
            )}
          >
            Vietnamese
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "en" ? (
        <SettingsForm locale="en" initialValues={enValues} />
      ) : (
        <SettingsForm locale="vi" initialValues={viValues} />
      )}
    </div>
  );
}
