// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Uz5nFK1UoceG_7awN3JoZEj8rDwf7XQ",
  authDomain: "ab-tech-f2895.firebaseapp.com",
  databaseURL: "https://ab-tech-f2895-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ab-tech-f2895",
  storageBucket: "ab-tech-f2895.firebasestorage.app",
  messagingSenderId: "346630438541",
  appId: "1:346630438541:web:ff31c1551c0c8351496cc4",
  measurementId: "G-V8RK413FP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);