import { doc, setDoc, getDoc, updateDoc, deleteDoc, serverTimestamp, collection, query, where, getDocs, orderBy, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * Save or Update User Profile in Firestore
 */
export const saveUserProfile = async (db, user, role, additionalData = {}) => {
    try {
        if (!user || !user.uid) throw new Error("User UID is required for saving profile");

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        const baseData = {
            lastLogin: serverTimestamp(),
            uid: user.uid
        };

        const resolvedEmail = user.email || additionalData.email;
        if (resolvedEmail) {
            baseData.email = resolvedEmail;
        }

        const roleToSave = role ?? additionalData.role;

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                ...baseData,
                displayName: additionalData.displayName || user.displayName || '',
                photoURL: additionalData.photoURL || user.photoURL || '',
                role: roleToSave || 'patient',
                availability: additionalData.availability ?? true,
                createdAt: serverTimestamp(),
                ...additionalData
            });
        } else {
            const updateData = {
                ...baseData,
                ...additionalData
            };

            if (roleToSave) {
                updateData.role = roleToSave;
            }

            await updateDoc(userRef, updateData);
        }
        console.log(`Profile for ${user.uid} saved successfully.`);
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

/**
 * Get requests created by a specific user
 */
export const getRequestsByUser = async (db, uid) => {
    const requestsRef = collection(db, "requests");
    const q = query(requestsRef, where("userId", "==", uid), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Update request status (active, matched, completed, cancelled)
 */
export const updateRequestStatus = async (db, requestId, status) => {
    try {
        const requestRef = doc(db, "requests", requestId);
        await updateDoc(requestRef, { status, updatedAt: serverTimestamp() });
        return { success: true };
    } catch (error) {
        console.error("Error updating request status:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Save hospital inventory notes and blood availability
 */
export const saveHospitalInventory = async (db, uid, data = {}) => {
    try {
        const hospitalRef = doc(db, "users", uid);
        await updateDoc(hospitalRef, {
            inventoryNotes: data.inventoryNotes || '',
            bloodAvailability: data.bloodAvailability || {},
            inventoryUpdatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error saving inventory:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Get appointments for a specific doctor
 */
export const getDoctorAppointments = async (db, uid) => {
    const apptRef = collection(db, "appointments");
    const q = query(apptRef, where("doctorId", "==", uid), orderBy("date", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Create a new appointment for a doctor
 */
export const createAppointment = async (db, data) => {
    try {
        const docRef = await addDoc(collection(db, "appointments"), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating appointment:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Update appointment status (scheduled, confirmed, cancelled, completed)
 */
export const updateAppointmentStatus = async (db, appointmentId, status) => {
    try {
        const apptRef = doc(db, "appointments", appointmentId);
        await updateDoc(apptRef, { status, updatedAt: serverTimestamp() });
        return { success: true };
    } catch (error) {
        console.error("Error updating appointment status:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Get donation history for a specific user
 */
export const getUserDonationHistory = async (db, uid) => {
    const donationsRef = collection(db, "donations");
    const q = query(donationsRef, where("donorId", "==", uid), orderBy("date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Search medical directory (doctors/hospitals)
 */
export const searchDirectory = async (db, criteria = {}) => {
    const { name, specialty, division, role } = criteria;
    let usersRef = collection(db, "users");
    let q = query(usersRef);

    // We can only filter by role directly in Firestore for consistency
    if (role) {
        q = query(q, where("role", "==", role));
    }

    const snap = await getDocs(q);
    let results = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Client-side filtering for other fields to avoid complex index requirements for prototype
    if (specialty) {
        results = results.filter(item => item.specialty && item.specialty.toLowerCase() === specialty.toLowerCase());
    }

    if (division) {
        results = results.filter(item => item.division && item.division.toLowerCase() === division.toLowerCase());
    }

    if (name) {
        const lowerName = name.toLowerCase();
        results = results.filter(item =>
            (item.displayName && item.displayName.toLowerCase().includes(lowerName)) ||
            (item.hospitalName && item.hospitalName.toLowerCase().includes(lowerName))
        );
    }

    return results;
};

/**
 * Get all doctors with pending verification status
 */
export const getPendingVerifications = async (db) => {
    const usersRef = collection(db, "users");
    const q = query(
        usersRef,
        where("role", "==", "doctor"),
        where("verificationStatus", "==", "pending")
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Delete User Profile from Firestore
 */
export const deleteUserProfile = async (db, uid) => {
    try {
        const userRef = doc(db, "users", uid);
        await deleteDoc(userRef);
        return { success: true };
    } catch (error) {
        console.error("Error deleting user profile:", error);
        return { success: false, error: error.message };
    }
};

export { onSnapshot, collection, query, where, orderBy, getDocs, doc };
