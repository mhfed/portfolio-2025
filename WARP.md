# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview & Tech Stack

This is a multilingual personal portfolio built on:
- **Framework**: Next.js 16 (App Router, `app/` directory)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (global styles in `styles/globals.css`)
- **Database**: Vercel Postgres
- **ORM & Migrations**: Drizzle ORM / drizzle-kit (`db/schema.ts`, `drizzle/`, `drizzle.config.ts`)
- **i18n**: `next-intl` with locale routing and message files
- **Auth for admin**: HTTP Basic Auth via `middleware.ts`
- **Deployment**: Vercel with PWA support via `@ducanh2912/next-pwa` in `next.config.mjs`

## How to Run & Common Commands

> Commands below are shown with `pnpm`. If you prefer `npm` or `bun`, replace `pnpm <script>` with `npm run <script>` or `bun run <script>` respectively.

### Install dependencies

```bash
pnpm install
```

### Development server

Runs the Next.js dev server (App Router) at `http://localhost:3000`.

```bash
pnpm dev
```

Locales are handled via `next-intl`, with localized routes under the `[locale]` segment:
- English (default, no prefix when `localePrefix = "as-needed"`): `/` or `/en`
- Vietnamese: `/vi`

The admin dashboard is available at:
- `/admin` (protected by HTTP Basic Auth via `middleware.ts`)

### Build & production start

Build the production bundle:

```bash
pnpm build
```

Start the production server (after `pnpm build`):

```bash
pnpm start
```

### Linting

ESLint is configured to run over the whole repo (note: build-time ESLint errors are ignored in `next.config.mjs`).

```bash
pnpm lint
```

### Formatting

Prettier formatting via `bunx` (requires Bun installed locally):

```bash
pnpm format
```

### Database & migrations (Drizzle)

Drizzle is configured with `drizzle.config.ts` and `db/schema.ts`, outputting SQL and metadata to the `drizzle/` directory.

From the repo root:

```bash
# Generate migration SQL from the schema
pnpm db:generate

# Apply migrations to the database
pnpm db:migrate

# Push the current schema directly to the database (schema sync)
pnpm db:push

# Open Drizzle Studio for inspecting the database
pnpm db:studio
```

These commands rely on `POSTGRES_URL` being set in `.env.local`.

### Tests

There is currently **no test runner or `test` script** defined in `package.json`. To run tests or a single test, you will first need to introduce a test framework (e.g., Vitest/Jest) and corresponding scripts before adding commands here.

## Environment & Configuration

Key environment variables (see `README.md`):

- `POSTGRES_URL` – Vercel Postgres connection string (used by `drizzle.config.ts` and `lib/db.ts`)
- `ADMIN_USER` – username for Basic Auth protecting `/admin/*`
- `ADMIN_PASSWORD` – password for Basic Auth protecting `/admin/*`

Create a `.env.local` in the repo root with these values. **Do not commit `.env.local`**.

## High-Level Architecture

### Routing & Layout (Next.js App Router)

- **App directory**: `app/`
  - `app/[locale]/layout.tsx`
    - Wraps pages in `NextIntlClientProvider` with messages from `next-intl`.
    - Generates locale-specific SEO metadata (titles, descriptions, OpenGraph, Twitter) and JSON-LD structured data for the portfolio owner.
    - Calls `setRequestLocale` and `getMessages` to enable static rendering per locale.
    - Uses `routing.locales` from `i18n/routing.ts` to generate static params and validate locales.
  - `app/[locale]/page.tsx`
    - Main public homepage per locale.
    - Composes section components from `components/`:
      - `Header`, `HeroSection`, `AboutSection`, `WorkExperienceSection`, `ProjectsSection`, `LetsCollaborateSection`, etc.
      - Scroll-related helpers like `ScrollObserver` and `ScrollToTop`.
  - `app/admin/*`
    - `/admin` – Admin dashboard listing projects (`app/admin/page.tsx`). Fetches data via server action `getAllProjects`.
    - `/admin/add` – Add-project page using `ProjectForm`.
    - `/admin/edit/[id]` – Edit-project page using `EditForm` with server action-backed form submissions.
    - `delete-button.tsx` – Client component for confirming and triggering project deletion via server action.

### Middleware & Admin Auth

- `middleware.ts` orchestrates two concerns:
  - **Locale handling**: delegates to `next-intl` `createMiddleware(routing)` for all non-admin routes.
  - **Admin auth & routing**:
    - Intercepts paths starting with `/admin`.
    - Normalizes `/en/admin` or `/vi/admin` to `/admin` via redirect.
    - Applies HTTP Basic Auth using `ADMIN_USER` / `ADMIN_PASSWORD` from environment.
    - If auth fails, returns `401` with `WWW-Authenticate` header; otherwise lets request through with `NextResponse.next()`.

`config.matcher` is set to apply middleware to all non-static, non-`/api`, non-`/_next`, non-`/_vercel` paths, with `/admin` handled explicitly.

### Internationalization (next-intl)

- `i18n/routing.ts`
  - Defines `routing` with `locales: ["en", "vi"]`, `defaultLocale: "en"`, and `localePrefix: "as-needed"`.
  - Exports locale-aware navigation helpers: `Link`, `redirect`, `usePathname`, `useRouter`.
- `i18n/request.ts`
  - Exposes `getRequestConfig` for `next-intl` to resolve the effective locale from the request (`requestLocale`).
  - Loads localized messages from `messages/<locale>.json`.
- `messages/en.json`, `messages/vi.json`
  - Contain the actual translation messages used throughout the app.
- `hooks/use-locale.ts`
  - Client hook that:
    - Derives current `locale` from route params.
    - Provides `setLocale(newLocale)` to navigate to the same path with a different locale via `next-intl` router.
    - Tracks `isLoading` while switching locales.

When adding new pages or components, ensure they are wired into `next-intl` (e.g., use the localized routes and messages files instead of hardcoding strings where appropriate).

### Data Layer: Database & Server Actions

- `db/schema.ts`
  - Defines the `projects` table via Drizzle `pgTable`:
    - `id`, `title`, `year`, `description`, `details`, `imageUrl`, `liveUrl`, `githubUrl`, `techStack[]`, `createdAt`.
- `lib/db.ts`
  - Creates a Drizzle ORM instance for Vercel Postgres: `drizzle(sql, { schema })`.
- `drizzle.config.ts`
  - Points Drizzle to `./db/schema.ts`, outputs to `./drizzle`, uses `dialect: "postgresql"`, and reads `POSTGRES_URL` from environment.
- `actions/project-actions.ts` (`"use server"`)
  - Central place for **all project-related data access and mutations**:
    - `createProject(formData)` – validates and inserts into `projects`, then `revalidatePath("/")` and `revalidatePath("/admin")` and redirects to `/admin`.
    - `getAllProjects()` – fetches and orders projects by `createdAt` (descending).
    - `getProjectById(id)` – fetches a single project or returns `null`.
    - `updateProjectAction(formData)` / `updateProject(id, formData)` – updates project after validation, revalidates paths, redirects to `/admin`.
    - `deleteProject(id)` – deletes a project and revalidates affected paths.

**Important pattern**: Server components and server actions handle all DB access. Client components (forms, buttons) should call these server actions rather than making direct HTTP requests or using client-side `fetch` for DB operations.

### UI Components & Layout

- `components/`
  - Section-level components that make up the homepage and other areas:
    - Content sections like `hero-section.tsx`, `about-section.tsx`, `work-experience-section.tsx`, `projects-section.tsx`, `technologies-section.tsx`, `lets-collaborate-section.tsx`, etc.
    - Layout & utility components: `header.tsx`, `parallax-wrapper.tsx`, `section-title.tsx`, `section-divider.tsx`, `scroll-observer.tsx`, `scroll-to-top.tsx`, `floating-cta.tsx`, etc.
  - `components/ui/`
    - Reusable primitives:
      - `drawer.tsx` – Wrapper around `vaul` drawer primitives, with `Drawer`, `DrawerContent`, `DrawerContentSide`, etc.
      - `toast.tsx` – Radix Toast primitives wired with `class-variance-authority` variants.
      - `toaster.tsx` – Renders active toasts using the `use-toast` hook.
- `hooks/`
  - `use-scroll-animation.ts` – IntersectionObserver-based scroll animation hook.
  - `use-toast.ts` – Global toast store and hook, with `toast(...)` API and `ToastProps`/`ToastActionElement` types.
  - `use-locale.ts` – Locale switching hook (see i18n section above).

### Static Content & Data Modules

- `data/projects.ts`
  - Static list of portfolio projects used for sections like Projects/Work Experience.
  - Each entry has `image`, `title`, `year`, `description`, `details`, `liveUrl`, `githubUrl`, `techStack[]`.
- `data/blog-posts.ts`
  - Static blog metadata with localized titles/excerpts and slugs per locale.
  - `getBlogPosts(locale)` currently returns the full list regardless of locale but is structured with `en` / `vi` fields for future filtering.

### Styles & Theming

- `styles/globals.css`
  - Global CSS and Tailwind layer setup.
- Tailwind 4 and PostCSS configuration in:
  - `postcss.config.mjs`
  - Tailwind deps in `package.json` (`tailwindcss`, `@tailwindcss/postcss`, `tailwindcss-animate`, `tw-animate-css`).

When creating new UI, follow the existing utility-class-heavy, mobile-first Tailwind approach and reuse existing primitives in `components/ui` where appropriate.

### PWA & Next Config

- `next.config.mjs`
  - Wraps the Next config with:
    - `createNextIntlPlugin()` for i18n integration.
    - `withPWA(...)` from `@ducanh2912/next-pwa` for PWA support (service worker, caching). Disabled in development via `process.env.NODE_ENV === "development"`.
  - Also relaxes build-time lint/type checks:
    - `eslint.ignoreDuringBuilds = true`
    - `typescript.ignoreBuildErrors = true`

## Agent / AI Coding Guidelines (from .cursorrules)

When making changes or adding features, adhere to these project-specific rules:

1. **Server Components by default**
   - Do **not** add `"use client"` unless the component truly needs client-side behavior (state, effects, event handlers).
   - Keep data fetching and rendering on the server whenever possible.

2. **Data fetching**
   - Always fetch data directly in **Server Components** or **server actions** using `async/await` and Drizzle queries via `lib/db.ts`.
   - Do **not** use `useEffect` or client-side `fetch` for database queries.

3. **Mutations**
   - Use **Server Actions** (`"use server"`) for all mutations (INSERT, UPDATE, DELETE) instead of API routes.
   - Keep `route.ts` API handlers only when truly necessary (e.g., webhooks or external integrations).
   - After mutations, call `revalidatePath` for any affected routes (as done in `actions/project-actions.ts`).

4. **Types & safety**
   - Use strict TypeScript.
   - Prefer inferring types from Drizzle schema rather than duplicating shape definitions.

5. **Styling**
   - Use Tailwind CSS utility classes, following the existing design tokens and patterns in the codebase.
   - Maintain a mobile-first layout and reuse shared components (e.g., drawer, toast, section wrappers) where possible.

6. **Images**
   - Use `next/image` for images in the UI, storing only URLs (e.g., Cloudinary) in the database or data modules.

By following these conventions and using the commands and structure above, agents should be able to extend, debug, and refactor this portfolio application effectively without re-deriving the architecture from scratch each time.
