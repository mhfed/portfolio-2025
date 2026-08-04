# Portfolio 2026: Editorial Product Craft

## Design read

A senior frontend engineer portfolio for design-aware recruiters and product
teams. The visual language is editorial and spacious, with product-cinematic
project storytelling and restrained interface motion.

## Design dials

- Design variance: 6/10. Asymmetric composition without novelty layouts.
- Motion intensity: 5/10. Motion reveals hierarchy, progress, and feedback.
- Visual density: 3/10. Typography and whitespace lead.

## Principles

1. Typography is the primary visual material.
2. Product screenshots are evidence, not decoration.
3. One cool-neutral theme family and one cobalt accent span the full page.
4. Controls are pill-shaped; media frames use one soft 24px radius.
5. Sections earn their layout. No repeated card grids or ornamental UI.
6. Every animated property is transform or opacity and respects reduced motion.

## Type system

- Family: Geist Sans for display and body, Geist Mono for metadata.
- Hero: fluid 56-132px, tight tracking, two lines at desktop.
- Section display: fluid 48-88px.
- Body: 16-20px with a 65-character reading width.
- Metadata: 11-13px, restrained tracking, never used as decoration.

## Color system

Light mode:

- Canvas: cool off-white.
- Ink: softened near-black.
- Surface: cool silver-gray.
- Muted text: neutral graphite.
- Accent: restrained cobalt.

Dark mode mirrors the same hierarchy with charcoal surfaces and a lighter
cobalt. Sections never invert independently.

## Page architecture

1. Compact sticky navigation with work, about, experience, skills, contact,
   locale controls, and theme control.
2. Editorial hero with identity, a two-line value proposition, concise copy,
   two actions, and one real workspace photograph.
3. Proof section combining a large positioning statement with verified career
   outcomes from the portfolio content.
4. Selected work as an Apple-style sticky project sequence. Each project pairs
   a real screenshot with role, year, stack, outcome, and destination.
5. Experience as a chronological reading column beside a sticky career thesis.
6. Capabilities as four open typographic groups, without card containers.
7. Contact as a large, direct closing statement and an oversized email link.

## Motion contract

- Hero load: a short fade and vertical mask sequence to establish hierarchy.
- Section reveal: opacity, 20px translation, and subtle blur used once per block.
- Project stack: the outgoing project scales to 0.96 and softens as the next
  project arrives, communicating progress through the case studies.
- Hover feedback: underlines, image scale up to 1.02, and arrow translation.
- Smooth scrolling: Lenis with a moderate duration and no native scroll
  listeners.
- Reduced motion: all scroll choreography becomes static document flow.

## Responsive contract

- Under 768px, every asymmetric grid becomes one column.
- Hero actions stay visible before the first scroll on common mobile heights.
- Project cards lose sticky behavior and become a direct vertical sequence.
- Navigation collapses to a full-width menu with keyboard-safe controls.
- Touch targets are at least 44px and all primary actions stay on one line.

## Explicit exclusions

No WebGL, 3D scene, glassmorphism, neon, floating blobs, custom cursor,
decorative marquee, fake UI, gradient headlines, scroll prompts, or ornamental
status indicators.
