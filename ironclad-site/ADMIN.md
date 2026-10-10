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

### 2. Username & password sign-in (login gate in `cms-auth/`)
Editors sign in with a username and password; they never need a GitHub account. The gate checks the password and gets the CMS a GitHub key that only works on this repository and expires after 1 hour.

1. **GitHub App** (holds the access): GitHub → Settings → Developer settings → GitHub Apps → New. Name `Ironclad CMS`, homepage `https://ironcladamc.com`, untick Webhook. Permissions: Repository → **Contents: Read and write**. Create, then **Generate a private key** (downloads a `.pem`) and note the **App ID**. Click **Install App** → only `iron-vansh`; the number at the end of the resulting URL is the **installation ID**.
2. **Deploy the gate** (free Cloudflare Worker), from `ironclad-site/cms-auth/`:
   ```
   npx wrangler login
   npx wrangler secret put GITHUB_APP_ID
   npx wrangler secret put GITHUB_INSTALLATION_ID
   npx wrangler secret put GITHUB_APP_PRIVATE_KEY < path/to/key.pem
   node hash-password.mjs krishna          # repeat per editor; min 14 characters
   npx wrangler secret put USERS           # paste: {"krishna":"pbkdf2$…","aritra":"pbkdf2$…"}
   npx wrangler deploy
   ```
3. Put the worker URL in `public/admin/config.yml` as `base_url` (uncomment the line).
4. Recommended: Cloudflare → Security → WAF → Rate limiting rule on the worker, e.g. 10 POSTs per minute per IP.

Add or remove an editor, or change a password: rebuild the `USERS` JSON and run `wrangler secret put USERS` again. Passwords are stored only as salted PBKDF2 hashes.

Note: every change is committed by the "Ironclad CMS" app, not a named person, so GitHub history shows when and what changed but not which editor. Signing in again after an hour is expected (the key expires by design).

## For developers
- Config: `public/admin/config.yml`. Live previews: `public/admin/preview.js` (rendered with the site's own stylesheet, served at `/admin/preview.css` by `src/pages/admin/preview.css.ts`).
- Content: `src/content/blog/*.md`, `src/data/press.json`, `src/data/investor-updates.json`, `src/data/regulatory-docs.json`. Uploads: images → `public/images/uploads/`, PDFs → `public/docs/`.
- Sveltia CMS is pinned (`@0.217.0` in `public/admin/index.html` and the config's `$schema`). Upgrade deliberately; read the release notes first.
- Local editing: `npm run dev`, open `http://localhost:4321/admin/index.html`, choose **Work with Local Repository** (Chrome/Edge) and pick this repository's folder.
