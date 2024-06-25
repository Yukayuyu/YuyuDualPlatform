import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import json_config from '@/auth.json'

const firebaseConfig = json_config.firebaseConfig;

// Initialize Firebase only if it hasn't been initialized already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized');
} else {
  app = getApp();
  console.log('Firebase app already initialized');
}
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
