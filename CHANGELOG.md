# Changelog

Semua perubahan penting pada proyek **Fokuspad** akan didokumentasikan di file ini.

---

## [1.1.0] - 2026-06-27

### Added
- **Collapsible Category Sidebar**: Penambahan fitur pengelompokan menu navigasi secara dinamis menjadi 5 kategori:
  - **Utama**: Beranda, Progres, Peringkat, Pengumuman, Notifikasi.
  - **Akademik**: Kelas, Mapel, Materi, Tugas, Ujian, Jadwal, Kalender, Ekskul.
  - **Administrasi**: Pengguna, Siswa, PPDB, Keuangan, Verifikasi Izin.
  - **Layanan**: Forum Diskusi, Laporan.
  - **Sistem**: Bantuan, Pengaturan.
- **Auto-Expand Active Category**: Fitur cerdas di mana kategori menu yang sedang dibuka otomatis terekspansi (terbuka) saat halaman dimuat.

### Changed
- **Compact & Professional UI Layout**:
  - Mengurangi padding vertikal item menu dari `py-2.5` menjadi `py-1.5` agar pas di layar tanpa perlu scroll.
  - Menyusutkan ukuran ikon menu menjadi `h-4 w-4` untuk tampilan yang lebih modern.
  - Meningkatkan tampilan kartu profil pengguna di bagian footer sidebar dengan border tipis dan hover state yang lebih elegan.
  - Mengubah transisi rotasi pada indikator kategori (chevron) agar lebih mulus.
