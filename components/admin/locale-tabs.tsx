"use client";

import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LocaleTabsProps {
  children: (activeTab: "en" | "vi") => ReactNode;
  defaultTab?: "en" | "vi";
}

export function LocaleTabs({ children, defaultTab = "en" }: LocaleTabsProps) {
  const [activeTab, setActiveTab] = useState<"en" | "vi">(defaultTab);

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
            Tiếng Việt
          </button>
        </div>
      </div>

      {/* Tab content */}
      {children(activeTab)}
    </div>
  );
}
