# Scroll-storytelling mascot experience

Status: proposed for implementation review

## Purpose

Turn the current editorial portfolio into a continuous scroll story in which the
green mascot acts as a guide, changes pose at meaningful chapter boundaries, and
speaks through a compact UI bubble. The experience should feel continuous and
cinematic without hiding the portfolio content, harming mobile usability, or
making Three.js part of the critical rendering path.

The primary audience is recruiters, engineering leads, and potential clients
who should understand Hiếu's story, work, progression, toolkit, and contact path
in one guided pass.

## Existing context

- The route is a Next.js 16 server page and passes localized message content to
  `EditorialPortfolio`.
- Lenis already owns smooth scrolling and exposes scroll velocity through
  `--scroll-skew`.
- GSAP must be loaded through the existing `loadGSAP()` singleton.
- React Three Fiber, Drei, Three.js, and progressive capability detection are
  already installed.
- The worktree contains an uncommitted `duo-*` redesign, six mascot PNG poses,
  a chapter progress rail, and an initial `MascotScrollMotion` implementation.
  The images share a green-cat idea but currently vary in facial proportions,
  eye treatment, headset shape, lighting, and body scale. They are references,
  not yet a coherent production pose set. Existing files must not be discarded
  or overwritten blindly.
- Portfolio content remains sourced from `messages/{locale}.json`; there is no
  database, API, authorization, tenant, or persistence impact.

## Success criteria

1. Every pose is unmistakably the same character: identical face proportions,
   cyan eyes, leaf sprout, charcoal headset/microphone, lime material, markings,
   lighting direction, camera language, and ground anchor.
2. On desktop, one persistent mascot traveler is visible from the hero through
   contact. Its screen position is interpolated continuously between chapter
   waypoints; it never teleports or remounts at a section boundary.
3. The traveler transitions through six beats: intro, about, work, experience,
   skills, and contact. Pose changes happen inside the same silhouette anchor,
   while dialogue forms one connected narrative arc.
4. A speech bubble shows short, localized copy for the active beat in English,
   Vietnamese, and Traditional Chinese.
5. The chapter progress rail and mascot always agree about the active chapter,
   including after direct hash navigation and viewport resize.
6. On mobile, the mascot becomes an in-flow chapter checkpoint so it never
   obscures project, timeline, navigation, or contact controls.
7. Reduced-motion users receive static poses and dialogue with no scrubbed or
   looping animation. Content remains complete if JavaScript or WebGL fails.
8. A decorative Three.js atmosphere may add depth on capable desktop devices,
   but it loads lazily, has no interaction or semantic content, and is skipped
   for reduced motion, Save-Data, constrained devices, and WebGL failure.
9. `npm run lint` and `npx tsc --noEmit` finish with zero errors and zero
   warnings. Story behavior tests pass.

## Decisions

### D1 — One canonical character, then six coherent poses

The hero programmer mascot is the canonical identity reference. Before motion
work begins, create a short character bible and normalize the six story poses
against it. The existing pose images may guide props and gesture, but no image is
accepted merely because it depicts a green cat.

Invariants across every final pose:

- the same head-to-body ratio, muzzle, ear geometry, paw style, tail stripes,
  leaf sprout, cyan irises, and charcoal headset with boom microphone;
- the same lime material range, rounded 3D rendering, top-left key light,
  three-quarter camera language, and transparent background;
- the same square canvas, optical scale, and foot/baseline anchor so a cross-fade
  reads as a pose change by one character instead of a character replacement.

Final poses live in a dedicated story asset set. Original WIP images remain
untouched as references. GSAP provides spatial movement, pose blending,
parallax, scale, and rotation; a small R3F background supplies optional depth.

### D2 — One persistent traveler and one source of journey truth

Replace independent section mascot animations with one `ScrollStoryRuntime` and
one mounted `MascotTraveler`. The runtime owns `currentBeat`, `nextBeat`, local
section progress, and scroll direction. It creates the ScrollTriggers for the
traveler and progress rail. Section markup only exposes semantic
`data-story-beat` anchors. No section mounts a second desktop mascot.

### D3 — Six narrative beats, five navigation chapters

The intro is a guide beat but not a numbered navigation chapter. The numbered
rail remains about, work, experience, skills, and contact. Every beat has a
stable ID, localized dialogue, coherent pose, trajectory waypoint, visual tone,
and narrative purpose. Structural presentation metadata lives in TypeScript;
human-facing copy lives in the locale JSON files.

The arc is causal rather than episodic:

1. Intro — “Here is what I build.”
2. About — “Here is the principle behind it.”
3. Work — “Here is that principle applied to real problems.”
4. Experience — “Here is how repeated delivery changed my craft.”
5. Skills — “Here are the tools supporting that craft.”
6. Contact — “Here is what we can build next.”

Each dialogue closes with a small semantic bridge into the next beat. The UI
must not read like six unrelated captions.

### D4 — Dialogue behaves like interface copy, not a chatbot

The speech bubble is a guided narration label, not an input, assistant, or fake
chat product. It contains one or two short sentences and a chapter counter. It
does not autoplay audio, accept user text, or imply that the mascot can answer
questions.

The bubble stays in normal accessibility reading order. Beat changes are not
announced through `aria-live`, avoiding repeated screen-reader interruptions
caused by scrolling. Mascot images remain decorative with `alt=""` and
`aria-hidden="true"`.

### D5 — One continuous trajectory, not six entrance animations

- Intro: the traveler rises into the journey with the laptop.
- About: it follows a shallow curve toward the story statement and presents the
  design board.
- Work: it continues along the same curve toward the case studies and reveals
  the roadmap prop.
- Experience: the path climbs with the career timeline and changes to the
  stepping-up pose.
- Skills: the same path settles beside the tool grid and changes to the skills
  presentation pose.
- Contact: the trajectory resolves beside the CTA with the celebration pose.

Each beat defines a normalized waypoint (`x`, `y`, `scale`, `rotation`). Section
scroll progress interpolates from the current waypoint to the next, so the shell
moves every frame along one continuous path. Pose blending occurs only within a
short overlap window and keeps the character's feet/body center registered to
the same anchor. There is never an arbitrary left/right jump.

Transitions use transforms and opacity only, with the repository easings
`(0.32,0.72,0,1)` and `(0.16,1,0.3,1)`. Copy changes use a short deterministic
cross-fade and retain the same bubble shell, chapter counter, and tail direction.

### D5a — A visible journey thread reinforces continuity

A subtle dotted “story trail” links the chapter waypoints. The traveler advances
along this trail; completed segments become more visible while future segments
remain muted. The trail and progress rail use the same active-beat state. It is
decorative, pointer-transparent, hidden when it would add clutter, and removed
for reduced motion.

### D6 — Responsive and reduced-motion behavior

- Desktop (`min-width: 64rem`): fixed traveler following a continuous waypoint
  trajectory with one persistent speech bubble.
- Tablet: smaller fixed guide, shorter travel, hidden text labels in the chapter
  rail when horizontal room is insufficient.
- Mobile: guide is rendered in-flow at each chapter checkpoint; no fixed layer
  covers content. Only the active checkpoint receives a short entrance.
- Reduced motion: no GSAP scrub, loops, floating keyframes, or Three.js layer.
  The first valid static state for each viewport is rendered immediately.

### D7 — Three.js is progressive atmosphere only

The atmosphere is a pointer-transparent, `aria-hidden` fixed canvas behind DOM
content. It uses deterministic low-count geometry/particles, one restrained
light rig, `frameloop="demand"`, conservative DPR, and chapter tone changes.
It follows the existing capability and lazy-loading conventions so Three/Drei
remain off the route's critical entry bundle. A CSS ambient fallback always
exists beneath it.

### D8 — Localization and content flow

All new dialogue and labels are added to `messages/en.json`, `messages/vi.json`,
and `messages/zh-TW.json`. Existing WIP strings currently selected by an
English/Vietnamese ternary are moved into localized content as part of the same
change so Traditional Chinese never silently receives English UI copy.

The server page reads those keys with `getTranslations()` and passes a typed
story model to `EditorialPortfolio`; client components do not call translation
hooks.

### D9 — No new runtime dependency

Use the installed GSAP, Lenis, Next Image, React Three Fiber, Drei, and Three.js
packages. A lightweight test runner may be added as a development-only
dependency because the repository currently has no behavior-test command.

### D10 — Preserve content and interaction priority

The guide and atmosphere are decorative enhancement layers. Project links,
resume download, locale links, navigation, skip link, contact CTA, and native
scroll remain above or outside those layers and keep normal pointer behavior.
The implementation does not rewrite project/experience content or the theme
system.

## Architecture

```text
messages/{locale}.json
        |
        v
app/[locale]/page.tsx  ---- typed editorial + story content
        |
        v
EditorialPortfolio
   |          |                  |
   |          |                  +-- semantic sections/data-story-beat
   |          +-- chapter progress rail
   +-- ScrollStoryRuntime (client)
          |-- active beat + GSAP ScrollTriggers
          |-- MascotTraveler + journey trail (fixed desktop)
          |-- StoryCheckpoint (in-flow mobile)
          +-- StoryAtmosphere gate
                 +-- lazy R3F canvas on capable desktop only
```

The runtime receives serializable beat content from the server. A typed journey
map resolves each beat ID to a normalized mascot asset, trajectory waypoint,
visual tone, and narrative role. ScrollTrigger progress interpolates the single
traveler between adjacent waypoints. The same journey state updates pose,
dialogue, trail completion, rail `aria-current`, and atmosphere tone.

## Behavior

### Initial load and hash navigation

The semantic page renders before the client runtime. After GSAP loads, the
runtime measures chapter anchors, determines the beat intersecting the viewport
focus line, applies it without a transition, creates triggers, and refreshes.
Direct visits such as `/vi#work` therefore initialize to Work rather than briefly
showing Intro. Refresh and resize remeasure without duplicating triggers.

### Chapter activation

A chapter becomes active when its section crosses a stable viewport focus line.
The current chapter remains active until the next chapter crosses that line,
preventing flicker in gaps between sections. Fast scrolling must resolve to the
last crossed chapter deterministically.

### Traveler transitions

The traveler shell, bubble shell, and ground anchor stay mounted for the entire
page. While scrolling between beats, the shell interpolates between adjacent
waypoints. During the central transition window, the outgoing and incoming pose
cross-fade while their registered foot/body anchors remain coincident. Only
those two poses may be visible. Dialogue changes in the same shell after the
pose blend passes its midpoint. The traveler uses `pointer-events: none`; its
bubble has no controls.

The scroll direction may reverse at any point. Interpolation and pose blending
must therefore be derived from current progress and remain seek-safe rather than
depending on one-way entrance callbacks.

### Three.js failure and constraints

Before requesting the canvas, the runtime checks reduced motion, WebGL with
`failIfMajorPerformanceCaveat`, Save-Data, device capability, and viewport.
Failure leaves the CSS fallback visible and has no effect on the guide or page.
The canvas never prevents wheel, touch, or pointer events.

## Contract changes

No external API or network contract changes.

The internal `PortfolioContent` contract gains typed editorial UI and story
content. New story IDs are a closed union shared by the server content builder,
presentation map, runtime, and tests. This is a local compile-time change and is
not a public breaking API.

## Out of scope

- Modeling, rigging, or animating a fully 3D mascot.
- Keeping visually inconsistent pose renders solely to avoid regenerating or
  editing assets.
- Chat input, LLM integration, voice, audio, or conversational persistence.
- Rewriting project case studies, employment data, or contact flows.
- Replacing Lenis, GSAP, Tailwind, or the existing theme system.
- Turning the existing full spatial portfolio scene into the primary UI.
- Admin, API, database, authorization, tenant, and deployment changes.

## Open questions

None required for implementation. The hybrid direction, continuous mascot, and
conversation-like narration UI were approved on 2026-08-10. Implementation
starts only after the accompanying plan is explicitly confirmed.
