// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "FILL",
  authDomain: "neuroshima-e141d.firebaseapp.com",
  databaseURL: "https://neuroshima-e141d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "neuroshima-e141d",
  storageBucket: "neuroshima-e141d.appspot.com",
  messagingSenderId: "1021604911323",
  appId: "1:1021604911323:web:4299854c63a5885b8c14fe",
  measurementId: "G-988WX6C3B4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
