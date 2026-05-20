# Project Brain - Icon Learning Website Redesign

**What this is:** the running state log for the Icon Learning redesign. Every PR updates this file. New agents read this first to get oriented in under two minutes.

**What this is NOT:** the spec. The spec is [DESIGN.md](DESIGN.md). Do not duplicate spec content here; point at the section.

---

## Status Snapshot

- **Phase:** PR 1 foundation implemented; ready for review.
- **Last touched:** 2026-05-20.
- **Next action:** Review PR 1, then start PR 2 (`Hero` + `CtaCloser`) per [DESIGN.md Section 11 Phase 2](DESIGN.md).
- **Working tree:** Astro project scaffold exists with Tailwind, tokens, layout shell, nav/footer, primitives, and a temporary homepage smoke page.

---

## What's Done

- **2026-05-20** - PR 1 foundation added: Astro config, package scripts, Tailwind/PostCSS setup, design tokens, global styles, `BaseLayout`, `Nav`, `Footer`, primitives (`Button`, `Card`, `SectionHeading`, `TabBar`, `LogoWall`), favicon, and temporary smoke homepage.
- **2026-05-20** - Asset library folders added under `assets/` for source originals and web-ready exports.
- **2026-05-20** - Three competing design drafts (Claude, Gemini, Codex) reconciled into a single [DESIGN.md](DESIGN.md). Originals archived under `archive/`.
- **2026-05-20** - `DESIGN.md` extended with full multi-page IA, course catalog scope, summary-only course detail pages, course content model, SEO strategy, scroll-spy `CoursesTabbed`, and homepage anchor IDs.

---

## In Flight

_Nothing._

---

## Next Up - PR 2: Hero + CTA Closer

Per [DESIGN.md Section 11 Phase 2](DESIGN.md):

> `Hero` + `CtaCloser`. Confirms typography/colour on real surfaces.

PR 2 should replace the temporary homepage smoke content with the first real homepage sections while reusing the PR 1 layout and primitives.

---

## Blockers / Open Questions

Full list lives in [DESIGN.md Section 13](DESIGN.md). Status snapshot here:

| # | Question | Blocks | Status |
|---|---|---|---|
| 1 | Tech stack confirmation | PR 1 | CLOSED - Astro + Tailwind selected for PR 1 |
| 2 | Logo SVG | PR 1 | PARTIAL - text/IL wordmark placeholder used until real logo lands in `assets/source/brand/logo/` |
| 3 | Bento assets, at least 8 strong photos | PR 3 | OPEN |
| 4 | Course images per category | PR 4 | OPEN |
| 5 | HRD claimable per-course list | PR 9, PR 13 | OPEN |
| 6 | Primary inquiry destination: WhatsApp, email, or form | PR 2, PR 16 | OPEN |
| 7 | Testimonials approved for public use | PR 6 | OPEN |
| 8 | Verified stats beyond "since 2011" | PR 6 | OPEN |
| 9 | Domain / deploy target | PR 18 | OPEN |
| 10 | Legacy URL redirects | PR 18 | OPEN |
| 11 | Accessibility page language: EN, BM, or both | PR 17 | OPEN |
| 12 | Canonical course outlines: PDF vs DOC dupes | PR 9 | OPEN |
| 13 | HRD claimable status per course | PR 9 | OPEN |
| 14 | Bahasa Malaysia URL strategy | PR 9, PR 12 | OPEN |
| 15 | Itinerary documents: published download or internal only | PR 9 | OPEN |
| 16 | Course images per individual course | PR 12 | OPEN |
| 17 | Full-outline delivery on inquiry: auto-attach vs manual | PR 16 | OPEN |

---

## Decisions Log

### 2026-05-20 - Astro + Tailwind selected

PR 1 proceeds with Astro and Tailwind, matching [DESIGN.md Section 3](DESIGN.md). Tailwind is wired through PostCSS instead of `@tailwindcss/vite` because the current Tailwind v4 Vite plugin failed production build in this Windows/Node 25 environment.

### 2026-05-20 - Placeholder wordmark used

The nav/footer use an `IL` mark plus `Icon Learning` text until a confirmed logo asset is added under `assets/source/brand/logo/`.

### 2026-05-20 - Static-first foundation

PR 1 keeps all components static Astro except the tiny nav IntersectionObserver script for the sentinel-based sticky backdrop transition. No framework islands are introduced yet.

### 2026-05-20 - Prior design decisions

The consolidated spec remains authoritative for: light theme only, scroll-spy `CoursesTabbed`, summary-only course detail pages, expanded SEO strategy, course catalog ingestion plan, and homepage anchor IDs.

---

## Gotchas

- `npm run build` passes with Astro check and static build.
- Production dependency audit is clean via `npm audit --omit=dev --audit-level=moderate`.
- Full `npm audit` still reports moderate advisories in dev-only `@astrojs/check` / language-server dependencies. Keep watching for an upstream fix.
- `npm run dev` currently fails in this sandboxed Windows environment with a Vite/esbuild dependency-optimization access error (`Cannot read directory "../../..": Access is denied`). The production build is unaffected.
- The in-app Browser plugin is installed, but this session did not expose its required Node REPL tool, so visual browser automation could not be completed here.
- The course catalog in `course/documents/` has many duplicate source formats. PDFs remain canonical for PR 9.
- HRD Corp claimable status is not safe to assume. Flag, do not guess.

---

## Key Files & Locations

| Path | What | Editable? |
|---|---|---|
| `DESIGN.md` | The spec and source of truth. | Yes - update when scope/architecture changes |
| `PROJECT_BRAIN.md` | Running state log. | Yes - update every PR |
| `assets/` | Source and web-ready asset library. | Yes |
| `src/layouts/BaseLayout.astro` | Global HTML shell and metadata. | Yes |
| `src/components/layout/` | `Nav` and `Footer`. | Yes |
| `src/components/primitives/` | Shared PR 1 primitives. | Yes |
| `src/styles/tokens.css` | Design tokens. | Yes |
| `src/styles/global.css` | Tailwind entry and global styles. | Yes |
| `src/content/` | Site/navigation content. | Yes |
| `course/documents/*.pdf` | Canonical raw course outlines. | No - source material only |

---

## Commands

- `npm install` - install dependencies.
- `npm run dev` - Astro dev server. Currently blocked in this sandbox by the Vite/esbuild access issue noted above.
- `npm run build` - Astro check + production build.
- `npm run preview` - Astro preview server for the built site.
- `npm audit --omit=dev --audit-level=moderate` - production dependency audit.

---

## Hand-Off Checklist

Before merging each PR:

1. Move the PR from `In Flight` to `What's Done` with a one-line summary.
2. Update `Status Snapshot`.
3. Update `Next Up`.
4. Add decisions for non-obvious choices.
5. Add gotchas if something will bite the next pass.
6. Resolve any closed open questions.
7. Surface new open questions.
