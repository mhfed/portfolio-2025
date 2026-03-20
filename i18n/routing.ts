import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'vi', 'zh-TW'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The locale prefix strategy
  localePrefix: 'always', // Always prefix locales, including the default locale at /en

  // Do not infer locale from browser settings or previous cookies
  localeDetection: false,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
