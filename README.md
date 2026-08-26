// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeZDeT_FdBExph8BJZCLuV-f40pXSj2v4",
  authDomain: "pesan-c9143.firebaseapp.com",
  projectId: "pesan-c9143",
  storageBucket: "pesan-c9143.firebasestorage.app",
  messagingSenderId: "235351297757",
  appId: "1:235351297757:web:fc06b07db68dfd2fd45534",
  measurementId: "G-W9LJP3KKBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
