import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Auth State Observer
const initAuthObserver = (callback) => {
    onAuthStateChanged(auth, callback);
};

// Login Logic
const loginUser = async (email, password, role) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Mock Role Verification (In production, check 'users' collection)
        // const userDoc = await getDoc(doc(db, "users", user.uid));
        // if (userDoc.exists() && userDoc.data().role !== role) { ... }

        return { success: true, user, role };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Google Login
const loginWithGoogle = async (role) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Create user profile if not exists
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                name: user.displayName,
                role: role || 'patient', // Default role
                createdAt: new Date()
            });
        }

        return { success: true, user, role };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export { auth, db, initAuthObserver, loginUser, loginWithGoogle };
