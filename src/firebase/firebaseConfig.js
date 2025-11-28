import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAzF63XCG_YdlD-RwTTiXQhvKp1RU-6acw",
    authDomain: "boggero-7aab3.firebaseapp.com",
    projectId: "boggero-7aab3",
    storageBucket: "boggero-7aab3.firebasestorage.app",
    messagingSenderId: "125636249323",
    appId: "1:125636249323:web:a778f2bc897607d9b660ae",
    measurementId: "G-LJ6YS66CGB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);