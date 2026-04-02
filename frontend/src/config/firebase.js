import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase client configuration for VandVoyage
// These are public client-side keys (safe to expose in frontend code)
const firebaseConfig = {
  apiKey: "AIzaSyBxvMGN2RpjMFTmBnT0Ey14GXCwtCNnLqY",
  authDomain: "vandvoyage-auth-demo.firebaseapp.com",
  projectId: "vandvoyage-auth-demo",
};

// Initialize Firebase app and auth
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google sign-in provider
export const googleProvider = new GoogleAuthProvider();
