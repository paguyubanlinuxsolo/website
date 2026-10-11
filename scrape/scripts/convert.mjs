#!/usr/bin/env node
// Convert scraped WP JSON to Astro content: src/content/{posts,pages}/<slug>.md
// plus copy media to public/images/uploads/. Idempotent: overwrites outputs.
import fs from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const ROOT = path.resolve(import.meta.dirname, '../..');
const RAW = path.join(ROOT, 'scrape/raw');
const load = (f) => JSON.parse(fs.readFileSync(path.join(RAW, f), 'utf8'));

const posts = load('posts.json');
const pages = load('pages.json');
const media = load('media.json');
const cats = Object.fromEntries(load('categories.json').map((c) => [c.id, c]));
const tags = Object.fromEntries(load('tags.json').map((t) => [t.id, t]));
const users = Object.fromEntries(load('users.json').map((u) => [u.id, u.name]));
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'scrape/manifest.json'), 'utf8'));

// --- media: copy originals to public/images/uploads/, build URL -> public path map
const urlToPublic = {};
for (const [url, local] of Object.entries(manifest)) {
  const rel = local.replace(/^scrape\/raw\/media\//, '');
  const dest = path.join(ROOT, 'public/images/uploads', rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(ROOT, local), dest);
  urlToPublic[url] = '/images/uploads/' + rel;
}
console.log(`media copied: ${new Set(Object.values(urlToPublic)).size} files`);

const issues = [];

function localImage(url) {
  if (urlToPublic[url]) return urlToPublic[url];
  const orig = url.replace(/-\d+x\d+(?=\.\w+$)/, '');
  if (urlToPublic[orig]) return urlToPublic[orig];
  issues.push(`Gambar tidak ada di manifest: ${url}`);
  return url;
}

function cleanHtml(html) {
  return (
    html
      // lazy-loaded imgs: real URL sits in data-src, src holds a base64 placeholder
      .replace(/\ssrc="data:image[^"]*"/g, '')
      .replace(/<img([^>]*?)\sdata-(?:lazy-)?src="/g, '<img$1 src="')
      .replace(/\sdata-(?:lazy-)?(?:srcset|sizes)="[^"]*"/g, '')
      // lazy iframes -> real src
      .replace(/<iframe([^>]*?)data-src=/g, '<iframe$1src=')
      // drop spacer divs and srcset noise
      .replace(/<div[^>]*wp-block-spacer[^>]*><\/div>/g, '')
      .replace(/\s(?:srcset|sizes|decoding|fetchpriority|loading|data-id)="[^"]*"/g, '')
      // rewrite image urls to local
      .replace(/https:\/\/linuxsolo\.or\.id\/wp-content\/uploads\/[^\s"')]+/g, (u) => localImage(u))
      // internal links -> relative
      .replace(/https?:\/\/(?:www\.)?linuxsolo\.or\.id(\/[^\s"')]*)?/g, (_, p) => p || '/')
  );
}

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', hr: '---' });
td.use(gfm);
td.keep(['iframe']);
// Elementor/WP wrappers: turndown already unwraps div/span/section; strip figure to img+caption
td.addRule('figure', {
  filter: 'figure',
  replacement: (content) => content + '\n\n',
});

const esc = (s) => JSON.stringify(String(s ?? ''));
const stripTags = (h) =>
  h.replace(/<[^>]+>/g, '').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
   .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
   .replace(/\s+/g, ' ').trim();

function featured(item) {
  const m = media.find((x) => x.id === item.featured_media);
  return m ? localImage(m.source_url) : '';
}

function frontmatter(item, kind) {
  const fm = [
    '---',
    `title: ${esc(stripTags(item.title.rendered))}`,
    `slug: ${esc(item.slug)}`,
    `pubDate: ${item.date_gmt}Z`,
    `updatedDate: ${item.modified_gmt}Z`,
    `author: ${esc(users[item.author] || 'Paguyuban Linux Solo')}`,
    `description: ${esc(stripTags(item.excerpt?.rendered || '')
      .replace(/(…|&hellip;|\.\.\.)?\s*Read [Mm]ore\s*(»|“[^”]*”)?\s*$/, '')
      .trim())}`,
  ];
  const hero = featured(item);
  if (hero) fm.push(`heroImage: ${esc(hero)}`);
  if (kind === 'post') {
    fm.push(`categories: [${(item.categories || []).map((id) => esc(cats[id]?.slug)).join(', ')}]`);
    fm.push(`tags: [${(item.tags || []).map((id) => esc(tags[id]?.slug)).join(', ')}]`);
  }
  fm.push(`draft: ${item.status !== 'publish'}`, '---', '');
  return fm.join('\n');
}

function convert(item, kind, outDir) {
  const md = td.turndown(cleanHtml(item.content.rendered))
    .replace(/\n{3,}/g, '\n\n');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${item.slug}.md`), frontmatter(item, kind) + md + '\n');
}

for (const p of posts) convert(p, 'post', path.join(ROOT, 'src/content/posts'));
console.log(`posts: ${posts.length}`);

const SKIP_PAGES = {
  'sample-page': 'Beranda: layout Elementor, dibangun ulang sebagai src/pages/index.astro',
  galeri: 'Galeri: widget post Elementor, dibangun ulang sebagai src/pages/galeri.astro',
  kontak: 'Kontak: kosong di WP, dibangun ulang sebagai src/pages/kontak.astro',
};
let pageCount = 0;
for (const p of pages) {
  if (SKIP_PAGES[p.slug]) { issues.push(`Halaman '${p.slug}' dilewati: ${SKIP_PAGES[p.slug]}`); continue; }
  convert(p, 'page', path.join(ROOT, 'src/content/pages'));
  pageCount++;
}
console.log(`pages: ${pageCount}`);

if (issues.length) {
  fs.appendFileSync(
    path.join(ROOT, 'scrape/ISSUES.md'),
    `\n## convert.mjs ${new Date().toISOString()}\n` + issues.map((i) => `- ${i}`).join('\n') + '\n'
  );
  console.log(`issues: ${issues.length} (lihat scrape/ISSUES.md)`);
}
