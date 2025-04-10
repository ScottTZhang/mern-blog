// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-fc271.firebaseapp.com",
  projectId: "mern-blog-fc271",
  storageBucket: "mern-blog-fc271.firebasestorage.app",
  messagingSenderId: "461843876920",
  appId: "1:461843876920:web:919c27469f4795df91eacd",
  measurementId: "G-GDNQGZZ420"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);