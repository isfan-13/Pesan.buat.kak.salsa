
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCeZDeT_FdBExph8BJZCLuV-f40pXSj2v4",
  authDomain: "pesan-c9143.firebaseapp.com",
  projectId: "pesan-c9143",
  storageBucket: "pesan-c9143.firebasestorage.app",
  messagingSenderId: "235351297757",
  appId: "1:235351297757:web:fc06b07db68dfd2fd45534",
  measurementId: "G-W9LJP3KKBK"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
