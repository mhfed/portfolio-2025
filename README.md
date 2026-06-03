# Modern Tech Portfolio

A premium, modern developer portfolio built with a focus on visual aesthetics, smooth animations, and high performance. The application is completely static (SSG) and loads project/experience data from local JSON structures.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mhfeds-projects/v0-portfolio-with-darkmode)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/l31dAXJPFu7)

---

## Key Features

- **100% Static & Fast (SSG)**: Replaced external database queries with local JSON data storage, ensuring sub-second load times and zero dependency on live databases.
- **Dynamic Accent Themes Switcher**: Interactive customizer allowing visitors to toggle between Slate & Teal, Cobalt, Emerald, Coral, Violet, and Amber themes. Full dark and light mode compatibility.
- **Aurora Glow & Glassmorphism UI**: Harmonious color palettes using backdrop-filters, custom glowing ambiance spots, and clean card-based layouts.
- **Snappier Scroll Animations**: Optimally tuned CSS reveal transitions and scaled-down stagger delays for sections so the portfolio feels responsive and alive.
- **Interactive Timeline Accordion**: Refactored work experience section using inline collapsible content, minimizing interaction cost for recruiters.
- **Full Localization (i18n)**: Multi-language support for English (EN), Vietnamese (VI), and Traditional Chinese (ZH-TW) via `next-intl`.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 (incorporating `@tailwindcss/postcss` and CSS `@theme` declarations)
- **Animations**: Motion (formerly Framer Motion) + GSAP (GreenSock Animation Platform)
- **Scrolling**: Lenis (Smooth Scrolling)
- **Localization**: next-intl

---

## Project Structure & Data

All projects and experiences are loaded statically from the `data/` directory:

- [data/projects.json](file:///Users/hieuminh/Documents/code/portfolio-2025/data/projects.json): Lists your showcased builds including titles, localized descriptions, images, tags, and URLs.
- [data/experiences.json](file:///Users/hieuminh/Documents/code/portfolio-2025/data/experiences.json): Lists your work experience history with positions, company names, periods, descriptions, and core skills.

To update your portfolio projects or experiences, simply edit these JSON files directly and push to deployment.

---

## Local Development

Ensure you have [Bun](https://bun.sh/) installed locally.

### 1. Install dependencies

```bash
bun install
```

### 2. Run the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production

To compile and verify the optimized static output:

```bash
bun run build
```
