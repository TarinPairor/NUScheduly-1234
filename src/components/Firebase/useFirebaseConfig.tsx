import { useMemo } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserCredential } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6FPTWzjcvVa8QkjtSQgcMDXoXN_zl5z0",
  authDomain: "fir-test1-d5129.firebaseapp.com",
  projectId: "fir-test1-d5129",
  storageBucket: "fir-test1-d5129.appspot.com",
  messagingSenderId: "895677007234",
  appId: "1:895677007234:web:efccf9a84d6e810db73b9b",
  measurementId: "G-BHHCBREN6P",
};

const useFirebaseConfig = () => {
  const app = useMemo(() => initializeApp(firebaseConfig), []);
  const auth = useMemo(() => getAuth(app), [app]);
  const firestore = useMemo(() => getFirestore(app), [app]);

  const provider = useMemo(() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return provider;
  }, []);

  const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const addUserToFirestore = async (user: UserCredential) => {
    try {
      const { uid, email } = user.user;
      const userRef = doc(firestore, "users", uid);
      await setDoc(userRef, { email });
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
      throw error;
    }
  };

  const db = firestore; // Add the db constant as an alias for firestore

  return { app, signInWithGoogle, provider, auth, addUserToFirestore, db }; // Export the db constant
};

export default useFirebaseConfig;