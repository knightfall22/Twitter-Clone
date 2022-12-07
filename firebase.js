// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9esnLQRY2CEn_G1UG02dYmPX2jd53nPE",
    authDomain: "twitter-clone-75f9c.firebaseapp.com",
    projectId: "twitter-clone-75f9c",
    storageBucket: "twitter-clone-75f9c.appspot.com",
    messagingSenderId: "973702683838",
    appId: "1:973702683838:web:d1f13718e316b2d46392ef",
    measurementId: "G-89BTLET166"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); //'cause of next Js 
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };

