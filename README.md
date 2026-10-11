# Situs Paguyuban Linux Solo

Situs statis [Astro](https://astro.build) + [Decap CMS](https://decapcms.org), hasil migrasi dari WordPress (linuxsolo.or.id).

## Menjalankan lokal

```bash
npm install
npm run dev        # dev server di http://localhost:4321
npm run build      # build ke dist/ + index pencarian Pagefind
npm run preview    # serve hasil build
```

Catatan: pencarian (/cari/) memakai index Pagefind yang dibuat saat `npm run build`.
Di `npm run dev` index belum ada; jalankan build sekali dulu bila ingin mengetes pencarian.

## Struktur folder

```
src/
  content/posts/      # post blog (markdown + frontmatter) — dikelola Decap
  content/pages/      # halaman statis (tentang, sejarah, dll) — dikelola Decap
  content.config.ts   # schema content collections (zod)
  layouts/Base.astro  # shell: header, nav, footer, SEO meta, tema gelap/terang
  components/         # PostCard, PostGrid, Pagination, FormattedDate
  pages/              # routing: [slug], blog, category, tag, kontak, cari, 404, rss
  consts.ts           # identitas situs: nama, kontak, menu navigasi
public/
  images/uploads/     # semua media (dipakai juga oleh Decap)
  admin/              # Decap CMS (index.html + config.yml)
scrape/               # data mentah migrasi WordPress (scripts di-commit, raw/ tidak)
DESIGN.md             # arah desain: palet, tipografi, dial
```

## Mengelola konten (Decap CMS)

### Lokal (tanpa OAuth)

1. `config.yml` sudah berisi `local_backend: true`.
2. Jalankan dua proses: `npx decap-server` dan `npm run dev` (atau preview).
3. Buka `http://localhost:4321/admin/`, klik Login (tanpa akun).

Jika port 8081 sudah dipakai proyek lain, jalankan `PORT=8091 npx decap-server` dan ubah
sementara `local_backend:` menjadi `url: http://localhost:8091/api/v1`.

### Produksi (GitHub Pages)

1. Di `public/admin/config.yml`, ganti `USERNAME/REPO` dengan repo asli.
2. **GitHub Pages tidak menyediakan server OAuth**, jadi login GitHub di Decap butuh
   OAuth proxy eksternal. Pilihan termudah: Cloudflare Worker gratis.

#### Setup OAuth Decap CMS (Cloudflare Worker)

1. Buat GitHub OAuth App: GitHub → Settings → Developer settings → OAuth Apps → New.
   - Homepage URL: `https://linuxsolo.or.id`
   - Authorization callback URL: `https://<nama-worker>.<akun>.workers.dev/callback`
2. Deploy OAuth proxy untuk Decap, misalnya
   [decap-proxy](https://github.com/sterlingwes/decap-proxy) (template Cloudflare Worker):
   ikuti README-nya, isi `GITHUB_CLIENT_ID` dan `GITHUB_CLIENT_SECRET` sebagai secret Worker.
3. Di `config.yml` tambahkan di bawah `backend:`:
   ```yaml
   base_url: https://<nama-worker>.<akun>.workers.dev
   ```
4. Buka `https://linuxsolo.or.id/admin/` → Login with GitHub. Hanya akun dengan akses
   tulis ke repo yang bisa menyimpan.

Alternatif tanpa setup: layanan hosted seperti Netlify (gratis) hanya untuk OAuth-nya,
tapi Worker di atas membuat semuanya tetap di tangan komunitas.

## Deploy ke GitHub Pages (saat repo siap)

1. Buat workflow `.github/workflows/deploy.yml` memakai action resmi:
   ```yaml
   name: Deploy ke GitHub Pages
   on:
     push:
       branches: [main]
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: withastro/action@v6
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v5
   ```
2. Repo → Settings → Pages → Source: **GitHub Actions**.

### `site` dan `base` (astro.config.mjs)

| Skenario | `site` | `base` | Ekstra |
|---|---|---|---|
| Custom domain `linuxsolo.or.id` | `https://linuxsolo.or.id` | `/` (default) | buat `public/CNAME` berisi `linuxsolo.or.id`, atur DNS A/CNAME ke GitHub Pages |
| Repo biasa `username.github.io/REPO` | `https://username.github.io` | `/REPO` | semua link & path gambar internal harus diawali `import.meta.env.BASE_URL` |

Konfigurasi saat ini mengasumsikan **custom domain** (path absolut seperti `/images/...`
dan `/blog/`). Jika dipakai di `username.github.io/REPO` tanpa custom domain, selain
mengubah `base`, path internal (nav di `src/consts.ts`, gambar di konten, dll) harus
di-prefix `BASE_URL` — jangan deploy ke subpath tanpa penyesuaian itu.

## Migrasi dari WordPress

- `scrape/scripts/scrape.py` — ambil semua data via WP REST API (resumable).
- `scrape/scripts/convert.mjs` — konversi HTML → Markdown + rewrite URL gambar/link.
- `scrape/RECON.md` — hasil rekonesans situs lama; `scrape/ISSUES.md` — catatan konversi.
- URL lama dipertahankan: post di `/{slug}/`, kategori `/category/{slug}/`, tag `/tag/{slug}/`.
