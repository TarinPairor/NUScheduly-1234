import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import useFirebaseConfig from "../Firebase/useFirebaseConfig";
import Message from "../Message";
import "./Collab.css";
// import Alert from "../Alert";

// Interface to represent the structure of a message
interface MessageData {
  id: string;
  title: string;
  text: string;
  date: Date;
  user: string;
}
// Interface for the Collaborate component's props
interface CollaborateProps {
  userId: string;
}

function Collaborate({ userId }: CollaborateProps) {
  // Get the Firestore instance from the custom hook
  const { db } = useFirebaseConfig();

  // References to Firestore collections and states for messages
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState<MessageData>({
    id: "", // Use empty string as a temporary key for new messages
    title: "",
    text: "",
    date: new Date(),
    user: userId,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch messages from Firestore and update state
  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(messagesRef, orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        const messageData = doc.data();
        const date = messageData.date.toDate();
        return {
          id: doc.id,
          ...messageData,
          date,
        };
      }) as MessageData[];
      setMessages(data);
    };

    fetchMessages();
  }, [messagesRef]);

  // Handle changes in the form inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMessage({
      ...newMessage,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to add a new message
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage.title || !newMessage.text) {
      setErrorMessage("Title and text cannot be empty.");
      return;
    }

    try {
      const docRef = await addDoc(messagesRef, newMessage);
      console.log("Message added with ID:", docRef.id);
      setNewMessage({
        id: "", // Reset the temporary key
        title: "",
        text: "",
        date: new Date(),
        user: userId,
      });
      setErrorMessage(null);
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  // Handle deletion of a message by its ID
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteDoc(doc(db, "messages", messageId));
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div>
      <h1>Collaborate Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newMessage.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            name="text"
            value={newMessage.text}
            onChange={handleInputChange}
          ></textarea>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Add Message</button>
      </form>

      <div>
        <h2>Messages:</h2>
        {messages.map((message) => (
          <Message
            key={message.id || Math.random().toString()} // Generate a temporary key if 'id' is empty
            message={message}
            onDelete={handleDeleteMessage}
          />
        ))}
      </div>
    </div>
  );
}

export default Collaborate;
