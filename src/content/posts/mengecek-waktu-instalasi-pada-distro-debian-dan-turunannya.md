---
title: "Mengecek Waktu Instalasi pada Distro Debian dan Turunannya."
slug: "mengecek-waktu-instalasi-pada-distro-debian-dan-turunannya"
pubDate: 2023-12-25T23:20:44Z
updatedDate: 2023-12-26T17:04:13Z
author: "Ahmad Raniri"
description: "Halo, teman-teman Paguyuban linux Solo ! Pernah penasaran tidak dengan waktu saat kita memasang distro ? Kira-kira kapan ya ? Bagaimana cara mengeceknya ? Nah, hari ini akan sedikit kita bahas."
heroImage: "/images/uploads/2023/12/best-distros-based-on-debian.webp"
categories: ["artikel"]
tags: ["debian", "gnu-linux", "linux", "opensource", "ubuntu"]
draft: false
---
Halo, perkenalkan saya Ahmad Raniri, salah satu anggota **Paguyuban Linux Solo**. Hari ini saya akan membagikan tips sederhana untuk mengecek waktu instalasi pada distro **Debian** dan turunannya. Waktu instalasi yang saya maksud adalah waktu pertama kali distro dipasang pada perangkat kita. Manfaatnya sendiri cukup sederhana, yaitu untuk sekadar mengecek sudah berapa lama kita menggunakan distro pada perangkat kita.

Ketika kita misalnya ditanya “_mas, umur anda berapa ?_“, kita bisa menjawab dengan menghitung tahun saat ini, lalu dikurangi tahun kelahiran kita. Bisa juga dengan mengecek pada kartu identitas kita (KTP). Lalu bagaimana dengan distro _Debian_ dan turunannya ? Nah, akan kita bahas pada hari ini.

## Apa yang kita butuhkan ?

Untuk dapat mengetahui waktu instalasi, kita hanya membutuhkan beberapa hal, di antaranya :

*   Berkas log instalasi, _/var/log/installer_ dan _/var/log/bootstrap.log_.
*   _Tool_ / perkakas _awk_, _head_, dan _ls_.

## Mengecek waktu instalasi menggunakan berkas log.

Ketika kita memasang distro _Debian_ dan turunannya menggunakan metode pemasangan standar (dengan _installer_), maka pada saat pemasangan biasanya akan terbentuk berkas _log_ instalasi. Berkas _log_ ini biasanya berada di _/var/log/installer_. Kita bisa mengecek waktu instalasi dengan dengan melihat properti pada berkas-berkas _log_ itu. Bagaimana caranya ? Kita hanya perlu menjalankan perintah berikut ini. Mohon maaf jika hanya menggunakan tangkapan layar / _screensshot_, dikarenakan perintah _awk_ di bawah sepertinya membuat post tidak terupdate.

![](/images/uploads/2023/12/perintah-log.png)

Contoh keluaran / output yang kita dapatkan adalah sebagai berikut.

![Mengecek Waktu Instalasi pada Distro Debian dan Turunannya.](/images/uploads/2023/12/2023-12-25T1017566975929310700-1.png)

Output atau keluaran yang kita dapatkan, menunjukkan bahwa berkas-berkas log memiliki properti waktu “25 Juli 2021”. Properti “25 Juli 2021” menunjukkan waktu pemasangan / instalasi distro kita.

Jika kita menggunakan metode pemasangan yang lain (debootstrap), kita juga bisa menggunakan berkas log instalasinya untuk mengecek waktu instalasi. Biasanya berada di /var/log/bootstrap.log. Kita bisa mengeceknya dengan perintah berikut ini.

![](/images/uploads/2023/12/2023-12-26T0601577554799160700.png)

Contoh output atau keluarannya adalah sebagai berikut.

```
2022-12-17 08:32:12
```

Hasil _output_ di atas memiliki arti distro terpasang pada tanggal 17 di bulan Desember tahun 2022.

## Ringkasan.

1.  Kita bisa menelusuri waktu instalasi dari distro Debian dan turunannya.
2.  Kita bisa melihat pada direktori _/var/log/installer_ dan berkas _/var/log/bootstrap.log_.
3.  Perintah untuk mengecek yang bisa kita gunakan adalah dengan perintah _ls_, _awk_ dan _head_.
4.  Waktu instalasi ditunjukkan oleh properti waktu pada berkas yang berada di direktori _/var/log/installer_ dan informasi pada berkas _/var/log/bootstrap.log_.

## Penutup.

Demikian tadi sedikit pembahasan tentang cara mengecek waktu instalasi pada distro Debian dan turunannya. Semoga bisa menjadi referensi bagi kita semua. Terima kasih dan sampai berjumpa pada pembahasan selanjutnya.
