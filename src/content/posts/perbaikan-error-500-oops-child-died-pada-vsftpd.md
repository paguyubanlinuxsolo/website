---
title: "Perbaikan Error “500 OOPS: child died” pada Vsftpd."
slug: "perbaikan-error-500-oops-child-died-pada-vsftpd"
pubDate: 2024-01-30T01:17:18Z
updatedDate: 2024-01-30T01:17:19Z
author: "Ahmad Raniri"
description: "Halo teman-teman ! Ada user vsftpd nggak nih ? Pernah mengalami “500 OOPS: child died” ? Kita akan bahas cara mengatasinya. Mari kita simak !"
heroImage: "/images/uploads/2024/01/0-NaQVWgc8XW2B5SBh.webp"
categories: ["artikel"]
tags: ["ftp", "gnu-linux", "linux", "linux-solo", "opensource", "paguyuban-linux-solo", "vsftpd"]
draft: false
---
Halo teman-teman semua ! Bertemu kembali dengan saya (Raniri).  
Ada pengguna ftp dengan vsftpd di sini ? Kebetulan saya beberapa kali perlu menggunakan ftp dan vsftpd. Ketika menggunakan vsfpd di alpine linux saya bertemu error _500 OOPS: child died_. Sebelumnya saya belum pernah menemukan error seperti itu di debian dan ubuntu. Setelah mencari beberapa saat saya menemukan post di laman [Stack Exchange](https://serverfault.com) yang membahas error itu. Ternyata cukup sederhana penyelesaian / perbaikan errornya. Berikut ini pembahasannya !

## Error 500 OOPS: child died, apa penyebabnya ?

Vsftpd versi 3 memperkenalkan fitur baru yaitu _seccomp sandboxing_. Ternyata fitur itu (bagi sebagian user) menyebabkan beberapa masalah di antaranya yaitu error _500 OOPS: child died_. Beruntungnya, fitur tersebut bisa kita _disable_. Untuk men-_disable_ fitur tersebut, kita hanya perlu mengedit konfigurasi vsftpd.

## Bagaimana cara mengatasi error 500 OOPS: child died ?

Seperti yang sudah saya tulis sebelumnya, error _500 OOPS: child died_ bisa kita atasi dengan men-_disable_ fitur _seccomp sandboxing_ melalui berkas konfigurasi vsftpd. Berkas konfigurasi vsftpd biasanya berada di  
/ => etc => vsftpd => vsftp.conf.

Kita perlu menambahkan baris konfigurasi berikut ini ke berkas vsftpd.conf.

```
seccomp_sandbox=NO
```

Setelah kita tambahkan, kita bisa menyimpannya. Jangan lupa untuk melakukan _restart_ pada _service_ vsftpd !

```
// Distro dengan systemd

$ sudo systemctl restart vsftpd
```

```
// Distro dengan init openrc

$ sudo rc-service vsftpd restart
```

```
// Distro dengan sysvinit

$ sudo service vsftpd restart
```

Setelah kita restart service-nya, kita bisa mencoba menggunakan ftp lagi. Saya di sini menggunakan lftp, jadi saya bisa menjalankan perintah seperti ini.

```
$ lftp user@x.x.x.x
```

![](/images/uploads/2024/01/2024-01-30T0749132066806100700.png)

**Kita sudah bisa tersambung.**

## Ringkasan.

Berikut adalah ringkasan untuk bahasan kita kali ini.

1.  Ada error _500 OOPS: child died_ pada vsftpd.
2.  Error tersebut kemungkinan disebabkan oleh fitur _seccomp sandboxing_.
3.  Kita bisa men-_disable_ fitur itu agar error _500 OOPS: child died_ tidak muncul.
4.  Kita bisa menambahkan **seccomp\_sandbox=NO** pada berkas vsftpd.conf untuk men-_disable_ fitur _seccomp sandboxing_.

## Penutup.

Demikian tadi pembahasan tentang cara mengatasi error _500 OOPS: child died_ pada vsftpd. Semoga bisa menjadi referensi dan informasi untuk kita semua. Jika ada yang memiliki alternatif cara, bisa di-_share_ di kolom komentar. Sekian, terima kasih dan sampai berjumpa di bahasan selanjutnya !
