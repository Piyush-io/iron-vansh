// The site stylesheet at a stable URL for the CMS preview pane (public/admin/preview.js).
// Astro bundles global.css under a hashed name, so it is served here as written.
import css from '../../styles/global.css?raw';

export const GET = () => new Response(css, { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
