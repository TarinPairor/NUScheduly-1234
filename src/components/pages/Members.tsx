import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import useFirebaseConfig from "../Firebase/useFirebaseConfig";

function Members() {
  const { db } = useFirebaseConfig();
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const querySnapshot = await getDocs(usersCollectionRef);
        const emails = querySnapshot.docs.map((doc) => doc.data().email);
        setEmails(emails);
      } catch (error) {
        console.log("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [db]);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {emails.map((email) => (
          <li key={email}>{email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Members;
