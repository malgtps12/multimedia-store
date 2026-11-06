# MXL — Teknologi Rekayasa Multimedia

Portfolio website untuk **Muhammad Jamaluddin (MXL)**, mahasiswa Program Studi Teknologi Rekayasa Multimedia, Jurusan Teknik Informatika, Politeknik Negeri Lhokseumawe.

**Live Demo:** Buka `index.html` di browser atau deploy ke hosting statis.

---

## 📋 Tentang Project

Halaman profil satu orang yang mendemonstrasikan kemampuan teknis dan visual pemiliknya melalui:
- **Motion & Animation** — Transisi pembuka dengan GSAP, reveal saat scroll, animasi interaktif
- **Responsive Design** — Optimal di mobile dan desktop
- **Multimedia** — Musik latar interaktif, foto dengan efek glow, layout yang sophisticated
- **Aksesibilitas** — Dukungan `prefers-reduced-motion`, navigasi keyboard, kontras teks ≥4.5:1

---

## 🎯 Fitur

✅ Perkenalan hero dengan animasi pembuka  
✅ Biodata mahasiswa lengkap (NIM, prodi, kontak)  
✅ Riwayat pendidikan (SD, SMP, SMK)  
✅ Visi, misi, dan informasi alumni  
✅ Kompetensi dan statistik  
✅ Alur 3 langkah menuju lulus (pinned horizontal scroll)  
✅ Promosi program studi  
✅ Live status (jam, hitung mundur ulang tahun, uptime)  
✅ Musik latar dengan tombol putar/jeda yang bisa digeser  
✅ Sambutan ulang tahun otomatis (12 September)  
✅ Efek glow mengikuti kursor pada foto  
✅ Tautan media sosial (Instagram & TikTok)

---

## 📁 Struktur Folder

```
mxl-portfolio/
├── index.html              # File HTML utama
├── css/
│   └── style.css           # Stylesheet utama
├── js/
│   ├── script.js           # Script utama (motion, interaktivitas)
│   └── libs/               # Library eksternal
│       ├── gsap.min.js
│       ├── ScrollTrigger.min.js
│       ├── SplitText.min.js
│       └── DrawSVGPlugin.min.js
├── assets/
│   ├── images/             # Foto dan visual
│   │   ├── mal.jpeg        # Foto profil (720×1280)
│   │   └── mal2.jpeg       # Foto hero (874×875)
│   └── audio/              # Audio & musik
│       └── soundweb.mp3    # Musik latar
├── docs/                   # Dokumentasi
│   ├── DESIGN.md           # Design system & komponen
│   ├── PRODUCT.md          # Product specification
│   └── SETUP.md            # Setup & deployment (ini nanti)
├── package.json            # Project metadata
├── package-lock.json       # Dependency lock file
└── README.md               # File ini
```

---

## 🚀 Quick Start

### Membuka di Browser Lokal

1. **Clone atau unduh project ini**

2. **Buka file dengan Python SimpleHTTPServer** (recommended untuk menghindari CORS issues):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Kemudian buka: http://localhost:8000
   ```

3. **Atau gunakan npm http-server**:
   ```bash
   npm install
   npm run dev
   # Buka: http://localhost:8080
   ```

4. **Atau buka langsung** (jika tidak ada audio/assets):
   ```
   Klik kanan pada index.html → Open with Browser
   ```

---

## 🛠️ Development

### Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Modern CSS dengan custom properties, grid, flexbox
- **JavaScript (ES5)** — Vanilla JS, kompatibel IE11+
- **GSAP 3** — Animation & scroll trigger library
  - ScrollTrigger — Scroll-driven animations
  - SplitText — Text animation
  - DrawSVGPlugin — SVG drawing animations

### Editing

1. **Ubah konten** → Edit `index.html`
2. **Ubah styling** → Edit `css/style.css`
3. **Ubah animasi** → Edit `js/script.js`
4. **Ubah gambar** → Ganti file di `assets/images/`
5. **Ubah musik** → Ganti file di `assets/audio/`

**Catatan:** Semua path file sudah diupdate ke struktur folder baru. Jika menambah file baru, pastikan path referensinya benar di HTML.

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Modern versions |
| Firefox | ✅ Modern versions |
| Safari | ✅ Modern versions |
| Mobile (iOS/Android) | ✅ Modern browsers |
| IE 11 | ⚠️ Limited (no animations) |

---

## ♿ Aksesibilitas

- ✅ Navigasi keyboard berfungsi (Tab, Enter, Arrow keys)
- ✅ Screen reader support dengan ARIA labels
- ✅ `prefers-reduced-motion` menghilangkan animasi spasial
- ✅ Kontras teks ≥4.5:1 (WCAG AA)
- ✅ Semantic HTML & proper heading hierarchy

---

## 🎨 Design System

Lihat `docs/DESIGN.md` untuk dokumentasi lengkap:
- **Palette** — Warna ultraviolet, gradient, mint accent
- **Typography** — Bodoni Moda (display), Spectral (body), Martian Mono (mono)
- **Components** — Glass cabinet, rail keys, instrument cards, step cabinets
- **Layout** — Plate grid system, responsive breakpoints

---

## 📄 Product Specification

Lihat `docs/PRODUCT.md` untuk:
- Target user & use cases
- Product purpose & positioning
- Fitur yang wajib tetap
- Brand commitments
- Accessibility & inclusion requirements

---

## 🔒 Privacy & Data

Halaman ini adalah **statis** dan tidak mengirim data ke server. Kontak yang ditampilkan:
- Email: `maldk****@gmail.com` (tersamar sebagian)
- No. HP: `089516353968`
- Instagram: `@jmlmall_`
- TikTok: `@mmaaaaallll`

---

## 📜 License

```
Copyright © 2026 Muhammad Jamaluddin.
Seluruh kode, desain, dan konten halaman ini dilindungi
Undang-Undang Hak Cipta No. 28 Tahun 2014.
Dilarang menyalin, mendistribusikan, atau mengklaim
karya ini tanpa izin tertulis dari pemilik.
```

---

## 📞 Contact

- **Email:** maldk****@gmail.com
- **Instagram:** [@jmlmall_](https://www.instagram.com/jmlmall_/)
- **TikTok:** [@mmaaaaallll](https://www.tiktok.com/@mmaaaaallll)
- **No. HP:** 089516353968

---

## 🔄 Project Status

**Status:** ✅ Production Ready  
**Last Updated:** November 2026  
**Version:** 1.0.0

---

## 📝 Notes

- Musik latar dapat diaktifkan dengan klik tombol play (icon musik di sudut kanan bawah)
- Tombol musik dapat dipindahkan dengan drag
- Animasi akan berjalan sepenuhnya di desktop modern
- Mobile experience diprioritaskan dengan fallback ke static content
- Refresh halaman untuk mereset scroll position ke atas

Terima kasih telah berkunjung ke portfolio MXL! 🎬✨
