# Portfolio Manual QA Checklist

Repeatable script for Phases 2–5. Record pass/fail per cell; log failures as rows in [`ISSUES.md`](./ISSUES.md). Attach screenshots to `screenshots/failures/` using `{section}-{viewport}-{pass|fail}.png`.

**Matrix dimensions:** viewport × interaction state × input modality

| Viewports | 390, 430, 768, 900, 1024, 1280, 1440 |
| Input | Mouse, keyboard-only, touch (simulated) |
| Motion | Default, `prefers-reduced-motion: reduce` |
| Theme | Dark only (single theme today) |

---

## Phase 2 — Section-by-section exhaustive QA

### 2.1 Hero (`#hero`)

**Load & intro**

- [ ] First visit: typewriter runs after session intro gate
- [ ] Second tab/same session: intro skipped per `useSessionIntro`
- [ ] New session / cleared sessionStorage: intro replays
- [ ] Reduced motion: static suffix or immediate full phrase; no infinite loops
- [ ] Typewriter: no layout shift (widest phrase reserve); cursor blink if present
- [ ] Tech ticker visible after intro; logos load; marquee/track animates (or static if reduced motion)
- [ ] Headshot image loads; alt/decorative handling correct

**Scroll & parallax**

- [ ] Headshot and copy parallax on scroll down hero
- [ ] No compositor tearing at hero bottom edge
- [ ] Hero CTAs remain clickable while parallax active

**CTAs**

- [ ] "View projects" → `#projects` with correct scroll offset
- [ ] "Explore experience" → `#experience` with correct scroll offset
- [ ] CTA focus visible; Enter activates

**Navbar interaction**

- [ ] Before scroll past hero: header state default
- [ ] After scroll: `site-header.is-scrolled` styling applies

**Negative / edge**

- [ ] Rapid scroll through hero doesn't break typewriter state
- [ ] Resize during typewriter doesn't overflow hero shell
- [ ] Hero at 320px min width (if supported): no horizontal scroll on body

### 2.2 About (`#about`)

**Timeline list**

- [ ] All timeline entries render thumb + meta
- [ ] Click/tap entry: expands detail; previous collapses (single open)
- [ ] Click same entry: collapses
- [ ] Keyboard: Tab to thumb button; Enter/Space toggles
- [ ] `aria-expanded` reflects state

**Detail panel**

- [ ] Title, date, body, quote render per entry
- [ ] Scene image(s) load; grid layout for multi-image entries
- [ ] Project link (if any) respects `ENABLE_PROJECT_DETAILS`
- [ ] Close/collapse: focus returns sensibly

**Scroll-linked behavior**

- [ ] Spine/progress indicator (if any) syncs with scroll
- [ ] Parallax on history items doesn't clip detail popup
- [ ] Partial viewport visibility: no flicker (reveal + Framer not fighting)

**Content**

- [ ] Timeline order chronological; dates match Experience section
- [ ] No lorem or placeholder text

### 2.3 Projects (`#projects`)

**Orbit motion**

- [ ] Continuous rotation via CSS `--orbit-offset` (verify in DevTools: no per-frame React state)
- [ ] Cards upright (not rotating with ellipse tangent)
- [ ] Dynamic z-index: front of orbit above back (no pop-through)
- [ ] Resize: `ResizeObserver` updates `--orbit-rx-fit` / `--orbit-ry-fit`
- [ ] Reduced motion: static angles; no rAF loop

**Hover**

- [ ] Hover card: rotation slows 4×
- [ ] Leave card (not entering another card): speed restores
- [ ] Move hover directly card A → card B: slow state preserved, no reset flicker

**Click / pin**

- [ ] Click card: expands details in place; `aria-expanded` true
- [ ] Click same card: collapses
- [ ] Click orbit background (not on card): resets pin + hover
- [ ] Click outside orbit: resets
- [ ] Scroll section mostly off-screen (IntersectionObserver): resets
- [ ] Pinned: non-pinned cards dim (opacity, not filter glitch)
- [ ] Expanded panel: opaque background; summary/tags scroll if long
- [ ] No "View project" link when `ENABLE_PROJECT_DETAILS` false

**Hit testing**

- [ ] Click topmost visible card only (not hidden orbit slot)
- [ ] All 6 projects reachable by waiting for orbit or clicking when front

**Viewport edge (regression)**

- [ ] Scroll projects halfway off screen: no tile tearing, z-fight, or stuck scale
- [ ] Expanded pin at viewport edge: shadow/corners not clipped harshly

**Content**

- [ ] 6 projects; thumbnails load; accents applied
- [ ] Stack tags unique meaningful (no duplicate MTCNN-style issues)

### 2.4 Experience (`#experience`)

**Map render**

- [ ] Terrain, path, nodes render on first in-view
- [ ] Path draw animation; staggered node reveal
- [ ] Origin node + every experience stop present
- [ ] Company logos load on nodes

**Interaction — desktop**

- [ ] Drag to pan map; cursor/grab states
- [ ] Click node: opens detail popup; path segment flash
- [ ] Click same node: closes
- [ ] Click map backdrop: closes; focus returns to last node
- [ ] Escape: closes popup
- [ ] Drag then release on node: doesn't open (drag discrimination)
- [ ] Intro auto-pan once per session (`experience-map-intro-panned`)

**Interaction — mobile (≤900px)**

- [ ] Serpentine layout from `experienceMapLayout.js`
- [ ] Popup `clampPopupPosition.js`: stays in viewport when near edges
- [ ] Touch drag pan works; touch tap opens node

**Detail popup**

- [ ] Role, company, date range, location, summary, quote
- [ ] Quote component renders without overflow
- [ ] Scroll within popup if content tall

**Chrome conflicts**

- [ ] Section navigator hidden in experience
- [ ] Map not clipped by `app-shell overflow:hidden` unusably

**Reduced motion**

- [ ] Path draw / intro pan skipped or instant

### 2.5 Interests (`#interests`)

**Interest link grid**

- [ ] 6 cards in 2-col desktop / 1-col mobile
- [ ] Scroll-in: stable at partial visibility (opacity-only, no scale stuck)
- [ ] Hover: lift + thumb scale + CTA nudge
- [ ] Each link opens correct URL in new tab (`rel=noreferrer`)
- [ ] Glass + solid base: no backdrop tear at viewport edge

**Hobby deck**

- [ ] 11 cards in stacked deck layout
- [ ] Horizontal scroll on narrow view when deck wider than viewport
- [ ] Hover card: focusIndex set; neighbors fan ±5.25rem; distant cards nudge progressively
- [ ] Left cards higher z-index than right (when not active)
- [ ] Active/pinned card on top; adjacent cards boosted z-index when focused
- [ ] Click pin: expand body downward; label hides; blurb visible
- [ ] Click outside deck / background: reset
- [ ] Leave section viewport: reset
- [ ] Move hover card → card: doesn't collapse fan mid-transition
- [ ] Keyboard: Enter/Space on card toggles expand
- [ ] Can click card immediately adjacent to pinned card

**Negative**

- [ ] No fan on all cards (only neighbors + distant nudge, not full spread)
- [ ] Expanded card not clipped by `hobby-deck-scroll` overflow

### 2.6 Contact (`#contact`)

- [ ] Panel scroll-in: heading fades up first (~180ms gap)
- [ ] Links cascade 60ms stagger (GitHub → Beli order)
- [ ] Re-scroll to contact: animation behavior acceptable (`revealViewport once: false`)
- [ ] Reduced motion: instant visible
- [ ] Each link: correct href, icon, label/aria-label
- [ ] Hover: group stagger + translateY doesn't fight Framer transform
- [ ] `scrollBlock: 'end'`: Contact nav lands with full panel readable
- [ ] Beli custom logo image loads

### 2.7 Global chrome (test on every page scroll)

**ScrollAtmosphere**

- [ ] Orbs visible; parallax on scroll (desktop)
- [ ] Reduced motion: static orbs, no motion.div drift

**Navbar**

- [ ] All 6 nav buttons present
- [ ] Active state matches scroll section on `/`
- [ ] From non-home route: navigate to `/#section`
- [ ] Mobile: nav grid layout (3×2 at ≤680px); all tappable

**SectionNavigator**

- [ ] Appears after leaving hero
- [ ] Hidden in experience section
- [ ] Dot hover: label visible to left (not clipped)
- [ ] `layoutId` active dot animates between sections
- [ ] Portal to body: correct stacking vs footer/map

---

## Phase 3 — Navigation & routing

### 3.1 Hash & scroll flows

| # | Steps | Expected | Pass |
|---|--------|----------|------|
| N1 | Cold load `/#projects` | Lands on projects with header offset | [ ] |
| N2 | Cold load `/#contact` | Footer fully visible (end block) | [ ] |
| N3 | Cold load `/#experience` | Experience in view; navigator hidden | [ ] |
| N4 | Click each navbar item from top | Smooth scroll; hash updates | [ ] |
| N5 | Click each dot | Same | [ ] |
| N6 | Scroll manually through all sections | Navbar + dot track within 1 section accuracy | [ ] |
| N7 | Fast scroll to bottom | Contact active | [ ] |
| N8 | Resize 1280→390 at mid-page | Active section updates; no JS errors | [ ] |

### 3.2 Cross-route flows

| # | Steps | Expected | Pass |
|---|--------|----------|------|
| R1 | `/project/foo` with flag off | Redirect to `/#projects` | [ ] |
| R2 | Flag on: detail → Back | Returns with scroll restore | [ ] |
| R3 | About timeline project link | Correct destination per flag | [ ] |
| R4 | Unknown path `/xyz` | Home renders | [ ] |
| R5 | Browser Back after hash nav | Sensible scroll (document behavior) | [ ] |

### 3.3 GitHub Pages SPA

| # | Steps | Expected | Pass |
|---|--------|----------|------|
| G1 | Production cold `/project/slug` | 404.html → sessionStorage → correct route | [ ] |
| G2 | Production `/#interests` | Direct hash works | [ ] |
| G3 | Refresh on hash URL | Stays on section | [ ] |

---

## Phase 4 — Cross-cutting quality gates

### 4.1 Accessibility (WCAG-oriented)

- [ ] **Keyboard complete path**: Tab from first nav → all sections → all primary interactives → footer without trap
- [ ] **Focus visible** on every interactive (nav, dots, timeline, orbit, map nodes, hobbies, footer)
- [ ] **Skip link** (if absent → log P2: add skip-to-main)
- [ ] **Landmarks**: `header`, `main`, `footer`; experience map `aside` navigator
- [ ] **Headings**: one `h1`; no skipped levels in expanded panels
- [ ] **Live regions**: route loading polite; no excessive announcements
- [ ] **Contrast**: eyebrow, `--text-secondary`, inactive nav on glass (4.5:1 body text where applicable)
- [ ] **Motion**: all loops respect reduced motion (orbit, typewriter, ticker, map intro, footer re-reveal)
- [ ] **Touch targets**: min 44×44px on mobile nav dots and hobby cards
- [ ] Run axe or Lighthouse a11y on Home full scroll

### 4.2 Performance

- [ ] Lighthouse mobile/desktop: Performance, Accessibility, Best Practices, SEO each documented
- [ ] Targets: Performance ≥ 85 mobile / ≥ 90 desktop (adjust if documented)
- [ ] CLS < 0.1 (typewriter width reserve, orbit, images with dimensions)
- [ ] LCP element identified (headshot or hero copy); preload if needed
- [ ] No memory leak: 5 min scroll up/down — DevTools heap stable
- [ ] Network waterfall: no blocking 404s; font display swap
- [ ] Image audit: WebP where possible; lazy below fold

### 4.3 SEO & social

- [ ] Title + meta description unique and accurate
- [ ] OG + Twitter tags complete; image 1200×630 loads on production
- [ ] Canonical behavior on Pages (base `/`)
- [ ] Structured data (optional P3: Person schema)

### 4.4 Security & privacy

- [ ] External links: `rel=noreferrer` where `target=_blank`
- [ ] No secrets in repo
- [ ] mailto only — no exposed personal data beyond intended
- [ ] No mixed content warnings

### 4.5 Content & professional polish

- [ ] Spelling/grammar pass all visible copy
- [ ] Consistent em dash, apostrophe, VT/Microsoft/Hume naming
- [ ] Dates: graduation May 2025/2026, Microsoft 2026, etc. aligned across About/Experience/Hero
- [ ] No "coming soon" or placeholder
- [ ] Tone consistent: professional, first-person, concise
- [ ] Resume PDF link (if intended — log gap if missing)

### 4.6 Visual system consistency

- [ ] Glass tier-1/2/3 used consistently (nav, cards, footer)
- [ ] Border radii, pill buttons, eyebrow style match across sections
- [ ] Purple accent usage consistent on active/hover states
- [ ] Spacing: section padding, heading gaps uniform
- [ ] No emoji unless intentional
- [ ] Dark background orbs don't reduce text readability

---

## Phase 5 — Responsive & browser matrix

### Viewports × sections minimum smoke

Every cell: load → scroll to section → one primary interaction → console clean.

|  | Hero | About | Projects | Experience | Interests | Contact |
|--|------|-------|----------|------------|-----------|---------|
| 390 | [x] | [x] | [x] | [x] | [x] | [x] |
| 768 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 900 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 1280 | [x] | [x] | [x] | [x] | [x] | [x] |

_Visual QA 2026-06-11: Phase 9 re-verification pass — QA-022/023/024 fixed; 390 Projects + Contact pass._

### Browsers

| Browser | Version | Priority tests | Pass |
|---------|---------|----------------|------|
| Chrome | latest | Full matrix | [ ] |
| Safari macOS | latest | Orbit sin/cos, backdrop-filter, scroll-snap | [ ] |
| Safari iOS | latest | Touch deck, map pan, fixed nav | [ ] |
| Firefox | latest | Grid, motion, portal navigator | [ ] |
| Edge | latest | Smoke | [ ] |

### System settings

- [ ] `prefers-reduced-motion: reduce` — full page once
- [ ] 200% browser zoom — no broken layouts
- [ ] Slow 3G throttling — acceptable first paint + lazy routes

---

## Known regression areas (must pass)

From recent work — explicit regression checks:

- [x] Project orbit: tile glitch at viewport edge, z-fighting, hover-off speed, click hit targets, opaque expanded panels — **pass** (1280 edge + expanded captures)
- [x] Interests link cards: `whileInView` flicker when partially on screen — **pass**
- [x] Hobby deck: fan (neighbors + distant nudge), left z-priority, adjacent clickability, overflow clip — **pass** (pin-expand verified; fan hover not automated)
- [x] Footer: stagger reveal without fighting CSS hover transforms — **pass** (desktop)
- [ ] Section navigator: active dot on short sections (Contact, About); labels visible on hover — not re-tested this pass
