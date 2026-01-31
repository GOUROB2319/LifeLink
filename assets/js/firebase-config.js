import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRarASFR16AFuXa961OzS5P1UmCbvIhWc",
    authDomain: "lifelink-295e7.firebaseapp.com",
    projectId: "lifelink-295e7",
    storageBucket: "lifelink-295e7.firebasestorage.app",
    messagingSenderId: "302994575210",
    appId: "1:302994575210:web:3457f2307a35a590e7df13",
    measurementId: "G-D9BBNKPF2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword };
