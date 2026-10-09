# DESIGN.md — Ironclad Asset Management

Blackstone's design system, applied to Ironclad's own content and photography.

> **Provenance.** Measured from blackstone.com (Wayback Machine capture of 7 Oct 2026, `design/refs/blackstone-wb-home-*`, including computed type in `blackstone-wb-home-type.json`).

---

## 1. Principles

1. **Black and white only.** Pages are white, and black is used for the header, hero card, product section, marquee, contact band and footer. The only colour comes from photographs, shown at their true colour with no overlay or fade. One amber marks Latius's pending licence.
2. **One serif, one light sans.** Serif headlines in sentence case, never uppercase. Body copy in a light grotesk.
3. **Eyebrow + rule.** Every section opens with a small uppercase label followed by a 48px rule.
4. **No filled buttons.** Every action is a text link with a circled arrow (`.btn`).
5. **Say only what is true.** No invented AUM, returns or client counts. Numbers come from `src/data/*`.

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page |
| black | `#000000` | Header, dark sections, footer, headlines |
| `--card` | `#15161A` | Link card and fields inside dark sections |
| `--text` | `#1A1A1A` | Body |
| `--text-2` | `#555555` | Secondary |
| `--line` | `#D9D9D9` | Hairlines on white |
| `--pending` | `#9A6A1C` | "Licence under application" only |

## 3. Typography

Blackstone uses **Sanomat 300** (serif) for headings and **Guardian Sans 300** for everything else. Both are Commercial Type fonts and need a paid web licence, so the site ships free stand-ins: **Libre Caslon Display** (OFL) and **Public Sans** 300/400/500 (OFL). The stacks list Sanomat and Guardian Sans first, so after licensing you only need to add their `@font-face` rules.

| Role | Font | Size |
|---|---|---|
| `h1` | serif 400 | `clamp(40px, 5vw, 72px)` / 1.1 |
| `h2` | serif 400 | `clamp(34px, 3.9vw, 56px)` / 1.25 |
| `h3` | serif 400 | 24–44px |
| Body | sans 300 | 18px / 1.5, letter-spacing .02em |
| Eyebrow | sans 400 | 14px uppercase, .08em, plus a 48px rule |
| Nav, links | sans 400 | 16–17px |

Geist Mono is used only for registration codes.

## 4. Layout

- Max width `1440px`, side gutter `clamp(20px, 4vw, 56px)`. 12-col grid, `32px` gap.
- Vertical rhythm: sections `clamp(88px, 12vw, 176px)` apart. Inside a section, heading → content gap `clamp(40px, 5vw, 72px)`.
- Header: 88px (64px on mobile), fixed, solid black.
- Breakpoints: 640 / 900 / 1200. Mobile is a first-class layout, not a collapse.

## 5. Surfaces

- Square corners everywhere. The only rounded shapes are the arrow circle and stage chips.
- No shadows, glass or gradients.

## 6. Components

- **Link (`.btn`).** 17px sans text followed by a 38px circle with an arrow. On hover the arrow moves 3px.
- **Eyebrow (`.eyebrow`).** Uppercase label followed by a 48px rule. `.eyebrow-center` stacks the rule above a centred label.
- **Hero.** Full-bleed photo in true colour, with the title on a solid black card at the bottom left.
- **About.** Centred eyebrow and title, copy and link on the left, one large serif figure on the right.
- **Dark split.** Black section with the heading on the left and a `--card` link list on the right (one row per product with a circled arrow).
- **Marquee.** Oversized serif line scrolling across a black band, with the risk line underneath. It stops when reduced motion is set.
- **Contact band.** Black section with the heading on the left and contact details in `--card` fields underlined in white on the right.
- **Footer.** Logo on the left and four columns of links (Products, The Firm, Investor Resources, Get in Touch), then a rule, the copyright and portal links, then the SEBI text.

## 7. Imagery

- Real photography only, stored in the repo under `public/images/photos/` (WebP at 640 / 1280 / 1920 / 2560 / 3840 + `manifest.json`). The site never fetches images at runtime once these exist.
- Sources: `src/data/photo-sources.json` (Unsplash `cdn` ids or Pexels ids; both licences allow commercial use without attribution). Changing that file triggers `.github/workflows/photos.yml`, which downloads at 3840px on GitHub's runners and commits the result.
- Slots: `harbour` (hero; the photo from the live ironcladamc.com), `mumbai`, `sealink` (Flexicap+), `desk` (Ventures), `nyc` (Latius), `centralpark` (interlude).
- Choosing new photos: add candidates to `src/data/photo-candidates.json`; the workflow saves 1280px previews to `design/photo-scout/` for review. Promote the winner into `photo-sources.json`.
- Text never sits directly on a photo. Hero copy sits on a solid black card, with no scrims or gradients.

## 8. Motion

- The hero words rise in once per visit, and the marquee scrolls slowly. Nothing else moves except hover states.
- Everything respects `prefers-reduced-motion`.

## 9. Content and compliance rules

- Registration numbers, SEBI line and investor-awareness text come from `src/data/site.ts` and stay on every page.
- The numbers band may only show facts already in `products.ts` / `team.ts` / `site.ts`.
- Performance claims render only through `PerformanceNote` and only while `SHOW_PERFORMANCE_CLAIMS` is true. Do not add claims anywhere else.

## 10. Accessibility

- Text contrast ≥ 4.5:1 (≥ 3:1 for large type). 2px `--focus` ring, 3px offset, on every interactive element.
- Skip link, landmark roles, `aria-current`, inert background while the mobile drawer is open.
- Targets ≥ 44px on touch. No motion-only meaning.
