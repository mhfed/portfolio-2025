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

## 3D / WebGL (Interactive spatial portfolio)

Stack: `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` (+ `postprocessing` là direct dep, `BlendFunction` import từ đây). Áp dụng khi làm bất kỳ thứ gì trong `components/three/*` hoặc scene R3F.

### Kiến trúc scene

- **Một Canvas tương tác cố định full-viewport** là lớp trình bày chính; camera hold ở từng station và chỉ blend gần ranh giới section. Waypoint desktop/mobile nằm ở `components/three/scene-waypoints.ts`.
- **Information station data-driven**: Hero, Work, About, Experience, Contact render typography SDF, texture, CTA và geometry từ dữ liệu CV thật. Không dùng `Html` overlay cho nội dung chính.
- **Cầu nối DOM ↔ WebGL**: `lib/sceneStore.ts` dùng external store + primitive selector cho state rời rạc (station, record, ready). Continuous camera/pointer values vẫn ở ref để không re-render React mỗi frame.
- **Progressive enhancement**: SSR render section 2D đầy đủ. Khi scene mount xong, section đổi thành semantic scroll rail nhẹ; reduced-motion/WebGL failure giữ nguyên fallback 2D.
- **Canvas nhận pointer event** để raycast CTA và node. Không gọi `preventDefault` trên wheel/touch; canvas giữ `touch-action: pan-y` để không khóa scroll trang.

### Chất liệu cinematic (tránh "phèn")

- **CẤM** dùng `wireframe` + `meshBasicMaterial` mờ làm chủ thể. Chủ thể dùng `meshStandardMaterial`/`meshPhysicalMaterial` với `emissive` + `metalness`/`roughness`.
- **Light rig** (ambient + key + rim); `Environment` dựng bằng `<Lightformer>` chỉ bật ở tier high — KHÔNG fetch HDRI preset qua mạng.
- **Emissive có kiểm soát** để bloom chỉ bắt highlight, không làm bạc màu nền sáng (`luminanceThreshold` khoảng 0.5).
- **Hero = kinetic glass sculpture + particle field shader** reactive theo con trỏ. Repulsion tính trong vertex shader, layout deterministic (không RNG) để ổn định giữa các lần tải.
- **Line chỉ là chi tiết dẫn hướng**; chủ thể phải dùng vật liệu PBR có phản xạ từ light rig.
- **Postprocessing**: Bloom + Vignette rất nhẹ, lazy-load và chỉ bật ở tier high desktop. Không dùng DepthOfField lên scene chứa text, chromatic aberration, scanline hoặc noise kiểu cyber.
- **Typography 3D** dùng Drei `Text` (Troika SDF); paragraph không dùng extruded TextGeometry. Ảnh project dùng texture plane và Cloudinary transform để giới hạn kích thước tải.

### Performance (BẮT BUỘC)

- **Lazy-load scene** bằng `React.lazy()` chỉ sau capability check + browser idle/user interaction — three/drei/postprocessing KHÔNG được xuất hiện trong `entryJSFiles` của route. Không đổi lại sang `next/dynamic`, vì Next có thể preload chunk nặng dù chưa render.
- **Ba performance tier** (`high` / `balanced` / `low`) khởi tạo từ viewport, pointer, hardware concurrency, device memory và Save-Data; `<PerformanceMonitor>` chỉ được hạ tier runtime, đồng thời scale DPR theo bước 0.125 + no-op guard. Tier low khóa khoảng DPR 0.72–0.8.
- **Frame governor**: Canvas dùng `frameloop='demand'`; high/balanced tối đa 60 FPS, low tối đa 30 FPS để tránh render thừa trên màn 90/120 Hz và giảm thermal throttling. `requestAnimationFrame` tự pause khi tab background.
- **Early-out mỗi frame**: `SpatialStation` cập nhật activity ref; animation con phải kiểm tra `stationIsActive()` để station khuất không chạy math/shader uniform. Pointer dùng `state.pointer` của R3F, không gắn listener toàn cục riêng.
- **EffectComposer + DepthOfField**: `multisampling={0}` (tránh lỗi `glBlitFramebuffer` depth/stencil blit). Canvas `antialias={false}` (output composer vốn không MSAA).
- **Gate mobile**: `quality='low'` dùng layout station riêng, DPR thấp, geometry/text atlas gọn, vật liệu standard thay transmission và không mount postprocessing/Environment. Máy cực yếu, reduced-motion, Save-Data hoặc WebGL caveat giữ fallback 2D SSR.

### Profiling (đo trước/sau, không tối ưu mù)

- **FPS**: rAF sampling, bỏ **warm-up ~5–6s** (compile shader + Environment cubemap + PerfMonitor dò DPR) rồi mới lấy steady-state. Theo dõi `worstMs`/`p95Ms`/`framesOver20ms`, không chỉ trung bình.
- **Bundle**: build prod vào **distDir riêng** (thêm tạm `distDir: process.env.PERF_DIST_DIR` vào `next.config.mjs`) để KHÔNG đụng dev server đang chạy; `next start` ở port riêng; xác minh chunk WebGL load **sau DOMContentLoaded** (off critical path) qua `performance.getEntriesByType('resource')`.
- **Dọn sau khi đo**: xoá distDir tạm, revert `next.config.mjs` VÀ `tsconfig.json` (`next build` tự chèn `<distDir>/types` vào tsconfig includes). eslint quét cả build output nếu distDir không bị ignore → luôn dọn trước khi chạy lint.

## Code Style

- **Tailwind v4** — dùng `@theme` tokens, không hardcode giá trị
- **Import order**: Next.js → React → lucide-react → @/components → @/lib → @/styles
- **Không dùng `any`** — type cụ thể hoặc `unknown` + narrowing
- **File naming**: `kebab-case.tsx` cho components, `camelCase.ts` cho utilities
