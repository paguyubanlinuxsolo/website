---
title: "Membangun Paket Kernel pada Distro Debian dan Turunannya (Bagian I)."
slug: "membangun-paket-kernel-pada-distro-debian-dan-turunannya-bagian-i"
pubDate: 2023-12-27T02:06:02Z
updatedDate: 2023-12-27T15:36:44Z
author: "Ahmad Raniri"
description: "Halo, teman-teman ! Hari ini kita akan sedikit mengulik persiapan untuk membangun kernel pada distro Debian dan turunannya. Untuk bagian keduanya, kita akan langsung praktek cara membangun paket kernelnya. Mari disimak !"
heroImage: "/images/uploads/2023/12/best-distros-based-on-debian.webp"
categories: ["artikel"]
tags: ["compile", "debian", "gnu-linux", "kernel", "paguyuban-linux-solo", "ubuntu"]
draft: false
---
Halo, teman-teman semua. Bertemu kembali dengan saya (Raniri). Kali ini kita akan sedikit membahas tentang cara membangun paket _kernel_ pada distro _Debian_ dan turunannya. Wah, apakah susah ? Oh tentu tidak. Tapi kalau memakan waktu, kemungkinan iya, hehe. Kali ini akan kita bagi menjadi 2 bagian, bagian pertama kita anggap saja sebagai pengantar dan bagian ke dua untuk langkah-langkahnya.

## Mengapa membangun paket kernel sendiri ?

Mungkin di antara kita ada yang heran / penasaran, kenapa capek-capek membangun paket kernel sendiri. Bukannya pengembang distro _Debian_ dan turunannya sudah menyediakan paket _kernel_ ? Ya, itu memang benar, namun ada beberapa alasan mengapa sebagian pengguna lebih memilih membangun _kernel_ / membangun paket kernel sendiri. Beberapa alasan itu di antaranya :

1.  Ingin mendapatkan versi paling baru.
2.  Ingin menerapkan tambalan / _patch_ paling update.
3.  Ingin menerapkan konfigurasi yang sudah disesuaikan dengan perangkat.
4.  Ingin menghindari kernel yang terkesan _gemuk_ / _bloat_.
5.  Memiliki kelapangan waktu tersendiri.

## Persiapan membangun paket kernel.

Sebelum kita melakukan pembangunan paket kernel, kita perlu menyiapkan beberapa hal terlebih dahulu. Bisa berupa menyiapkan perkakas / _tool_, konfigurasi dan lain-lain. Untuk lebih jelasnya, berikut ini adalah hal-hal yang perlu kita persiapkan.

1.  Dependensi paket, kita perlu memasang beberapa paket agar kernel bisa dibangun secara lancar. Dependensi yang kita butuhkan di antaranya :  
    *   build-essential.
    *   libncurses-dev.
    *   bison.
    *   flex.
    *   libssl-dev.
    *   libelf-dev.  
        
2.  Kode sumber kernel, bisa diunduh di laman [repositori kernel](https://kernel.org). Sebagai contoh kernel versi 6.6.8, bisa diunduh di tautan [ini](https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-6.6.8.tar.xz).  
    
3.  Konfigurasi kernel, kita bisa mendapatkan konfigurasinya di /boot/config-(versi\_kernel) atau konfigurasi yang sudah kita atur sebelumnya.  
    
4.  Kesabaran, ini yang tidak kalah penting. Pembangunan paket kernel membutuhkan waktu. Bisa jadi cepat jika dilakukan di perangkat yang spesifikasinya gahar dan akan cukup lama jika dilakukan pada perangkat jadul / kentang.

## Sudah siap membangun paket kernel ? Tunggu bagian keduanya ya !

Setelah kita selesai mempersiapkan beberapa hal yang diperlukan, saatnya membangun paket kernelnya. Pada bagian kedua nanti kita akan berfokus pada langkah-langkahnya. Terima kasih dan sampai berjumpa pada bagian keduanya !
