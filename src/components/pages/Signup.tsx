import { useState, FormEvent } from "react";

// MUI imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

interface SignUpProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setIsSignUp }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();

  const [accExists, setAccExists] = useState<boolean>(false);
  const [shortPw, setShortPw] = useState<boolean>(false);

  // Handle form submission (signup)
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error: any) => {
        if (error.code === "auth/email-already-in-use") {
          setAccExists(true);

          setTimeout(() => {
            setIsSignUp(false);
          }, 2000);
        } else if (
          error.code === "auth/missing-password" ||
          error.code === "auth/weak-password"
        ) {
          setShortPw(true);

          setTimeout(() => {
            setShortPw(false);
          }, 2000);
        }
        const errorCode = error.code;
        console.log(errorCode);
        // ..
      });
  };

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
            Sign Up
          </Typography>
          <h6>Recommend Using NUS Email</h6>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              Sign Up
            </Button>
          </Box>
          {accExists && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={accExists}
            >
              <Box
                sx={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="inherit" sx={{ m: 1 }} />
                <Box sx={{ mt: 1 }}>
                  <Typography component="h1" variant="h5">
                    email already in use, redirecting to login page
                  </Typography>
                </Box>
              </Box>
            </Backdrop>
          )}
          {shortPw && (
            <Backdrop
              sx={{ color: "#FFF", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={shortPw}
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
                    password must be at least 6 characters long
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
};

export default SignUp;

{
  /* <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#29a2ed'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                fontWeight: 700
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider> */
}

{
  /* <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form> */
}
