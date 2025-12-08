import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getMergedLocaleSettings } from "@/actions/settings-actions";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Get merged messages (DB overrides + JSON fallback)
  const messages = await getMergedLocaleSettings(locale);

  return {
    locale,
    messages,
  };
});
