---
title: "Mengatur Paket Manajer Apt untuk Menggunakan IPv4."
slug: "mengatur-paket-manajer-apt-untuk-menggunakan-ipv4"
pubDate: 2024-01-05T00:20:56Z
updatedDate: 2024-01-05T00:20:56Z
author: "Ahmad Raniri"
description: "Halo, Sobat Paguyuban semua ! Hari ini kita akan sedikit mengulik salah satu paket manajer yaitu apt. Kita akan mengaturnya agar menggunakan IPv4 ketika mengunduh paket. Mari kita simak !"
heroImage: "/images/uploads/2024/01/2024-01-05T0713482935988920700.png"
categories: ["artikel"]
tags: ["apt", "debian", "gnu-linux", "ipv4", "linux", "opensource", "paguyuban-linux-solo", "ubuntu"]
draft: false
---
Hari kamis kemarin, saya mencoba mengkonversi dan migrasi sistem _Debian_ saya menjadi _Devuan_. Dalam salah satu prosesnya, saya perlu meng-_update_ dan meng-_upgrade_ repositori dan paket. Salah satu kendala pun muncul ketika melakukan _update_ dan _upgrade_, yaitu apt hanya terlihat _stuck_ seperti kesusahan terhubung dengan _mirror_. Apt terlihat _stuck_ pada kondisi seperti ini.

```
0% [Connecting to deb.devuan.org]
```

![](/images/uploads/2024/01/2024-01-05T0638576554800630700.png)

**Devuan 6 hasil konversi dari Debian Unstable.**

Awalnya, saya mengira ini hanya masalah _mirror_. Saya berinisiatif untuk mencari solusi dan salah satu solusinya adalah mengatur paket manajer _apt_ untuk menggunakan IPv4 secara _default_. Secara mengejutkan, setelah saya atur, apt berjalan lancar dan tidak lagi _stuck_. Saya mulai berpikir kalau akar permasalahannya mungkin memang pada _apt_ yang tidak menggunakan IPv4 ketika terhubung dengan _mirror_.

Lalu, bagaimana cara kita mengatur apt agar menggunakan IPv4 ? Berikut ini adalah pembahasannya.

## Mengatur paket manajer apt untuk menggunakan IPv4.

### Persiapan.

Berikut ini adalah beberapa hal yang perlu kita persiapkan.

1.  Teks editor, di sini saya menggunakan _VIM_.
2.  Berkas konfigurasi, kita bisa membuatnya di **/ etc / apt / apt.conf.d /** , untuk nama berkasnya yaitu **1000-force-ipv4-transport**.
3.  Kesabaran.

### Langkah-langkah.

Berikut ini adalah beberapa langkah yang bisa kita jalankan.

1.  Masuklah ke direktori !
2.  Edit berkas **1000-force-ipv4-transport** !
3.  Tambahkan konfigurasinya yaitu **Acquire::ForceIPv4 “true”;** !
4.  Simpan konfigurasinya lalu keluar !
5.  Coba jalankan apt !

![](/images/uploads/2024/01/2024-01-05T0659275333582570700.png)

**Berkas konfigurasi agar apt menggunakan IPv4.**

Bagaimana ? Cukup mudah bukan ?

## Ringkasan.

Berikut ini adalah beberapa ringkasan untuk bahasan kita kali ini.

1.  Ada kalanya apt mengalami masalah _stuck_ ketika terhubung dengan _mirror_.
2.  Salah satu penyebabnya, kemungkinan apt tidak menggunakan IPv4 secara _default_.
3.  Untuk mengatur apt agar menggunakan IPv4, kita bisa membuat satu berkas konfigurasi.
4.  Berkas konfigurasi bisa kita buat di direktori **/ etc / apt / apt.conf.d/** .
5.  Kita bisa mengisi konfigurasinya dengan isian **Acquire::ForceIPv4 “true”;** .

## Referensi dan kredit.

Berikut ini adalah referensi dan kredit untuk pembahasan kali ini.

1.  [Cara Mengatur apt untuk menggunakan IPv4 / IPv6](https://www.cyberciti.biz/faq/howto-use-apt-get-with-ipv6-or-ipv4-transport-on-ubuntu-debian/).
2.  [Vivek Gite](https://vivekgite.com/), penulis bahasan pada blog Nixcraft.

## Penutup.

Demikian tadi cara sederhana untuk mengatur apt agar bisa menggunakan IPv4. Semoga bisa menjadi satu informasi dan referensi baru untuk kita. Semoga bahasan kita kali ini bisa bermanfaat juga untuk kita semua. Terima kasih dan sampai berjumpa pada bahasan selanjutnya !
