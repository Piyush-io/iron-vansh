import { defineConfig } from 'astro/config';

// Hosts allowed to reach `npm run dev` / `npm run preview` besides localhost
// (e.g. a Cloudflare quick tunnel: https://<random>.trycloudflare.com). A leading dot allows every subdomain.
const allowedHosts = ['.trycloudflare.com'];

export default defineConfig({
  output: 'static',
  site: 'https://ironcladamc.com',
  server: { allowedHosts },
  vite: { server: { allowedHosts }, preview: { allowedHosts } },
});
