# Ironclad website

Astro site for Ironclad Asset Management. Light-mode design system documented in `DESIGN.md`.

## Deploying (Hostinger)

The live site is on Hostinger (hPanel); the domain's DNS is at GoDaddy and email is Google Workspace, so DNS is never touched.

1. One time: copy `.env.deploy.example` to `.env.deploy` and fill in the FTP details from hPanel → Files → FTP Accounts. This file is git-ignored.
2. `npm run deploy -- --dry` builds and lists what would go up.
3. `npm run deploy` builds, downloads a backup of the live site to `backups/<time>/` (git-ignored), then uploads `dist/` over FTPS. Nothing on the server is deleted.

To roll back, upload the folder from `backups/` with hPanel's File Manager. `public/.htaccess` redirects the old `*.html` addresses and sets caching.

If FTPS reports a certificate name mismatch, set `FTP_HOST` to the server hostname hPanel shows instead of `ftp.ironcladamc.com`.

Insights, Media coverage, Investor updates and Regulatory documents are edited without code at `/admin` (Sveltia CMS). Setup and how-to: `ADMIN.md`.

```
npm install
npm run dev        # fetches photos first (npm run photos), then starts Astro
npm run build      # same, then builds to dist/
npm run photos     # download the real 4K photography listed in src/data/photo-sources.json
```

Photography is real (Unsplash), fetched at 3840px into `public/images/photos/`. Run `npm run photos` once on a machine with normal internet access and commit `public/images/photos/` so deploys don't depend on the download. Until a photo is fetched, the page loads it straight from Unsplash's CDN in the browser.

Disclosure placeholders and draft compliance notices still need the firm's supplied wording. Performance claims render only while `SHOW_PERFORMANCE_CLAIMS` in `src/data/site.ts` is true.
