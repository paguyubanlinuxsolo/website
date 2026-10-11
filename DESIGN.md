# DESIGN — Paguyuban Linux Solo

Sumber arah: brand asli situs lama (logo, warna, font — hasil rekonesans Fase 0) + brief migrasi
("redesign modern, identitas brand dipertahankan, nuansa komunitas Linux/open source yang bersih").

## Identitas

- Nama: Paguyuban Linux Solo (PLiS). Komunitas pengguna GNU/Linux & FLOSS Solo Raya, berdiri 2019.
- Logo: Tux berblangkon dalam kotak kuning. Varian: square (`PLiS-NuLogo_inblack.png`), landscape (`logo-landscape-linux-solo.png`).
- Kepribadian: hangat, guyub (paguyuban), teknis tapi ramah pemula. Tulisan bergaya sapaan ("Halo, sobat Linux Solo !").

## Palet

| Token | Nilai | Alasan |
|---|---|---|
| `brand` (aksen) | `#FFE000` | Kuning logo (#FFFF00) diturunkan sedikit agar nyaman di layar; satu-satunya aksen |
| `ink` | `#1A1512` | Hitam hangat (bukan abu netral) — menyeimbangi kuning, dari header/footer gelap situs lama |
| `paper` | `#FAF7F0` | Putih hangat, latar mode terang |
| `bark` | `#562A12` | Cokelat kepala penguin di logo — warna pendukung (border, detail) |

Aturan aksen: kuning hanya untuk momen kunci (marker heading, CTA utama, link hover, logo).
Kuning TIDAK PERNAH jadi warna teks di atas latar terang (gagal kontras). Di mode gelap, kuning di atas ink lolos AA.

## Tipografi

- Heading: **Roboto Slab** — kontinuitas dari situs lama (identitas tipografis PLiS).
- Teks: **Roboto** — sama, kontinuitas; terbaca baik untuk artikel tutorial panjang.
- Mono: system mono stack (`ui-monospace`) — hanya untuk kode sungguhan di artikel, bukan estetika.

## Motif identitas

Kotak kuning dari logo: blok persegi kecil sebagai marker heading section dan aksen pada kartu/link.
Diulang konsisten di seluruh situs sebagai "tanda tangan" PLiS.

## Dial

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1

- ENERGY 2: komunitas yang hidup, bukan korporat; tapi konten tutorial butuh ketenangan baca.
- RHYTHM 2: beranda bervariasi antar section; daftar blog & artikel seragam demi keterbacaan.
- MOTION 1: hover/focus states + transisi pendek saja. Tanpa scroll-reveal, tanpa loop.

## Tema

Terang default mengikuti sistem + toggle manual (persist localStorage). Keduanya diverifikasi kontras AA.
Mode gelap beralasan: audiens pengguna Linux, konten berisi banyak blok kode.
