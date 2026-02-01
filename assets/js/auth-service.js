import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";
import { saveUserProfile, getUserRole, checkUserExists, getFullUserProfile } from "./db-service.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Handle routing based on user profile state
 * @param {Object} user - Firebase user
 */
const handleAuthRedirect = async (user) => {
    if (!user) return;

    const profile = await getFullUserProfile(db, user.uid);

    // If profile has explicit onboardingComplete flag, go to dashboard
    if (profile && profile.onboardingComplete) {
        const role = profile.role || 'patient';
        window.location.href = `../dashboard/${role}.html`;
    } else {
        // New or incomplete user -> Go to onboarding step 1
        window.location.href = '../onboarding/step1.html';
    }
};

// Auth State Observer
const initAuthObserver = (callback) => {
    onAuthStateChanged(auth, async (user) => {
        if (callback) callback(user);
    });
};

// Login Logic
const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await handleAuthRedirect(user);
        return { success: true, user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Google Login
const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        await handleAuthRedirect(user);
        return { success: true, user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);
        window.location.href = '../index.html';
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export { auth, db, initAuthObserver, loginUser, loginWithGoogle, logoutUser, handleAuthRedirect };

// Global event listener for logout from components
if (typeof window !== 'undefined') {
    window.addEventListener('lifelink-logout', async () => {
        await logoutUser();
    });
}
