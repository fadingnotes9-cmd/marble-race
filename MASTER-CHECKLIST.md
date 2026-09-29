# ✅ Marble Race — Master Checklist

Checklist lengkap semua task project. Update setiap kali task selesai.

**Legend:** [x] = selesai · [ ] = belum · [~] = in progress

---

## 📅 MINGGU 1 — Setup Tools & Dokumentasi

### Task 0.x — Baseline
- [x] 0.1a: Buat .gitignore
- [x] 0.1b: Baseline commit lokal
- [x] 0.1c: Push ke GitHub

### Task 1.1 — Live-Server
- [x] 1.1a: Install live-server global
- [x] 1.1b: Verifikasi server jalan di port 8080
- [x] 1.1c: Test browser buka game
- [x] 1.1d: Test auto-reload (ubah CSS → browser refresh otomatis)

### Task 1.2 — Dokumentasi
- [x] 1.2a: Buat PROJECT-STATUS.md
- [ ] 1.2b: Buat MASTER-CHECKLIST.md  ← kamu di sini
- [ ] 1.2c: Buat SESSION-NOTES.md
- [ ] 1.2d: Commit & push dokumentasi

### Task 1.3 — npm Scripts
- [ ] 1.3a: Buat package.json
- [ ] 1.3b: Tambah script dev / deploy / yt
- [ ] 1.3c: Test npm run dev

### Task 1.4 — GitHub Actions (auto-deploy)
- [ ] 1.4a: Buat workflow .github/workflows/deploy.yml
- [ ] 1.4b: Aktifkan GitHub Pages di Settings
- [ ] 1.4c: Test push → auto-deploy

---

## 📅 MINGGU 2 — YouTube Integration

### Task 2.1 — Firebase Setup
- [x] 2.1a: Bikin project Firebase
- [x] 2.1b: Aktifkan Realtime Database (Spark plan)
- [ ] 2.1c: Buat firebase-config.js (SAFE public - web config)
- [ ] 2.1d: Bikin js/firebase.js helper

### Task 2.2 — YouTube Chat Listener
- [ ] 2.2a: Install youtube-chat-next
- [ ] 2.2b: Bikin youtube-listener.js (Node)
- [ ] 2.2c: Test baca live chat
- [ ] 2.2d: Filter pesan !join → kirim ke Firebase

### Task 2.3 — Frontend Integration
- [ ] 2.3a: Bikin js/youtube.js
- [ ] 2.3b: Subscribe perubahan Firebase
- [ ] 2.3c: Auto tambah kelereng saat ada !join
- [ ] 2.3d: Test end-to-end dengan live chat asli

---

## 📅 MINGGU 3 — Track Editor

### Task 3.1 — Track JSON Format
- [ ] 3.1a: Design schema JSON track
- [ ] 3.1b: Migrasi track zig-zag hardcode ke JSON

### Task 3.2 — Track Loader
- [ ] 3.2a: Bikin js/track.js (load JSON → bodies)
- [ ] 3.2b: Test load track dari JSON

### Task 3.3 — Track Editor UI
- [ ] 3.3a: Bikin editor/index.html
- [ ] 3.3b: Bikin editor/editor.js (canvas + drag)
- [ ] 3.3c: Tombol save / load JSON
- [ ] 3.3d: Tombol test track (buka game)

---

## 📅 MINGGU 4 — Polish

- [ ] 4.1: Kustomisasi warna kelereng
- [ ] 4.2: Sound effects (countdown, finish)
- [ ] 4.3: Leaderboard final + pemenang podium
- [ ] 4.4: UI polish (font, animasi)
- [ ] 4.5: Multiple track support
- [ ] 4.6: Test end-to-end live streaming
