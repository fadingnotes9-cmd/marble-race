# 📝 Session Notes

Catatan tiap sesi kerja. Yang terbaru di paling atas.

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
- Task 1.2c: SESSION-NOTES.md (file ini)

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
