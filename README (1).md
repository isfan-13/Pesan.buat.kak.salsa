# Pesan untuk Kak Salsa 💌

Website sederhana untuk mengumpulkan pesan dari banyak orang (±25 orang) kepada
"Kak Salsa". Setiap orang bisa menulis pesan lewat form, pesan langsung
tersimpan, dan **semua orang yang membuka web ini** — termasuk Kak Salsa —
bisa melihat semua pesan yang sudah masuk, secara real-time.

## Isi folder
pesan-kak-salsa/
├── index.html # struktur halaman (tema pos udara)
├── style.css # tampilan
├── script.js # logika kirim & tampilkan pesan
├── firebase-config.js # konfigurasi Firebase (WAJIB kamu isi sendiri)
└── README.md


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
