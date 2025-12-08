import { getMergedLocaleSettings } from "@/actions/settings-actions";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  // Load initial values for both locales
  const enValues = await getMergedLocaleSettings("en");
  const viValues = await getMergedLocaleSettings("vi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Locale Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage text content for different locales. Changes will override the
          default JSON values.
        </p>
      </div>

      <TabsContainer enValues={enValues} viValues={viValues} />
    </div>
  );
}

import { TabsContent } from "./tabs-content";

function TabsContainer({
  enValues,
  viValues,
}: {
  enValues: Record<string, any>;
  viValues: Record<string, any>;
}) {
  return <TabsContent enValues={enValues} viValues={viValues} />;
}
