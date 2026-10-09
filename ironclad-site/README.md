# Ironclad website

Astro website for Ironclad Asset Management. The redesign uses cool white and steel blue, IBM Plex Sans, a Mumbai panorama, and an expandable comparison of the three investment mandates. The direction and critique are recorded in `design/notes/frontend-direction.md`.

Run `npm run dev` for development, `npm run build` for production, or `npm run review` to regenerate a review copy at `design/preview/index.html`. The review copy opens directly as a file, with navigation between all generated pages.

Photography is configured in `src/data/photos.ts`. Responsive Unsplash URLs request widths from 640 through 3840 pixels. Images load lazily except for the first page photograph. Existing local images provide fallbacks when the CDN is unavailable. The local fallback images are not 4K. External image downloads and local server binding were blocked in the implementation environment.

The prior source is saved in `design/before-redesign/src`.

Validation completed: production build, links and anchor targets across nine pages, image fallback paths, heading and ARIA references, and navigation script behavior including mobile focus handling. Browser visual review could not complete because the desktop capture service failed. Existing disclosure placeholders and draft compliance notices still require the firm's supplied wording.
