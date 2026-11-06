# Project Structure Documentation

Dokumentasi lengkap struktur folder dan organisasi file project MXL.

---

## 📁 Directory Tree

```
mxl-portfolio/
│
├── index.html                    ✅ File HTML utama
├── package.json                  ✅ Metadata & scripts
├── package-lock.json             ✅ Dependency lock
├── README.md                     ✅ Panduan project
├── .gitignore                    ✅ Git ignore rules
│
├── 📂 css/
│   └── style.css                 ✅ Stylesheet utama
│
├── 📂 js/
│   ├── script.js                 ✅ Motion & interaksi
│   └── 📂 libs/
│       ├── gsap.min.js           ✅ GSAP core library
│       ├── ScrollTrigger.min.js   ✅ Scroll animation plugin
│       ├── SplitText.min.js       ✅ Text splitting plugin
│       └── DrawSVGPlugin.min.js   ✅ SVG drawing plugin
│
├── 📂 assets/
│   ├── 📂 images/
│   │   ├── mal.jpeg              ✅ Foto profil (720×1280)
│   │   └── mal2.jpeg             ✅ Foto hero (874×875)
│   └── 📂 audio/
│       └── soundweb.mp3          ✅ Musik latar
│
├── 📂 docs/
│   ├── DESIGN.md                 ✅ Design system
│   ├── PRODUCT.md                ✅ Product spec
│   └── SETUP.md                  ✅ Setup & deployment
│
└── 📂 .git/                       ✅ Git repository
```

---

## 📄 File Descriptions

### Root Level

| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Main HTML file | ✅ All paths updated |
| `package.json` | Project metadata & npm scripts | ✅ Updated |
| `README.md` | Project documentation | ✅ Created |
| `.gitignore` | Git ignore rules | ✅ Enhanced |

### `css/`

| File | Purpose |
|------|---------|
| `style.css` | Stylesheet utama (moved dari root) |

**Size:** ~30KB  
**Imports:** Google Fonts (via HTML)

### `js/`

| File | Purpose |
|------|---------|
| `script.js` | Motion engine, interaksi, utilities |
| `libs/gsap.min.js` | GSAP animation library |
| `libs/ScrollTrigger.min.js` | Scroll-driven animations |
| `libs/SplitText.min.js` | Text character splitting |
| `libs/DrawSVGPlugin.min.js` | SVG drawing animations |

**Total Size:** ~150KB (dengan GSAP libs)  
**Timing:** Semua script load dengan `defer` untuk non-blocking

### `assets/images/`

| File | Size | Format | Usage |
|------|------|--------|-------|
| `mal.jpeg` | ~150KB | JPEG | Foto profil (tall) |
| `mal2.jpeg` | ~180KB | JPEG | Foto hero (square) |

**Loading:** Lazy loading untuk `mal.jpeg`, eager untuk `mal2.jpeg` (hero)

### `assets/audio/`

| File | Size | Format | Usage |
|------|------|--------|-------|
| `soundweb.mp3` | ~2MB | MP3 | Background music |

**Loading:** `preload="none"` untuk non-blocking load

### `docs/`

| File | Purpose |
|------|---------|
| `DESIGN.md` | Design system, palette, typography, components |
| `PRODUCT.md` | Product specification, features, requirements |
| `SETUP.md` | Setup guide, deployment options, troubleshooting |

---

## 🔄 Path References

Semua path file telah diupdate di `index.html`:

### HTML References
```html
<!-- CSS -->
<link rel="stylesheet" href="css/style.css?v=set-1">

<!-- Images -->
<img src="assets/images/mal.jpeg" alt="...">
<img src="assets/images/mal2.jpeg" alt="...">
<meta property="og:image" content="assets/images/mal2.jpeg">

<!-- Audio -->
<source src="assets/audio/soundweb.mp3" type="audio/mpeg">

<!-- Scripts -->
<script src="js/libs/gsap.min.js" defer></script>
<script src="js/libs/ScrollTrigger.min.js" defer></script>
<script src="js/libs/SplitText.min.js" defer></script>
<script src="js/libs/DrawSVGPlugin.min.js" defer></script>
<script src="js/script.js?v=set-1" defer></script>
```

---

## 📦 File Size Summary

```
Root level:
- index.html                 ~45KB
- package.json              ~0.5KB
- README.md                 ~8KB
- .gitignore                ~0.8KB

css/:
- style.css                 ~30KB

js/:
- script.js                 ~32KB
- libs/ (4 files)           ~150KB

assets/:
- images/ (2 files)         ~330KB
- audio/ (1 file)           ~2MB

docs/:
- DESIGN.md                 ~12KB
- PRODUCT.md                ~4KB
- SETUP.md                  ~15KB

TOTAL (excluding node_modules): ~2.7MB
```

---

## 🔐 File Permissions

Semua file harus readable:
- HTML, CSS, JS — readable by browser
- Images, Audio — accessible via HTTP/file protocol
- Docs — readable by developer

Tidak ada file yang perlu write permission saat runtime.

---

## 🚀 Deployment Structure

Ketika deploy ke hosting, pastikan struktur folder tetap sama:

```
public_html/  (atau root directory hosting)
├── index.html
├── css/style.css
├── js/script.js
├── js/libs/*.js
├── assets/images/*
├── assets/audio/*
└── docs/ (optional)
```

---

## ✅ Verification Checklist

Struktur sudah valid jika:

- [ ] `index.html` exists di root
- [ ] `css/style.css` exists & linked in HTML
- [ ] `js/script.js` exists & linked in HTML
- [ ] `js/libs/` memiliki 4 file GSAP
- [ ] `assets/images/` memiliki mal.jpeg & mal2.jpeg
- [ ] `assets/audio/` memiliki soundweb.mp3
- [ ] `docs/` memiliki DESIGN.md, PRODUCT.md, SETUP.md
- [ ] Semua path reference di HTML benar
- [ ] `.gitignore` properly configured
- [ ] `package.json` valid JSON

---

## 📝 Adding New Files

Jika menambah file baru:

1. **Tentukan kategori**
   - Images → `assets/images/`
   - Audio/Video → `assets/audio/`
   - Stylesheets → `css/`
   - Scripts → `js/`
   - Documentation → `docs/`

2. **Update reference di HTML/CSS/JS**
   ```html
   <!-- Contoh -->
   <img src="assets/images/new-image.jpg">
   <link rel="stylesheet" href="css/new-style.css">
   <script src="js/new-script.js"></script>
   ```

3. **Update `.gitignore` jika perlu**
   - Temporary files → add ke .gitignore
   - Production files → ensure tidak di-ignore

---

## 🔄 Migration from Old Structure

Dari struktur lama (semua di root) ke baru:

| Old | New | Status |
|-----|-----|--------|
| `style.css` | `css/style.css` | ✅ Moved |
| `script.js` | `js/script.js` | ✅ Moved |
| `mal.jpeg` | `assets/images/mal.jpeg` | ✅ Moved |
| `mal2.jpeg` | `assets/images/mal2.jpeg` | ✅ Moved |
| `soundweb.mp3` | `assets/audio/soundweb.mp3` | ✅ Moved |
| `vendor/gsap/*` | `js/libs/*` | ✅ Moved |
| `DESIGN.md` | `docs/DESIGN.md` | ✅ Moved |
| `PRODUCT.md` | `docs/PRODUCT.md` | ✅ Moved |
| `server.js` | ❌ Removed | Static site |
| `package.json` | ✅ Updated | No backend |

---

## 🎯 Best Practices

1. **Path Consistency**
   - Selalu relative path: `css/style.css` (bukan `/css/style.css`)
   - Never absolute: `C:/Users/...` (tidak portable)

2. **Asset Organization**
   - Separate images, audio, video ke `assets/`
   - Don't mix code & content files

3. **Documentation**
   - Keep docs in `docs/` folder
   - Link documentation in README

4. **Git Ignore**
   - Ignore `node_modules/`
   - Ignore IDE config (`.vscode/`, `.idea/`)
   - Keep source files tracked

---

## 📋 Final Notes

- Structure sudah **production-ready**
- Semua path benar & teruji
- Ready untuk deploy ke Vercel, GitHub Pages, atau hosting lain
- Static site — tidak butuh backend server

**Last Updated:** November 2026  
**Version:** 1.0.0
