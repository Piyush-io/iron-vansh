# DESIGN.md — Ironclad Asset Management

Blackstone's design system, applied to Ironclad's own content and photography.

> **Provenance.** Ported from blackstone.com's own stylesheet and markup (Wayback Machine capture, 7 Oct 2026): `design/refs/bx-home.css`, `bx-*.html` and screenshots `bx-*-desktop.jpg`.

---

## 1. Principles

1. **Black and white only.** Pages are white, and black is used for the header, hero card, product section, marquee, contact band and footer. The only colour comes from photographs, shown at their true colour with no overlay or fade.
2. **One serif, one light sans.** Serif headlines in sentence case, never uppercase. Body copy in a light grotesk.
3. **Eyebrow.** Every section opens with a small uppercase label (no trailing rule).
4. **No filled buttons.** Every action is a text link with a circled arrow (`.btn`).
5. **Say only what is true.** No invented AUM, returns or client counts. Numbers come from `src/data/*`.

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page |
| black | `#000000` | Header, dark sections, footer, headlines |
| card | `#121317` | Link card and fields inside dark sections |
| `--text` | `#1A1A1A` | Body |
| `--text-2` | `#555555` | Secondary |
| `--line` | `#D9D9D9` | Hairlines on white |

## 3. Typography

Fontshare's **Zodiak + General Sans** (Indian Type Foundry, ITF Free Font License: free for commercial use and web embedding). Files are self-hosted in `public/fonts/`; candidates are kept in `design/font-candidates/`.

- Hero: Zodiak Bold, the page's main attraction (84–96px desktop). Section headings: Zodiak Regular. Ticker: Bold first word.
- Body and UI: General Sans 400, with 500/600 for emphasis.
- Geist Mono only for registration codes.

| Role | Font | Size |
|---|---|---|
| `h1` | serif 300 | 48 → 64 → 72px |
| `h2` | serif 300 | 32 → 40 → 48px, line-height 1.5 |
| `h3` | serif 400 | 24–44px |
| Body | sans 300 | 16px base, 18–20px in components, line-height 1.5 |
| Eyebrow | sans 400 | 14px uppercase, .08em, plus a 48px rule |
| Nav, links | sans 400 | 16–17px |

Geist Mono is used only for registration codes.

## Type scale (the only sizes on the site)

| Token | Phone | Desktop (1440) | Used for |
|---|---|---|---|
| `--t-page` | 40px | 64px | Inner page titles, Zodiak Bold (same opening as home) |
| `--t-h2` | 28px | 40px | Section titles |
| `--t-h3` | 22px | 24px | Card and item titles, team names |
| `--t-lead` | 18px | 20px | Intros and descriptions |
| `--t-body` | 16px | 17px | Paragraphs, links |
| `--t-small` | 14px | 14px | Meta, notes, summaries |
| `--t-label` | 13px | 14px | Uppercase labels |

- **One bullet:** a 5px dot, used in every list (product points, checklists, legal text, investor-update points, venture stages).
- **Registration:** each product shows its registration line (SEBI PMS, SEBI Category I AIF, GIFT City); no status badges.
- **Allocation:** range bars, solid to the low end and shaded to the high end, so "50–70%" reads correctly.
- **People:** colour photo, name and designation in a grid; the bio opens in a side panel (`<dialog>`).

## 4. Layout (Blackstone's values)

- Container: 100% − 32px on phones, then 43rem from 48em, 71rem from 80em, 79rem from 90em and 103rem from 120em.
- Grid: 8 columns from 48em and 16 columns from 80em, with a 16px gap. Components place content on column lines exactly as Blackstone's do.
- Section padding: 5rem, then 6rem at 48em, 9rem at 80em and 10rem at 90em. A dark section that follows another dark section uses 2.5–3.5rem.
- Header: sits in the page (7rem, 8.75rem at 48em, 12.75rem at 80em). Once you scroll past it, it slides back in, fixed, whenever you scroll up. It is black on the homepage and white with a black logo on inner pages.

## 5. Surfaces

- Square corners. The only rounded shapes are the circled arrow, the carousel dots and the stage chips.
- No shadows, glass or gradients. Dark cards use `#121317`.

## 6. Components (homepage order is Blackstone's)

1. **Promo header.** Black. Two-line serif title, with the first word bold and the second line indented ("**Ironclad** Asset / Management"), and a description on the right.
2. **Promo carousel.** Contained true-colour photographs. Below each: title, ← dots → navigation, and a blurb with "Learn More".
3. **Offerings.** Centred divider, eyebrow and title, then copy with a link on the left and one serif figure on the right.
4. **Two-up.** Black. Eyebrow, title, indented copy and CTA on the left; a `#121317` card of links with circled arrows on the right.
5. **Ticker tape.** A giant serif line scrolling across the page, with a risk disclaimer below.
6. **Compare** (Ironclad-specific), then a **vertical list** (statement, sticky image on the left, titled items on the right), **people**, and an **email capture** used as the contact block (fields on `#121317` with a white underline).
7. **Footer.** Logo and four link columns, then a rule, then copyright with secondary links, then the SEBI text and investor awareness notice.

- **Link (`Go.astro`).** 18px label, then a 40px circled arrow (`ArrowIcon.astro`, Blackstone's SVG). On hover the label underlines from the left, the icon scales 1.2 and fills.
- **Eyebrow.** 14/16px uppercase with .08em tracking, followed by a 2px rule (48, 56 or 64px).
- **Inner page header.** Serif title on the left, description on the right, then a contained photograph.

## 7. Imagery

- Real photography only, stored in the repo under `public/images/photos/` (WebP at 640 / 1280 / 1920 / 2560 / 3840 + `manifest.json`). The site never fetches images at runtime once these exist.
- Sources: `src/data/photo-sources.json` (Unsplash `cdn` ids or Pexels ids; both licences allow commercial use without attribution). Changing that file triggers `.github/workflows/photos.yml`, which downloads at 3840px on GitHub's runners and commits the result.
- Slots: `harbour` (home hero, the photo from the live ironcladamc.com), `mumbai-night` (Flexicap+), `sealink-pillars` (Ventures), `manhattan-hudson` (Latius). Team portraits are built by `scripts/portraits.mjs` from originals in `design/assets/`.
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
