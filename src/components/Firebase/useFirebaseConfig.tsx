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
  apiKey: "AIzaSyAs-ojjrnduxuL64nx671jh96FMSV9gFcQ",
  authDomain: "fir-test-3-28019.firebaseapp.com",
  projectId: "fir-test-3-28019",
  storageBucket: "fir-test-3-28019.appspot.com",
  messagingSenderId: "745467662412",
  appId: "1:745467662412:web:b5df661bd6358afce1e4e9",
  measurementId: "G-N5NR30JGKD",
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
