import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, where, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6FPTWzjcvVa8QkjtSQgcMDXoXN_zl5z0",
  authDomain: "fir-test1-d5129.firebaseapp.com",
  projectId: "fir-test1-d5129",
  storageBucket: "fir-test1-d5129.appspot.com",
  messagingSenderId: "895677007234",
  appId: "1:895677007234:web:efccf9a84d6e810db73b9b",
  measurementId: "G-BHHCBREN6P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

const useFirebaseConfig = () => {
  return { app, analytics, db, auth };
};

export default useFirebaseConfig;
