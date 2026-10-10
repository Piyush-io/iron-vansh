# Ironclad CMS: editing the site without code

Go to **ironcladamc.com/admin**. It works on a phone or a computer.

| Section | What it changes | Where it shows |
|---|---|---|
| **Insights** | Articles: title, date, summary, optional cover image, text | `/blogs`, and the newest three on the home page |
| **Media coverage** | Press articles: publication, link, quote | `/media` |
| **Investor updates** | Monthly notes: title, summary, bullet points, PDF | `/investor-update` |
| **Regulatory documents** | Disclosure Document, SEBI certificate, Investor Charter, monthly Grievance and Complaints PDFs | Footer → Investor Resources |

## Posting something

1. Sign in.
2. Open a section. For a new article, tap **Insights → New**. For press or an investor update, tap **Add** (new items go to the top).
3. Fill in the fields. Tap the **eye icon** to see the page exactly as it will look on the site (on a computer it sits beside the form and updates as you type).
4. Tap **Save**. **Save publishes**: the live site updates in 1–2 minutes. There is no separate draft step.

Monthly complaints data: open **Regulatory documents**, replace the PDF in the right slot, Save.

To undo a mistake, edit it again and Save, or ask the developer to revert the change: every Save is recorded in GitHub with who made it and when.

## One-time setup (developer / founder)

These need the firm's own accounts, so they can't be done from the codebase.

### 1. Host the site on Cloudflare Pages (free)
- Cloudflare dashboard → Workers & Pages → Create → Pages → connect GitHub repo `Piyush-io/iron-vansh`.
- Production branch: `main`. Root directory: `ironclad-site`. Build command: `npm run build`. Output: `dist`. Environment variable `NODE_VERSION=22`.
- Point `ironcladamc.com` at it (Custom domains).

The CMS commits to `main`, so this branch must be merged into `main` first.

### 2. Sign-in
- **Quick (works today):** on the login screen choose **Sign In with Token**, follow the link to create a GitHub token for this repo, paste it. Fine for one or two people.
- **Proper "Sign in with GitHub" button:** deploy [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) to Cloudflare Workers (free; its README has a one-click deploy), register a GitHub OAuth app with the callback URL it gives you, then uncomment `base_url` in `public/admin/config.yml` and set it to the worker URL.

Each editor needs a free GitHub account with write access to the repository (GitHub → repo → Settings → Collaborators).

## For developers
- Config: `public/admin/config.yml`. Live previews: `public/admin/preview.js` (rendered with the site's own stylesheet, served at `/admin/preview.css` by `src/pages/admin/preview.css.ts`).
- Content: `src/content/blog/*.md`, `src/data/press.json`, `src/data/investor-updates.json`, `src/data/regulatory-docs.json`. Uploads: images → `public/images/uploads/`, PDFs → `public/docs/`.
- Sveltia CMS is pinned (`@0.217.0` in `public/admin/index.html` and the config's `$schema`). Upgrade deliberately; read the release notes first.
- Local editing: `npm run dev`, open `http://localhost:4321/admin/index.html`, choose **Work with Local Repository** (Chrome/Edge) and pick this repository's folder.
