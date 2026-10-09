# Ironclad website

Astro site for Ironclad Asset Management. Light-mode design system documented in `DESIGN.md`.

```
npm install
npm run dev        # fetches photos first (npm run photos), then starts Astro
npm run build      # same, then builds to dist/
npm run photos     # download the real 4K photography listed in src/data/photo-sources.json
```

Photography is real (Unsplash), fetched at 3840px into `public/images/photos/`. Run `npm run photos` once on a machine with normal internet access and commit `public/images/photos/` so deploys don't depend on the download. Until a photo is fetched, its slot shows a neutral placeholder.

Disclosure placeholders and draft compliance notices still need the firm's supplied wording. Performance claims render only while `SHOW_PERFORMANCE_CLAIMS` in `src/data/site.ts` is true.
