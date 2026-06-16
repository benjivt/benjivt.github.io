# Portfolio QA Issue Log

Single source of truth for defects found during the exhaustive QA pass.

**Last updated:** P3 backlog closed (2026-06-11)

## Severity rubric

| Level | Definition | Fix deadline |
|-------|------------|--------------|
| **P0** | Broken core flow, crash, inaccessible CTA, deploy blocker | Before any release |
| **P1** | Major UX bug, wrong content, layout break on common viewport | Before release |
| **P2** | Polish, minor layout, inconsistent motion, non-critical a11y | Same sprint |
| **P3** | Nice-to-have, cosmetic micro-nits | Backlog or wontfix |

## Issue table

| ID | Severity | Area | Summary | Repro | Expected | Actual | File(s) | Status |
|----|----------|------|---------|-------|----------|--------|---------|--------|
| QA-001 | P2 | Dead code | `ProjectCard.jsx` is never imported; projects section uses `ProjectOrbit` via `ProjectGrid` | Grep repo for `ProjectCard` imports | Component used or removed | Only self-references in `ProjectCard.jsx` | `src/components/ProjectCard.jsx`, `src/components/ProjectGrid.jsx` | **verified** — deleted unused `ProjectCard.jsx`; orbit renders 6 slots, no console errors (Phase 9) |
| QA-002 | P2 | Dead code | Entire `interactions/*` chain (`ProjectCardInteraction`, `Tilt3D`, `SpotlightCard`, `FlipCard`, `PreviewCard`) unreachable from live UI | Grep `from.*interactions/` | Used by rendered tree or deleted | Only `ProjectCard.jsx` imports `ProjectCardInteraction`; `FlipCard` and `PreviewCard` have zero imports | `src/components/interactions/*` | **verified** — deleted `interactions/` directory; smoke e2e clean (Phase 9) |
| QA-003 | P3 | CSS drift | Orphan `.timeline-*` rules (~100 lines) remain after `ExperienceTimeline` removal | Search components for `timeline-` class usage | CSS matches DOM or removed | About uses `about-history-*`; no component references `.timeline-*` | `src/styles/global.css` | **fixed** — removed all orphan `.timeline-*` rules; shared selectors trimmed to active classes |
| QA-004 | P3 | CSS drift | Orphan `.project-grid` / `.project-grid-item` rules unused | Inspect `ProjectGrid.jsx` classNames | Grid styles used or removed | `ProjectGrid` renders `ProjectOrbit` only; no `project-grid` class in JSX | `src/styles/global.css`, `src/components/ProjectGrid.jsx` | **fixed** — removed `.project-grid` rules during dead-code cleanup |
| QA-005 | P2 | Routing | Catch-all route renders `Home` without normalizing pathname to `/` | Cold-load `/random-path` | URL redirects to `/` or navbar tracks sections | `path="*"` renders `Home`; URL stays `/random-path`; navbar `isActive` requires `pathname === '/'` | `src/App.jsx`, `src/components/Navbar.jsx` | **verified** — `/xyz` → `/`; `/xyz#projects` → `/#projects`; Home nav `aria-current` on cold redirect (Phase 9) |
| QA-006 | P2 | A11y | No skip-to-main link | Tab from page load on Home | Skip link jumps to `<main>` | No skip link in `index.html` or `App.jsx` | `index.html`, `src/App.jsx` | **verified** — skip link visible on focus; `#main` in viewport after activation (Phase 9) |
| QA-007 | P2 | Motion | `useMapParallaxScroll` ignores `prefers-reduced-motion` | Enable reduced motion; scroll experience map | Parallax CSS vars static or hook disabled | Hook always sets `--map-scroll-x/y` on scroll; no media-query guard | `src/hooks/useMapParallaxScroll.js`, `src/components/ExperienceMap.jsx` | **verified** — emulated `prefers-reduced-motion: reduce`; `--map-scroll-x/y` stay 0 after pan (Phase 9) |
| QA-008 | P3 | Data layer | `hobbiesContent` lacks runtime validation against `hobbyImages` | Add typo to `imageKey` in hobbies data | Build/runtime throws like interests validator | No validator; broken key yields `undefined` image at runtime | `src/data/hobbiesContent.js`, `src/data/hobbiesAssets.js` | **fixed** — `validateHobbyAssets()` throws on missing `imageKey` at import |
| QA-009 | P3 | CI | No lint or unit-test gate before deploy | Inspect `package.json` scripts and `.github/workflows/deploy.yml` | Lint + test + build in CI | Only `npm run build` runs; no `lint` or `test` scripts | `package.json`, `.github/workflows/deploy.yml` | **verified** — CI runs `npm run test`, `npm run build`, and `npm run test:e2e` (11 Playwright tests, Phase 9) |
| QA-010 | P3 | Bundle | `ProjectDetail` chunk emitted while `ENABLE_PROJECT_DETAILS=false` | `npm run build`; inspect `dist/assets/ProjectDetail-*.js` | Detail route code tree-shaken or minimal | ~11 KB `ProjectDetail` chunk present in dist | `src/App.jsx`, `src/config/features.js`, `dist/` | **fixed** — lazy import gated behind `ENABLE_PROJECT_DETAILS`; chunk omitted when flag false |
| QA-011 | P3 | Content | Resume PDFs in repo but no portfolio link | Search site nav/footer for resume href | Resume downloadable from Contact or nav | PDFs under `info/resumes/`; no `src/` reference | `info/resumes/`, `src/components/Footer.jsx` | **fixed** — Resume download link added to footer (`Resume 2026.pdf`) |
| QA-012 | P3 | Data layer | External URL HTTP validation not run in Phase 1 | Crawl hrefs in `src/data/*` and footer links | All return 200 or documented exception | Network crawl deferred to Phase 4 cross-cutting gate | `src/data/interestsContent.js`, `src/components/Footer.jsx` | **verified** — 9/10 URLs return 200; LinkedIn returns 999 (bot wall, expected for automated HEAD) |
| QA-013 | P2 | Content | VT National Security Institute uses Hume Center logo in About timeline and company assets | Open About → “Led my first research team” entry | VT NSI–specific logo or explicit label | `leadership-chapter` and `companyAssets['virginia-tech-national-security-institute']` both use `hume logo` | `src/data/aboutTimelineAssets.js`, `src/data/companyAssets.js` | **verified** — thumb src `info/about/vt-logo.webp` (not Hume logo); alt “Virginia Tech National Security Institute logo” (Phase 9) |
| QA-014 | P3 | Docs | QA plan cites 10 hobby cards; app ships 11 | Count `hobbiesContent` entries | Plan matches implementation | 11 hobbies in `hobbiesContent.js` | `src/data/hobbiesContent.js`, QA plan | **fixed** — `CHECKLIST.md` hobby deck count updated to 11 |
| QA-015 | P3 | Hooks | `useSessionIntro` writes `portfolio-intro-seen` before typewriter finishes | Load Home; refresh mid-intro | Intro replays if animation incomplete | `sessionStorage` set on first mount regardless of animation completion | `src/hooks/useSessionIntro.js`, `src/components/Hero.jsx` | **fixed** — `markIntroSeen()` called after entrance animation completes; no early write |
| QA-016 | P3 | Performance | Large main bundle; no CI bundle budget | `npm run build` → `index-*.js` ~291 KB / 95 KB gzip | Documented budget or split | CI fails if main chunk exceeds 320 KB raw or 100 KB gzip (deploy workflow) | `dist/assets/index-*.js`, `.github/workflows/deploy.yml` | **fixed** — bundle budget step added after build (320 KB raw / 100 KB gzip) |
| QA-017 | P3 | A11y | Route loading fallback renders temporary `<h1>` before Hero mounts | Throttle network; load Home | Single page `<h1>` at steady state | `RouteLoadingFallback` in `App.jsx` uses `<h1>`; Hero also has `<h1>` after load | `src/App.jsx`, `src/components/Hero.jsx` | **fixed** — loading fallback uses `<p class="section-title">` instead of `<h1>` |
| QA-018 | P2 | A11y / Contact | Footer contact links below 44×44px touch-target minimum on mobile | 390px viewport → scroll to `#contact` → measure link bounding boxes | Each link ≥44px tall per WCAG 2.5.5 | All 5 links measure ~42.3px height (width OK) | `src/components/Footer.jsx`, `src/styles/global.css` | **verified** — all 5 `.footer-link-item` measure 44px height at 390px (Phase 9) |
| QA-019 | P3 | Navigation | Navbar and section-dot `aria-current` lag behind hash during smooth scroll | Desktop 1280px → click navbar item (e.g. About) → inspect within 0ms | Active indicator matches destination immediately | Hash updates instantly; `is-active` / dot current updates after ~0.5–1.5s smooth scroll completes | `src/components/Navbar.jsx`, `src/components/SectionNavigator.jsx`, `src/utils/scrollToSection.js` | **fixed** — `publishActiveSection()` called optimistically in `scrollToSection`; Home uses shared hook |
| QA-020 | P2 | A11y | Section navigator dot hit area ~13×13px on desktop | 1280px → scroll past hero → measure `.section-dot-button` | ≥44×44px touch/click target (WCAG 2.5.5) | Button `0.82rem` (~13px); label tooltip is hover-only | `src/styles/global.css` (`.section-dot-button`), `src/components/SectionNavigator.jsx` | **fixed** — compact `0.82rem` layout box restored; `::before` pseudo-element decouples 44×44px hit area from pill chrome (visible `.section-dot` unchanged) |
| QA-021 | P2 | Motion | Footer social links invisible during stagger on Contact entry | Navbar → Contact → inspect `.footer-link-item` opacity within 1s | All five links readable once section in view | Opacities `[0.42, 0, 0, 0, 0]` at ~800ms; all reach `1.0` after ~3.5s | `src/components/Footer.jsx`, `src/utils/motionPresets.js` (`revealViewport` `once: false`) | **verified** — footer stagger transform-only; all links opacity 1 on Contact entry (Phase 9) |
| QA-022 | P2 | visual, responsive | Mobile contact footer: only 3 of 5 links visible in viewport at 390×844 | Navigate to `/#contact` at 390px; no extra scroll | All five footer links readable without in-section scroll | Stacked full-width links push Instagram and Beli below fold when `scrollBlock: 'end'` aligns panel bottom | `src/components/Footer.jsx`, `src/styles/global.css`, `src/data/sections.js` | **fixed** — 2-col mobile grid + `align-content: end`; **verified** via `contact.spec.js` (Phase 9) |
| QA-023 | P2 | visual, responsive | Mobile project orbit: titles and categories clip on overlapping cards | Open `/#projects` at 390px | Card labels fully readable on front-most tile | Titles truncate mid-word (e.g. “Attribute tion”, “…er Vision”); heavy overlap with large empty area below orbit | `src/components/ProjectOrbit.jsx`, `src/styles/global.css` | **fixed** — smaller orbit/cards, 2-line title clamp; **verified** via `projects-orbit.spec.js` (Phase 9) |
| QA-024 | P2 | visual | Experience map: bottom path node clipped by container at default pan | Open `/#experience` at 1280px without dragging | All nodes and labels visible inside map frame | ACI / 2026 node and path segment cut off by bottom rounded edge | `src/components/ExperienceMap.jsx`, `src/components/experience/ExperienceMapTerrain.jsx` | **fixed** — layout nudge, surface padding, default pan; **verified** via `experience-map.spec.js` (Phase 9) |
| QA-025 | P3 | visual, responsive | Mobile projects: prior-section content bleeds into projects viewport | Scroll from about into projects at 390px | Projects section starts cleanly below nav | About “Starting at Microsoft” timeline node visible above “Selected work.” heading | `src/styles/global.css` | **fixed** — mobile `#about` overflow clip + extra padding; `#projects` isolation |
| QA-026 | P3 | visual, motion | About timeline briefly low-contrast on mobile scroll-in | Scroll to `/#about` at 390px; screenshot at ~400ms | Timeline readable once section settled | `reveal-section` + per-item `whileInView` leave entries very faint for ~1–2s; readable after animation (`about-390-pass-settled.png`) | `src/components/About.jsx`, `src/styles/global.css` | **fixed** — skip section child fade on `.about-history`; higher initial motion opacity (0.78) |

## Dedicated visual QA pass (2026-06-11)

Screenshots at **1280×800** and **390×844** saved under `docs/qa/screenshots/baseline/`. Playwright used for reliable capture; Cursor browser MCP used for initial inspection (tab shared with parallel QA agent).

| Section | Desktop 1280 | Mobile 390 | Notes |
|---------|--------------|------------|-------|
| **Hero** | pass | pass | Centered layout, glass nav, ticker; no horizontal overflow on mobile |
| **About** | pass | pass | Timeline readable after scroll-in settles (~2.5s); brief fade on entry — QA-026 |
| **Projects (Orbit)** | pass | pass | Desktop orbit + expanded pin OK; mobile title clipping fixed — QA-023; section bleed — QA-025 |
| **Experience (Map)** | pass | pass | Mobile popup clamp OK; desktop bottom node visible at default pan — QA-024 |
| **Interests** | pass | pass | Link grid stable; hobby deck stack + pin-expand OK |
| **Contact (Footer)** | pass | pass | Desktop all 5 links + stagger OK; mobile all 5 links in viewport — QA-022 |

### Known regression areas (visual)

| Area | 1280 | 390 | Notes |
|------|------|-----|-------|
| Orbit edge / z-fight | pass | pass | Partial top clip when ~35% off-screen expected; no tearing |
| Orbit expanded panel | pass | — | Opaque panel; tags readable |
| Interests link-card flicker | pass | pass | Stable opacity in captures |
| Hobby deck fan / expand | pass | — | Pin-expand verified; fan hover not automated |
| Map popup clamp | pass | pass | Microsoft 2026 popup inside viewport on mobile |
| Footer stagger reveal | pass | pass | Desktop scroll-in shows all links |

**Screenshots:** see `docs/qa/screenshots/README.md` for full inventory.

## Phases 2–5 manual QA — section pass/fail (2026-06-11)

Tested on `http://127.0.0.1:5173/` via Chrome (Cursor browser MCP). Viewports: **1280×800** desktop, **390×844** mobile.

| Section | Desktop 1280 | Mobile 390 | Notes |
|---------|--------------|--------------|-------|
| **Hero** | pass | pass | Typewriter, ticker, CTAs, headshot, no horizontal overflow on mobile |
| **About** | pass | pass | Timeline expand/collapse, `aria-expanded`; active section tracks after scroll settles |
| **Projects (Orbit)** | pass | pass | 6 cards, pin/expand, edge scroll resets pin, no filter/z-fight glitch |
| **Experience (Map)** | pass | pass | Nodes open/close, Escape dismisses popup, section nav hidden (opacity 0) |
| **Interests** | pass | pass | 6 link cards stable opacity (no flicker); hobby pin, z-index, adjacent click OK |
| **Contact (Footer)** | pass | pass | Links/hrefs/reveal OK; touch targets ≥44px (QA-018 fixed) |
| **Global chrome** | pass | pass | Navbar 3×2 grid on mobile; dots track; `ScrollAtmosphere` present |

### Known regression areas (explicit)

| Area | Result |
|------|--------|
| Orbit edge glitch / z-fight / hover-off | **pass** — no filter glitch; pin resets on partial scroll off-screen |
| Interests link-card flicker | **pass** — opacity stable at partial visibility |
| Hobby fan / z-index / adjacent clicks | **pass** — fan hover not automated; pin, z-index, adjacent click verified |
| Footer stagger vs hover transforms | **pass** — stagger reveal present; no transform conflict observed |
| Section nav on short sections (About, Contact) | **pass** — Contact active at bottom; About active when section centered |

### Phase 3 navigation flows

| ID | Result | Notes |
|----|--------|-------|
| N1 Cold `/#projects` | pass | Fresh tab lands on projects with header offset |
| N2 Cold `/#contact` | pass | Footer fully visible (`scrollBlock: end`) |
| N3 Cold `/#experience` | pass | Experience in view; section navigator hidden |
| N4 Navbar clicks | pass | All sections reachable; hash updates; active state immediate (QA-019 fixed) |
| N5 Section dots | pass | Dot click scrolls and updates `aria-current` |
| N6 Manual scroll tracking | pass | Navbar + dots track within 1 section after scroll settles |
| N7 Fast scroll to bottom | pass | Contact active at page bottom |
| N8 Resize 1280→390 mid-page | pass | No console errors; active section updates |
| R1 `/project/foo` flag off | pass | Redirects to `/#projects` |
| R4 `/xyz` catch-all | pass | Redirects to `/` (QA-005 fixed) |

### Phase 4 cross-cutting (quick)

| Gate | Result |
|------|--------|
| Console errors (full scroll desktop + mobile) | **pass** — 0 errors captured |
| Skip link | **pass** — skip link in App shell (QA-006 fixed) |
| Landmarks (`header`, `main`, `footer`) | **pass** |
| Focus visible (`:focus-visible` on nav) | **pass** — styles in `global.css`; programmatic `.focus()` does not trigger `:focus-visible` (expected) |
| External links `rel=noreferrer` | **pass** — except `mailto:` (expected) |
| Mobile touch targets (footer) | **pass** — min-height 44px (QA-018 fixed) |

### Phase 5 responsive / browser matrix

| Viewport | Smoke (load → scroll → interact) | Console |
|----------|-----------------------------------|---------|
| Chrome 1280 | pass all sections | clean |
| Chrome 390 (mobile) | pass; contact touch targets pass | clean |

**Screenshots:** `docs/qa/screenshots/hero-390-pass.png`, `docs/qa/screenshots/failures/contact-390-touch-targets-fail.png`

### Re-verification pass (browser MCP, localhost:5173)

Independent subagent pass confirmed prior results; added **QA-020** (desktop dot size) and **QA-021** (footer stagger opacity). Vitest **20/20** pass locally; Playwright e2e blocked locally (chromium not installed) but CI gate present (QA-009 fixed). Console: **0 errors**, **0 warnings** on full-page scroll (desktop 1280×900, mobile 390×844). Section dots `display: none` on mobile (by design — not a defect).

## Phase 1 audit — passed checks

These items were verified statically and did **not** produce issues:

- **Section registry:** 6 unique ids; `homeSectionComponents` keys cover all `componentKey` values; every section component accepts `sectionId` and sets matching `id`.
- **Scroll spine:** `getSectionConfig('contact').scrollBlock === 'end'`; others `'start'`. `scrollToSection` returns `false` when DOM node missing; header height read at scroll time (not cached). `publishActiveSection('')` on Home unmount. Section navigator hidden when `activeSection === 'experience'`.
- **Data cross-reference:** `experience.js` ↔ `experienceContent.js` ↔ `companyAssets.js` ↔ `experienceMapLayout.js` (8 stops, validated at import). `projectSummaries` ↔ `projectSummaryContent` ↔ `projectAssets` ↔ `projectDetailContent` (6 slugs, bidirectional validation). `aboutTimeline` project slugs resolve via `aboutTimelineProjects`. `interestsAssets` validates against `interestsContent`. All 16 `techSkills` logos exist under `public/tech-logos/`. `mailto:benji@vt.edu` format valid.
- **Feature flag:** `ENABLE_PROJECT_DETAILS=false` — `/project/:slug` redirects to `/#projects`; orbit and About project links hidden or point to `/#projects`.
- **Hooks inventory:** All 7 hooks have intended consumers; no orphan hook files.
- **Build & deploy:** `npm run build` succeeds (0 errors). `dist/` contains `404.html`, `og-preview.jpg` (1200×630), `favicon.png`, `social-logos/`, `tech-logos/`. Deploy workflow uses Node 20 and `./dist` artifact.

## Phase 9 re-verification (2026-06-11)

Browser MCP on `http://127.0.0.1:5173` (1280×800 desktop, 390×844 mobile spot-checks) plus Playwright e2e on preview (`4173`).

### Phase 8 P2 fix re-check

| ID | Result | Verification method |
|----|--------|---------------------|
| QA-005 | **pass** | Cold `/xyz` → `/`; `/xyz#projects` → `/#projects` with Projects nav current |
| QA-006 | **pass** | Skip link visible on focus; activates to `#main` in viewport |
| QA-007 | **pass** | Emulated `prefers-reduced-motion: reduce`; map pan leaves `--map-scroll-x/y` at 0 |
| QA-013 | **pass** | “Led my first research team” thumb src = `info/about/vt-logo.webp` |
| QA-018 | **pass** | All 5 footer links ≥44px tall at 390px (`accessibility.spec.js`) |
| QA-020 | **pass** | Section dot 44px `::before` hit area; compact pill layout restored |
| QA-021 | **pass** | Footer links opacity 1 on Contact entry; transform-only stagger (code review) |
| QA-022 | **pass** | `contact.spec.js`: all 5 links in viewport at 390×844 |
| QA-023 | **pass** | `projects-orbit.spec.js`: front-most card title readable at 390px |
| QA-024 | **pass** | `experience-map.spec.js`: bottom node visible at 1280px without drag |
| QA-001/002 | **pass** | 6 orbit slots render; smoke e2e 0 console errors |

### Regression spot-check

| Area | Result |
|------|--------|
| Orbit edge / z-fight | **pass** — 6 slots, no console errors |
| Interests flicker | **pass** — stable in section screenshots |
| Hobby deck | **pass** — deck renders in interests captures |
| Footer stagger | **pass** — links visible in contact screenshots |
| Section nav | **pass** — dots track; hidden in experience |

### Automated gate (Phase 10 partial)

| Command | Result |
|---------|--------|
| `npm run build` | **pass** |
| `npm run test` | **pass** — 20/20 unit |
| `npm run test:e2e` | **pass** — 11/11 Playwright (chromium, workers=1) |

**New e2e files:** `tests/e2e/accessibility.spec.js` (QA-006, QA-018), `tests/e2e/routing.spec.js` (QA-005). Also `contact.spec.js`, `projects-orbit.spec.js`, `experience-map.spec.js` (QA-022–024).

**Visual QA screenshots:** 12 files at `docs/qa/screenshots/{section}-{1280|390}-pass.png` (hero, about, projects, experience, interests, contact × 2 viewports). Baseline copies remain in `docs/qa/screenshots/baseline/`.

**New issues logged this pass:** none (QA-020+ were logged/fixed in prior visual QA pass).

## Counts by severity

| Severity | Count (open) |
|----------|-------|
| P0 | 0 |
| P1 | 0 |
| P2 | 0 |
| P3 | 0 |
| **Total open** | **0** |
| Fixed (Phases 1–9 + P3 backlog) | QA-001, QA-002, QA-003, QA-004, QA-005, QA-006, QA-007, QA-008, QA-009, QA-010, QA-011, QA-012, QA-013, QA-014, QA-015, QA-016, QA-017, QA-018, QA-019, QA-020, QA-021, QA-022, QA-023, QA-024, QA-025, QA-026 |
| New (visual QA pass) | QA-025, QA-026 |
