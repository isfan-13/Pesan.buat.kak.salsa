import { firebaseApp } from "./firebase-config.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const db = getFirestore(firebaseApp);
const pesanCollection = collection(db, "pesan-kak-salsa");

// ---- Elemen DOM ----
const form = document.getElementById("pesan-form");
const namaInput = document.getElementById("nama");
const pesanInput = document.getElementById("pesan");
const charCountEl = document.getElementById("char-count");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

const listEl = document.getElementById("pesan-list");
const loadingEl = document.getElementById("loading-state");
const emptyEl = document.getElementById("empty-state");
const countBadge = document.getElementById("count-badge");
const heroCountNumber = document.getElementById("hero-count-number");

const MAX_MESSAGES_HINT = 25; // hanya untuk konteks, tidak membatasi jumlah pengiriman secara teknis

// ---- Hitung karakter ----
pesanInput.addEventListener("input", () => {
  charCountEl.textContent = pesanInput.value.length;
});

// ---- Kirim pesan baru ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = namaInput.value.trim();
  const pesan = pesanInput.value.trim();

  if (!nama || !pesan) {
    showStatus("Nama dan pesan tidak boleh kosong.", "error");
    return;
  }

  submitBtn.disabled = true;
  showStatus("Mengirim...", "");

  try {
    await addDoc(pesanCollection, {
      nama: nama.slice(0, 40),
      pesan: pesan.slice(0, 500),
      createdAt: serverTimestamp()
    });

    form.reset();
    charCountEl.textContent = "0";
    showStatus("Pesan terkirim. Terima kasih!", "success");
  } catch (err) {
    console.error(err);
    showStatus("Gagal mengirim pesan. Coba lagi sebentar lagi.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

function showStatus(text, type) {
  formStatus.textContent = text;
  formStatus.className = "form-status" + (type ? " " + type : "");
}

// ---- Dengarkan pesan secara realtime, urut dari yang terbaru ----
const q = query(pesanCollection, orderBy("createdAt", "desc"));

onSnapshot(
  q,
  (snapshot) => {
    loadingEl.hidden = true;

    if (snapshot.empty) {
      emptyEl.hidden = false;
      listEl.innerHTML = "";
      countBadge.textContent = "0 pesan";
      if (heroCountNumber) heroCountNumber.textContent = "0";
      return;
    }

    emptyEl.hidden = true;
    listEl.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      listEl.appendChild(renderCard(data));
    });

    countBadge.textContent = `${snapshot.size} pesan`;
    if (heroCountNumber) heroCountNumber.textContent = String(snapshot.size);
  },
  (err) => {
    console.error(err);
    loadingEl.textContent = "Gagal memuat pesan. Periksa koneksi atau konfigurasi Firebase.";
  }
);

function renderCard(data) {
  const card = document.createElement("article");
  card.className = "pesan-card";

  const top = document.createElement("div");
  top.className = "pesan-card-top";

  const namaEl = document.createElement("span");
  namaEl.className = "pesan-nama";
  namaEl.textContent = data.nama || "Tanpa nama";

  const tanggalEl = document.createElement("span");
  tanggalEl.className = "pesan-tanggal";
  tanggalEl.textContent = formatTanggal(data.createdAt);

  top.appendChild(namaEl);
  top.appendChild(tanggalEl);

  const isiEl = document.createElement("p");
  isiEl.className = "pesan-isi";
  isiEl.textContent = data.pesan || "";

  card.appendChild(top);
  card.appendChild(isiEl);

  return card;
}

function formatTanggal(timestamp) {
  if (!timestamp) return "baru saja";
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
