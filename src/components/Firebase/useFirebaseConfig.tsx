
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "fir-test-4-8eb97.firebaseapp.com",
  projectId: "fir-test-4-8eb97",
  storageBucket: "fir-test-4-8eb97.appspot.com",
  messagingSenderId: "177150670757",
  appId: "1:177150670757:web:47d5232e2f1d88e2cf5a4c",
  measurementId: "G-WLSZSL2H3D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);

const useFirebaseConfig = () => {
  return { app, analytics, db, auth };
};

export default useFirebaseConfig;
