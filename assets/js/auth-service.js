import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged, deleteUser, updateProfile, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset as firebaseConfirmPasswordReset } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import firebaseConfig from "./firebase-config.js";
import { saveUserProfile, getUserRole, checkUserExists, getFullUserProfile } from "./db-service.js";

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Handle redirect results if popup is blocked or closed
getRedirectResult(auth).then(async (result) => {
    if (!result || !result.user) return;
    const user = result.user;
    console.log('Google redirect result:', user.email);
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
}).catch((error) => {
    console.error('Redirect error:', error);
});

const handleAuthRedirect = async (user) => {
    if (!user) return;

    try {
        console.log("Checking profile for redirection:", user.uid);
        let profile = await getFullUserProfile(db, user.uid);

        if (profile && !profile.onboardingComplete && profile.onboardingStep >= 3) {
            await saveUserProfile(db, user, profile.role || null, {
                onboardingComplete: true,
                onboardingCompleteAt: new Date()
            });
            profile = await getFullUserProfile(db, user.uid);
        }

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
            
            // Detect current path and redirect accordingly
            const currentPath = window.location.pathname;
            if (currentPath.includes('/auth/')) {
                window.location.href = `../dashboard/${destination}`;
            } else if (currentPath.includes('/onboarding/')) {
                window.location.href = `../dashboard/${destination}`;
            } else if (currentPath.includes('/dashboard/')) {
                window.location.href = destination;
            } else {
                window.location.href = `dashboard/${destination}`;
            }
        } else {
            console.log(`User ${user.uid} onboarding incomplete, redirecting to step 1.`);
            
            // Detect current path for onboarding redirect
            const currentPath = window.location.pathname;
            if (currentPath.includes('/auth/')) {
                window.location.href = '../onboarding/step1.html';
            } else if (currentPath.includes('/dashboard/')) {
                window.location.href = '../onboarding/step1.html';
            } else {
                window.location.href = 'onboarding/step1.html';
            }
        }
    } catch (error) {
        console.error("Redirection logic failed:", error);
        const currentPath = window.location.pathname;
        if (currentPath.includes('/auth/')) {
            window.location.href = '../onboarding/step1.html';
        } else {
            window.location.href = 'onboarding/step1.html';
        }
    }
};

const initAuthObserver = (callback) => {
    onAuthStateChanged(auth, async (user) => {
        if (callback) callback(user);
    });
};

const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const profile = await getFullUserProfile(db, user.uid);
        if (!profile) {
            await saveUserProfile(db, user, null, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: new Date(),
                onboardingComplete: false,
                authMethod: 'password'
            });
        }

        await handleAuthRedirect(user);
        return { success: true, user };
    } catch (error) {
        return { success: false, error, code: error.code };
    }
};

const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        console.log('Google popup success:', user.email);
        
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
        console.error('Google login error:', error);
        if (error.code === 'auth/popup-blocked') {
            try {
                await signInWithRedirect(auth, googleProvider);
                return { success: true, user: null, redirect: true };
            } catch (redirectError) {
                return { success: false, error: redirectError, code: redirectError.code };
            }
        }
        return { success: false, error, code: error.code };
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

const registerUser = async (email, password, profileData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (profileData.displayName) {
            await updateProfile(user, { displayName: profileData.displayName });
        }

        await saveUserProfile(db, user, null, {
            ...profileData,
            email: email,
            createdAt: new Date(),
            onboardingComplete: false,
            onboardingStep: 1
        });

        await handleAuthRedirect(user);
        return { success: true, user };
    } catch (error) {
        return { success: false, error, code: error.code };
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
        return { success: false, error };
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset email sent to:', email);
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, error, code: error.code };
    }
};

const sendPasswordResetWithCode = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset code sent to:', email);
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, error, code: error.code };
    }
};

const verifyResetCode = async (code) => {
    try {
        await verifyPasswordResetCode(auth, code);
        console.log('Reset code verified');
        return { success: true };
    } catch (error) {
        console.error('Code verification error:', error);
        return { success: false, error, code: error.code };
    }
};

const confirmPasswordReset = async (code, newPassword) => {
    try {
        await firebaseConfirmPasswordReset(auth, code, newPassword);
        console.log('Password reset successful');
        return { success: true };
    } catch (error) {
        console.error('Password reset confirmation error:', error);
        return { success: false, error, code: error.code };
    }
};

export { auth, db, initAuthObserver, loginUser, registerUser, loginWithGoogle, logoutUser, deleteUserAccount, sendPasswordReset, sendPasswordResetWithCode, verifyResetCode, confirmPasswordReset, handleAuthRedirect };

if (typeof window !== 'undefined') {
    window.addEventListener('lifelink-logout', async () => {
        await logoutUser();
    });
}
