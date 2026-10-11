---
title: "Mencoba Waydroid, Android dalam Kontainer Linux (Bagian 1)."
slug: "mencoba-waydroid-android-dalam-kontainer-linux-bagian-1"
pubDate: 2024-02-27T02:12:13Z
updatedDate: 2024-02-27T02:12:13Z
author: "Ahmad Raniri"
description: "Mencoba menjalankan OS Android di dalam distro Linux ? Bisa dong ! Pakai Waydroid lah… Kita akan membahasnya nih. Berikut ini adalah awalannya."
heroImage: "/images/uploads/2024/02/2024-02-23T0905430756641200700.png"
categories: ["artikel"]
tags: ["android", "gnu-linux", "linux", "opensource", "paguyuban-linux-solo", "waydroid", "wayland"]
draft: false
---
Halo, sobat Linux Solo ! Mohon maaf baru bisa aktif mengisi tulisan lagi. Hari ini kita akan sedikit berbicara tentang waydroid. Saya baru mencobanya di distro _Alpine_ dan lumayan suka. Mari langsung saja kita bahas !

## Waydroid ? Apa itu ?

Jika melihat dari namanya, kita akan menyangka kalau _Waydroid_ ini berhubungan dengan OS _Android_. Sangkaan itu cukup benar, teman-teman. Menurut lama official dari Waydroid sendiri, _Waydroid_ disebut sebagai “_Andoid in a Linux Container_” atau “_Android dalam sebuah kontainer linux_“. _Waydroid_ menggunakan tool LXC untuk menjalankan android.

![](/images/uploads/2024/02/2024-02-23T0905430756641200700.png)

**Tampilan Home Screen Waydroid.**

## Menggunakan Citra / Image LineageOS dan Lingkungan Wayland.

Untuk citra / _image_ android yang digunakan oleh _Waydroid_, _Waydroid_ mengambil citra / _image_ LineageOS. Untuk yang hobi mengoprek perangkat hape android, mungkin sudah tidak asing lagi. Citra / _Image_ yang digunakan terbagi menjadi dua, _System_ dan _Vendor_. Citra / _image_ _System_ dan _Vendor_ diunduh ketika pertama kali menginisiasi (_init_) dan saat _upgrade_. Biasanya berbentuk arsip zip yang nantinya diekstrak menjadi berkas “.img”.

_Waydroid_ perlu dijalankan dalam lingkungan _wayland_. Tidak heran kalau dalam namanya menggunakan unsur “Way…”. Beberapa pengguna menyarankan untuk menjalankan _Waydroid_ menggunakan _KDE_ / _GNOME_ versi _wayland_. Menurut saya itu tidak perlu, karena setelah saya coba dengan kompositor _wayland_ paling ringan (_dwl_), _Waydroid_ bisa berjalan dengan baik. Menggunakan kompositor wayland yg ringan untuk menjalankan _Waydroid_, bisa menjadi alternatif untuk memangkas penggunaan RAM. Apalagi untuk pengguna dengan RAM yang terbatas.

## Ingin mencoba ? Ini syaratnya.

Jika teman-teman ingin mencoba _Waydroid_, ada beberapa syarat yang perlu dipenuhi, di antaranya :

### 1\. Memiliki tool waydroid.

Teman-teman bisa mendapatkan _tool waydroid_ dengan memasangnya lewat paket manajer bawaan distro masing-masing. Pada distro Alpine, _waydroid_ tersedia sebagai paket yang bisa dipasang. Untuk distro yang berbasis debian (debian, ubuntu, dll), bisa menambahkan semacam PPA.

### 2\. Dukungan kernel untuk menjalankan Waydroid.

Untuk bisa menjalankan _Waydroid_, teman-teman perlu mengecek apakah kernel yang teman-teman gunakan sudah bisa mendukung berjalannya _Waydroid_. Cara paling mudah adalah dengan mencoba menjalankan _tool_ lxc. Jika tool _lxc_ berjalan tanpa kendala, maka bisa dipastikan kernel yang kita pakai mendukung untuk berjalannya Waydroid.

### 3\. Lingkungan Wayland.

Seperti yang sudah disinggung sebelumnya, _Waydroid_ membutuhkan lingkungan _wayland_ agar bisa berjalan. Sebagai bocoran, paling mudah dan ringan, teman-teman bisa menggunakan kompositor _sway_ untuk menjalankan _Waydroid_. Selain mudah dan ringan, _sway_ kemungkinan tersedia untuk semua distro.

### 4\. Spesifikasi minimal.

Agar nyaman menggunakan Waydroid, teman-teman sepertinya perlu memiliki minimal RAM 2 atau 3 GB (lebih dari itu malah lebih bagus). Saya mencoba dengan setup minimal (dwl + waydroid), ketika idle memakan RAM sekitar 900-an MB sampai 1 GB. Untuk prosesor dan GPU menyesuaikan.

## Penutup.

Demikian tadi, sedikit awalan untuk bahasan mengenai Waydroid. Untuk bagian kedua, kita akan praktik membuat setup waydroid dan mencoba menjalankan aplikasi android. Semoga bahasan kali ini bisa menjadi referensi sederhana untuk kita semua. Terima kasih dan sampai berjumpa pada bagian kedua !
