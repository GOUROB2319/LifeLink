import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
        return { success: false, error: error.message, code: error.code };
    }
};

// Google Login
const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if user exists, if not create basic profile
        const profile = await getFullUserProfile(db, user.uid);
        if (!profile) {
            await saveUserProfile(db, user, null, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: new Date(),
                onboardingComplete: false,
                authMethod: 'google'
            });
        }

        await handleAuthRedirect(user);
        return { success: true, user };
    } catch (error) {
        return { success: false, error: error.message, code: error.code };
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

// Registration Logic
const registerUser = async (email, password, profileData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save initial profile data
        await saveUserProfile(db, user, null, {
            ...profileData,
            email: email,
            createdAt: new Date(),
            onboardingComplete: false
        });

        await handleAuthRedirect(user);
        return { success: true, user };
    } catch (error) {
        return { success: false, error: error.message, code: error.code };
    }
};

export { auth, db, initAuthObserver, loginUser, registerUser, loginWithGoogle, logoutUser, handleAuthRedirect };

// Global event listener for logout from components
if (typeof window !== 'undefined') {
    window.addEventListener('lifelink-logout', async () => {
        await logoutUser();
    });
}
