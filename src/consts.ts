export const SITE = {
  name: 'Paguyuban Linux Solo',
  description:
    'Sebuah wadah untuk para pengguna, pemerhati, pecinta, pengembang, dan buat pemula yang ingin mengenal dunia FLOSS dan GNU/Linux khususnya wilayah Solo Raya',
  logoSquare: '/images/uploads/2023/10/PLiS-NuLogo_inblack.png',
  logoLandscape: '/images/uploads/2023/11/logo-landscape-linux-solo.png',
  contact: {
    whatsapp: { label: '+62 896 8141 4639', url: 'https://wa.me/6289681414639' },
    telegram: { label: 't.me/linuxsolo', url: 'https://t.me/linuxsolo' },
    instagram: { label: 'instagram.com/linux.solo', url: 'https://www.instagram.com/linux.solo/' },
    github: { label: 'github.com/paguyubanlinuxsolo', url: 'https://github.com/paguyubanlinuxsolo' },
    linkedin: { label: 'linkedin.com/in/linuxsolo', url: 'https://www.linkedin.com/in/linuxsolo/' },
  },
  nav: [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang', href: '/tentang/' },
    { label: 'Sejarah', href: '/sejarah/' },
    { label: 'Pengurus', href: '/pengurus/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Kegiatan', href: '/kegiatan/' },
    { label: 'Galeri', href: '/galeri/' },
    { label: 'Kontak', href: '/kontak/' },
  ],
  categoryLabels: { artikel: 'Artikel', event: 'Event', dokumentasi: 'Dokumentasi' } as Record<string, string>,
};
