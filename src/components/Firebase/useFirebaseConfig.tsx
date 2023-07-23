// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "@firebase/firestore";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyB6FPTWzjcvVa8QkjtSQgcMDXoXN_zl5z0",
//   authDomain: "fir-test1-d5129.firebaseapp.com",
//   projectId: "fir-test1-d5129",
//   storageBucket: "fir-test1-d5129.appspot.com",
//   messagingSenderId: "895677007234",
//   appId: "1:895677007234:web:efccf9a84d6e810db73b9b",
//   measurementId: "G-BHHCBREN6P",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// export const auth = getAuth(app);

// const useFirebaseConfig = () => {
//   return { app, analytics, db, auth };
// };

// export default useFirebaseConfig;

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
  apiKey: "AIzaSyA7IHAbCmT4EOG7OoHhTdr0FQFDXpnOEvc",
  authDomain: "fir-test2-c05e0.firebaseapp.com",
  projectId: "fir-test2-c05e0",
  storageBucket: "fir-test2-c05e0.appspot.com",
  messagingSenderId: "973722957189",
  appId: "1:973722957189:web:8b346112e47e888d71c0ec",
  measurementId: "G-C7NZCEN08P",
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
