import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, deleteUser, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";
import { saveUserProfile, getUserRole, checkUserExists, getFullUserProfile } from "./db-service.js";

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Handle routing based on user profile state
 * @param {Object} user - Firebase user
 */
const handleAuthRedirect = async (user) => {
    if (!user) return;

    try {
        console.log("Checking profile for redirection:", user.uid);
        const profile = await getFullUserProfile(db, user.uid);

        if (profile && profile.onboardingComplete) {
            const role = profile.role || 'patient';
            console.log(`User ${user.uid} is a ${role} with completed onboarding.`);

            const roleToPage = {
                donor: 'donor.html',
                patient: 'patient_dashboard.html',
                doctor: 'doctor_dashboard.html',
                hospital: 'hospital_dashboard.html',
                admin: 'admin_dashboard.html'
            };

            const destination = roleToPage[role] || 'donor.html';
            localStorage.setItem('lifelink_dashboard', destination);
            window.location.href = `../dashboard/${destination}`;
        } else {
            console.log(`User ${user.uid} onboarding incomplete, redirecting to step 1.`);
            window.location.href = '../onboarding/step1.html';
        }
    } catch (error) {
        console.error("Redirection logic failed:", error);
        window.location.href = '../onboarding/step1.html'; // Safe fallback
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

        if (profileData.displayName) {
            await updateProfile(user, { displayName: profileData.displayName });
        }

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

const deleteUserAccount = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No user logged in");
        await deleteUser(user);
        window.location.href = '../index.html';
        return { success: true };
    } catch (error) {
        console.error("Error deleting user account:", error);
        return { success: false, error: error.message };
    }
};

export { auth, db, initAuthObserver, loginUser, registerUser, loginWithGoogle, logoutUser, deleteUserAccount, handleAuthRedirect };

// Global event listener for logout from components
if (typeof window !== 'undefined') {
    window.addEventListener('lifelink-logout', async () => {
        await logoutUser();
    });
}
