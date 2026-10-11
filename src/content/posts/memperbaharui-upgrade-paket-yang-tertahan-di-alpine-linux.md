---
title: "Memperbaharui / Upgrade Paket yang Tertahan di Alpine Linux."
slug: "memperbaharui-upgrade-paket-yang-tertahan-di-alpine-linux"
pubDate: 2024-01-25T00:59:51Z
updatedDate: 2024-01-25T00:59:51Z
author: "Ahmad Raniri"
description: "Sesuatu yang tertahan, memang kadang harus dilepas… Lho ? hehe. Melanjutkan bahasan kemarin. Kita akan mengulik cara meng-update paket yang tertahan di Alpine Linux. Ayo kita simak !"
heroImage: "/images/uploads/2024/01/alpine-linux-distro-linux-kecil.png"
categories: ["artikel"]
tags: ["alpine", "gnu-linux", "linux", "linux-solo", "opensource", "paguyuban-linux-solo"]
draft: false
---
Halo, teman-teman semua. Masih bersama saya (Raniri). Hari ini kita akan sedikit melanjutkan bahasan yang [kemarin](/menahan-paket-pada-versi-tertentu-di-distro-alpine-linux/), berkaitan tentang paket distro Alpine linux. Sedikit pengingat, pada bahasan kemarin kita membahas cara menahan paket agar tidak bisa diperbaharui / di-_upgrade_. Sebagai kelanjutannya, hari ini kita akan mengulik cara agar paket yang semula ditahan agar bisa kita perbaharui / _upgrade_. Mari, langsung saja kita bahas !

## Dua cara memperbaharui / upgrade paket yang tertahan.

Untuk bisa memperbaharui / _upgrade_ paket yang tertahan, kita bisa menggunakan dua cara, yaitu :

1.  Menentukan dan menggunakan versi paling baru / _update_ dari sebuah paket.
2.  Menggunakan opsi “_\-u_” yang dimiliki oleh _tool_ apk.

### 1\. Menentukan dan menggunakan versi paling baru / _update_ dari sebuah paket.

Paket yang tertahan bisa kita _upgrade_ ke versi paling baru dengan memasang ulang / _reinstall_ dan menentukan versi paling baru / _update_. Untuk melihat versi paling baru dari sebuah paket, kita bisa menggunakan perintah-perintah berikut.

```
$ apk info nama_paket
```

```
$ apk policy nama_paket
```

Sebagai contoh, kita akan mengambil paket yang kita bahas kemarin, yaitu paket kernel lts (linux-lts). Berikut ini adalah contoh keluaran / _output_\-nya.

![](/images/uploads/2024/01/20240125_07h20m21s_grim.png)

Dari gambar di atas, kita mendapatkan dua _output_ dari dua perintah. Versi kernel-lts yang kemarin kita tahan ternyata memiliki versi paling update yaitu 6.6.13-r0. Untuk memperbaharui / update paketnya, kita bisa menjalankan perintah berikut ini.

```
$ sudo apk add linux-lts=versi_paket 
```

```
$ sudo apk add linux-lts=6.6.13-r0
```

Dengan menjalankan perintah di atas, paket akan ter-_update_.

![](/images/uploads/2024/01/20240125_07h28m31s_grim.png)

### 2\. Menggunakan opsi “_\-u_” yang dimiliki oleh _tool_ apk.

Cara kedua agak lebih sederhana, karena kita tidak perlu susah-susah mencari tahu versi paketnya dulu. Untuk meng-_update_ paket yang tertahan dengan opsi “_\-u_“, kita bisa menjalankan perintah berikut ini.

```
$ sudo apk add -u nama_paket
```

```
$ sudo apk add -u linux-lts
```

Dengan menjalankan perintah di atas, paket akan ter-_update_.

![](/images/uploads/2024/01/20240125_07h36m25s_grim.png)

## Lalu ?

Baiklah, paket yang sebelumnya kita tahan sudah bisa kita _update_. Lalu apa lagi ya ? Wah, sebenarnya berkaitan dengan paket alpine linux, masih banyak yang bisa dikulik. Untuk yang lain bisa kita simpan dulu ya.

## Ringkasan.

Berikut ini adalah beberapa ringkasan untuk bahasan kita kali ini.

1.  Paket yang sebelumnya kita tahan, bisa kita perbaharui / _update_.
2.  Cara yang bisa kita pakai setidaknya ada 2, yaitu :  
    – Dengan menentukan versi paling baru dari sebuah paket.  
    – Dengan menggunakan opsi “-u” pada _tool_ apk.
3.  Perintah-perintah yang bisa kita gunakan di antaranya :

```
$ sudo apk add nama_paket=versi_paket 
```

```
$ sudo apk add -u nama_paket
```

## Penutup.

Demikian tadi, cara sederhana untuk memperbaharui paket yang tertahan di Alpine linux. Semoga menjadi informasi dan referensi untuk kita bersama. Mungkin jika ada kekurangan, bisa lho _nimbrung_ di kolom komentar. Sekian, terimakasih dan sampai berjumpa di bahasan selanjutnya !
