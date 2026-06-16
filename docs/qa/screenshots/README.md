# QA Screenshots

Baseline and failure captures for manual QA runs (Phases 2–5, Phase 9 visual pass).

## Naming convention

```
{section}-{viewport}-{pass|fail}.png
```

Examples:

- `hero-1280-pass.png`
- `projects-390-fail.png`
- `contact-768-pass.png`

## Phase 9 inventory (2026-06-11)

Primary pass captures at `docs/qa/screenshots/`:

| File | Section | Viewport |
|------|---------|----------|
| `hero-1280-pass.png` | Hero | 1280×800 |
| `hero-390-pass.png` | Hero | 390×844 |
| `about-1280-pass.png` | About | 1280×800 |
| `about-390-pass.png` | About | 390×844 |
| `projects-1280-pass.png` | Projects | 1280×800 |
| `projects-390-pass.png` | Projects | 390×844 |
| `experience-1280-pass.png` | Experience | 1280×800 |
| `experience-390-pass.png` | Experience | 390×844 |
| `interests-1280-pass.png` | Interests | 1280×800 |
| `interests-390-pass.png` | Interests | 390×844 |
| `contact-1280-pass.png` | Contact | 1280×800 |
| `contact-390-pass.png` | Contact | 390×844 |

Captured via `node scripts/visual-qa-sections.mjs` against dev server (`5173`).

## Folders

| Path | Purpose |
|------|---------|
| `baseline/` | Reference screenshots after a verified good build (includes orbit edge/expanded variants) |
| `failures/` | Captures attached to open issues in `ISSUES.md` |

### Baseline extras

- `baseline/projects-orbit-edge-1280-pass.png` — orbit partial off-screen regression
- `baseline/projects-orbit-expanded-1280-pass.png` — pinned card expanded state

### Failures

- `failures/contact-390-touch-targets-fail.png` — pre-QA-018 fix (42.3px links); kept for history

## Regenerating

```bash
npm run dev -- --host 127.0.0.1 --port 5173
node scripts/visual-qa-sections.mjs
```

Optional env: `QA_BASE_URL=http://127.0.0.1:5173`
