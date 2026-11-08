# SAS AI – Soul Art System

Creative studio berbasis React + Vite.

## Modul aplikasi
- AI Prompt Generator
- AI Prewedding
- AI UMKM
- AI Facebook Pro
- AI Marketing
- AI Digital Product
- Reels Studio

## Menjalankan proyek
Memerlukan Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Build produksi:
```bash
npm run build
```

## Build otomatis
GitHub Actions menjalankan build web pada setiap push ke branch `main`. Jika berhasil, folder `dist/` tersedia sebagai artifact pada halaman Actions.

## Status dan batasan
- Generator prompt pada kode saat ini masih memakai template lokal; belum terhubung ke model AI sungguhan.
- Pembuatan gambar/video AI membutuhkan provider dan backend aman. Jangan menyimpan API key rahasia di frontend atau APK.
- Ini adalah tahap penyiapan aplikasi web. APK Android belum dibangun atau diuji.
