# AdonisJS Manajemen Komik API

Anggota Kelompok:
- Pryta Rosela (2208107010046)
- Widya Nurul Sukma (2208107010054)
- Mila Lestari (2208107010002)

## Gambaran Proyek

Repositori ini berisi sistem Manajemen Komik sederhana yang dibangun dengan AdonisJS, menyediakan endpoint REST API dan antarmuka UI opsional. Sistem ini memungkinkan Anda mengelola data buku komik dengan berbagai operasi.

## Fitur

- **Operasi CRUD Lengkap**:
  - Lihat semua komik (GET)
  - Lihat satu komik berdasarkan ID (GET)
  - Tambah komik baru (POST)
  - Perbarui komik yang ada (PUT)
  - Hapus komik (DELETE)

- **Antarmuka UI**:
  - Antarmuka berbasis Bootstrap yang bersih
  - Validasi formulir
  - Dialog konfirmasi untuk operasi hapus

- **Database**:
  - Integrasi MySQL
  - Lucid ORM untuk operasi database
  - Dukungan migrasi

## Persyaratan

- Node.js (v14.x atau lebih baru)
- NPM (sudah termasuk dengan Node.js)
- Database MySQL

## Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/username-anda/adonis-komik-api.git
   cd adonis-komik-api
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Siapkan variabel lingkungan dengan menyalin file contoh:
   ```bash
   cp .env.example .env
   ```

4. Konfigurasi koneksi database di file `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=username_anda
   DB_PASSWORD=password_anda
   DB_DATABASE=komik_db
   ```

5. Buat database:
   ```bash
   mysql -u root -p -e "CREATE DATABASE komik_db;"
   ```

6. Jalankan migrasi:
   ```bash
   adonis migration:run
   ```

7. Mulai server pengembangan:
   ```bash
   adonis serve --dev
   ```

## Endpoint API

### API Komik

| Metode | Endpoint | Deskripsi |
|--------|----------|-------------|
| GET    | `/api/v1/komik` | Dapatkan semua komik |
| GET    | `/api/v1/komik/:id` | Dapatkan satu komik berdasarkan ID |
| POST   | `/api/v1/komik` | Buat komik baru |
| PUT    | `/api/v1/komik/:id` | Perbarui komik berdasarkan ID |
| DELETE | `/api/v1/komik/:id` | Hapus komik berdasarkan ID |

### Contoh API (Pengujian dengan Postman)

#### Mendapatkan Semua Komik
```
GET http://localhost:3333/api/v1/komik
```

Respons:
```json
{
  "data": [
    {
      "id": 1,
      "judul": "One Piece",
      "penulis": "Eiichiro Oda",
      "penerbit": "Shueisha",
      "tahun_terbit": 1997,
      "sinopsis": "Manga tentang petualangan bajak laut Topi Jerami",
      "jumlah_halaman": 30,
      "genre": "Adventure",
      "created_at": "2025-04-25T12:00:00.000Z",
      "updated_at": "2025-04-25T12:00:00.000Z"
    }
  ]
}
```

#### Mendapatkan Satu Komik
```
GET http://localhost:3333/api/v1/komik/1
```

#### Membuat Komik Baru
```
POST http://localhost:3333/api/v1/komik
Content-Type: application/json

{
  "judul": "Naruto",
  "penulis": "Masashi Kishimoto",
  "penerbit": "Shueisha",
  "tahun_terbit": 1999,
  "sinopsis": "Petualangan Naruto menjadi Hokage",
  "jumlah_halaman": 45,
  "genre": "Action, Fantasy"
}
```

#### Memperbarui Komik
```
PUT http://localhost:3333/api/v1/komik/1
Content-Type: application/json

{
  "judul": "One Piece: New World",
  "penulis": "Eiichiro Oda",
  "penerbit": "Shueisha",
  "tahun_terbit": 1997,
  "sinopsis": "Deskripsi yang diperbarui",
  "jumlah_halaman": 32,
  "genre": "Adventure, Fantasy"
}
```

#### Menghapus Komik
```
DELETE http://localhost:3333/api/v1/komik/1
```

## Panduan Pengujian dengan Postman

1. **Persiapan Postman**:
   - Unduh dan instal Postman dari [postman.com](https://www.postman.com/downloads/)
   - Buka aplikasi Postman

2. **Pengujian GET All**:
   - Buat request baru
   - Pilih metode GET
   - Masukkan URL: `http://localhost:3333/api/v1/komik`
   - Klik tombol "Send"
   - Hasil akan ditampilkan di panel bawah

3. **Pengujian GET Single**:
   - Buat request baru
   - Pilih metode GET
   - Masukkan URL: `http://localhost:3333/api/v1/komik/1` (ganti 1 dengan ID yang valid)
   - Klik tombol "Send"

4. **Pengujian POST**:
   - Buat request baru
   - Pilih metode POST
   - Masukkan URL: `http://localhost:3333/api/v1/komik`
   - Pilih tab "Body"
   - Pilih format "raw" dan "JSON"
   - Masukkan data JSON seperti contoh di atas
   - Klik tombol "Send"

5. **Pengujian PUT**:
   - Buat request baru
   - Pilih metode PUT
   - Masukkan URL: `http://localhost:3333/api/v1/komik/1` (ganti 1 dengan ID yang valid)
   - Pilih tab "Body"
   - Pilih format "raw" dan "JSON"
   - Masukkan data JSON yang ingin diperbarui
   - Klik tombol "Send"

6. **Pengujian DELETE**:
   - Buat request baru
   - Pilih metode DELETE
   - Masukkan URL: `http://localhost:3333/api/v1/komik/1` (ganti 1 dengan ID yang valid)
   - Klik tombol "Send"

## Antarmuka UI

Akses antarmuka UI di:
```
http://localhost:3333/komik
```

Tampilannya:
![image](https://github.com/user-attachments/assets/17c65314-31a0-4cab-9cd8-fabb0719e0e2)
![image](https://github.com/user-attachments/assets/787d8df8-8894-4394-a0f4-c7b1324c19b7)
![image](https://github.com/user-attachments/assets/0ecc68e8-862a-4ebb-a224-18aee13974a9)

### Rute UI

| URL | Deskripsi |
|-----|-------------|
| `/komik` | Daftar semua komik |
| `/komik/create` | Formulir pembuatan komik baru |
| `/komik/:id/edit` | Formulir edit komik |

## Struktur Proyek

```
my-adonis-project/
├── app/
│   ├── Controllers/Http/KomikController.js  # Controller utama
│   └── Models/Komik.js                      # Model Komik
├── config/                                  # File konfigurasi
├── database/
│   ├── migrations/                          # Migrasi database
│   └── seeds/                               # Seeder database
├── resources/
│   └── views/                               # Template Edge untuk UI
│       ├── komik/
│       │   ├── create.edge                  # Formulir pembuatan
│       │   ├── edit.edge                    # Formulir edit
│       │   └── index.edge                   # Halaman daftar
│       └── layout/
│           └── main.edge                    # Layout utama
├── start/
│   ├── routes.js                            # Definisi rute
│   └── kernel.js                            # Pengaturan middleware
├── .env                                     # Variabel lingkungan
└── package.json                             # Dependensi proyek
```
