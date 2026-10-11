---
title: "Membangun Paket Kernel pada Distro Debian dan Turunannya (Bagian 2)."
slug: "membangun-paket-kernel-pada-distro-debian-dan-turunannya-bagian-2"
pubDate: 2024-01-01T07:45:53Z
updatedDate: 2024-01-01T07:45:54Z
author: "Ahmad Raniri"
description: "Halo, Sobat Paguyuban Linux Solo ! Melanjutkan bahasan kita beberapa waktu lalu seputar pembangunan paket kernel. Hari ini akan kita paparkan langkah-langkahnya. Mari disimak !"
heroImage: "/images/uploads/2023/12/best-distros-based-on-debian.webp"
categories: ["artikel"]
tags: ["debian", "gnu-linux", "kernel", "linux", "linux-solo", "opensource", "paguyuban-linux-solo", "ubuntu"]
draft: false
---
Halo sobat paguyuban semuanya. Masih bersama saya (Raniri) dan kita akan melanjutkan bahasan kita tahun lalu seputar pembangunan paket kernel. Sebagai pengingat, kita sebelumnya sudah membahas terkait persiapan, untuk hari ini kita akan melakukan pembangunan paket. Untuk langkah-langkahnya hanya terdiri dari 4 langkah. Sebagai bocoran atau spoiler, kemungkinan prakteknya akan lama. Oleh karena itu, nanti sembari menunggu, bisa disambi beraktifitas atau melakukan hal yang lain.

Note : Untuk bagian pertama, bisa dilihat pada tautan [ini](/membangun-paket-kernel-pada-distro-debian-dan-turunannya-bagian-i/)

## Langkah-langkah membangun paket kernel.

Berikut ini adalah beberapa langkah untuk membangun paket kernel, untuk lebih detailnya akan kita jabarkan di bawah.

1.  Ekstrak kernel.
2.  Mengkonfigurasi kernel.
3.  Membangun paket kernel.
4.  Memasang paket kernel.

### 1\. Extrak kernel.

Sebelumnya kita sudah mengunduh arsip kode sumber kernel dari laman kernel.org. Sekarang saatnya untuk mengekstrak arsip itu supaya bisa kita gunakan. Ibarat makanan yang terbungkus, kita perlu membukanya dulu baru kita nikmati. Kita bisa menggunakan perintah di bawah ini.

```
$ tar -xf linux-VERSION.tar.xz
$ cd linux-VERSION
```

### 2\. Mengkonfigurasi kernel.

#### 2.0 Salin dan simpan konfigurasi.

Kita perlu menyalin berkas konfigurasi kernel. Berkas itu akan kita gunakan untuk mengatur fitur atau modul apa saja yang akan kita sertakan. Jika belum begitu paham cara mengatur / mengkonfigurasinya, menyalinnya saja sudah cukup. Kita bisa menggunakan perintah di bawah ini.

```
$ cp /boot/config-VERSION .config 
$ make menuconfig
```

![](/images/uploads/2024/01/3.make-menuconfig.png)

**Contoh jendela konfigurasi kernel.**

**Note :** setelah masuk jendela konfigurasi, kita bisa langsung menyimpan pengaturan / konfigurasi dengan memilih pilihan `save`.

#### 2.1 Disable system keys.

Kita perlu men-disable _system keys_ agar kita tidak bertemu _error_ seperti berikut ini :

```
make[4]: *** No rule to make target 'debian/certs/test-signing-certs.pem', needed by 'certs/x509_certificate_list'.  Stop.
make[4]: *** Waiting for unfinished jobs....
```

dan pada akhirnya paket kernel akan gagal terbentuk. Untuk men-disable _system keys_ kita bisa menggunakan perintah berikut ini.

```
$ scripts/config --disable SYSTEM_TRUSTED_KEYS
$ scripts/config --disable SYSTEM_REVOCATION_KEYS
```

Note : sebagai tambahan, kita perlu menambahkan baris ini ke `.config`.

```
CONFIG_SYSTEM_TRUSTED_KEYS=""
```

#### 2.2 Skip debugging.

Selain _system keys_, kita juga perlu men-_disable debugging_. Dengan asumsi kita tidak akan melakukan _debugging_ pada kernel kita. Langkah ini juga akan mengurangi durasi kompilasi, karena kita tidak akan membangun paket linux-image-VERSION-dbg. Lalu, bagaimana cara men-_disable debugging_ ? Caranya cukup mudah, kita bisa menggunakan perintah berikut ini.

```
$ scripts/config --disable DEBUG_INFO
$ scripts/config --enable DEBUG_INFO_NONE
```

### 3\. Membangun paket kernel.

Konfigurasi sudah diatur, saatnya membangun paket kernel kita ! Kita hanya perlu satu baris perintah berikut ini. Oh ya, kemungkinan durasinya akan lama (tergantung _gemuk-kurusnya_ konfigurasi yang kita miliki). Sembari menunggu, bisa _disambi_ melakukan aktifitas lain.

```
$ nice make -j4 bindeb-pkg
```

### 4\. Memasang paket kernel.

Jika kompilasi dan pembangunan paket berjalan lancar, kita akan mendapatkan beberapa berkas paket berekstensi _\*.deb_. Paket-paket itu sebagai berikut :

1.  linux-headers-VERSION\_amd64.deb (paket header kernel, berguna jika ingin mengkompilasi modul atau _driver_).
2.  linux-image-VERSION\_amd64.deb (paket kernel utama).
3.  linux-libc-dev\_VERSION\_amd64.deb (paket header kernel untuk development).

Kita bisa memasangnya dengan _tool dpkg_.

```
$ cd ..
$ sudo dpkg -i *.deb
```

## Referensi.

Berikut ini adalah satu-dua referensi yang bisa teman-teman baca. Jika ada sumber lain bisa dibagi di komentar (share link gan !).

1.  [Build a custom kernel package for Debian](https://www.dwarmstrong.org/kernel/) oleh [Daniel Wayne Armstrong](https://www.dwarmstrong.org/).
2.  [Laman Wiki debian](https://wiki.debian.org/BuildADebianKernelPackage) tentang pembangunan paket kernel.

## Penutup.

Baiklah, demikian tadi sedikit bahasan tentang membangun paket kernel untuk distro Debian dan turunannya. Bisa teman-teman coba-coba jika ada waktu senggang. Terima kasih dan sampai bertemu pada bahasan selanjutnya !
