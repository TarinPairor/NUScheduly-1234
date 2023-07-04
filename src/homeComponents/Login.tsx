import { useEffect, useState } from "react";
import { useFirebaseConfig } from "../components/Firebase/useFirebaseConfig";
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

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUid: React.Dispatch<React.SetStateAction<string>>;
}

interface UserData {
  xp: number;
  position: string;
}

export default function Login({ setIsLoggedIn, setUid }: LoginProps) {
  const { db } = useFirebaseConfig();
  const [isWrong] = useState<boolean>(false);

  // current database of users
  const [users, setUsers] = useState<DocumentData[]>([]);
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

  const auth = getAuth();
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

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

        // Merge the existing data with the new data, while preserving the existing "xp" value
        const newData: UserData = {
          ...existingData,
          xp: existingData.xp,
          position: existingData.position, // Add any additional user data fields you want to update or add
        };

        console.log("successful login");
        // Update the document in the "users" collection with the merged data
        await setDoc(doc(db, "users", uid), newData);
      } else {
        // Document does not exist, create a new document with default values
        const newData: UserData = {
          xp: 0,
          position: "normal", // Add any additional user data fields you want to store
        };

        console.log("successful login, creating new entry in db");

        // Create a new document in the "users" collection with the user data
        await setDoc(doc(db, "users", uid), newData);
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Login error:", error);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //setIsLoggedIn(true);
        // const uid = user.uid;
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // format taken from https://github.com/mui/material-ui/blob/v5.13.2/docs/data/material/getting-started/templates/sign-in/SignIn.js
  return (
    <>
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
