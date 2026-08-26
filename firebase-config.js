// ============================================================
// GANTI NILAI DI BAWAH INI dengan konfigurasi proyek Firebase-mu.
// Cara mendapatkannya ada di README.md (bagian "Menyiapkan Firebase").
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY_MU",
  authDomain: "GANTI.firebaseapp.com",
  projectId: "GANTI_PROJECT_ID",
  storageBucket: "GANTI.appspot.com",
  messagingSenderId: "GANTI_SENDER_ID",
  appId: "GANTI_APP_ID"
};

export const firebaseApp = initializeApp(firebaseConfig);
