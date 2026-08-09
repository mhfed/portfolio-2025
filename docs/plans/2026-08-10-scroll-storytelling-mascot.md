# Scroll-storytelling mascot implementation plan

**Goal:** Ship a localized, accessible hybrid 2.5D scroll story in which one
visually consistent mascot travels along a continuous six-beat journey, carries
one connected conversation, and receives optional lazy-loaded Three.js depth on
capable desktop devices.

**Architecture:** The server route builds typed story content from locale JSON.
A single client `ScrollStoryRuntime` owns journey progress and GSAP triggers,
then coordinates one mounted traveler, registered pose blending, a visible story
trail, the progress rail, compact mobile companion, tablet checkpoints, and
optional atmosphere. The
semantic portfolio remains the complete SSR fallback.

**Tech stack:** Next.js 16, React 19, TypeScript 5, next-intl 4, GSAP via
`loadGSAP()`, Lenis, Next Image, React Three Fiber/Drei/Three.js, Tailwind v4 and
the existing CSS token system, Vitest for pure behavior tests.

**Execution mode:** direct Codex implementation. Do not use Botcom skills.

Source spec:
[`docs/specs/2026-08-10-scroll-storytelling-mascot.md`](../specs/2026-08-10-scroll-storytelling-mascot.md)

Implementation must not begin until this plan is explicitly approved.

## Working-tree guardrail

The following paths already contain uncommitted WIP and must be preserved:

- `app/globals.css`
- `app/layout.tsx`
- `components/molecules/scroll-to-top.tsx`
- `components/organisms/editorial-portfolio.tsx`
- `components/molecules/mascot-scroll-motion.tsx`
- `public/images/hero-mascot-programmer.png`
- `public/images/mascot-about-story.png`
- `public/images/mascot-work-story.png`
- `public/images/mascot-experience-story.png`
- `public/images/mascot-skills.png`
- `public/images/mascot-contact.png`

Before every edit, inspect the current diff for the target path. Do not reset,
checkout, regenerate, or replace these files wholesale.

## Target file structure

### Create

- `types/storytelling.ts` — closed story IDs and serializable story contracts.
- `lib/storytelling.ts` — journey waypoints, pose metadata, interpolation, and
  pure lookup/assertion helpers.
- `tests/storytelling.test.ts` — story ID, narrative, waypoint, interpolation,
  and locale-model tests.
- `vitest.config.ts` — test runner configuration and `@/` alias.
- `docs/design/mascot-character-bible.md` — canonical identity and pose rules.
- `scripts/validate-mascot-assets.mjs` — validates final PNG canvas, alpha, and
  normalized asset naming.
- `public/images/story/mascot-top.png` — canonical laptop/intro pose.
- `public/images/story/mascot-about.png` — design-principle presentation pose.
- `public/images/story/mascot-work.png` — roadmap/case-study pose.
- `public/images/story/mascot-experience.png` — progression/step-up pose.
- `public/images/story/mascot-skills.png` — tool-presentation pose.
- `public/images/story/mascot-contact.png` — resolved celebration pose.
- `components/molecules/mascot-traveler.tsx` — persistent desktop character,
  registered pose layers, story trail, and bubble.
- `components/molecules/story-checkpoint.tsx` — mobile in-flow beat card.
- `components/organisms/scroll-story-runtime.tsx` — active beat and GSAP orchestration.
- `components/organisms/story-atmosphere.tsx` — capability gate, fallback, and lazy loader.
- `components/three/story-atmosphere-canvas.tsx` — decorative low-cost R3F scene.

### Modify

- `package.json` and `pnpm-lock.yaml` — add Vitest and a deterministic test script.
- `types/portfolio-content.ts` — attach typed editorial UI and story content.
- `messages/en.json`, `messages/vi.json`, `messages/zh-TW.json` — localized guide
  dialogue and existing WIP UI labels.
- `app/[locale]/page.tsx` — build the complete typed story model server-side.
- `components/organisms/editorial-portfolio.tsx` — add beat anchors, one runtime,
  and mobile checkpoints; remove competing independent mascot ownership.
- `components/molecules/mascot-scroll-motion.tsx` — retire after its behavior has
  moved into the single runtime; delete only when no import remains.
- `app/globals.css` — guide/bubble/checkpoint/atmosphere styles and cleanup of
  superseded WIP animation rules.

The original WIP mascot images remain untouched as references. The final runtime
uses the normalized `public/images/story/` set only.

## Task 1 — Baseline and protect the WIP

- [ ] Read `AGENTS.md`, `CLAUDE.md`, the source spec, this plan, and the full
  current diff.
- [ ] Record `git status --short` in the implementation notes and distinguish
  pre-existing WIP from files added by this plan.
- [ ] Run the mandatory gates before editing:

  ```bash
  npm run lint
  npx tsc --noEmit
  ```

  Expected: record whether each command is green before the feature. If either
  is already red, preserve the output as the baseline and fix only errors within
  the touched scope during implementation.

- [ ] Start the local app with `pnpm dev`, then capture baseline screenshots for
  `/en`, `/vi`, and `/zh-TW` at 1440×900 and `/vi` at 390×844. Also record the
  behavior of `/vi#work` and reduced-motion mode.
- [ ] Do not edit or commit in this task.

## Task 1A — Create one character bible and normalize the pose family

Files: `docs/design/mascot-character-bible.md`,
`scripts/validate-mascot-assets.mjs`, and the six files under
`public/images/story/`.

- [ ] Treat `public/images/hero-mascot-programmer.png` as the canonical identity
  reference. Audit all current WIP poses side-by-side and record each mismatch in
  face width, muzzle, eyes, ears, sprout, headset, microphone, markings, paws,
  tail, material, camera, and lighting.
- [ ] Write the character bible with non-negotiable invariants:

  - rounded lime-green 3D cat with the same head/body proportion in every pose;
  - cyan irises, charcoal ear interiors, identical leaf sprout, and identical
    charcoal over-ear headset with boom mic;
  - consistent muzzle, nose, whiskers, brow shape, paw pads, and tail bands;
  - three-quarter front camera, soft top-left key light, restrained rim light,
    transparent background, and no cast-shadow plate;
  - 1024×1024 PNG canvas, subject occupying the same optical scale, with the foot
    or seated-body anchor registered to the same normalized baseline;
  - props may change, but the character materials and identity may not.

- [ ] Define the causal prop sequence in the bible: laptop → design board →
  roadmap → ascending blocks → toolkit → celebration. Each prop explains the
  transition into the next portfolio chapter instead of acting as decoration.
- [ ] Generate or edit the six final poses using the hero image as the identity
  reference and the existing chapter image only as a gesture/prop reference.
  Save new files under `public/images/story/`; never overwrite the originals.
- [ ] After each pose, compare it at the same displayed size against the
  canonical hero. Reject and regenerate any pose that changes identity markers,
  camera language, material, or lighting. “Still a green cat” is not sufficient.
- [ ] Create `scripts/validate-mascot-assets.mjs` using only Node built-ins. Read
  each PNG signature and IHDR bytes, then fail unless all six expected files are
  PNG, exactly 1024×1024, use an alpha-capable PNG color type, and stay below the
  1.5 MiB source-asset budget per file. Print one result line per asset.
- [ ] Run:

  ```bash
  node scripts/validate-mascot-assets.mjs
  ```

  Expected: six passing assets with identical canvas metadata.
- [ ] Build a temporary contact sheet at equal scale and inspect the transitions
  top→about→work→experience→skills→contact. Delete the temporary sheet after
  approval; only the bible and production PNGs remain in the repository.

## Task 2 — Add a behavior-test harness and define the closed story model

Files: `package.json`, `pnpm-lock.yaml`, `vitest.config.ts`,
`tests/storytelling.test.ts`, `types/storytelling.ts`, `lib/storytelling.ts`.

- [ ] Install the development-only runner with the repository package manager:

  ```bash
  pnpm add -D vitest
  ```

  Add this script to `package.json`:

  ```json
  "test": "vitest run"
  ```

- [ ] Create `vitest.config.ts` with a Node environment and the same `@/` root
  alias used by TypeScript:

  ```ts
  import path from 'node:path'
  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname),
      },
    },
    test: {
      environment: 'node',
      include: ['tests/**/*.test.ts'],
    },
  })
  ```

- [ ] Red: create `tests/storytelling.test.ts` and assert these contracts before
  creating their implementation:

  ```ts
  import { describe, expect, it } from 'vitest'
  import {
    NAVIGABLE_STORY_BEAT_IDS,
    STORY_BEAT_IDS,
    getStoryBeatPresentation,
  } from '@/lib/storytelling'

  describe('storytelling model', () => {
    it('defines the six ordered narrative beats', () => {
      expect(STORY_BEAT_IDS).toEqual([
        'top',
        'about',
        'work',
        'experience',
        'skills',
        'contact',
      ])
    })

    it('keeps the intro outside the numbered navigation chapters', () => {
      expect(NAVIGABLE_STORY_BEAT_IDS).toEqual([
        'about',
        'work',
        'experience',
        'skills',
        'contact',
      ])
    })

    it('has a normalized mascot asset and waypoint for every beat', () => {
      for (const id of STORY_BEAT_IDS) {
        const presentation = getStoryBeatPresentation(id)
        expect(presentation.imageSrc).toBe(`/images/story/mascot-${id}.png`)
        expect(presentation.waypoint.scale).toBeGreaterThan(0)
        expect(presentation.waypoint.xVw).toBeGreaterThanOrEqual(0)
        expect(presentation.waypoint.xVw).toBeLessThanOrEqual(100)
      }
    })
  })
  ```

  Run `pnpm test` and confirm failure is caused by the missing module, not test
  configuration.

- [ ] Green: create `types/storytelling.ts` with the exact public contracts:

  ```ts
  export const STORY_BEAT_IDS = [
    'top',
    'about',
    'work',
    'experience',
    'skills',
    'contact',
  ] as const

  export type StoryBeatId = (typeof STORY_BEAT_IDS)[number]
  export type NavigableStoryBeatId = Exclude<StoryBeatId, 'top'>
  export type StoryTone = 'cream' | 'green' | 'yellow' | 'coral'

  export interface StoryBeatContent {
    bridge: string
    dialogue: string
    id: StoryBeatId
    label: string
  }

  export interface PortfolioStoryContent {
    ariaLabel: string
    beats: StoryBeatContent[]
    progressLabel: string
  }

  export interface StoryWaypoint {
    rotation: number
    scale: number
    xVw: number
    yVh: number
  }

  export interface StoryBeatPresentation {
    imageSrc: string
    prop: string
    tone: StoryTone
    waypoint: StoryWaypoint
  }
  ```

- [ ] Green: create `lib/storytelling.ts`. Re-export the ordered IDs, define
  `NAVIGABLE_STORY_BEAT_IDS`, provide a `satisfies Record<StoryBeatId,
  StoryBeatPresentation>` journey map using the six normalized story PNGs, and
  implement `getStoryBeatPresentation(id)` as a typed lookup. Waypoints must form
  a shallow continuous curve through the safe viewport gutters; do not alternate
  sides mechanically or place adjacent points far enough apart to read as a
  teleport.
- [ ] Run `pnpm test`; expected: 3 tests green. Run `npx tsc --noEmit` and fix
  signatures before proceeding.
- [ ] Commit the test and implementation together if the user later authorizes
  commits; otherwise keep them as one reviewable diff.

## Task 3 — Localize every story and WIP UI string

Files: `tests/storytelling.test.ts`, `types/portfolio-content.ts`,
`messages/en.json`, `messages/vi.json`, `messages/zh-TW.json`,
`app/[locale]/page.tsx`.

- [ ] Red: extend `tests/storytelling.test.ts` to import each locale JSON and
  assert that all six beat IDs have non-empty `label`, `dialogue`, and `bridge`
  values, dialogue is at most 140 characters, bridge copy is at most 72
  characters, and the five navigable labels exist. Use `unknown` plus a small
  type guard; do not use `any`.
- [ ] Run `pnpm test`; expected: failure because `storytelling` keys do not yet
  exist.
- [ ] Add an `editorialUi` namespace to all three locale files for the current
  WIP strings (`hello`, `years`, `shipping`, `builder`, `journey`, `curious`,
  `caseStudies`, `madeWithCare`, `portfolioJourney`). Provide real Traditional
  Chinese translations instead of falling back to English.
- [ ] Add a `storytelling` object to all three locale files with
  `ariaLabel`, `progressLabel`, and a `beats` record. Every one of `top`,
  `about`, `work`, `experience`, `skills`, and `contact` must contain exactly
  `label`, `dialogue`, and `bridge` string keys.

- [ ] Use this approved Vietnamese narrative spine:

  | Beat | Dialogue | Bridge |
  |---|---|---|
  | Intro | “Mình xây những trải nghiệm web vừa rõ ràng, vừa có chuyển động đúng lúc.” | “Nhưng cách mình làm còn quan trọng hơn hiệu ứng.” |
  | About | “Mình bắt đầu từ vấn đề của người dùng, rồi mới chọn giao diện và công nghệ.” | “Nguyên tắc đó chỉ có ý nghĩa khi đi vào sản phẩm thật.” |
  | Work | “Trong từng dự án, mình biến ràng buộc thành một luồng sử dụng nhanh và dễ hiểu.” | “Lặp lại quá trình ấy đã thay đổi cách mình làm nghề.” |
  | Experience | “Mỗi chặng giúp mình cân bằng tốt hơn giữa tốc độ giao hàng và chất lượng dài hạn.” | “Để giữ nhịp đó, mình chọn công cụ rất có chủ đích.” |
  | Skills | “React, TypeScript và motion chỉ là công cụ; điều quan trọng là chúng phục vụ đúng trải nghiệm.” | “Nếu bạn đang có một bài toán thật, mình muốn nghe về nó.” |
  | Contact | “Mình sẵn sàng cùng bạn biến ý tưởng đó thành một sản phẩm chạy tốt và có cá tính.” | “Bắt đầu bằng một lời chào.” |

  English and Traditional Chinese must preserve this causal sequence and tone,
  not translate each sentence mechanically.

  Copy tone must be brief, specific, and conversational. The `bridge` line must
  point semantically to the next chapter (intro→principle→application→growth→
  tools→collaboration), so reading all six bubbles produces one story instead of
  six captions. Vietnamese is the source voice; English and Traditional Chinese
  should preserve meaning rather than translate word-for-word.

- [ ] Extend `PortfolioContent` with a typed `editorialUi` object and
  `story: PortfolioStoryContent`. Import the story type from
  `@/types/storytelling`; do not duplicate it.
- [ ] In `app/[locale]/page.tsx`, add `getTranslations()` calls for
  `editorialUi` and `storytelling`. Build beats by mapping `STORY_BEAT_IDS`, so
  locale JSON cannot silently reorder the experience. Pass the resulting typed
  objects through `content`.
- [ ] Remove the locale ternary object from `EditorialPortfolio` only after all
  current usages have a `content.editorialUi` replacement.
- [ ] Run `pnpm test` and `npx tsc --noEmit`; expected: locale coverage tests and
  typecheck green.

## Task 4 — Build the persistent mascot traveler test-first

Files: `components/molecules/mascot-traveler.tsx`,
`components/molecules/story-checkpoint.tsx`, `app/globals.css`.

- [ ] Red: add a source-level contract test in `tests/storytelling.test.ts` that
  reads both component files and asserts the guide exposes `data-story-guide`,
  each pose exposes `data-story-pose`, inactive content receives `aria-hidden`,
  the same shell exposes `data-story-traveler`, a trail exposes
  `data-story-trail`, and the checkpoint exposes `data-story-checkpoint`. Run the
  focused test and confirm it fails because the files do not exist.
- [ ] Create `MascotTravelerProps` with journey transition state and `story`.
  Render:

  - one fixed shell that remains mounted with `data-story-guide`,
    `data-story-traveler`, and `data-active-beat`;
  - one Next Image layer per story beat, resolved through
    `getStoryBeatPresentation()` and marked `data-story-pose={id}`;
  - every pose in the same registration box with a shared bottom-center body
    anchor, never six independently sized wrappers;
  - one persistent bubble shell containing chapter label, dialogue, and bridge
    copy rather than six separate bubble shells;
  - a dotted SVG journey trail whose completed segment is driven by the same
    normalized journey progress;
  - `aria-hidden` on inactive pose layers and on every decorative image;
  - no button, input, `aria-live`, event handler, or direct GSAP import.

- [ ] Use `cn()` for conditional classes and export `MascotTravelerProps`. Set
  `sizes` for a maximum desktop render width instead
  of shipping each PNG at full display size.
- [ ] Create `StoryCheckpointProps` with one `StoryBeatContent`. It renders a
  semantic `<aside>` containing the matching image, label, and dialogue. Keep it
  hidden at desktop through CSS and visible in flow below 64rem.
- [ ] Add the minimum styles needed to make the static components readable.
  Reuse `--duo-*`, `--space-*`, and easing variables; introduce only scoped
  `--story-guide-size` and `--story-bubble-width` custom properties. Do not add
  new hardcoded color values.
- [ ] Verify with JavaScript disabled that the mobile checkpoint copy remains in
  the document and desktop portfolio content is not covered by a permanent
  opaque panel.
- [ ] Run `pnpm test`, `npm run lint`, and `npx tsc --noEmit`.

## Task 5 — Replace independent mascot ownership in the page

Files: `components/organisms/editorial-portfolio.tsx`,
`components/molecules/mascot-scroll-motion.tsx`.

- [ ] Red: extend the source contract test to assert
  `EditorialPortfolio` includes `data-story-beat="top"` through
  `data-story-beat="contact"` exactly once and renders `ScrollStoryRuntime` once.
  Confirm the new assertions fail.
- [ ] Add `data-story-beat` to the six semantic sections. Keep existing section
  IDs because navigation and hash links depend on them.
- [ ] Render a `StoryCheckpoint` in each section at a location that precedes the
  main chapter content on mobile. For intro, place it after the hero copy; for
  other sections, place it after the chapter label/heading.
- [ ] Render one `ScrollStoryRuntime` beside the existing progress rail and pass
  `content.story`.
- [ ] Remove section-level `data-mascot`/`data-story-scene` ownership and inline
  desktop mascot duplicates only after the runtime renders the equivalent six
  poses. Keep the mobile checkpoints.
- [ ] Remove the import/render of `MascotScrollMotion`, then delete
  `components/molecules/mascot-scroll-motion.tsx` once `rg
  'MascotScrollMotion|data-story-scene|data-mascot='` shows no remaining owner.
- [ ] Preserve the brand-mark mascot because it is navigation identity, not a
  story guide instance.
- [ ] Run focused tests, lint, and typecheck.

## Task 6 — Implement one GSAP runtime for guide and progress

Files: `tests/storytelling.test.ts`,
`components/organisms/scroll-story-runtime.tsx`, `app/globals.css`.

- [ ] Red: add pure tests for a helper `getStoryBeatIndex(id)` in
  `lib/storytelling.ts`: all six IDs return their ordered index and unknown input
  is rejected by a separate `isStoryBeatId(value: unknown)` guard. Run and
  confirm failure before implementation.
- [ ] Red: add pure tests for `interpolateStoryWaypoint(from, to, progress)` and
  `getStoryTransitionState(localProgress)`. Assert exact start/end waypoints,
  clamping below 0 and above 1, midpoint interpolation, a hold window through
  the first 62% of a section, a travel window from 62–92%, and a pose-blend
  window contained inside travel. Run and confirm the missing helpers fail.
- [ ] Green: implement all helpers without DOM access. Interpolation must be a
  pure function of scroll progress, making forward, reverse, hash-seek, and
  resize behavior identical. Run the focused tests.
- [ ] Implement `ScrollStoryRuntime` as the only client owner of journey state:
  `currentBeat`, `nextBeat`, `localProgress`, `journeyProgress`, and direction.
  Initial state is `top`; after mount, inspect the six anchors against the
  viewport focus line and calculate the current interpolated state before the
  first painted animation frame.
- [ ] Load GSAP only with `loadGSAP()`. Inside one `gsap.context`, create one
  ScrollTrigger per beat with `onEnter` and `onEnterBack` calling the same
  update function. It must:

  1. derive current/next beats from section order and scroll direction;
  2. derive travel and pose-blend values from local progress;
  3. interpolate `xVw`, `yVh`, scale, and rotation between adjacent waypoints;
  4. update the one traveler shell using transform setters, never remount it;
  5. cross-fade only current and next registered pose layers;
  6. swap dialogue inside the persistent bubble shell at the blend midpoint;
  7. update story-trail completion, rail links, and
     `aria-current="location"` from the same journey state.

- [ ] Use ScrollTrigger `onUpdate` for seek-safe interpolation. Do not create six
  independent entrance tweens and do not trigger an arbitrary side-to-side
  tween in `onEnter`. Add low-amplitude parallax to the interpolated transform,
  never to a competing child animation. Use `invalidateOnRefresh: true`; do not
  animate top/left/width/height.
- [ ] On resize, call `ScrollTrigger.refresh()` through the existing GSAP
  lifecycle. Revert the GSAP context and kill no global triggers during cleanup.
- [ ] If `prefers-reduced-motion` matches, skip loading GSAP entirely, determine
  the initial beat once, and render the static state.
- [ ] Move progress-rail activation out of the deleted motion component. Keep
  anchor navigation native/Lenis-compatible and keep link labels accessible.
- [ ] Test `/vi#work`, browser back/forward hashes, rapid scrolling, resize, and
  React Strict Mode. Reverse direction slowly through every blend window. The
  traveler must retrace the same path, keep its ground anchor stable, and never
  flash, teleport, duplicate, or produce console warnings.
- [ ] Run `pnpm test`, `npm run lint`, and `npx tsc --noEmit`.

## Task 7 — Complete desktop, tablet, mobile, and reduced-motion styling

File: `app/globals.css`.

- [ ] Consolidate the current appended `duo-*` overrides so each story selector
  has one authoritative rule where practical. Remove superseded rules for
  `.duo-about__story`, `.duo-work__story`, `.duo-experience__story`, and mascot
  keyframes that no longer have DOM owners.
- [ ] Establish explicit layer order using the existing small z-index scale:
  atmosphere behind content, content above atmosphere, guide above non-control
  content, header/skip/interactive floating controls above the guide.
- [ ] Desktop: size the traveler with `clamp()`, constrain the persistent bubble
  to readable line length, and define safe waypoint gutters so the continuous
  curve never covers project links or timeline text at 1024–1440px.
- [ ] Keep every pose layer in one identical registration box. Use
  `object-position: center bottom` and one shared transform origin so cross-fades
  preserve the character's baseline even when props have different silhouettes.
- [ ] Style the dotted story trail as one continuous visual thread. Its active
  stroke reveals through `stroke-dashoffset` from normalized journey progress;
  it must never render as six disconnected decorative lines.
- [ ] Tablet from 801px to 1180px: hide the fixed guide and show in-flow
  checkpoints without horizontal overflow.
- [ ] Mobile below 800px: keep a compact fixed guide at the lower-right, clamp
  dialogue to two lines, remove the trail, and move scroll-to-top left.
- [ ] Reduced motion: remove all story transitions, transforms, keyframes, and
  scroll-behavior animation. Show static checkpoint/guide state with full
  opacity.
- [ ] Add `:focus-visible` styles for story rail links that meet the existing
  visual language. Decorative layers must stay `pointer-events: none`.
- [ ] Run Prettier only on touched files:

  ```bash
  bunx prettier --write app/globals.css \
    components/molecules/mascot-traveler.tsx \
    components/molecules/story-checkpoint.tsx \
    components/organisms/scroll-story-runtime.tsx
  ```

- [ ] Run lint and typecheck after formatting.

## Task 8 — Add progressive Three.js atmosphere

Files: `tests/storytelling.test.ts`, `lib/storytelling.ts`,
`components/organisms/story-atmosphere.tsx`,
`components/three/story-atmosphere-canvas.tsx`, `app/globals.css`.

- [ ] Red: add tests that each story tone resolves to a deterministic atmosphere
  palette and particle budget, with `low <= balanced <= high`. Run and confirm
  the missing helper fails.
- [ ] Green: add `getStoryAtmosphereConfig(tone, tier)` to
  `lib/storytelling.ts`. Return token-friendly color roles and fixed integer
  counts; never call `Math.random()`.
- [ ] Build `StoryAtmosphere` by reusing `usePrefersReducedMotion()` and
  `useSceneDeviceProfile()`. Follow the existing WebGL probe with
  `failIfMajorPerformanceCaveat`, idle/user-interaction request, error boundary,
  CSS fallback, and `React.lazy()` pattern. Do not import Three/R3F/Drei at the
  module top level of this gate.
- [ ] Build the lazy canvas module with:

  - `Canvas frameloop="demand"`;
  - transparent, pointer-free output;
  - conservative DPR derived from the existing performance tier;
  - deterministic low-count geometry/points used only as background accents;
  - one restrained ambient/key light if PBR meshes are used;
  - no postprocessing, remote texture, HDRI, text, controls, or pointer listener;
  - invalidation only when the active beat/tone changes or a short transition is
    running.

- [ ] Render `StoryAtmosphere` from `ScrollStoryRuntime` and pass the same active
  beat used by the guide. A canvas error must leave the CSS fallback and all DOM
  story behavior unchanged.
- [ ] Confirm reduced motion, Save-Data, constrained-device profile, mobile, and
  forced WebGL failure never request the lazy canvas chunk.
- [ ] Run tests, lint, typecheck, and a production build:

  ```bash
  pnpm test
  npm run lint
  npx tsc --noEmit
  pnpm build
  ```

## Task 9 — Accessibility and interaction audit

Files: all touched story components and `app/globals.css`.

- [ ] Keyboard through skip link, navigation, locale link, resume, progress rail,
  project links, contact CTA, social links, and scroll-to-top. The mascot and
  canvas must add no tab stops.
- [ ] Inspect the accessibility tree: only the active desktop bubble is exposed;
  inactive bubbles and decorative images are hidden; no `aria-live` region fires
  during scroll; the progress link alone owns `aria-current`.
- [ ] Verify visible focus at 200% zoom and no control is hidden by the guide.
- [ ] Verify touch scroll remains native on iOS-sized viewport; no canvas or
  guide uses `preventDefault`, captures pointer events, or sets a blocking
  `touch-action`.
- [ ] Verify the full content and mobile checkpoints remain comprehensible with
  JavaScript disabled and with CSS animation disabled.
- [ ] Fix every issue in the smallest owning component, then rerun lint and
  typecheck.

## Task 10 — Visual and performance verification

- [ ] Capture after screenshots matching Task 1 and compare at:

  - 1440×900: `/en`, `/vi`, `/zh-TW` at all six beats;
  - 1024×768: experience and skills overlap checks;
  - 768×1024 and 390×844: compact companion, pose changes, and collision-free
    scroll-to-top;
  - 320×568: horizontal overflow and contact CTA;
  - reduced motion: intro, work, contact;
  - `/vi#work`: correct initial guide/rail state.

- [ ] Create an equal-scale six-pose QA contact sheet and verify the character
  bible line by line: face ratio, eyes, sprout, headset/mic, markings, paws,
  tail, lime material, camera, light direction, optical scale, and baseline.
  Any identity drift blocks completion even if metadata tests pass.
- [ ] Record a slow scroll from intro through contact and scrub it forward and
  backward. Inspect every boundary frame: the traveler must stay registered,
  follow the visible trail, blend only adjacent poses, keep one bubble shell,
  and carry the dialogue bridge into the next chapter.

- [ ] Inspect slow 4× CPU behavior. Scrolling must remain responsive, dialogue
  must not flicker, and the guide must never flash all pose layers.
- [ ] In a production build, inspect loaded resources before and after first
  idle/scroll interaction. Three/Drei/Three chunks must not be route entry JS and
  must not load for reduced-motion or constrained profiles.
- [ ] Confirm no network request is made for the local mascot images beyond the
  currently relevant/nearby optimized images and no remote asset is introduced.
- [ ] Run the complete final gate set exactly:

  ```bash
  pnpm test
  npm run lint -- --fix
  npm run lint
  npx tsc --noEmit
  pnpm build
  git status --short
  ```

  Expected: tests green; lint has 0 errors and 0 warnings; TypeScript has 0
  errors; production build succeeds; status contains only intentional source,
  locale, test, lockfile, asset, spec, and plan changes—no `.env`, `.next`,
  screenshots, or generated build output.

- [ ] Report which viewport/locale/motion combinations were visually verified
  and explicitly disclose anything that could not be verified.

## Task 11 — Final review boundary

- [ ] Compare the final diff against the approved spec line by line.
- [ ] Confirm there is no chat input, audio, remote model, full spatial-scene
  takeover, new runtime dependency, content rewrite, API change, or persistence
  change.
- [ ] Confirm every pre-existing WIP file is either preserved and evolved or
  intentionally superseded by a named replacement in this plan.
- [ ] Do not commit, push, deploy, or open a PR unless the user separately asks.

## Spec Coverage Matrix

| Spec item | Implemented by |
|---|---|
| D1 One canonical character and six coherent poses | Tasks 1A, 2, 4, 10 |
| D2 One persistent traveler and one journey truth | Tasks 5, 6 |
| D3 Six causally connected beats and five numbered chapters | Tasks 1A, 2, 3, 5, 6 |
| D4 Narration bubble is not a chatbot | Tasks 3, 4, 9, 11 |
| D5 Continuous seek-safe trajectory and registered pose blending | Tasks 2, 4, 6, 7, 10 |
| D5a One visible story trail shares journey progress | Tasks 4, 6, 7, 10 |
| D6 Desktop/tablet/mobile/reduced-motion behavior | Tasks 4, 6, 7, 9, 10 |
| D7 Progressive decorative Three.js atmosphere | Tasks 8, 10 |
| D8 Three complete locales and server content flow | Task 3 |
| D9 No new runtime dependency | Tasks 2, 8, 11 |
| D10 Content and interaction remain primary | Tasks 5, 7, 9, 11 |
| Identity markers match across all mascot assets | Tasks 1A, 2, 10 |
| Desktop traveler remains mounted hero through contact | Tasks 4, 5, 6, 7, 10 |
| Traveler never teleports between chapter waypoints | Tasks 2, 6, 7, 10 |
| Ground/body anchor remains registered through pose blends | Tasks 1A, 4, 6, 7, 10 |
| Dialogue forms intro→principle→application→growth→tools→collaboration | Tasks 3, 4, 10 |
| Pose and dialogue cross-fade without popping | Tasks 4, 6, 10 |
| Rail and guide share active chapter | Tasks 5, 6, 10 |
| Direct hash navigation initializes correctly | Tasks 1, 6, 10 |
| Fast scroll keeps last crossed chapter active | Tasks 6, 10 |
| Resize refreshes without duplicate triggers | Tasks 6, 10 |
| Mobile guide never covers content | Tasks 4, 5, 7, 9, 10 |
| Reduced motion skips GSAP scrub and WebGL | Tasks 6, 7, 8, 9, 10 |
| JavaScript/WebGL failure preserves complete content | Tasks 4, 8, 9 |
| Three canvas is lazy, pointer-free, deterministic, demand-rendered | Tasks 8, 10 |
| The persistent bubble exposes only its current dialogue | Tasks 4, 6, 9 |
| No scroll-triggered `aria-live` announcements | Tasks 4, 9 |
| Existing navigation, locale, project, resume, and CTA behavior survives | Tasks 5, 9, 10 |
| Existing WIP is not reset or overwritten blindly | Tasks 1, 5, 11 |
| Behavior tests pass | Tasks 2, 3, 4, 5, 6, 8, 10 |
| Lint: 0 errors, 0 warnings | Tasks 1, 4, 6, 7, 8, 9, 10 |
| TypeScript: 0 errors | Tasks 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 |
| Production build and visual matrix pass | Task 10 |
| API/contracts/tenant/persistence impact: none | Tasks 1, 11 |
