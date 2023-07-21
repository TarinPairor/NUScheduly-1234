import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Flashcards from "./components/pages/Flashcards";
import useFirebaseConfig from "./components/Firebase/useFirebaseConfig";
import Inbox from "./components/pages/Inbox";
import Members from "./components/pages/Members";
import "./App.css";
import FlashcardList from "./components/pages/FlashcardList";
import Collaborate from "./components/pages/Collab";
import Login from "./components/pages/Login";
import HandleLogout from "./components/HandleLogout";
import Calendar from "./components/pages/Calendar";
import "./App.css";

function App() {
  const { auth } = useFirebaseConfig();
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string>(""); // Set uid to an empty string initially

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUid(user.uid); // Set the userId if the user is authenticated
      } else {
        setUid(""); // Set uid to an empty string if the user is not authenticated
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  console.log(user);

  // Show a loading indicator while the authentication state is being resolved
  if (uid === "") {
    return <Login />;
  }

  return (
    <div className="app">
      {user ? (
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
                <Route path="/calendar" element={<Calendar userId={uid} />} />
              </Routes>
            </div>
          </Router>
          <div className="handle-logout">
            <HandleLogout user={user}></HandleLogout>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
