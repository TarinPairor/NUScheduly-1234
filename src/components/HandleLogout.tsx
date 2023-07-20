import { FC } from "react";
import { User } from "firebase/auth";
import useFirebaseConfig from "./Firebase/useFirebaseConfig";
import "./HandleLogout.css";

interface HomeProps {
  user: User;
}

const HandleLogout: FC<HomeProps> = ({ user }) => {
  const { auth } = useFirebaseConfig();

  const handleSignOut = () => {
    auth.signOut().catch((error: any) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <div className="home">
      <h3>
        Hello, <span>{user.displayName}</span>
      </h3>
      <img src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default HandleLogout;
