import FlashcardList from "./components/pages/FlashcardList";
import Collaborate from "./components/pages/Collab";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Flashcards from "./components/pages/Flashcards";
import Inbox from "./components/pages/Inbox";
import SignUp from "./components/pages/Signup";
import "./App.css";
import Calendar from "./components/pages/Calendar";
import Login from "./components/pages/Login";

// MUI imports
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function App() {
  // useRef hook to track whether the component is mounted or not
  const isMountedRef = useRef(true);

  // useEffect hook to set isMountedRef to false when the component is unmounted
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // State variables to manage sign up, login, and user authentication
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState("");

  // useEffect hook with an empty dependency array, similar to componentDidMount
  useEffect(() => {
    return () => {
      // Cleanup function to be executed when the component is unmounted
      // Cancel any ongoing asynchronous tasks or subscriptions here
    };
  }, []);

  // Function to toggle between Sign Up and Login mode
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="App-header">
      {/* If the user is not logged in, render either the Sign Up or Login component */}
      {!isLoggedIn &&
        (isSignUp ? (
          <SignUp setIsSignUp={setIsSignUp} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} setUid={setUid} />
        ))}

      {!isLoggedIn && (
        <>
          {/* Render a button to toggle between Sign Up and Login mode */}
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
        {/* If the user is logged in, render the main content */}
        {isLoggedIn && (
          <>
            {/* Set up the routing for different pages using react-router-dom */}
            <Router>
              {/* Render the navigation bar */}
              <Navbar />

              {/* Render the main content wrapper */}
              <div className="content-wrapper">
                <Routes>
                  {/* Set up routes for different pages */}
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
                  <Route
                    path="/collab"
                    element={<Collaborate userId={uid} />}
                  />
                  <Route path="/calendar" element={<Calendar userId={uid} />} />
                </Routes>
              </div>
            </Router>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
