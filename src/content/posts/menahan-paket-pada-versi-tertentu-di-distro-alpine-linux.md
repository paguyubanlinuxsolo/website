---
title: "Menahan Paket pada Versi Tertentu di Distro Alpine Linux."
slug: "menahan-paket-pada-versi-tertentu-di-distro-alpine-linux"
pubDate: 2024-01-17T01:49:56Z
updatedDate: 2024-01-17T01:49:57Z
author: "Ahmad Raniri"
description: "Menahan versi paket ? Waduh, apa itu ? Kita akan mencobanya di distro alpine linux. Untuk apa sih ? Kita simak saja ya ! Berikut ini pembahasannya."
heroImage: "/images/uploads/2024/01/alpine-linux-distro-linux-kecil.png"
categories: ["artikel"]
tags: ["alpine", "gnu-linux", "linux", "linux-solo", "opensource", "paguyuban-linux-solo"]
draft: false
---
Halo, teman-teman semua ! Ada pengguna distro alpine, _nggak_ nih ? Hari ini kita akan sedikit mengulik cara menahan (_hold_) versi paket pada versi tertentu di distro alpine. Kebetulan saya pribadi beberapa bulan ini sedang menggunakan distro alpine. Saya penasaran bagaimana cara menahan versi paket pada versi tertentu. Langsung saja kita bahas caranya !

## Mengapa perlu menahan (hold) versi paket ?

Mungkin ada pertanyaan “_Kenapa sih mas, kok versi paketnya perlu ditahan ? Bukannya bagus ya kalau di-update / di-upgrade ?_“. Memang sih, ada baiknya jika _update_ tersedia, maka sebaiknya meng-_update_ / meng-_upgrade_ paket, namun ada beberapa kondisi yang membuat kita perlu menahan paket pada versi tertentu. Beberapa kondisi itu di antaranya :

*   Koneksi internet yang terbatas untuk _update / upgrade_.
*   Versi terbaru diketahui tidak berjalan baik pada perangkat kita.
*   Ingin melakukan _update_ / _upgrade_ sebagian paket (_partial upgr_ade).

Untuk kasus yang saya alami, saya kebetulan menahan versi paket karena ingin melakukan _partial upgrade_, dikarenakan koneksi internet yang terbatas.

## Bagaimana cara menahan versi paket ?

Sebelumnya, saya belum tahu caranya. Melihat manual dari apk (paket manajer distro alpine) juga tidak ada pembahasannya. Beruntungnya, setelah menjelajah sebentar, saya menemukan bahasan yang bisa saya praktekkan. Jika teman-teman ingin mengecek bahasannya, bisa mengunjungi tautan [ini](https://superuser.com/questions/1055060/how-to-install-a-specific-package-version-in-alpine) dan jawaban [ini](https://superuser.com/a/1058665).

Untuk menahan versi paket di distro alpine linux agar tidak ter-_upgrade_, kita hanya perlu menjalankan perintah berikut ini :

```
$ sudo apk add nama_paket=versi_saat_ini
```

Sebagai contoh dalam kasus saya, saya ingin menahan paket **linux-lts** dan **linux-lts-dev** agar berada di versi 6.6.11-r0 (versi terbaru adalah 6.6.12-r0). Maka saya perlu menjalankan perintah berikut ini :

```
$ sudo apk add linux-lts=6.6.11-r0 linux-lts-dev=6.6.11-r0
```

Setelah perintah di atas dijalankan, maka kedua paket di atas akan tertahan di versi yang sudah ditentukan. Ketika kita melakukan _upgrade_ paket, semua paket akan ter-_upgrade_ kecuali yang kita tahan.

## Bagaimana caranya agar paket yang tertahan bisa di-upgrade lagi ?

Setelah kita tahu cara menahan versi paket, lalu bagaimana cara agar paket yang tertahan bisa kita _upgrade_ lagi ? Caranya akan kita paparkan pada pertemuan selanjutnya.

## Ringkasan.

Berikut ini adalah ringkasan bahasan kita pada hari ini :

1.  Paket pada distro alpine linux bisa kita tahan versinya.
2.  Paket yang ditahan tidak akan ter-_upgrade_.
3.  Perintah yang bisa kita jalankan adalah

```
$ sudo apk add nama_paket=versi_saat_ini
```

## Referensi dan kredit.

Berikut ini adalah referensi dan kredit untuk bahasan kita hari ini.

1.  Post di forum [superuser](https://superuser.com) tentang cara [memasang paket dengan versi yang spesifik di alpine linux](https://superuser.com/questions/1055060/how-to-install-a-specific-package-version-in-alpine).
2.  Jawaban dari kaiser (member forum superuser), \[[tautan](https://superuser.com/a/1058665)\].

## Penutup.

Demikian tadi, cara sederhana menahan versi paket pada distro alpine linux. Semoga bisa bermanfaat dan menjadi satu referensi baru bagi kita, utamanya saya pribadi. Oh ya, untuk cara upgrade paket yang tertahan akan kita bahas pada pertemuan selanjutnya. Sekian, terima kasih dan sampai bertemu pada bahasan selanjutnya !
