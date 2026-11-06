# Setup & Deployment Guide

Panduan lengkap untuk development lokal dan deployment.

---

## 💻 Local Development

### Prerequisites
- Node.js 14+ (optional, hanya jika ingin menggunakan npm server)
- Browser modern (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, dll)

### Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd mxl-portfolio
   ```

2. **Jalankan local server dengan Python**
   ```bash
   # Python 3 (recommended)
   python -m http.server 8000
   
   # Python 2 (deprecated)
   python -m SimpleHTTPServer 8000
   ```
   Buka: `http://localhost:8000`

3. **Atau dengan npm**
   ```bash
   npm install
   npm run dev
   ```
   Buka: `http://localhost:8080`

4. **Edit files**
   - Ubah konten: `index.html`
   - Ubah style: `css/style.css`
   - Ubah interaksi: `js/script.js`
   - Simpan dan refresh browser (Ctrl+R atau Cmd+R)

### Important Notes

- **CORS Issues** — Jika membuka file langsung (file://), beberapa fitur akan tidak berfungsi. Gunakan local server.
- **Cache** — Hard refresh dengan Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac) untuk menghapus cache
- **Audio** — Musik hanya akan play setelah interaksi user (browser security policy)

---

## 📦 Project Dependencies

```json
{
  "devDependencies": {
    "http-server": "^14.1.1"
  }
}
```

**External Libraries** (sudah included):
- GSAP 3.x — Animation library (`js/libs/`)
- ScrollTrigger — Scroll-driven animations
- SplitText — Text splitting for animation
- DrawSVGPlugin — SVG drawing animations
- Google Fonts — Bodoni Moda, Martian Mono, Spectral

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

Vercel adalah platform deploy terbaik untuk static sites.

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Reorganize project structure"
   git push origin main
   ```

2. **Import ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import Git repository
   - Vercel akan auto-detect sebagai static site
   - Click "Deploy"

3. **Domain Custom** (optional)
   - Di Vercel dashboard → Project Settings → Domains
   - Tambahkan custom domain Anda

**Advantages:**
- Instant deployment
- Auto HTTPS
- CDN global
- Free tier tersedia

### Option 2: GitHub Pages

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Reorganize project structure"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Buka repository settings
   - Scroll ke "GitHub Pages"
   - Source: `main` branch, `/ (root)` folder
   - Save

3. **Akses di**
   ```
   https://<username>.github.io/<repository-name>
   ```

**Advantages:**
- Gratis
- Terintegrasi dengan Git
- Minimal setup

### Option 3: Netlify

1. **Connect repository**
   - Buka [netlify.com](https://netlify.com)
   - Click "Add new site" → "Connect to Git"
   - Pilih repository
   - Settings akan auto-detect

2. **Deploy**
   - Click "Deploy"
   - Netlify akan build dan deploy otomatis

**Advantages:**
- Mudah setup
- Live preview sebelum deploy
- Form handling (optional)

### Option 4: Traditional Hosting

1. **FTP Upload**
   - Download semua file dari project
   - Connect ke FTP server hosting Anda
   - Upload folder ke public_html/

2. **Path yang Benar**
   ```
   /public_html/
   ├── index.html
   ├── css/
   ├── js/
   ├── assets/
   └── docs/
   ```

3. **Akses di**
   ```
   https://yourdomain.com
   ```

---

## 🔄 Continuous Deployment

Setelah mendeploy ke Vercel/GitHub Pages/Netlify, setiap push ke repository akan auto-deploy.

```bash
# Edit file lokal
# Commit dan push
git add .
git commit -m "Update content"
git push origin main

# Deploy akan automatic berjalan
# Check status di platform dashboard
```

---

## 🧹 Maintenance

### Update GSAP Library

Jika ingin update GSAP ke versi terbaru:

1. **Download terbaru dari cdnjs.com**
   ```
   https://cdnjs.com/libraries/gsap
   ```

2. **Ganti file di `js/libs/`**
   - `gsap.min.js`
   - `ScrollTrigger.min.js`
   - `SplitText.min.js`
   - `DrawSVGPlugin.min.js`

3. **Test di lokal sebelum push**
   ```bash
   npm run dev
   ```

### Update Fonts

Fonts dimuat dari Google Fonts. Untuk ganti font:

1. Edit `index.html` — bagian `<link href="https://fonts.googleapis.com/...`
2. Copy link baru dari [fonts.google.com](https://fonts.google.com)
3. Update di HTML
4. Update CSS variable di `css/style.css`

---

## 📊 Performance Tips

1. **Lazy Load Images** — Sudah diterapkan (lihat `loading="lazy"`)
2. **Async Scripts** — Sudah diterapkan (lihat `defer` attribute)
3. **Minify CSS/JS** — Optional untuk production
4. **Image Optimization** — Gunakan tools seperti TinyPNG, ImageOptim
5. **Caching** — Vercel & hosting providers handle ini

---

## 🐛 Troubleshooting

### Issue: Audio tidak play
**Solution:**
- Refresh halaman
- Klik tombol musik (user interaction diperlukan)
- Check browser console untuk error
- Verifikasi file `soundweb.mp3` ada di `assets/audio/`

### Issue: Animasi tidak jalan
**Solution:**
- Check browser support (Chrome/Firefox/Safari OK, IE11 tidak)
- Verify GSAP library loaded (check Network tab di DevTools)
- Check console untuk error
- Verify `js/libs/` folder exist dengan semua file

### Issue: Gambar tidak tampil
**Solution:**
- Verify path: `assets/images/mal.jpeg` dan `mal2.jpeg` exist
- Check browser console untuk 404 errors
- Verify file extension (case-sensitive pada Linux/Mac)

### Issue: Styling berantakan
**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac)
- Verify `css/style.css` linked di HTML: `<link rel="stylesheet" href="css/style.css?v=set-1">`
- Check browser console untuk CSS errors

### Issue: Deploy gagal
**Solution:**
- Verify structure folder benar
- Verify `.gitignore` tidak exclude file penting
- Verify no build step required (static site)
- Check deployment platform logs

---

## 📋 Pre-Deployment Checklist

Sebelum deploy ke production:

- [ ] Semua file ada di folder yang benar
- [ ] Semua path reference benar di HTML
- [ ] Gambar tampil di lokal
- [ ] Musik dapat di-play
- [ ] Animasi berjalan smooth
- [ ] Mobile responsive OK
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Test di berbagai browser
- [ ] `.gitignore` configured properly

---

## 📞 Support

Jika ada masalah:

1. Check `README.md` untuk info general
2. Check `docs/DESIGN.md` untuk design details
3. Check `docs/PRODUCT.md` untuk product spec
4. Check browser console (F12 → Console tab)
5. Check platform-specific docs (Vercel, GitHub Pages, Netlify)

---

**Last Updated:** November 2026  
**Version:** 1.0.0
