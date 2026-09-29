# 📊 Marble Race — Project Status

**Last Updated:** 2026-09-29
**Current Phase:** Minggu 1 — Setup Tools & Dokumentasi

---

## 🎯 Tentang Project

Game marble race interaktif untuk live streaming YouTube.
Penonton join via komentar `!join [nama]`.

- **Stack**: HTML5 + CSS + JS + Matter.js
- **Platform**: Termux (HP Android), no PC
- **Hosting**: GitHub Pages
- **Repo**: github.com/fadingnotes9-cmd/marble-race
- **Dev URL**: http://localhost:8080

---

## ✅ Fitur yang Sudah Jalan

- [x] Core engine (fisika kelereng, tumbukan, pantulan)
- [x] Lintasan zig-zag 12 tingkat
- [x] Kamera follow kelereng terdepan
- [x] Countdown 3-2-1-GO
- [x] Timer real-time
- [x] Leaderboard dengan medali 🥇🥈🥉
- [x] Garis finish (sensor detection)
- [x] Efek kilau kelereng
- [x] HUD (timer + tombol) di atas canvas

## 🚧 Fitur yang Belum

- [x] GitHub Pages deployment (auto-deploy on push)
- [ ] YouTube Live Chat integration (`!join`)
- [ ] Track editor visual
- [ ] Multiple track support
- [ ] Kustomisasi warna kelereng
- [ ] Sound effects
- [ ] Firebase bridge

---

## 🛠️ Environment

| Tool | Versi | Status |
|------|-------|--------|
| Node.js | v26.4.0 | ✅ |
| npm | 11.20.0 | ✅ |
| git | 2.55.0 | ✅ |
| live-server | latest | ✅ |
| orin-ide | — | ⏳ |

---

## 📁 Struktur File

    ~/marble-race/
    ├── index.html
    ├── style.css
    ├── js/
    │   ├── matter.min.js
    │   ├── game.js
    │   └── track2.js
    ├── assets/          (kosong)
    ├── tracks/          (kosong)
    ├── .gitignore
    ├── PROJECT-STATUS.md
    ├── MASTER-CHECKLIST.md
    └── SESSION-NOTES.md

---

## 🎬 Cara Jalankan

    cd ~/marble-race
    live-server --port=8080 --no-browser

Buka Chrome: http://localhost:8080

---

## 📝 Konvensi Kerja

- Edit via Node script (jangan nano untuk file besar)
- Cek syntax sebelum commit: node --check js/game.js
- Satu task per commit: git commit -m "Task X.Y: ..."
- Test di browser sebelum bilang selesai
- Paste script pendek-pendek (<150 baris per paste)
