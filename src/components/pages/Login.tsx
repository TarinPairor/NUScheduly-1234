import { FC } from "react";
import useFirebaseConfig from "../Firebase/useFirebaseConfig";

const Login: FC = () => {
  const { signInWithGoogle, addUserToFirestore } = useFirebaseConfig();

  const handleSignIn = (): void => {
    signInWithGoogle()
      .then((userCredential) => {
        void addUserToFirestore(userCredential);
        // Handle successful sign-in
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
