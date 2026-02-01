import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";
import { saveUserProfile, getUserRole } from "./db-service.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Auth State Observer
const initAuthObserver = (callback) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Ideally fetch role here to pass to callback if needed
            const role = await getUserRole(db, user.uid);
            user.role = role;
        }
        callback(user);
    });
};

// Login Logic
const loginUser = async (email, password, role) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save/Update User in DB
        await saveUserProfile(db, user, role);

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

        // Save/Update User in DB
        // If role is not provided (e.g. distinct Login button), strictly 'patient' default or existing?
        // db-service handles 'exists' check.
        await saveUserProfile(db, user, role);

        return { success: true, user, role };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export { auth, db, initAuthObserver, loginUser, loginWithGoogle, logoutUser };
