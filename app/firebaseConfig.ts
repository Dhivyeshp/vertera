// Import required Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configuration (Replace with your own Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyB5l0U59Y1caiFOag4sHRyGyYt_9ilgp4Q",
    authDomain: "vertera-40d22.firebaseapp.com.",
    projectId: "vertera-40d22",
    storageBucket: "vertera-40d22.firebasestorage.app",
    messagingSenderId: "791491554622",
    appId: "1:791491554622:web:7e5e9502bbed0287e7106f",
  };

// Initialize Firebase only if no app is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export initialized Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
