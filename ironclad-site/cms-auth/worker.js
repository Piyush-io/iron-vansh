// Ironclad CMS login gate (Cloudflare Worker).
// Editors sign in with a username and password instead of a GitHub account. On success the worker asks
// GitHub for a short-lived (1 hour) key that can only write to this one repository, and hands it to the
// CMS with the same popup handshake Sveltia CMS uses for "Sign in with GitHub".
//
// Secrets (wrangler secret put …):
//   USERS                    JSON {"username": "<hash from hash-password.mjs>", …}
//   GITHUB_APP_ID            numeric id of the GitHub App
//   GITHUB_APP_PRIVATE_KEY   the App's private key (.pem, as downloaded from GitHub)
//   GITHUB_INSTALLATION_ID   id of the App's installation on the repository
// Vars (wrangler.toml): REPO = "owner/name", SITE_ORIGIN = "https://ironcladamc.com"

const enc = new TextEncoder();
const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const b64url = (buf) => b64(buf).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// ── passwords: PBKDF2-SHA256, stored as pbkdf2$<iterations>$<salt b64>$<hash b64> ──
export async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16)), iterations = 100000) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return `pbkdf2$${iterations}$${b64(salt)}$${b64(bits)}`;
}
async function verifyPassword(password, stored) {
  const [scheme, iter, salt, hash] = String(stored).split('$');
  if (scheme !== 'pbkdf2' || !hash) return false;
  const again = (await hashPassword(password, unb64(salt), Number(iter))).split('$')[3];
  // constant-time compare
  let diff = again.length ^ hash.length;
  for (let i = 0; i < Math.max(again.length, hash.length); i++) diff |= (again.charCodeAt(i) || 0) ^ (hash.charCodeAt(i) || 0);
  return diff === 0;
}

// ── GitHub App → installation token limited to one repo, contents read/write ──
function pemToPkcs8(pem) {
  const der = unb64(pem.replace(/-----[^-]+-----|\s/g, ''));
  if (!pem.includes('BEGIN RSA PRIVATE KEY')) return der; // already PKCS#8
  // wrap PKCS#1 (what GitHub downloads) in a PKCS#8 envelope
  const len = (n) => (n < 128 ? [n] : n < 256 ? [0x81, n] : [0x82, n >> 8, n & 255]);
  const algo = [0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00];
  const octet = [0x04, ...len(der.length), ...der];
  const body = [0x02, 0x01, 0x00, ...algo, ...octet];
  return new Uint8Array([0x30, ...len(body.length), ...body]);
}
async function githubToken(env) {
  const key = await crypto.subtle.importKey('pkcs8', pemToPkcs8(env.GITHUB_APP_PRIVATE_KEY), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const now = Math.floor(Date.now() / 1000);
  const part = (o) => b64url(enc.encode(JSON.stringify(o)));
  const unsigned = `${part({ alg: 'RS256', typ: 'JWT' })}.${part({ iat: now - 60, exp: now + 540, iss: String(env.GITHUB_APP_ID) })}`;
  const jwt = `${unsigned}.${b64url(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, enc.encode(unsigned)))}`;
  const res = await fetch(`https://api.github.com/app/installations/${env.GITHUB_INSTALLATION_ID}/access_tokens`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${jwt}`, Accept: 'application/vnd.github+json', 'User-Agent': 'ironclad-cms-auth' },
    body: JSON.stringify({ repositories: [env.REPO.split('/')[1]], permissions: { contents: 'write', metadata: 'read' } }),
  });
  if (!res.ok) throw new Error(`GitHub refused the key request (${res.status})`);
  return (await res.json()).token;
}

// ── pages ──
const page = (body, status = 200) => new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Sign in · Ironclad CMS</title><style>
*{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;background:#f4f5f7;color:#111;font:16px/1.5 system-ui,-apple-system,sans-serif;padding:16px}
form{width:100%;max-width:360px;background:#fff;padding:28px 24px;border-radius:12px;box-shadow:0 1px 3px #0002}
h1{font-size:20px;margin:0 0 20px}label{display:block;font-size:14px;font-weight:600;margin:14px 0 6px}
input{width:100%;font:inherit;padding:12px;border:1px solid #c9ccd3;border-radius:8px}input:focus{outline:2px solid #111;outline-offset:1px}
button{width:100%;margin-top:22px;padding:13px;font:600 16px system-ui,sans-serif;color:#fff;background:#111;border:0;border-radius:8px;cursor:pointer}
.err{margin:0 0 8px;padding:10px 12px;border-radius:8px;background:#fdecec;color:#8a1c1c;font-size:14px}
</style></head><body>${body}</body></html>`, {
  status,
  headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'no-store', 'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'" },
});
const form = (error = '', user = '') => page(`<form method="post" autocomplete="on">
<h1>Ironclad CMS</h1>${error ? `<p class="err" role="alert">${esc(error)}</p>` : ''}
<label for="u">Username</label><input id="u" name="username" autocomplete="username" autocapitalize="none" required value="${esc(user)}">
<label for="p">Password</label><input id="p" name="password" type="password" autocomplete="current-password" required>
<button type="submit">Sign in</button></form>`, error ? 401 : 200);

// Hand the key to the CMS window that opened this popup, only if it is our own site.
const handoff = (env, content, state) => page(`<script>(() => {
  const allowed = ${JSON.stringify(env.SITE_ORIGIN.split(',').map((s) => s.trim()))};
  const msg = 'authorization:github:${state}:' + ${JSON.stringify(JSON.stringify(content))};
  window.addEventListener('message', ({ data, origin }) => {
    if (data !== 'authorizing:github' || !allowed.includes(origin)) return;
    window.opener?.postMessage(msg, origin);
  });
  window.opener?.postMessage('authorizing:github', '*');
})();</script><p style="font:16px system-ui">Signed in. You can close this window.</p>`);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/auth') return new Response('Not found', { status: 404 });
    if (request.method === 'GET') return form();
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    // reject cross-site form posts
    if (request.headers.get('Origin') && request.headers.get('Origin') !== url.origin) return new Response('Forbidden', { status: 403 });

    const data = await request.formData();
    const user = String(data.get('username') || '').trim().toLowerCase();
    const pass = String(data.get('password') || '');
    const users = JSON.parse(env.USERS || '{}');
    const ok = user in users && (await verifyPassword(pass, users[user]));
    if (!ok) {
      await new Promise((r) => setTimeout(r, 1500)); // slow down guessing
      return form('Wrong username or password.', user);
    }
    try {
      return handoff(env, { provider: 'github', token: await githubToken(env) }, 'success');
    } catch (e) {
      return handoff(env, { provider: 'github', error: e.message, errorCode: 'TOKEN_FAILED' }, 'error');
    }
  },
};
