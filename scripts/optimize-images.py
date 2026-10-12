#!/usr/bin/env python3
"""Optimasi gambar di public/images/uploads (in-place, nama file & URL tidak berubah).

- Resize sisi terpanjang maks 1600px (foto konten tidak butuh lebih).
- JPEG/WebP disimpan ulang quality 80, PNG dengan optimize.
- Logo (PLiS-NuLogo*, logo-*) dilewati agar aset brand tetap utuh.
- Plus: thumbnail 640px untuk galeri ke public/images/thumbs/ (path sama).

Jalankan ulang kapan saja (mis. setelah banyak upload via CMS):
  python3 scripts/optimize-images.py
Arsip resolusi asli hasil migrasi ada di scrape/raw/media/ (lokal, di-gitignore).
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
UPLOADS = ROOT / 'public/images/uploads'
THUMBS = ROOT / 'public/images/thumbs'
MAX_SIDE = 1600
THUMB_SIDE = 640
SKIP_PREFIX = ('PLiS-NuLogo', 'cropped-PLiS', 'cropped-cropped-PLiS', 'logo-')

def save(im: Image.Image, dest: Path) -> None:
    ext = dest.suffix.lower()
    if ext in ('.jpg', '.jpeg'):
        im = im.convert('RGB')
        im.save(dest, quality=80, optimize=True, progressive=True)
    elif ext == '.webp':
        im.save(dest, quality=80, method=6)
    elif ext == '.png':
        im.save(dest, optimize=True)
    else:
        return

def process(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        if max(im.size) > MAX_SIDE:
            im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        save(im, path)
    after = path.stat().st_size
    if after > before:  # hasil lebih besar? kembalikan tidak bisa; cukup laporkan
        pass
    return before, after

def thumb(path: Path) -> None:
    rel = path.relative_to(UPLOADS)
    dest = THUMBS / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        im.thumbnail((THUMB_SIDE, THUMB_SIDE), Image.LANCZOS)
        save(im, dest)

def main() -> None:
    total_before = total_after = n = 0
    for p in sorted(UPLOADS.rglob('*')):
        if not p.is_file() or p.suffix.lower() not in ('.jpg', '.jpeg', '.png', '.webp'):
            continue
        if p.name.startswith(SKIP_PREFIX):
            continue
        b, a = process(p)
        total_before += b; total_after += a; n += 1
    print(f'{n} file: {total_before/1e6:.1f} MB -> {total_after/1e6:.1f} MB')

    # thumbnail hanya untuk foto yang dipakai galeri (dibaca dari galeri.astro)
    import re
    src = (ROOT / 'src/pages/galeri.astro').read_text()
    for rel in re.findall(r'\$\{U\}/([^`]+)', src):
        f = UPLOADS / rel
        if f.exists():
            thumb(f)
    print('thumbs galeri selesai ->', THUMBS)

if __name__ == '__main__':
    main()
