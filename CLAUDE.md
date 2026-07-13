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

## 3D / WebGL (Three.js "Financial HUD")

Stack: `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` (+ `postprocessing` là direct dep, `BlendFunction` import từ đây). Áp dụng khi làm bất kỳ thứ gì trong `components/three/*` hoặc scene R3F.

### Kiến trúc scene

- **Một Canvas cố định full-viewport** làm backdrop; camera bay station→station theo scroll (Catmull-Rom). Định nghĩa station (landmark + camera + look + accent) tập trung ở `components/three/hud-stations.ts`.
- **Landmark data-driven**: geometry sinh từ dữ liệu CV thật (số role, project, skill) — không dùng wireframe vô danh.
- **Cầu nối DOM ↔ WebGL**: `lib/hud-focus.ts` là singleton mutable, DOM ghi index đang đọc, 3D đọc mỗi frame. KHÔNG đẩy qua React state (chỉ tạo re-render vô ích).
- **Canvas là `pointer-events:none`** → fiber KHÔNG cập nhật `state.pointer`. Muốn lấy chuột phải tự nghe `window` `pointermove` (xem `ScrollCamera`, `ParticleCore`).

### Chất liệu cinematic (tránh "phèn")

- **CẤM** dùng `wireframe` + `meshBasicMaterial` mờ làm chủ thể. Chủ thể dùng `meshStandardMaterial`/`meshPhysicalMaterial` với `emissive` + `metalness`/`roughness`. Wireframe chỉ làm overlay nhận diện HUD.
- **Light rig** (ambient + key + rim) + `Environment` dựng bằng `<Lightformer>` — KHÔNG fetch HDRI preset qua mạng.
- **Emissive phải đủ sáng để bloom "ăn"** (`luminanceThreshold` ~0.12); dùng `toneMapped={false}` cho dot/edge phát sáng.
- **Hero = particle field shader** (points, `AdditiveBlending`, `depthWrite={false}`) reactive theo con trỏ (repulsion tính trong vertex shader, không CPU). Layout deterministic (không RNG) để SSR/CSR ổn định.
- **Fat gradient lines**: drei `<Line>` + `vertexColors` thay line mảnh; traveling dot emissive.
- **Postprocessing** (chỉ quality cao): Bloom + DepthOfField + ChromaticAberration + Scanline + Noise + Vignette. **CRT scanline đặt ở composer, KHÔNG ở DOM.**
- **2D là lớp readout hỗ trợ** — heading vừa phải để 3D dẫn dắt, không để chữ khổng lồ áp đảo scene.

### Performance (BẮT BUỘC)

- **Lazy-load scene** qua `next/dynamic({ ssr: false })` — three/drei/postprocessing KHÔNG được vào critical bundle. Wrapper nhẹ phải là client component (`dynamic ssr:false` không dùng được trong Server Component). Xem `hud-backdrop.tsx` (wrapper) → `hud-scene.tsx` (chunk nặng).
- **Adaptive DPR**: `<PerformanceMonitor>` scale DPR theo **bước thô 0.25 + no-op guard** (`setDpr(d => d===next ? d : next)`) — DPR đổi liên tục sẽ realloc GL buffer và chính nó gây jank. Tụt fps kéo dài → `onFallback` bật **lite mode** (bỏ DepthOfField/Scanline/Noise — 3 pass tốn fill-rate nhất).
- **Pause frameloop** khi `document.hidden` (`frameloop='never'`).
- **Early-out mỗi frame**: `LandmarkShell` bỏ traverse vật liệu khi station xa (fade≈0) hoặc đang "đậu" (fade không đổi); `HudLabels` bỏ ghi DOM khi (fade|active) không đổi; particle bỏ raycast khi camera đã bay qua hero.
- **EffectComposer + DepthOfField**: `multisampling={0}` (tránh lỗi `glBlitFramebuffer` depth/stencil blit). Canvas `antialias={false}` (output composer vốn không MSAA).
- **Gate mobile**: `quality='low'` → composer gọn (chỉ Bloom+Vignette), particle/count ít hơn.
- **EffectComposer children phải là `Element`** (không nhận `false`) → conditional effect thì truyền **mảng element có `key`**, đừng dùng `{cond && <Effect/>}`.

### Profiling (đo trước/sau, không tối ưu mù)

- **FPS**: rAF sampling, bỏ **warm-up ~5–6s** (compile shader + Environment cubemap + PerfMonitor dò DPR) rồi mới lấy steady-state. Theo dõi `worstMs`/`p95Ms`/`framesOver20ms`, không chỉ trung bình.
- **Bundle**: build prod vào **distDir riêng** (thêm tạm `distDir: process.env.PERF_DIST_DIR` vào `next.config.mjs`) để KHÔNG đụng dev server đang chạy; `next start` ở port riêng; xác minh chunk WebGL load **sau DOMContentLoaded** (off critical path) qua `performance.getEntriesByType('resource')`.
- **Dọn sau khi đo**: xoá distDir tạm, revert `next.config.mjs` VÀ `tsconfig.json` (`next build` tự chèn `<distDir>/types` vào tsconfig includes). eslint quét cả build output nếu distDir không bị ignore → luôn dọn trước khi chạy lint.

## Code Style

- **Tailwind v4** — dùng `@theme` tokens, không hardcode giá trị
- **Import order**: Next.js → React → lucide-react → @/components → @/lib → @/styles
- **Không dùng `any`** — type cụ thể hoặc `unknown` + narrowing
- **File naming**: `kebab-case.tsx` cho components, `camelCase.ts` cho utilities