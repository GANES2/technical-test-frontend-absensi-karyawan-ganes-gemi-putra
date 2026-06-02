# Admin Absensi Karyawan

Project ini dibuat untuk Technical Test Frontend Web Developer Intern Ayo Bermimpi x JURU. Aplikasi ini berupa halaman admin sederhana untuk mengelola data absensi karyawan dengan tampilan dashboard menggunakan template Backstrap.

Repository:
https://github.com/GANES2/technical-test-frontend-absensi-karyawan-ganes-gemi-putra

## Ringkasan Project

Aplikasi ini menyediakan fitur pengelolaan data absensi karyawan secara frontend. Data disimpan menggunakan `localStorage`, sehingga perubahan data tetap tersimpan saat halaman direfresh selama masih menggunakan browser yang sama.

Project dibuat dengan HTML, CSS, dan JavaScript murni agar mudah direview tanpa proses instalasi dependency.

## Checklist Kesesuaian Technical Test

| Ketentuan | Status | Implementasi |
| --- | --- | --- |
| Menggunakan template Backstrap | Selesai | Menggunakan Backstrap CSS via CDN |
| Halaman list data karyawan yang telah absen | Selesai | Tabel daftar absensi pada halaman utama |
| Fitur update | Selesai | Tombol edit pada setiap baris data |
| Fitur delete | Selesai | Tombol delete dengan modal konfirmasi |
| Fitur sort by | Selesai | Sort berdasarkan tanggal, nama, jenis kelamin, jam masuk, dan jam keluar |
| Pagination | Selesai | Pagination dengan pilihan 5, 10, atau 15 baris |
| Halaman input data absensi | Selesai | Form input absensi |
| Field nama | Selesai | Input `Nama` |
| Field alamat | Selesai | Textarea `Alamat` |
| Field jenis kelamin | Selesai | Select `Jenis kelamin` |
| Field tanggal absen | Selesai | Input `Tanggal absen` |
| Field jam masuk | Selesai | Input `Jam masuk` |
| Field jam keluar | Selesai | Input `Jam keluar` |

## Fitur Aplikasi

- Menampilkan data absensi karyawan dalam bentuk tabel.
- Menambahkan data absensi baru.
- Mengubah data absensi yang sudah ada.
- Menghapus data absensi dengan konfirmasi.
- Sort data berdasarkan beberapa kolom.
- Pagination untuk membatasi jumlah data yang tampil.
- Pencarian berdasarkan nama, alamat, atau jenis kelamin.
- Validasi form sederhana untuk field wajib.
- Validasi jam keluar harus lebih besar dari jam masuk.
- Ringkasan total data, jumlah absensi hari ini, dan rata-rata durasi kerja.
- Data tersimpan di `localStorage`.
- Tampilan responsive untuk desktop dan mobile.

## Field Data Absensi

- Nama
- Alamat
- Jenis kelamin
- Tanggal absen
- Jam masuk
- Jam keluar

## Teknologi

- HTML
- CSS
- JavaScript
- Backstrap
- Font Awesome
- LocalStorage

## Cara Menjalankan

Clone repository:

```bash
git clone https://github.com/GANES2/technical-test-frontend-absensi-karyawan-ganes-gemi-putra.git
```

Masuk ke folder project:

```bash
cd technical-test-frontend-absensi-karyawan-ganes-gemi-putra
```

Jalankan local server:

```bash
python3 -m http.server 8080
```

Buka di browser:

```text
http://localhost:8080
```

Alternatif, file `index.html` juga bisa dibuka langsung melalui browser.

## Cara Menggunakan

1. Buka halaman utama untuk melihat daftar absensi.
2. Klik tombol `Tambah Absensi` untuk menambahkan data baru.
3. Isi data nama, alamat, jenis kelamin, tanggal absen, jam masuk, dan jam keluar.
4. Klik `Simpan Absensi`.
5. Klik tombol edit pada kolom aksi untuk update data.
6. Klik tombol delete pada kolom aksi untuk menghapus data.
7. Gunakan search, sort, dan pagination untuk mengatur tampilan data.

## Struktur Folder

```text
.
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   `-- app.js
|-- README.md
`-- .gitignore
```

## Catatan Teknis

- Project ini tidak menggunakan backend karena requirement berfokus pada frontend.
- Data awal disediakan sebagai contoh agar tabel langsung memiliki isi saat pertama kali dibuka.
- Data yang ditambah, diubah, atau dihapus akan tersimpan di `localStorage`.
- Jika ingin mengembalikan data contoh, hapus data `localStorage` pada browser.
- Backstrap dan Font Awesome dimuat melalui CDN, sehingga koneksi internet diperlukan agar style template dan ikon tampil maksimal.

## Author

Ganes Gemi Putra
