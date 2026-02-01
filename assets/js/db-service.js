import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, query, where, getDocs, orderBy, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * Save or Update User Profile in Firestore
 */
export const saveUserProfile = async (db, user, role, additionalData = {}) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                role: role || 'patient',
                availability: true,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                ...additionalData
            });
        } else {
            await updateDoc(userRef, {
                lastLogin: serverTimestamp(),
                ...additionalData
            });
        }
        return { success: true };
    } catch (error) {
        console.error("Error saving user profile:", error);
        return { success: false, error: error.message };
    }
};

export const getUserRole = async (db, uid) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data().role : null;
};

export const checkUserExists = async (db, uid) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    return snap.exists();
};

export const getFullUserProfile = async (db, uid) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
};

/**
 * Get all available donors for a specific blood group
 */
export const getDonorsByBloodGroup = async (db, bloodGroup) => {
    const donorsRef = collection(db, "users");
    const q = query(
        donorsRef,
        where("role", "==", "donor"),
        where("bloodGroup", "==", bloodGroup),
        where("availability", "==", true)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Emergency Request Submission
 */
export const submitEmergencyRequest = async (db, data) => {
    try {
        const docRef = await addDoc(collection(db, "requests"), {
            ...data,
            type: 'emergency',
            status: 'active',
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getAllRequests = async (db) => {
    const requestsRef = collection(db, "requests");
    const q = query(requestsRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { onSnapshot, collection, query, where, orderBy };
