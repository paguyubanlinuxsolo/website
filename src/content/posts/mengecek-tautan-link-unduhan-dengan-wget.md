---
title: "Mengecek Tautan / Link Unduhan dengan wget."
slug: "mengecek-tautan-link-unduhan-dengan-wget"
pubDate: 2024-01-15T03:36:32Z
updatedDate: 2024-01-15T03:36:34Z
author: "Ahmad Raniri"
description: "Halo, teman-teman ! Kadang, kita punya link atau tautan unduhan. Kita tidak tahu apakah tautan itu valid atau tidak. Kita bisa mengeceknya dengan tool wget lho ! Ayo kita simak !"
heroImage: "/images/uploads/2024/01/2024-01-15T1031512689417220700.png"
categories: ["artikel"]
tags: ["gnu-linux", "linux", "linux-solo", "opensource", "paguyuban-linux-solo", "wget"]
draft: false
---
Halo, teman-teman semuanya ! Bagaimana 2 minggu pertama di 2024 nih ? Semoga lebih baik ya ? Aamiin. Kali ini saya (Raniri) akan sedikit berbagi tips sederhana untuk mengecek tautan / link unduhan (download) menggunakan _tool wget_. Berikut ini adalah pemahasan singkatnya !

## Untuk apa dan apa yang dicek ?

Kadangkala kita menemukan tautan unduhan / _download_ sebuah berkas / _file_. Kita bisa mengeceknya untuk memastikan apakah tautan itu valid atau tidak, berkas yang diunduh itu ada atau tidak, sebelum kita mengunduhnya dengan _wget_. Saya mendapatkan tutorial ini ketika dulu menyusun sebuah skrip untuk mengecek tautan unduhan ISO distro linux, bisa dilihat di [sini](https://github.com/lidgnulinux/Kumpulan-ISO-Distro).

## Apa yang kita butuhkan ?

Kita hanya membutuhkan satu _tool_ utama, _wget_. _Tool wget_ kemungkinan tersedia untuk semua distro dan bisa kita pasang lewat paket manager.

## Bagaimana cara mengecek tautan unduhan dengan wget ?

Kita bisa menggunakan opsi _–spider_ pada _tool wget_. Dalam halaman manual _wget_ disebutkan jika opsi _–spider_ bisa kita gunakan untuk mengecek keberadaan URL / tautan. Berikut ini adalah contohnya, misalkan kita punya tautan unduhan yaitu https://github.com/swaywm/sway/archive/refs/heads/v1.9.tar.gz, maka cara mengeceknya yaitu :

```
$ wget --spider <url / tautan>
$ wget --spider https://github.com/swaywm/sway/archive/refs/heads/v1.9.tar.gz
```

Jika tautan yang kita miliki valid maka _output_ yang kita dapatkan sebagai berikut :

```
Connecting to github.com (20.205.243.166:443)
Connecting to codeload.github.com (20.205.243.165:443)
remote file exists
```

Baris terakhir _output_ di atas menunjukan kalau tautan unduhan kita valid dan berkas yang akan kita unduh memang ada. Bagaimana jika tautan unduhan kita tidak valid ? Jika tidak valid, maka kita akan mendapatkan _output_ seperti ini :

```
Connecting to github.com (20.205.243.166:443)
Connecting to codeload.github.com (20.205.243.165:443)
wget: server returned error: HTTP / 1.1 404 Not Found
```

## Ringkasan.

Berikut ini adalah ringkasan untuk bahasan kita kali ini.

1.  Wget selain sebagai alat unduh, bisa kita gunakan untuk mengecek tautan unduhan.
2.  Opsi yang bisa kita gunakan adalah _–spider_.
3.  Perintah yang bisa kita gunakan yaitu  
      
    $ wget –spider <URL / tautan>

## Penutup.

Baiklah, demikian tadi cara sederhana untuk megecek tautan unduhan menggunakan _tool wget_. Semoga bisa bermanfaat untuk kita semua. Jika ada cara yang lain, mungkin bisa berbagi di kolom komentar. Terima kasih, sekian dan sampai berjumpa pada bahasan selanjutnya !
