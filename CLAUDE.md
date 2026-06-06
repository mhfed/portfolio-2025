# Portfolio 2025 — Project Rules

## Quality Gates

Mọi task phải pass cả 2 gate trước khi coi là done:

- **Lint** — `npm run lint` → 0 errors, 0 warnings
  - Nếu eslint chưa install, tự install và setup config
  - Nếu có auto-fixable errors, chạy `npm run lint -- --fix` trước
- **TypeScript** — `npx tsc --noEmit` → 0 errors

Nếu gate fail → fix lỗi → re-check. Loop đến khi cả 2 xanh.

## Design & Component Standards

### Khi tạo component UI

Luôn dùng các skill sau (gọi theo thứ tự):

1. **`high-end-visual-design`** — generate component với design pattern chuẩn (Double-Bezel, button-in-button, typography hierarchy)
2. **`design-taste-frontend`** — audit component vừa tạo (WCAG AA, spacing, composition)
3. **`/code-review`** — verify quality trước khi commit

### Folder Structure (Atomic Design)

```
components/
  atoms/        — Button, Typography, Icon, Badge, etc.
  molecules/    — SearchBar, Card, FormField, etc.
  organisms/    — HeroSection, ProjectsSection, Footer, etc.
  ui/           — ShadCN-style UI primitives (button.tsx, input.tsx, etc.)
```

### Component Patterns

- **Server Component first** — mặc định không có `'use client'`
- **`'use client'`** — chỉ dùng khi cần: hooks (useState, useEffect), event handlers, browser APIs, context
- **Async component** cho data fetching (React Server Component pattern)
- **Props interface** — export interface, đặt tên theo pattern `{ComponentName}Props`
- **Ref** — dùng React 19 pattern: `ref?: React.Ref<HTMLDivElement>` (không dùng forwardRef)
- **cn()** — luôn dùng `cn()` từ `@/lib/utils` để merge className

### Animation Patterns

- **GSAP** (GreenSock) — cho scroll-triggered animations, timeline, character splitting
- **CSS transitions** — ưu tiên cho micro-interactions (hover, active, press)
- **will-change-transform** — chỉ dùng trong animation context, KHÔNG đặt ở base class
- **cubic-bezier custom** — dùng easing từ design system (0.32,0.72,0,1) hoặc (0.16,1,0.3,1)

## Code Style

- **Tailwind v4** — dùng `@theme` tokens, không hardcode giá trị
- **Import order**: Next.js → React → lucide-react → @/components → @/lib → @/styles
- **Không dùng `any`** — type cụ thể hoặc `unknown` + narrowing
- **File naming**: `kebab-case.tsx` cho components, `camelCase.ts` cho utilities