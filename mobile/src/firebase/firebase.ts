import Constants from 'expo-constants';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config is injected via app config (extra.firebase).
// This avoids committing secrets and works with Expo.
const firebaseConfig = (Constants.expoConfig?.extra as any)?.firebase;

if (!firebaseConfig || !firebaseConfig.projectId) {
  // App can still run in demo mode without Firebase.
  // Screens will fall back to dummy data.
  console.warn('Firebase config missing. Running in demo mode.');
}

const app = getApps().length
  ? getApps()[0]!
  : initializeApp(firebaseConfig ?? { projectId: 'demo' });

export const db = getFirestore(app);
