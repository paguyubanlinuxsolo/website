# RECON — linuxsolo.or.id (Fase 0)

Tanggal: 2026-10-11

## Platform

- **CMS**: WordPress (meta generator "WordPress 7.1.3"), server LiteSpeed.
- **Theme**: Inspiro by WPZOOM. **Page builder**: Elementor 4.3.4 + Elementor Pro (halaman statis dibangun dengan Elementor → HTML-nya berat, perlu pembersihan ekstra saat konversi).
- **Plugin terdeteksi**: Yoast SEO, WP Rocket (cache), Contact Form 7, Smush, Site Kit, Limit Login Attempts.
- **REST API AKTIF PENUH** — ini jadi sumber data utama:
  - `/wp-json/wp/v2/posts` → **20 post**
  - `/wp-json/wp/v2/pages` → **7 halaman**
  - `/wp-json/wp/v2/media` → **101 media**
  - categories, tags, users semua terbuka.

## robots.txt & sitemap

- robots.txt: allow all. Sitemap: `https://linuxsolo.or.id/sitemap_index.xml` (Yoast) → post, page, category, post_tag, author sitemaps.
- RSS feed standar WordPress tersedia di `/feed/`.

## Konten

- **Posts (20)**: URL pattern `/{slug}/` (tanpa prefix tanggal/kategori). Post terakhir Feb 2024, tertua ~2023. Bahasa Indonesia, topik tutorial Linux (Alpine, Debian, apt, wget, vsftpd, Waydroid, kernel) + liputan event.
- **Pages (7)**:
  | Slug | Judul | Catatan |
  |---|---|---|
  | `/` (sample-page, id 2) | Beranda | Elementor, template header_footer |
  | `/sejarah/` | Sebuah 'Sorotan' | submenu Tentang |
  | `/pengurus/` | Pengurus | submenu Tentang |
  | `/tentang/` | Tentang Paguyuban Linux Solo | tidak ada di menu utama |
  | `/kontak/` | Kontak | ada Contact Form 7 (kemungkinan) |
  | `/galeri/` | Galeri | |
  | `/kegiatan/` | Kegiatan | |
- **Categories**: artikel (9), event (10), dokumentasi (1), uncategorized (0). URL: `/category/{slug}/`.
- **Tags**: 28 tag, banyak yang count 0. URL: `/tag/{slug}/`.
- **Authors**: admin, Ahmad Raniri, Rhesa Prawedha, Andreas Abi Permana.

## Navigasi

Menu header: Beranda · Tentang ▾ (Sebuah 'Sorotan' → /sejarah/, Pengurus) · Blog (→ /category/artikel/) · Kegiatan · Galeri · Kontak.

Footer 3 kolom: deskripsi komunitas · Basecamp (embed Google Maps, area Solo) · Contact:
- WhatsApp +62 896 8141 4639
- Telegram t.me/linuxsolo
- Instagram instagram.com/linux.solo
- GitHub paguyubanlinuxsolo
- LinkedIn linkedin.com/in/linuxsolo/

## Identitas brand

- **Nama**: Paguyuban Linux Solo (PLiS). Tagline = deskripsi footer ("Sebuah wadah untuk para pengguna, pemerhati, pecinta, pengembang... FLOSS dan GNU/Linux... Solo Raya").
- **Logo**: penguin (Tux bertopi blangkon) di kotak kuning + wordmark "PAGUYUBAN Linux SOLO".
  - `uploads/2023/10/PLiS-NuLogo_inblack.png` (square, dipakai favicon/OG)
  - `uploads/2023/11/logo-landscape-linux-solo.png` (landscape, dipakai di header)
  - Tidak ada SVG di media library.
- **Warna** (dari visual + CSS):
  - Kuning logo/section band: `#FFFF89` (pale yellow, dipakai di section "Tentang Kami") + kuning logo lebih pekat (~`#FFE400`-an, perlu ekstrak dari PNG).
  - Hitam/dark: header & footer `#242424`/`#222222`/hitam.
  - Hijau aksen: `#61CE70` (tombol "Muat Lebih Banyak", link footer).
  - Kit Elementor masih default (#6EC1E4 dll) — warna nyata datang dari theme & styling per-halaman.
- **Font**: Roboto Slab (heading) + Roboto (teks).

## Rencana scraping (Fase 1)

1. Sumber utama: WP REST API (`posts`, `pages`, `media`, `categories`, `tags`, `users`) dengan `?per_page=100` + pagination, `_embed` untuk featured image & author.
2. Media: unduh `source_url` original dari `/wp/v2/media` (bukan thumbnail).
3. Menu & footer: tidak ada endpoint menu publik → ekstrak dari HTML beranda (sudah dipetakan di atas, bisa hardcode).
4. Rate limit 1 detik/request, UA jelas, resume-able.

## Risiko / catatan

- Halaman Elementor (Beranda, Galeri, dll) → `content.rendered` penuh markup Elementor; konversi ke Markdown murni akan kehilangan layout. Rencana: posts → Markdown; halaman statis → ekstrak teks+gambar lalu rakit ulang sebagai layout Astro (bukan markdown mentah).
- Situs ini milik user (terlihat login admin di browser) — scraping aman & sah.
- Komentar WordPress ada (11 komentar) — tidak dimigrasikan (situs statis); dicatat sebagai keputusan.
- Post hanya sampai Feb 2024; "Muat Lebih Banyak" di beranda = load more AJAX, tidak relevan karena kita pakai API.
