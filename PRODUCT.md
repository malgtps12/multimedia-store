# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Publik kampus (dosen, teman seangkatan, panitia kegiatan) dan rekruter/mitra industri yang membuka link dari bio media sosial atau pesan pribadi. Situasi: buka di ponsel saat scroll santai, atau di desktop saat menilai portofolio. Pekerjaan mereka: tahu cepat siapa pemiliknya, dari prodi apa, sudah lewati pendidikan apa, dan bagaimana menghubunginya.

## Product Purpose

Halaman profil satu orang untuk Muhammad Jamaluddin (MXL), mahasiswa Teknologi Rekayasa Multimedia. Menjadi bukti kemampuan teknis dan visual pemiliknya, sekaligus kartu identitas digital yang bisa dibagikan. Sukses berarti pengunjung mengingat tampilannya dan percaya pemiliknya benar-benar bisa membangun pengalaman web.

## Positioning

Bukan template portofolio: satu halaman yang memperagakan keterampilan multimedia pemiliknya lewat motion dan komposisi, dengan data pribadi nyata (NIM, riwayat sekolah, akun sosmed) sebagai isi — bukan mockup fiktif.

## Operating Context

Dibuka dari tautan bio Instagram/TikTok atau kiriman WhatsApp. Sering di ponsel dengan audio mati, kadang dengan suara. Tidak ada login, tidak ada transaksi. Halaman statis; tidak ada server yang diperlukan untuk tampil.

## Capabilities and Constraints

- Konten wajib tetap: hero perkenalan, biodata (nama, NIM, prodi, jurusan, TTL, alamat, email tersamar, no. HP, hobi), riwayat pendidikan (SD/SMP/SMK), blok visi, misi, alumni, kompetensi + statistik, alur 3 langkah, promo prodi, kartu live status (jam, hitung mundur ulang tahun 12 September, uptime), tautan Instagram `@jmlmall_` dan TikTok `@mmaaaaallll`.
- Fitur wajib tetap: musik latar dengan tombol putar/jeda yang bisa digeser, sambutan ulang tahun otomatis pada 12 September, efek glow mengikuti kursor pada foto, transisi pembuka halaman, reveal saat scroll, navigasi jangkar.
- Aset nyata: `mal.jpeg` (720x1280), `mal2.jpeg` (874x875), `soundweb.mp3`.
- Stack saat ini: HTML + CSS + JS statis tanpa build step. Harus tetap bisa dibuka sebagai file statis atau di-deploy ke hosting statis.
- Bahasa isi: Indonesia.
- Nomor HP dan email sudah publik di halaman; jangan menambah data pribadi baru.

## Brand Commitments

Nama tampil "MXL" / "TIK." Inisial MXL dipakai sebagai tanda pembuka. Palet incumbent ungu-violet dengan aksen mint dan oranye. Nada: percaya diri, teknis, sedikit teatrikal.

## Evidence on Hand

Foto asli pemilik (2 berkas), berkas audio asli, data akademik nyata. Tidak ada testimoni, klien, penghargaan, atau metrik industri — jangan mengarang.

## Product Principles

1. Peragakan kemampuan, jangan klaim. Motion dan komposisi adalah buktinya.
2. Data pribadi harus terbaca dalam satu kali scroll cepat, tanpa harus menunggu animasi.
3. Satu momen koreografi yang diingat, bukan efek tersebar di semua section.
4. Ponsel dulu: tanpa audio, tetap utuh dan cepat.
5. Identitas MXL tetap dikenali setelah rombak.

## Accessibility & Inclusion

Harus punya jalur `prefers-reduced-motion` yang mematikan gerak spasial tanpa menghilangkan isi. Navigasi keyboard berfungsi. Kontras teks minimal 4.5:1.
