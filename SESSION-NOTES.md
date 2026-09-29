# 📝 Session Notes

Catatan tiap sesi kerja. Yang terbaru di paling atas.

---


---

## 📅 Sesi 002 — 2026-09-29 (sore)

**Phase:** Minggu 2 — YouTube Integration
**Fokus:** Setup Firebase Realtime Database

### ✅ Selesai
- Task 2.1a: Pilih Firebase project (lama, di-rename)
- Task 2.1b: Tambah Web App ke Firebase
- Task 2.1c: Aktifkan Realtime Database (Singapore region)
- Task 2.1d: Set Security Rules — public read/write HANYA di /joins

### 📌 Firebase Info (BUKAN SECRET)
- Project ID: sensus-ekonomi-2026
- Database URL: https://sensus-ekonomi-2026-default-rtdb.asia-southeast1.firebasedatabase.app
- Region: asia-southeast1 (Singapore)
- Config web: akan disimpan di js/firebase-config.js (SAFE untuk public)

### 🔜 Next
- Task 2.2: Bikin js/firebase-config.js + js/firebase.js
- Task 2.3: Update index.html (load Firebase SDK)
- Task 2.4: Test koneksi Firebase dari browser


### 🎉 Update Sesi 002 (20:40)

**Status: MINGGU 2 SELESAI 100%**

Selesai:
- Task 2.6: Firebase → game integration
- Task 2.7: Peserta panel (manual input) + notif MotoGP
- Task 2.7e-f: Fix keyboard (resize handler dihapus)
- Task 2.7g: Fix spawn (pause physics + random y)
- Task 2.8: Hide panel + Live Leaderboard MotoGP-style

Fitur baru:
- Panel peserta dengan input manual (tidak auto-spawn)
- Notif slide-in "🏁 Andi minta join!" saat ada !join
- Kelereng beku saat countdown, jatuh setelah GO
- Live leaderboard POSISI real-time dengan waktu finis
- Panel auto-hide saat race, auto-show setelah selesai

### 🔜 Next: Minggu 3 — Track Editor Visual
1. Design JSON track schema
2. Bikin editor/index.html + editor.js
3. Save/load track
4. Migrasi track hardcode ke JSON
5. Test multiple track

### 📌 Insight Penting
- Login key GitHub: fadingnotes9-cmd, nama: Rafandra Farezky
- Firebase DB: sensus-ekonomi-2026 (asia-southeast1)
- Chrome HP cache sangat agresif → pakai Incognito saat test

---

## 📅 Sesi 001 — 2026-09-29

**Durasi:** ~4 jam (dengan istirahat)
**Phase:** Minggu 1 — Setup Tools & Dokumentasi

### 🎯 Tujuan Sesi
- Setup environment kerja cepat
- Setup dokumentasi project
- Commit baseline ke GitHub

### ✅ Selesai
- Task 0.1: Baseline commit + push ke GitHub
- Task 1.1: Install & test live-server
  - Server jalan di port 8080
  - Auto-reload verified (edit CSS → browser refresh)
- Task 1.2a: PROJECT-STATUS.md (89 baris)
- Task 1.2b: MASTER-CHECKLIST.md (87 baris)

### 🚧 In Progress
- (selesai semua)


### 🎉 Update Akhir Sesi 001 (17:00)

- Task 1.3: package.json + npm scripts (SELESAI)
  - npm run check → Syntax OK
  - npm run dev → server jalan di port 8080
- Task 1.4: GitHub Pages aktif (SELESAI)
  - URL live: https://fadingnotes9-cmd.github.io/marble-race/
  - Deploy otomatis setiap git push
  - Sudah diverifikasi jalan di Chrome HP

### ✅ Minggu 1 Status: SELESAI (100%)
Semua target Minggu 1 tercapai:
- [x] live-server + auto-reload
- [x] Dokumentasi 3 file
- [x] package.json + npm scripts
- [x] GitHub Pages live

### 🔜 Next: Minggu 2 — YouTube Integration
1. Bikin project Firebase (Realtime Database)
2. Install youtube-chat-next di Termux
3. Bikin youtube-listener.js (baca chat)
4. Bikin js/firebase.js + js/youtube.js (frontend)
5. Test end-to-end dengan live chat asli


### 📌 Temuan Penting
- Paste panjang di Termux sering kepotong, terutama kalau ada heredoc panjang (>80 baris) atau backtick triple
- Solusi: paste 3 chunk <50 baris per paste, hindari backtick
- Live-server otomatis refresh Chrome saat file berubah
- Git push pakai credential.helper store (token tersimpan)

### 🔜 Next Session (Sesi 002)
Prioritas:
1. Task 1.2c: Commit SESSION-NOTES.md
2. Task 1.2d: Commit & push semua dokumentasi
3. Task 1.3: Setup package.json + npm scripts
4. Task 1.4: GitHub Actions untuk auto-deploy

Target: Selesai Minggu 1, mulai Minggu 2 (YouTube Integration).

### 🔗 Link Referensi
- Repo: https://github.com/fadingnotes9-cmd/marble-race
- GitHub Pages: https://fadingnotes9-cmd.github.io/marble-race/
- Dev URL: http://localhost:8080

---

## 📋 Format Sesi Berikutnya

Setiap sesi baru, tambah blok baru di ATAS (sebelum Sesi 001).
Pakai template:

    ## 📅 Sesi 00X — YYYY-MM-DD
    
    **Durasi:** X jam
    **Phase:** ...
    
    ### 🎯 Tujuan Sesi
    - ...
    
    ### ✅ Selesai
    - ...
    
    ### 🚧 In Progress
    - ...
    
    ### 📌 Temuan Penting
    - ...
    
    ### 🔜 Next Session
    - ...
