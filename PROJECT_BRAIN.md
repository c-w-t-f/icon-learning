# Project Brain — Icon Learning Website Redesign

**What this is:** the running state log for the Icon Learning redesign. Every PR updates this file. New agents read this first to get oriented in under two minutes.

**What this is NOT:** the spec. The spec is [DESIGN.md](DESIGN.md). Don't duplicate spec content here — point at the section.

---

## Status snapshot

- **Phase:** Pre-implementation. Design doc is signed off; no code yet.
- **Last touched:** 2026-05-20.
- **Next action:** Resolve PR-1 blockers (see Blockers below), then start PR 1 per [DESIGN.md §11 Phase 1](DESIGN.md).
- **Working tree:** `DESIGN.md`, `PROJECT_BRAIN.md`, `archive/` (three superseded drafts), `course/documents/` (~180 raw course outline PDFs/DOCs). No Astro project initialised yet.

---

## What's done

_Nothing in code yet._

- **2026-05-20** — Three competing design drafts (Claude, Gemini, Codex) reconciled into a single [DESIGN.md](DESIGN.md). Originals archived under `archive/`.
- **2026-05-20** — `DESIGN.md` extended with: full multi-page IA, ~180-course catalog scope, summary-only course detail pages (§6.4), course content model + ingestion plan (§7.4–7.5), expanded SEO strategy (§9), scroll-spy `CoursesTabbed` pattern (§5.2), homepage anchor-id convention (§6.1).

---

## In flight

_Nothing._

---

## Next up — PR 1: Foundation

Per [DESIGN.md §11 Phase 1](DESIGN.md):

> Tokens, layout shell, `Nav`, `Footer`, primitives (`Button`, `Card`, `SectionHeading`, `TabBar`, `LogoWall`). Sticky-nav backdrop transition. Light footer.

**Pre-flight blockers** (must resolve before PR 1 can start):

- [ ] Confirm tech stack (Open Q #1) — the spec assumes Astro + Tailwind. If the team prefers Next.js or pure HTML/CSS, several primitive contracts change.
- [ ] Confirm logo (Open Q #2) — wordmark "Icon Learning" placeholder OK, or is there an SVG?

The remaining open questions (#3 onwards) can be resolved during their respective phases.

---

## Blockers / open questions

Full list lives in [DESIGN.md §13](DESIGN.md). Status snapshot here:

| # | Question | Blocks | Status |
|---|---|---|---|
| 1 | Tech stack confirmation | PR 1 | **OPEN** |
| 2 | Logo SVG | PR 1 (wordmark placeholder acceptable) | OPEN |
| 3 | Bento assets (≥ 8 strong photos) | PR 3 | OPEN |
| 4 | Course images per category | PR 4 | OPEN |
| 5 | HRD claimable per-course list | PR 9, PR 13 | OPEN |
| 6 | Primary inquiry destination (WhatsApp / email / form) | PR 2, PR 16 | OPEN |
| 7 | Testimonials approved for public use | PR 6 | OPEN |
| 8 | Verified stats beyond "since 2011" | PR 6 | OPEN |
| 9 | Domain / deploy target | PR 18 | OPEN |
| 10 | Legacy URL redirects | PR 18 | OPEN |
| 11 | Accessibility page language (EN / BM / both) | PR 17 | OPEN |
| 12 | Canonical course outlines (PDF vs DOC dupes) | PR 9 | OPEN |
| 13 | HRD claimable status per course (overlaps #5) | PR 9 | OPEN |
| 14 | Bahasa Malaysia URL strategy | PR 9, PR 12 | OPEN |
| 15 | Itinerary documents — published as separate download? | PR 9 | OPEN |
| 16 | Course images per individual course | PR 12 | OPEN |
| 17 | Full-outline delivery on inquiry — auto-attach vs manual | PR 16 | OPEN |

---

## Conventions

**Don't duplicate the spec.** When in doubt, link to a `DESIGN.md` section, don't paste.

**Branch model**

- One branch per PR: `pr-{number}-{kebab-slug}`. Example: `pr-3-bento-masonry-parallax`.
- Branch off `main`. Squash-merge on land.

**Commit format**

- Imperative subject ≤ 60 chars. Wrap body at 72.
- Reference PR number in subject: `[PR 3] add bento masonry parallax island`.

**PR template** (paste into description):

```
## Scope
Brief one-paragraph summary. Link to DESIGN.md section.

## DESIGN.md sections touched
- §X.Y …

## Open questions resolved
- #N — …

## Open questions surfaced
- New ones, if any

## Reviewer checklist
- [ ] Matches DESIGN.md spec
- [ ] No regressions in acceptance criteria (§12)
- [ ] PROJECT_BRAIN.md updated (status, decisions, gotchas)
```

**File layout** — see [DESIGN.md §5](DESIGN.md). Don't move things without updating the spec.

**Style rules** (these come up often — internalise them)

- Light theme only. No dark mode this pass.
- Headlines render in a single colour. **No gradient text. No two-tone splits. No inline accent words.**
- Primary CTAs are black (`filled-ink`), not purple. Purple is a sparse accent.
- No glassmorphism beyond the translucent nav.
- No fabricated stats (no trainee counts, satisfaction scores, etc. unless Icon Learning confirms).
- Code comments only explain WHY. Default to no comments.
- Validate only at system boundaries (user input, external APIs). Don't add fallbacks for impossible states.

**Course content**

- Course detail pages are **summary-only** (§6.4). Never reproduce the full PDF outline on the page.
- HRD claimable badge surfaces **only** on courses Icon Learning has explicitly confirmed.
- Course slugs are kebab-case with duration suffix when variants exist (`teambuilding-for-high-performance-2d` vs `…-3d`). Don't append language suffixes; the `language` field handles BM/EN.

---

## Decisions log

Chronological. Newest at the top. Each entry: what, why, when.

### 2026-05-20 — Anchor IDs for homepage sections

Added stable `id` attributes to all nine homepage sections (`#hero`, `#proof`, `#categories`, `#services`, `#approach`, `#outcomes`, `#testimonials`, `#contact-cta`). Each `CoursesTabbed` block also carries `#category-{slug}`. Reason: future marketing campaigns and transactional emails need predictable deep links. Nav behavior unchanged — `Programs` still routes to `/programs`, doesn't anchor-scroll, to keep the nav predictable. ([DESIGN.md §6.1](DESIGN.md))

### 2026-05-20 — `CoursesTabbed` converted to scroll-spy

Replaced the click-driven horizontal-tab pattern with Framer-style scroll-spy (sticky vertical labels on the left, scroll-linked active state, tall content blocks on the right). Reason: matches the Framer reference more faithfully, gives the section editorial weight, and surfaces all 6 category previews in-page instead of hiding 5 behind clicks. Cost: section is ~5–6 viewports tall on desktop. Fallback noted in spec: narrow to 4 marquee categories before reducing block heights. ([DESIGN.md §5.2](DESIGN.md))

### 2026-05-20 — Course detail pages are summary-only

Course detail pages publish a punchy 7-section summary (`Why this matters`, `Built for`, `What you'll walk away with`, `Inside the workshop` module titles only, `How it runs` methodology mix, closer CTA). Full outline lives in the source PDF, delivered as the inquiry reply attachment. Reason: trades long-tail SEO depth for stronger lead-gen and lighter ingestion effort (~10 fields per course instead of ~50). Mitigated SEO loss with topic keywords in `walkAwayWith` outcomes + course meta descriptions (§9.3). ([DESIGN.md §6.4](DESIGN.md))

### 2026-05-20 — Expanded SEO strategy

§9 grew from 3 lines to 9 subsections covering metadata templates, structured data (`Organization`, `LocalBusiness`, `Course`, `BreadcrumbList`, `ItemList`, `FAQPage`), HRD-claimable as a primary search anchor, local + language signals (`en-MY`, hreflang for BM courses), sitemap segmentation, image SEO, and verification. ([DESIGN.md §9](DESIGN.md))

### 2026-05-20 — Course catalog ingestion plan

~180 unique courses live in `course/documents/` as PDFs (canonical) + DOC/DOCX (drafts). Plan: curation pass identifies canonical files, LLM-assisted rewrite produces summary-only JSON in `src/content/courses/`, Icon Learning reviews every entry before publish, JSON becomes authoritative after first import. ([DESIGN.md §7.5](DESIGN.md))

### 2026-05-20 — Light theme locked in

No dark mode this pass. Decision driven by alignment between Claude's and Codex's drafts; Gemini's dark-mode proposal explicitly rejected. ([DESIGN.md §4.1](DESIGN.md))

### 2026-05-20 — Codex IA + Claude implementation = consolidated spec

DESIGN.md adopts Codex's full multi-page IA (home, programs, category, course, about, clients, contact, accessibility) and Claude's component contracts + PR sequencing. Gemini draft superseded. ([DESIGN.md intro](DESIGN.md))

---

## Gotchas

Things that have already bitten us once or are obvious traps:

- **The course catalog in `course/documents/` has ~180 unique courses but ~360 files** because most courses exist as both `.pdf` and `.docx` (sometimes `.doc` too). PDFs are canonical. Don't process every file blindly — the dedup pass is part of PR 9.
- **Filename collisions on whitespace.** `Teambuilding For High Performance 3days.doc` and `Teambuilding For High Performance 3days .doc` (trailing space) are the same course. But `…2days` and `…3days` are *different courses* and need distinct slugs.
- **Three courses Claude's original draft listed — "Work Smarter Prompt Better", "Human Firewall", "Regex Decoded" — are real Icon Learning courses** in the catalog (under category 7: Microsoft, AI & Digital Skills). They are not placeholders. Earlier reconciliation mistakenly dismissed them.
- **HRD Corp claimable status is not safe to assume.** Source PDFs mark "HRD Corp Claimable Course" on the title page when applicable; absence ≠ confirmed-not-claimable. Flag, don't guess.
- **Bahasa Malaysia courses exist as both English-equivalent variants and standalone** (e.g. *Kursus Pengendalian Makanan*, *Sertu Workshop* have no English version). URL strategy still open (Q #14).
- **`relatedSlugs` on courses is best populated during the bulk review pass (PR 13)**, not at extraction time. Auto-suggestion by category is OK as a starting point.

---

## Key files & locations

| Path | What | Editable? |
|---|---|---|
| `DESIGN.md` | The spec. Source of truth for everything. | Yes — update when scope/architecture changes |
| `PROJECT_BRAIN.md` | This file. Running state log. | Yes — update every PR |
| `archive/` | Three superseded design drafts (Claude / Codex / Gemini). | **No** — historical reference only. Don't read these as authoritative |
| `course/documents/*.pdf` | ~180 canonical course outlines, raw. | **No** — these are the source. Edit the extracted JSON instead (post-PR 9) |
| `course/documents/*.docx`, `*.doc` | Earlier drafts of the same outlines. | **No** — ignore in favour of PDFs |
| `src/content/courses/*.json` _(future)_ | Extracted course summaries. Becomes authoritative after PR 9. | Yes |
| `src/content/*.ts` _(future)_ | Site copy, nav, contact, clients, testimonials. | Yes |

---

## Commands

_None yet — Astro project not initialised. PR 1 will add:_

- `pnpm install` _(or `npm`, depending on PR-1 choice)_
- `pnpm dev` — local dev server
- `pnpm build` — production build
- `pnpm test` — test suite (TBD what gets used)
- `pnpm lighthouse` — Lighthouse CI check against §10 budgets

This table gets filled in by PR 1.

---

## Hand-off checklist (run at the end of every PR)

Before merging, update this file:

1. [ ] Move the PR from `In flight` to `What's done` with a one-line summary.
2. [ ] Update `Status snapshot` (last touched, next action).
3. [ ] Update `Next up` to the next PR per the plan.
4. [ ] Add an entry to `Decisions log` for any non-obvious choices made.
5. [ ] Add to `Gotchas` if you learned something that will bite the next agent.
6. [ ] Resolve any Open Questions you closed in this PR (mark closed in the table; add the resolution to `Decisions log`).
7. [ ] Surface any new Open Questions you discovered.

If you're partway through a PR and need to stop, update `In flight` with where you got to. The next agent picks up from there.
