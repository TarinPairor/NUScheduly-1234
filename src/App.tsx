import { ChangeEvent, useEffect, useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Flashcards from "./components/pages/Flashcards";
import useFirebaseConfig from "./components/Firebase/useFirebaseConfig";
import SignIn from "./components/pages/SignIn";
function App() {
  useFirebaseConfig();
  const { db } = useFirebaseConfig(); //const { app, analytics, db } = useFirebaseConfig();
  const [users, setUsers] = useState<{ id: string }[]>([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      users.map((user) => {
        console.log(user);
      });
    };

    getUsers();
  }, []);
  ////
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
  ////
  const addData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Get the user ID
      const uid = userCredential.user.uid;
      setUid(uid);
      console.log(`uid: ${uid}`);

      // Retrieve the existing user document data
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      console.log(`userDoc: ${userDoc.data()}`);

      if (userDoc.exists()) {
        console.log("successful login");

        // Update the document in the "users" collection
        await setDoc(userRef, { position: "student" }); // Update position to "student"
      } else {
        console.log("successful login, creating new entry in db");

        // Create a new document in the "users" collection with default values
        const newData = {
          position: "student",
        };

        await setDoc(userRef, newData);
      }

      // Create a new task document in the "users/userId/tasks" collection
      const tasksCollectionRef = collection(db, `users/${uid}/tasks`);
      const taskData = null;

      const taskRef = await addDoc(tasksCollectionRef, taskData);
      console.log("New task document ID:", taskRef.id);

      setIsLoggedIn(true);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const [uid, setUid] = useState<string>("");
  /*const addLoginData = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        setUid(uid);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("Login error:", error);
      });
  };*/

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setUid(""); // Reset the uid state variable
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
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
              <Route path="/" element={<Home userId={uid}></Home>} />
              <Route path="/flashcards" element={<Flashcards />} />
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
          <Router>
            <Link to="/signin">Sign in</Link>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Router>
          {/*<button onClick={() => navigate("/signin")}>Go to Sign In</button>*/}
          <></>
        </>
      )}
    </div>
  );
}

export default App;
