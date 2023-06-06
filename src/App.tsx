import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Flashcards from "./components/pages/Flashcards";
import useFirebaseConfig from "./components/Firebase/useFirebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { User } from "firebase/auth";

function App() {
  const { db, auth } = useFirebaseConfig();
  const [user, setUser] = useState<User | null>(null); // Specify the type as User | null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="App-header">
      {user ? (
        <>
          <Router>
            <Navbar user={user} />
            <Routes>
              <Route path="/" element={<Home db={db} user={user} />} />
              <Route path="/flashcards" element={<Flashcards />} />
            </Routes>
          </Router>
          <button onClick={() => signOut(auth)}>Log out</button>
        </>
      ) : (
        <Login db={db} auth={auth} />
      )}
    </div>
  );
}

function Login({ db, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in as:", user.uid);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed up as:", user.uid);

      // Create an empty task list for the user
      const taskListRef = collection(db, "taskLists");
      await addDoc(taskListRef, { userId: user.uid, tasks: [] });
    } catch (error) {
      console.log("Sign up error:", error);
    }
  };

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Log in</button>
      <button onClick={handleSignUp}>Sign up</button>
    </>
  );
}

export default App;

//Previous app
/*import { ChangeEvent, useEffect, useState } from "react";
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
import Flashcards from "./components/pages/Flashcards";
import useFirebaseConfig from "./components/Firebase/useFirebaseConfig";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
function App() {
  useFirebaseConfig();
  const { app, analytics, db } = useFirebaseConfig();
  const [uid, setUid] = useState<string>("");

  const [users, setUsers] = useState<{ id: string }[]>([]);
  const usersCollectionRef = collection(db, "users");

  const getUsers = async () => {
    const querySnapshot = await getDocs(usersCollectionRef);
    const userData: { id: string }[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        userData.push({ ...(doc.data() as { id: string }), id: doc.id });
      });
    }

    setUsers(userData);
  };

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

      //const existingData = userDoc.data();

      // Merge the existing data with the new data, while preserving the existing "xp" value

      if (!userDoc.exists) {
        // Document exists, retrieve existing data
        const existingData = userDoc.data();
        const newData = null;
        if (existingData) {
          // Merge the existing data with the new data, while preserving the existing "xp" value
          const newData = {
            ...existingData,
            position: existingData.position, // Add any additional user data fields you want to update or add
          };
        } else {
          // Handle the case when existingData is undefined
          console.log("Existing data is undefined");
        }

        console.log("successful login");
        // Update the document in the "users" collection with the merged data
        await setDoc(doc(db, "users", uid), newData);
      } else {
        // Document does not exist, create a new document with default values
        const newData = {
          position: "student", // Add any additional user data fields you want to store
        };

        console.log("successful login, creating new entry in db");

        // Create a new document in the "users" collection with the user data
        await setDoc(doc(db, "users", uid), newData);
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const addLoginData = () => {
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
          <button onClick={addLoginData}>Log In</button>
        </>
      )}
    </div>
  );
}

export default App;*/
