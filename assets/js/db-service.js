import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * Save or Update User Profile in Firestore
 * @param {Object} db - Firestore instance
 * @param {Object} user - Firebase User Object
 * @param {String} role - User Role (patient, doctor, hospital)
 * @param {Object} additionalData - Any extra data to save
 */
export const saveUserProfile = async (db, user, role, additionalData = {}) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // Create new profile
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                role: role || 'patient',
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                ...additionalData
            });
            console.log("User profile created:", user.uid);
        } else {
            // Update existing profile (last login)
            await updateDoc(userRef, {
                lastLogin: serverTimestamp(),
                ...additionalData
            });
            console.log("User profile updated:", user.uid);
        }
        return { success: true };
    } catch (error) {
        console.error("Error saving user profile:", error);
        return { success: false, error: error.message };
    }
};

export const getUserRole = async (db, uid) => {
    try {
        const userRef = doc(db, "users", uid);
        const snap = await getDoc(userRef);
        return snap.exists() ? snap.data().role : null;
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
};

/**
 * Check if a user document exists in Firestore
 * @param {Object} db - Firestore instance
 * @param {string} uid - User ID
 * @returns {Promise<boolean>}
 */
export const checkUserExists = async (db, uid) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    return snap.exists();
};

/**
 * Get full user profile data
 * @param {Object} db - Firestore instance
 * @param {string} uid - User ID
 * @returns {Promise<Object|null>}
 */
export const getFullUserProfile = async (db, uid) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
};
