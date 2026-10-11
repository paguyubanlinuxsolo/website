// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// `site` + `base`:
// - Custom domain (linuxsolo.or.id): site seperti di bawah, base '/' (default),
//   dan file public/CNAME berisi domain. Path gambar "/images/..." langsung jalan.
// - Repo biasa (username.github.io/REPO): site 'https://username.github.io',
//   base '/REPO'. Semua path internal harus memakai import.meta.env.BASE_URL.
//   Template ini mengasumsikan custom domain; lihat README untuk skenario base.
export default defineConfig({
  site: 'https://linuxsolo.or.id',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
