# Pesan untuk Kak Salsa 💌

Website sederhana untuk mengumpulkan pesan dari banyak orang (±25 orang) kepada
"Kak Salsa". Setiap orang bisa menulis pesan lewat form, pesan langsung
tersimpan, dan **semua orang yang membuka web ini** — termasuk Kak Salsa —
bisa melihat semua pesan yang sudah masuk, secara real-time.

## Isi folder

```
pesan-kak-salsa/
├── index.html          # struktur halaman
├── style.css            # tampilan (tema kartu pos / postcard)
├── script.js             # logika kirim & tampilkan pesan
├── firebase-config.js     # konfigurasi Firebase (WAJIB kamu isi sendiri)
└── README.md
```

## Kenapa perlu Firebase?

GitHub Pages hanya bisa menghosting file statis (HTML/CSS/JS) — tidak punya
database sendiri. Supaya pesan yang dikirim satu orang bisa **tersimpan dan
muncul di layar orang lain**, kita butuh tempat penyimpanan online. Firebase
Firestore dipakai di sini karena gratis untuk skala kecil (25 orang jelas
masih jauh di bawah batas gratisnya) dan tidak butuh server sendiri.

## 1. Menyiapkan Firebase

1. Buka https://console.firebase.google.com dan login dengan akun Google.
2. Klik **Add project** → beri nama misalnya `pesan-kak-salsa` → lanjutkan
   sampai proyek selesai dibuat (Google Analytics boleh dimatikan).
3. Di dashboard proyek, klik ikon **`</>`** (Web app) untuk mendaftarkan
   aplikasi web. Beri nama bebas, klik **Register app**.
4. Firebase akan menampilkan objek `firebaseConfig` seperti ini:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "pesan-kak-salsa.firebaseapp.com",
     projectId: "pesan-kak-salsa",
     storageBucket: "pesan-kak-salsa.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
   Salin nilai-nilai ini ke file **`firebase-config.js`**, menggantikan
   tulisan `GANTI_...`.
5. Di menu kiri, buka **Build → Firestore Database → Create database**.
   Pilih lokasi (misal `asia-southeast2 (Jakarta)`), lalu pilih mode
   **Start in test mode** supaya bisa langsung baca/tulis (lihat catatan
   keamanan di bawah).

### Aturan keamanan Firestore (penting)

Mode "test mode" hanya aktif ~30 hari lalu terkunci otomatis. Karena web ini
untuk grup kecil dan tertutup (bukan publik luas), buka tab **Rules** di
Firestore dan ganti dengan aturan berikut agar pengisian tetap terbuka tapi
data tidak bisa dihapus/diubah orang lain:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /pesan-kak-salsa/{docId} {
      allow read: if true;
      allow create: if request.resource.data.nama is string
                    && request.resource.data.nama.size() <= 40
                    && request.resource.data.pesan is string
                    && request.resource.data.pesan.size() <= 500;
      allow update, delete: if false;
    }
  }
}
```

Klik **Publish**.

## 2. Mencoba di komputer sendiri (opsional)

Karena file `script.js` memakai `type="module"`, buka lewat server lokal,
bukan langsung double-click `index.html`. Contoh dengan Python:

```bash
cd pesan-kak-salsa
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser.

## 3. Publikasi ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `pesan-kak-salsa`.
2. Upload/push semua file di folder ini (`index.html`, `style.css`,
   `script.js`, `firebase-config.js` yang **sudah diisi**, `README.md`) ke
   repository tersebut:
   ```bash
   git init
   git add .
   git commit -m "Website pesan untuk Kak Salsa"
   git branch -M main
   git remote add origin https://github.com/USERNAME/pesan-kak-salsa.git
   git push -u origin main
   ```
3. Di halaman repository GitHub, buka **Settings → Pages**.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit, GitHub akan memberi tautan seperti:
   `https://USERNAME.github.io/pesan-kak-salsa/`
6. Bagikan tautan itu ke teman-temanmu dan ke Kak Salsa.

### Menambahkan domain aplikasi ke Firebase (kadang perlu)

Jika Firebase menolak koneksi dari domain GitHub Pages, buka
**Firebase Console → Authentication → Settings → Authorized domains**,
lalu tambahkan `USERNAME.github.io`.

## Cara kerja singkat

- Saat seseorang mengisi form dan menekan **Kirim Pesan**, `script.js`
  mengirim data (`nama`, `pesan`, waktu) ke koleksi `pesan-kak-salsa` di
  Firestore lewat `addDoc`.
- Semua pengunjung yang membuka halaman ini otomatis "berlangganan" data
  lewat `onSnapshot`, jadi begitu ada pesan baru masuk, daftar pesan di
  layar semua orang ikut ter-update tanpa perlu refresh.
- Teks pesan ditampilkan dengan `textContent` (bukan `innerHTML`) supaya
  aman dari suntikan kode/HTML dari isian orang lain.

## Menyesuaikan tampilan

- Warna, font, dan bentuk kartu bisa diubah lewat variabel di bagian atas
  `style.css` (`:root { ... }`).
- Batas panjang nama (40 karakter) dan pesan (500 karakter) bisa diubah di
  `script.js` dan atribut `maxlength` pada `index.html`.
