import { useEffect, useState } from "react";
import useFirebaseConfig from "../Firebase/useFirebaseConfig";
import {
  collection,
  getDoc,
  getDocs,
  setDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";

// MUI imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import BasicAlerts from "../Alert";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUid: React.Dispatch<React.SetStateAction<string>>;
}

// Interface for user data stored in the "users" collection
interface UserData {
  email: string;
}

export default function Login({ setIsLoggedIn, setUid }: LoginProps) {
  const { db } = useFirebaseConfig();
  const [isWrong] = useState<boolean>(false); // State to control wrong password message
  const [alertMessage, setAlertMessage] = useState("");

  // State to store the list of users from Firestore
  const [users, setUsers] = useState<DocumentData[]>([]);
  const usersCollectionRef = collection(db, "users");

  // Fetch users from Firestore and store them in the state
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // For debugging purposes, log each user
      users.map((user) => {
        console.log(user);
      });
    };

    getUsers();
  }, []);

  // Firebase authentication
  const auth = getAuth();
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  // Handle input changes for email and password fields
  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  // Function to handle form submission (login)
  const addData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Get the user ID
      const uid: string = userCredential.user.uid;
      setUid(uid);
      console.log(`uid: ${uid}`);

      // Retrieve the existing user document data
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      console.log(`userDoc: ${userDoc.data()}`);

      if (userDoc.exists()) {
        // Document exists, retrieve existing data
        const existingData: UserData = userDoc.data() as UserData;

        // Merge the existing data with the new data, while preserving the existing "email" value
        const newData: UserData = {
          ...existingData,
          email: data.email, // Add any additional user data fields you want to update or add
        };

        console.log("successful login");
        // Update the document in the "users" collection with the merged data
        await setDoc(doc(db, "users", uid), newData);
      } else {
        // Document does not exist, create a new document with default values
        const newData: UserData = {
          email: data.email, // Add any additional user data fields you want to store
        };

        console.log("successful login, creating new entry in db");

        // Create a new document in the "users" collection with the user data
        await setDoc(doc(db, "users", uid), newData);
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Login error:", error);
      setAlertMessage("Login error, try again!");
      /*
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/missing-password"
      ) {
        setIsWrong(true);

        setTimeout(() => {
          setIsWrong(false);
        }, 2000);
      }*/
    }
  };

  // Listen to authentication state changes to handle login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        //setIsLoggedIn(true);
        // const uid = user.uid;
      } else {
        // User is logged out
        setIsLoggedIn(false);
      }
    });

    // Format taken from https://github.com/mui/material-ui/blob/v5.13.2/docs/data/material/getting-started/templates/sign-in/SignIn.js
    return () => {
      unsubscribe();
    };
  }, []);

  // format taken from https://github.com/mui/material-ui/blob/v5.13.2/docs/data/material/getting-started/templates/sign-in/SignIn.js
  return (
    <>
      {alertMessage && (
        <BasicAlerts onClose={() => setAlertMessage("")}>
          {alertMessage}
        </BasicAlerts>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#29a2ed" }}></Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={addData} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputs(event)
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputs(event)
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontWeight: 700,
              }}
            >
              Sign In
            </Button>
          </Box>
          {isWrong && (
            <Backdrop
              sx={{ color: "#FFF", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isWrong}
            >
              <Box
                sx={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    mt: 1,
                    backgroundColor: "#c41e16",
                    borderRadius: 2,
                    padding: 1,
                  }}
                >
                  <Typography component="h1" variant="h5">
                    wrong password
                  </Typography>
                </Box>
                <Box sx={{ mt: 1 }}></Box>
              </Box>
            </Backdrop>
          )}
        </Box>
      </Container>
    </>
  );
}

// const handleLogout = () => {
//   signOut(auth)
//     .then(() => {
//       setIsLoggedIn(false);
//     })
//     .catch((error) => {
//       console.log("Logout error:", error);
//     });
// };
