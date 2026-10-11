
## convert.mjs 2026-10-11T13:09:33.823Z
- Halaman 'sample-page' dilewati: Beranda: layout Elementor, dibangun ulang sebagai src/pages/index.astro

## Catatan migrasi (Fase 2)
- Halaman `kontak` di WP nyaris kosong (hanya tagline); info kontak asli ada di footer/Elementor. Halaman kontak Astro akan dibangun dari data `scrape/raw/menus.json` (footer.contact).
- Halaman `pengurus`: teks "[Open Volunteer : Check This Out]" aslinya tombol popup Elementor — sekarang teks mati, perlu diputuskan mau diarahkan ke mana (atau dihapus).
- Deskripsi (excerpt) halaman statis hasil auto-generate WP, kurang bagus untuk SEO — layak ditulis ulang manual.
- Komentar WordPress (11 komentar) tidak dimigrasikan (situs statis). Bisa ditambah giscus/utterances nanti jika perlu.
- Code block di post tidak memiliki info bahasa (WP tidak menyimpannya) — fence tanpa language tag.
- Embed YouTube dipertahankan sebagai iframe HTML mentah di markdown (3 buah di post webinar).
