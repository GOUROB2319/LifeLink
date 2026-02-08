// Firebase Configuration and Initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBRarASFR16AFuXa961OzS5P1UmCbvIhWc",
  authDomain: "lifelink-295e7.firebaseapp.com",
  projectId: "lifelink-295e7",
  storageBucket: "lifelink-295e7.firebasestorage.app",
  messagingSenderId: "302994575210",
  appId: "1:302994575210:web:3457f2307a35a590e7df13",
  measurementId: "G-D9BBNKPF2F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
