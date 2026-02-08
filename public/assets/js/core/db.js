// Database Service - Firestore Operations
import { db } from './firebase.js';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

class DatabaseService {
  async createUser(uid, userData) {
    try {
      await setDoc(doc(db, 'users', uid), {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getUser(uid) {
    try {
      const docSnap = await getDoc(doc(db, 'users', uid));
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateUser(uid, updates) {
    try {
      await updateDoc(doc(db, 'users', uid), {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createRequest(requestData) {
    try {
      const requestRef = doc(collection(db, 'requests'));
      await setDoc(requestRef, {
        ...requestData,
        requestId: requestRef.id,
        status: 'active',
        createdAt: new Date().toISOString()
      });
      return { success: true, id: requestRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getRequests(filters = {}) {
    try {
      let q = collection(db, 'requests');
      
      if (filters.userId) {
        q = query(q, where('userId', '==', filters.userId));
      }
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      const querySnapshot = await getDocs(q);
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: requests };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getDonors(bloodGroup, division) {
    try {
      let q = query(
        collection(db, 'users'),
        where('role', '==', 'donor'),
        where('availability', '==', true)
      );
      
      if (bloodGroup) {
        q = query(q, where('bloodGroup', '==', bloodGroup));
      }
      if (division) {
        q = query(q, where('division', '==', division));
      }
      
      const querySnapshot = await getDocs(q);
      const donors = [];
      querySnapshot.forEach((doc) => {
        donors.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: donors };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const dbService = new DatabaseService();
