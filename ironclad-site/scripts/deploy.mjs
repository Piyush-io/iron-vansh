// Build the site and upload dist/ to Hostinger over FTPS.
//   npm run deploy            build, back up the live site to backups/<time>/, upload
//   npm run deploy -- --dry   build and show what would be uploaded, touch nothing
// Credentials come from .env.deploy (see .env.deploy.example); that file is git-ignored.
// Files on the server that aren't in dist/ are left alone (nothing is deleted), so old URLs keep working.
import { Client } from 'basic-ftp';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const dry = process.argv.includes('--dry');
const env = Object.fromEntries(
  (fs.existsSync('.env.deploy') ? fs.readFileSync('.env.deploy', 'utf8') : '')
    .split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
);
const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_DIR = 'public_html', FTP_PORT = '21', FTP_CA_FILE } = env;
if (!dry && !(FTP_HOST && FTP_USER && FTP_PASSWORD)) {
  console.error('Missing FTP details. Copy .env.deploy.example to .env.deploy and fill it in.');
  process.exit(1);
}

console.log('Building…');
execSync('npm run build', { stdio: 'inherit' });

const files = [];
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
  const p = path.join(dir, e.name);
  e.isDirectory() ? walk(p) : files.push(path.relative('dist', p));
});
walk('dist');
const mb = files.reduce((n, f) => n + fs.statSync(path.join('dist', f)).size, 0) / 1e6;
console.log(`${files.length} files, ${mb.toFixed(1)} MB in dist/`);
if (dry) { files.slice(0, 30).forEach((f) => console.log('  ' + f)); if (files.length > 30) console.log(`  … and ${files.length - 30} more`); process.exit(0); }

const client = new Client(30000);
try {
  // FTPS (TLS); Hostinger supports it, so the password never crosses the network in plain text
  await client.access({
    host: FTP_HOST, port: Number(FTP_PORT), user: FTP_USER, password: FTP_PASSWORD, secure: true,
    // optional: trust a specific certificate (e.g. a self-signed test server); never disables checking
    secureOptions: FTP_CA_FILE ? { ca: fs.readFileSync(FTP_CA_FILE) } : undefined,
  });
  const backup = path.join('backups', new Date().toISOString().replace(/[:.]/g, '-'));
  console.log(`Backing up the live site to ${backup}/ …`);
  fs.mkdirSync(backup, { recursive: true });
  await client.downloadToDir(backup, FTP_DIR);
  console.log(`Uploading to ${FTP_DIR}/ …`);
  await client.ensureDir(FTP_DIR);
  await client.uploadFromDir('dist');
  console.log('Done. Live at https://ironcladamc.com');
} catch (e) {
  console.error('Deploy failed:', e?.message || e);
  process.exitCode = 1;
} finally {
  client.close();
}
