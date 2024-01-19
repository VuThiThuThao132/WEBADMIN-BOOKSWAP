import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "bookswapplatform.firebaseapp.com",
    databaseURL: "https://bookswapplatform-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bookswapplatform",
    storageBucket: "bookswapplatform.appspot.com",
    messagingSenderId: "812198073772",
    appId: "1:812198073772:web:9dcd5cca08e32e5715d609",
    measurementId: "G-TR461NZBZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth()