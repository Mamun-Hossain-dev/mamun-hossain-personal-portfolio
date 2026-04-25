// config/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ FIXED
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// WARNING: It is not recommended to hardcode these values.
// You should use environment variables to keep your API keys safe.
const firebaseConfig = {
  apiKey: "AIzaSyAMGOGgASiHYEh7Ca1bJzzZA8o3w6Zyxnk",
  authDomain: "mamun-s-personal-portfolio.firebaseapp.com",
  projectId: "mamun-s-personal-portfolio",
  storageBucket: "mamun-s-personal-portfolio.firebasestorage.app",
  messagingSenderId: "642656600590",
  appId: "1:642656600590:web:4644d046ab9854441b325f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

// ✅ Only run getAnalytics on client

export const analytics =
  typeof window !== "undefined"
    ? require("firebase/analytics").getAnalytics(app)
    : null;
