import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase/config';
import { UserProfile } from '../types';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  initializeAuth: () => () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  /**
   * Listens to Firebase Auth changes to persistent session loading
   * Returns an unsubscribe function to prevent memory leaks.
   */
  initializeAuth: () => {
    set({ loading: true });
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          // Fetch additional user profile information from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            set({ user: userDoc.data() as UserProfile, loading: false });
          } else {
            // Fallback in case document hasn't synced yet
            const fallbackProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'User',
              role: 'user',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            set({ user: fallbackProfile, loading: false });
          }
        } else {
          set({ user: null, loading: false });
        }
      } catch (err: any) {
        set({ error: err.message, loading: false, user: null });
      }
    });

    return unsubscribe;
  },

  /**
   * Standard Email and Password Login
   */
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch Profile Data
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        set({ user: userDoc.data() as UserProfile, loading: false });
      } else {
        throw new Error('User record not found in database.');
      }
    } catch (err: any) {
      let customError = 'লগইন করতে ব্যর্থ হয়েছে। ইমেইল বা পাসওয়ার্ড চেক করুন।';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        customError = 'ভুল ইমেইল অথবা পাসওয়ার্ড দেওয়া হয়েছে।';
      }
      set({ error: customError, loading: false });
      throw new Error(customError);
    }
  },

  /**
   * Standard Email and Password Registration (No OTP Required)
   */
  register: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Update basic Firebase profile
      await updateProfile(userCredential.user, { displayName: name });

      // Structure data for standard user role
      const newUserProfile: UserProfile = {
        uid,
        email,
        displayName: name,
        role: 'user', // Default register role is always user
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save user details to Firestore
      await setDoc(doc(db, 'users', uid), newUserProfile);

      set({ user: newUserProfile, loading: false });
    } catch (err: any) {
      let customError = 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।';
      if (err.code === 'auth/email-already-in-use') {
        customError = 'এই ইমেইলটি ইতিমধ্যেই ব্যবহার করা হয়েছে।';
      } else if (err.code === 'auth/weak-password') {
        customError = 'পাসওয়ার্ডটি অন্তত ৬ ডিজিটের হতে হবে।';
      }
      set({ error: customError, loading: false });
      throw new Error(customError);
    }
  },

  /**
   * User Sign Out
   */
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  clearError: () => set({ error: null })
}));
