# Data Mahasiswa — Web App Development

Web app sederhana untuk menghitung nilai akhir mahasiswa menggunakan HTML, CSS, dan JavaScript.

## Struktur project

```text
index.html       # Halaman aplikasi utama
style.css        # Semua styling
script.js        # Logika perhitungan nilai
informasi.html   # Materi belajar + source code
informasi.js     # Tab source code, copy code, dan tombol W3Schools TryIt
README.md        # Dokumentasi project
```

## Rumus

```text
Nilai Akhir = (Tugas × 30%) + (UTS × 30%) + (UAS × 40%)
```

Ketentuan:

- Nilai akhir > 75 → LULUS
- Nilai akhir <= 75 → TIDAK LULUS

## Materi belajar

Buka `informasi.html` untuk mempelajari program secara berurutan:

1. HTML — struktur halaman
2. CSS — tampilan
3. JavaScript — mengambil input
4. JavaScript — menghitung nilai
5. JavaScript — if/else
6. DOM — menampilkan output
7. Class CSS — mengubah warna status

## W3Schools TryIt

Pada halaman `informasi.html` tersedia tombol **Buka W3Schools TryIt**.

Tombol tersebut menyalin kode lengkap Program Data Mahasiswa ke clipboard, kemudian membuka:

https://www.w3schools.com/js/tryit.asp?filename=tryjs_editor

Di editor W3Schools, tekan **Ctrl+V** (Windows) atau **Cmd+V** (Mac), kemudian klik **Run**.

## GitHub Pages

Project ini tidak membutuhkan Node.js atau build process.

Upload semua file ke repository GitHub, lalu aktifkan:

`Settings → Pages → Deploy from a branch → main → / (root)`
