# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Quality Gates (MANDATORY — from CLAUDE.md)

Every task must pass both before considered done:

- **Lint**: `npm run lint` → 0 errors, 0 warnings. Run `npm run lint -- --fix` for auto-fixable first.
- **TypeScript**: `npx tsc --noEmit` → 0 errors

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** — uses `@theme` tokens in `app/globals.css`, NOT `tailwind.config.js`
- **next-intl v4** — i18n with locales `en`, `vi`, `zh-TW`; route prefix is **always** (including `/en`)
- **GSAP** for scroll-triggered animations; **Lenis** for smooth scroll
- Package manager: **pnpm** (lockfile present); format with `bun` (`bunx prettier --write .`)

## Critical Non-Obvious Patterns

### i18n Data Flow

- ALL content (projects, experiences) lives in `messages/{locale}.json`, NOT in a database
- Page fetches data via `getTranslations()` + `tProjects.raw('list')` and passes it to `<CreativePortfolio>`
- `data/projects.ts` → [`normalizeProjects()`](data/projects.ts) enriches raw message records with hardcoded `resultByTitle` / `roleByTitle` maps
- `localeDetection: false` — locale is never auto-detected; users must navigate to `/en`, `/vi`, or `/zh-TW`

### GSAP Loading

- Never `import gsap` directly in components — always use [`loadGSAP()`](lib/gsap-utils.ts) (singleton dynamic import, registers `ScrollTrigger` exactly once)

### Lenis Scroll Skew

- [`LenisProvider`](components/providers/lenis-provider.tsx) sets `--scroll-skew` CSS var on `<html>` based on scroll velocity; components can read it for skew effects

### Font Aliases

- `--font-geist-mono` is aliased to `--font-jetbrains-mono` in `globals.css` — they are the same font
- Font vars: `--font-display` (Space Grotesk + Manrope), `--font-body` (Manrope), `--font-mono` (JetBrains Mono)

### Theme System

- Runtime accent theme switcher (lime/teal/cobalt/emerald/coral/violet/amber) + dark/light mode
- Theme logic in [`lib/theme.ts`](lib/theme.ts); default accent is `'lime'`

## Component Conventions

- **Atomic Design**: `atoms/` → `molecules/` → `organisms/` → `ui/` (ShadCN primitives)
- **Server Component first** — no `'use client'` unless hooks/events/browser APIs needed
- **React 19 refs**: use `ref?: React.Ref<HTMLDivElement>` directly, **not** `forwardRef`
- **className merging**: always `cn()` from [`@/lib/utils`](lib/utils.ts)
- **Props interface**: export as `{ComponentName}Props`
- **File naming**: `kebab-case.tsx` for components, `camelCase.ts` for utilities

## Code Style

- **Import order**: Next.js → React → lucide-react → `@/components` → `@/lib` → `@/styles`
- **No `any`** — use specific types or `unknown` + narrowing
- **Animation easings**: custom cubic-bezier `(0.32,0.72,0,1)` or `(0.16,1,0.3,1)`; never `will-change-transform` on base classes
- Tailwind v4: use CSS `@theme` tokens, never hardcode color/spacing values
