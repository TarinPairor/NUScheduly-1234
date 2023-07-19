// import { ChangeEvent, useEffect, useState } from "react";
// import {
//   collection,
//   getDoc,
//   getDocs,
//   setDoc,
//   doc,
//   addDoc,
// } from "firebase/firestore";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/pages/Home";
// import Flashcards from "./components/pages/Flashcards";
// import useFirebaseConfig from "./components/Firebase/useFirebaseConfig";
// import Inbox from "./components/pages/Inbox";
import Members from "./components/pages/Members";
// import "./App.css";
import FlashcardList from "./components/pages/FlashcardList";
import Collaborate from "./components/pages/Collab";

// function App() {
//   const { db } = useFirebaseConfig();
//   const [, /*users*/ setUsers] = useState<{ id: string }[]>([]);
//   const usersCollectionRef = collection(db, "users");
//   const [uid, setUid] = useState<string>("");
//   useEffect(() => {
//     let isMounted = true; // Add a flag to track component mount state

//     const getUsers = async () => {
//       try {
//         const data = await getDocs(usersCollectionRef);
//         if (isMounted) {
//           setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         }
//         data.docs.map((user) => {
//           console.log(user);
//         });
//       } catch (error) {
//         console.log("Error fetching users:", error);
//       }
//     };

//     getUsers();

//     // Cleanup function to cancel async tasks and subscriptions
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   ////
//   const auth = getAuth();
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const [isLoggedIn, setIsLoggedIn] = useState(false); //login 0

//   const handleInputs = (event: ChangeEvent<HTMLInputElement>) => {
//     const inputs = { [event.target.name]: event.target.value };
//     setData({ ...data, ...inputs });
//   };
//   ////
//   const addData = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );

//       // Get the user ID
//       const uid = userCredential.user.uid;
//       setUid(uid);
//       console.log(`uid: ${uid}`);

//       // Retrieve the existing user document data
//       const userRef = doc(db, "users", uid);
//       const userDoc = await getDoc(userRef);
//       console.log(`userDoc: ${userDoc.data()}`);

//       if (userDoc.exists()) {
//         console.log("successful login");

//         // Update the document in the "users" collection
//         await setDoc(userRef, { position: "student" }); // Update position to "student"
//       } else {
//         console.log("successful login, creating new entry in db");

//         // Create a new document in the "users" collection with default values
//         const newData = {
//           email: data.email,
//         };

//         await setDoc(userRef, newData);
//       }

//       // Create a new task document in the "users/userId/tasks" collection
//       const tasksCollectionRef = collection(db, `users/${uid}/tasks`);
//       const taskData = null;

//       const taskRef = await addDoc(tasksCollectionRef, taskData);
//       console.log("New task document ID:", taskRef.id);

//       setIsLoggedIn(true);
//       console.log("Welcome to the Home page");
//     } catch (error) {
//       console.log("Login error:", error);
//     }
//   };

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setIsLoggedIn(false);
//         setUid(""); // Reset the uid state variable
//       })
//       .catch((error) => {
//         console.log("Logout error:", error);
//       });
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         setUid(uid);
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [auth]);
//   return (
//     <div className="App-header">
//       {isLoggedIn ? (
//         <>
//           <Router>
//             <Navbar />
//             <div className="content-wrapper">
//               <Routes>
//                 <Route path="/" element={<Home userId={uid} />} />
//                 <Route
//                   path="/flashcards"
//                   element={<Flashcards userId={uid} />}
//                 />
//                 <Route
//                   path="/flashcardlist"
//                   element={<FlashcardList userId={uid} />}
//                 />
//                 <Route path="/inbox" element={<Inbox userId={uid} />} />
//                 <Route path="/members" element={<Members />} />
//                 <Route path="/collab" element={<Collaborate userId={uid} />} />
//               </Routes>
//             </div>
//           </Router>
//           <div className="logout-wrapper">
//             <button onClick={handleLogout}>Log out</button>
//           </div>
//         </>
//       ) : (
//         <>
//           <input
//             placeholder="Email"
//             name="email"
//             type="email"
//             className="input-fields"
//             onChange={(event) => handleInputs(event)}
//           />
//           <input
//             placeholder="Password"
//             name="password"
//             type="password"
//             className="input-fields"
//             onChange={(event) => handleInputs(event)}
//           />

//           <button onClick={addData}>Log In</button>
//           <></>
//         </>
//       )}
//     </div>
//   );
// }

// export default App; 

import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Flashcards from "./components/pages/Flashcards";
import Inbox from "./components/pages/Inbox";
import Login from "./components/pages/Login";
import { auth } from "./components/Firebase/useFirebaseConfig";

// MUI imports
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SignUp from "./components/pages/Signup";

function App() {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState("");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        if (isMountedRef.current) {
          setIsLoggedIn(false);
          setUid(""); // Reset the uid state variable
        }
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };
  useEffect(() => {
    return () => {
      // Cleanup function to be executed when the component is unmounted
      // Cancel any ongoing asynchronous tasks or subscriptions here
    };
  }, []);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      {!isLoggedIn &&
        (isSignUp ? (
          <SignUp setIsSignUp={setIsSignUp} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} setUid={setUid} />
        ))}
      {!isLoggedIn && (
        <>
          <Container maxWidth="xs">
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                onClick={toggleMode}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontWeight: 700,
                }}
              >
                {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
              </Button>
            </Box>
          </Container>
        </>
      )}
      <div>
        {isLoggedIn && (
           <>
           <Router>
             <Navbar />
             <div className="content-wrapper">
               <Routes>
                 <Route path="/" element={<Home userId={uid} />} />
                 <Route
                   path="/flashcards"
                   element={<Flashcards userId={uid} />}
                 />
                 <Route
                   path="/flashcardlist"
                   element={<FlashcardList userId={uid} />}
                 />
                 <Route path="/inbox" element={<Inbox userId={uid} />} />
                 <Route path="/members" element={<Members />} />
                 <Route path="/collab" element={<Collaborate userId={uid} />} />
               </Routes>
             </div>
           </Router>
           <div className="logout-wrapper">
             <button onClick={handleLogout}>Log out</button>
           </div>
         </>
          // <>
          //   <Router>
          //     <Navbar />
          //     <Routes>
          //       <Route path="/" element={<Home uid={uid}></Home>} />
          //       <Route path="/flashcards" element={<Flashcards />} />
          //       <Route path="/inbox" element={<Inbox userId={uid} />} />
          //     </Routes>
          //   </Router>
          //   <button onClick={handleLogout}>Log out</button>
          // </>
        )}
      </div>
    </div>
  );
}

export default App;