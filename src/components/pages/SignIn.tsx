import { useState, ChangeEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useFirebaseConfig from "../Firebase/useFirebaseConfig";

export default function SignIn() {
  const { auth } = useFirebaseConfig();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      console.log("User created in Firebase Authentication successfully!");
      navigate("/"); // Redirect to the root directory ("/")
    } catch (error) {
      console.log("Error creating user in Firebase Authentication:", error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

/*import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import useFirebaseConfig from "../Firebase/useFirebaseConfig";

export default function SignIn() {
  const { db } = useFirebaseConfig();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usersCollectionRef = collection(db, "users");

      // Create a new document in the "users" collection with the input values
      await addDoc(usersCollectionRef, {
        email,
        password,
      });

      setEmail("");
      setPassword("");

      console.log("User data added to Firestore successfully!");
    } catch (error) {
      console.log("Error adding user data to Firestore:", error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}*/
