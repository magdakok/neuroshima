// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
const PROD = process.env.NODE_ENV === "production";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigDev = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "neuroshima-e141d.firebaseapp.com",
  databaseURL:
    "https://neuroshima-e141d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "neuroshima-e141d",
  storageBucket: "neuroshima-e141d.appspot.com",
  messagingSenderId: "1021604911323",
  appId: "1:1021604911323:web:4299854c63a5885b8c14fe",
  measurementId: "G-988WX6C3B4",
};

const firebaseConfigProd = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "neuroshima---prod.firebaseapp.com",
  projectId: "neuroshima---prod",
  storageBucket: "neuroshima---prod.appspot.com",
  messagingSenderId: "326121584983",
  appId: "1:326121584983:web:29d54003e708d571cfe612",
};

// Initialize Firebase

const firebaseApp = initializeApp(
  PROD ? firebaseConfigProd : firebaseConfigDev
);
const db = getFirestore(firebaseApp);

export default db;
