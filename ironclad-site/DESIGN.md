# DESIGN.md — Ironclad Asset Management

Light-mode design system. Structure from Blackstone (large photography, one huge statement at a time, a numbers band, large image cards). Craft from Polar's brand language (monochrome, tight grotesk, hairlines, pill buttons, soft rounded surfaces, generous air).

> **Provenance, read this.** `polar.sh/brand` and `blackstone.com` could not be opened from the build environment (egress policy). This file is written from knowledge of both design languages, not from a live inspection. If you want pixel-faithful parity with either, paste their brand tokens in and adjust §2–§3; everything downstream reads CSS variables.

---

## 1. Principles

1. **Quiet, then one loud thing.** Each screen has a single focal element: a headline, a number, or an image. Everything else recedes.
2. **Light is the product.** Pale sky, mist, porcelain, paper. No dark sections, no dark mode. Contrast comes from navy ink, not from black backgrounds.
3. **Hairlines, not boxes.** Structure is drawn with 1px rules and whitespace. Cards exist only where they hold imagery or a link.
4. **Imagery is atmospheric, never stocky.** 4K, soft, low-contrast, one warm light source. No people-at-laptops, no handshakes.
5. **Say only what is true.** This is a SEBI-regulated manager. No invented AUM, returns, client counts or logos. Numbers on the page come from `src/data/*`.

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page |
| `--bg-soft` | `#F6F8FA` | Alternate sections, footer (porcelain) |
| `--bg-sunken` | `#EDF1F5` | Tracks, table heads |
| `--ink` | `#07192B` | Headlines, body strong |
| `--navy` | `#052F4E` | Brand. Primary buttons, logo, links on hover |
| `--navy-hover` | `#0B456F` | Primary button hover |
| `--text` | `#2B3E52` | Body (11.4:1 on white) |
| `--text-2` | `#4F6176` | Secondary (6.2:1) |
| `--text-3` | `#6C7B8C` | Meta, large type only (4.2:1) |
| `--line` | `#E2E8EE` | Hairlines |
| `--line-2` | `#CBD5DF` | Hover/strong hairlines, input borders |
| `--gold` | `#C8923A` | Single warm accent: dots, rings, rim light. Never body text |
| `--gold-ink` | `#8A5F14` | The only gold allowed as text (5.4:1) |
| `--focus` | `#1F6FEB` | Focus ring only |

Imagery palette (matches generator): haze `#ECF2F8`, steel `#7894B2`, navy `#052F4E`, warm `#FFD69E`.
Allocation bars: Compounders `--navy`, Special situations `#6F93B6`, Seed `--gold`, Series B `#BFD0E2`.

## 3. Typography

Blackstone-style pairing: a sharp, institutional serif for everything that is a title or a figure; a neutral grotesk for reading and UI. The serif also echoes the Ironclad wordmark.

- **Source Serif 4** (variable, optical sizes 8–60, weights 300–600), self-hosted. Headlines, section titles, the statement, strategy names, numbers. Chosen over softer book serifs, which read as literary rather than financial.
- **Geist** (300–700) for body, navigation, buttons. **Geist Mono** (400–500) for labels and registration numbers.
- Display (`h1`, page titles): Source Serif 4 400, tracking `-0.022em`, leading 1.
- Section titles (`h2`): Source Serif 4 400, tracking `-0.02em`, leading 1.04. Card and row titles: same face, 400.
- Numbers: Source Serif 4 300, tabular, with the separator (`/`, `+`) in `--gold`.
- Body 17/1.65 Geist. Lead 20–22/1.5, `--text-2`. Measure ≤ 62ch.
- Labels: Geist 14–15px, sentence case, `--text-3`. No uppercase mono "title tags" above headlines; section labels get a short hairline before them. Geist Mono only for registration codes.

**Title placement.** Section headers are split rows: eyebrow across the top, the serif title on the left (7 cols), a short intro on the right (4 cols) aligned to the title's last line. The hero follows the same rule: title left, lead and actions bottom-right. Titles are always left-aligned, never centred.

| Role | Size (fluid) |
|---|---|
| Display `h1` | `clamp(46px, 6.8vw, 108px)` |
| Statement | `clamp(28px, 4.2vw, 64px)` |
| `h2` | `clamp(36px, 5vw, 80px)` |
| `h3` | `clamp(22px, 2.2vw, 32px)` |
| Number | `clamp(56px, 7vw, 112px)` |

## 4. Layout

- Max width `1440px`, side gutter `clamp(20px, 4vw, 56px)`. 12-col grid, `32px` gap.
- Vertical rhythm: sections `clamp(88px, 12vw, 176px)` apart. Inside a section, heading → content gap `clamp(40px, 5vw, 72px)`.
- Header: 72px, sticky, glass (`rgba(255,255,255,.72)` + 18px blur). Hairline appears after 8px scroll.
- Breakpoints: 640 / 900 / 1200. Mobile is a first-class layout, not a collapse.

## 5. Surfaces

- Radius: `12` inputs/chips · `24` cards · `32` image panels · `999` buttons.
- Shadow (rare, only on floating glass): `0 1px 0 rgba(7,25,43,.04), 0 28px 56px -28px rgba(7,25,43,.22)`.
- Glass: `rgba(255,255,255,.66)`, `backdrop-filter: blur(20px) saturate(1.5)`, 1px `rgba(255,255,255,.8)` border.

## 6. Components

- **Button.** Pill, 48px high, 15px/500. *Primary* navy fill + white text. *Secondary* white fill, `--line-2` border. *Quiet* text + arrow. Hover: fill shifts one step; arrow nudges 3px.
- **Section label.** Sentence-case sans with a 32px hairline before it. Never on the hero.
- **Image card.** 24px radius, image fills, white gradient from the bottom carries the text. Hover: image scales 1.04 over 1.2s, arrow chip fills navy.
- **Number tile.** Number (300) + mono label + one line of explanation, separated by vertical hairlines. Never decorated.
- **Spec table.** Hairline rows, mono column heads. Used for the strategy comparison and registrations.
- **Statement.** Large paragraph that resolves from `--text-3` to `--ink` word by word on scroll.

## 7. Imagery

- Real photography only, stored in the repo under `public/images/photos/` (WebP at 640 / 1280 / 1920 / 2560 / 3840 + `manifest.json`). The site never fetches images at runtime once these exist.
- Sources: `src/data/photo-sources.json` (Unsplash `cdn` ids or Pexels ids; both licences allow commercial use without attribution). Changing that file triggers `.github/workflows/photos.yml`, which downloads at 3840px on GitHub's runners and commits the result.
- Slots: `mumbai` (hero; South Mumbai skyline, black and white), `sealink` (Flexicap+), `desk` (Ventures), `nyc` (Latius), `centralpark` (interlude).
- Choosing new photos: add candidates to `src/data/photo-candidates.json`; the workflow saves 1280px previews to `design/photo-scout/` for review. Promote the winner into `photo-sources.json`.
- Text never sits on an uncontrolled part of a photo: hero copy is on the page ground, strategy links on glass, cards carry a white scrim.

## 8. Motion

- Easing `cubic-bezier(.2,.7,.2,1)`. Durations 200ms (hover) / 700–900ms (reveal) / 1200ms (image).
- Content is visible at rest. Elements below the fold rise 14px as they enter, once, staggered 70ms. Nothing starts at opacity 0.
- Hero photo drifts at most 60px on scroll. Everything respects `prefers-reduced-motion`.

## 9. Content and compliance rules

- Registration numbers, SEBI line and investor-awareness text come from `src/data/site.ts` and stay on every page.
- The numbers band may only show facts already in `products.ts` / `team.ts` / `site.ts`.
- Performance claims render only through `PerformanceNote` and only while `SHOW_PERFORMANCE_CLAIMS` is true. Do not add claims anywhere else.
- Placeholder disclosures marked `tbc` stay visibly marked until compliance supplies wording.

## 10. Accessibility

- Text contrast ≥ 4.5:1 (≥ 3:1 for large type). 2px `--focus` ring, 3px offset, on every interactive element.
- Skip link, landmark roles, `aria-current`, inert background while the mobile drawer is open.
- Targets ≥ 44px on touch. No motion-only meaning.
