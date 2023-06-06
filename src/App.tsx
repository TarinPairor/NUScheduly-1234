import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
// import { collection, getDoc, getDocs, setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import useFirebaseConfig from "./components/Firebase/useFirebaseConfig";

function App() {
  useFirebaseConfig();
  // const { app, analytics, db } = useFirebaseConfig();
  // const [uid, setUid] = useState<string>("");

  // const [users, setUsers] = useState<{ id: string }[]>([]);
  // const usersCollectionRef = collection(db, "users");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  //     users.map((user) => {
  //       console.log(user);
  //     });
  //   };

  //   getUsers();
  // }, []);

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

  // const addData = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       data.email,
  //       data.password
  //     );

  //     // Get the user ID
  //     const uid = userCredential.user.uid;
  //     setUid(uid);
  //     console.log(`uid: ${uid}`);

  //     // Retrieve the existing user document data
  //     const userRef = doc(db, "users", uid);
  //     const userDoc = await getDoc(userRef);
  //     console.log(`userDoc: ${userDoc.data()}`);

  //     //const existingData = userDoc.data();

  //     // Merge the existing data with the new data, while preserving the existing "xp" value

  //     if (userDoc.exists()) {
  //       // Document exists, retrieve existing data
  //       const existingData = userDoc.data();

  //       // Merge the existing data with the new data, while preserving the existing "xp" value
  //       const newData = {
  //         ...existingData,
  //         position: existingData.position, // Add any additional user data fields you want to update or add
  //       };

  //       console.log("successful login");
  //       // Update the document in the "users" collection with the merged data
  //       await setDoc(doc(db, "users", uid), newData);
  //     } else {
  //       // Document does not exist, create a new document with default values
  //       const newData = {
  //         position: "student", // Add any additional user data fields you want to store
  //       };

  //       console.log("successful login, creating new entry in db");

  //       // Create a new document in the "users" collection with the user data
  //       await setDoc(doc(db, "users", uid), newData);
  //     }
  //     setIsLoggedIn(true);
  //   } catch (error) {
  //     console.log("Login error:", error);
  //   }
  // };

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
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
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
