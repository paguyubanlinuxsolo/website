// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// ==== SATU-SATUNYA TEMPAT GANTI ALAMAT SITUS ====
// Sekarang  : GitHub Pages subpath (paguyubanlinuxsolo.github.io/website)
// Nanti saat DNS linuxsolo.or.id sudah diarahkan ke GitHub Pages:
//   SITE_URL = 'https://linuxsolo.or.id'; BASE = '/';
// (file public/CNAME sudah disiapkan; isi juga Custom domain di Settings -> Pages)
const SITE_URL = 'https://paguyubanlinuxsolo.github.io';
const BASE = '/website';

// prefix semua src/href absolut di konten markdown dengan BASE
function rehypeBase() {
  const base = BASE.replace(/\/$/, '');
  const visit = (node) => {
    if (node.properties) {
      for (const k of ['src', 'href']) {
        const v = node.properties[k];
        if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//')) node.properties[k] = base + v;
      }
    }
    (node.children ?? []).forEach(visit);
  };
  return (/** @type {any} */ tree) => visit(tree);
}

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  markdown: {
    rehypePlugins: [rehypeBase],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
