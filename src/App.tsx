import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyB6FPTWzjcvVa8QkjtSQgcMDXoXN_zl5z0",
    authDomain: "fir-test1-d5129.firebaseapp.com",
    projectId: "fir-test1-d5129",
    storageBucket: "fir-test1-d5129.appspot.com",
    messagingSenderId: "895677007234",
    appId: "1:895677007234:web:efccf9a84d6e810db73b9b",
    measurementId: "G-BHHCBREN6P",
  };
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const addData = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("Login error:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <div className="App-header">
      {isLoggedIn ? (
        <>
          <h1>Hello</h1>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <input
            placeholder="Email"
            name="email"
            type="email"
            className="input-fields"
            onChange={(event) => handleInputs(event)}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            className="input-fields"
            onChange={(event) => handleInputs(event)}
          />
          <button onClick={addData}>Log In</button>
        </>
      )}
    </div>
  );
}

export default App;
