# Admin Absensi Karyawan

Project ini dibuat untuk Technical Test Frontend Web Developer Intern Ayo Bermimpi x JURU. Aplikasi berupa halaman admin sederhana untuk mengelola data absensi karyawan menggunakan tampilan dashboard bergaya Backstrap/CoreUI.

Repository:
https://github.com/GANES2/technical-test-frontend-absensi-karyawan-ganes-gemi-putra

## Kriteria Technical Test

- Membuat halaman admin sederhana untuk absensi karyawan.
- Menampilkan halaman list data karyawan yang sudah absen.
- Menyediakan fitur update data absensi.
- Menyediakan fitur delete data absensi.
- Menyediakan fitur sort by.
- Menyediakan pagination.
- Menyediakan halaman input data absensi.

## Field Data Absensi

- Nama
- Alamat
- Jenis kelamin
- Tanggal absen
- Jam masuk
- Jam keluar

## Fitur Aplikasi

- CRUD data absensi karyawan.
- Form input dan update dengan validasi sederhana.
- Konfirmasi sebelum delete data.
- Sort by tanggal absen, nama, jenis kelamin, jam masuk, dan jam keluar.
- Pagination dengan pilihan 5, 10, atau 15 data per halaman.
- Pencarian berdasarkan nama, alamat, atau jenis kelamin.
- Ringkasan total data, absensi hari ini, dan rata-rata durasi kerja.
- Data tersimpan di `localStorage`, sehingga tidak hilang saat halaman direfresh.
- Responsive layout untuk desktop dan mobile.

## Teknologi

- HTML
- CSS
- JavaScript
- LocalStorage

Project ini tidak menggunakan backend atau database eksternal karena fokus test adalah implementasi frontend.

## Cara Menjalankan

Cara paling sederhana:

1. Clone repository.
2. Buka file `index.html` di browser.

Alternatif menggunakan local server:

```bash
python3 -m http.server 8080
```

Lalu buka:

```text
http://localhost:8080
```

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

## Cara Menggunakan

1. Buka halaman utama untuk melihat list data absensi.
2. Klik tombol `Tambah Absensi` untuk input data baru.
3. Isi semua field yang tersedia.
4. Klik `Simpan Absensi`.
5. Gunakan tombol `U` pada tabel untuk update data.
6. Gunakan tombol `X` pada tabel untuk delete data.
7. Gunakan filter sort, search, dan pagination untuk mengatur tampilan data.

## Author

Ganes Gemi Putra
