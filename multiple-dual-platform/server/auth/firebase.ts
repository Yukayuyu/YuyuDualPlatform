import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZ8_lIijGgq0fEvfIwmLYwi4QTx0haems",
  authDomain: "yuyu-dual-platform.firebaseapp.com",
  projectId: "yuyu-dual-platform",
  storageBucket: "yuyu-dual-platform.appspot.com",
  messagingSenderId: "276874561055",
  appId: "1:276874561055:web:d44c2e0aa1fc671e89b72a",
  measurementId: "G-SGY2MXP5EF"
};

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
