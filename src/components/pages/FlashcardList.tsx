import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaTrashAlt } from "react-icons/fa";
import "./FlashcardList.css";

// Interface for FlashcardList component's props
interface FlashcardListProps {
  userId: string;
}

function FlashcardList({ userId }: FlashcardListProps) {
  // State to store flashcard data
  const [cards, setCards] = useState<any[]>([]);
  const db = getFirestore();
  const flashcardsRef = collection(db, `users/${userId}/flashcards`);

  // Fetch flashcards from Firestore when the component mounts
  useEffect(() => {
    // Subscribe to real-time changes in the flashcards collection
    const unsubscribe = onSnapshot(flashcardsRef, (snapshot) => {
      const flashcards: any[] = [];
      snapshot.forEach((doc) => {
        // Extract the document ID and data from the snapshot
        const flashcard = { id: doc.id, ...doc.data() };
        flashcards.push(flashcard);
      });
      setCards(flashcards);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [flashcardsRef, userId]);

  // Function to handle deleting a flashcard by its ID
  const handleDeleteCard = async (cardId: string) => {
    try {
      // Delete the flashcard document from Firestore
      await deleteDoc(doc(flashcardsRef, cardId));
      console.log("Flashcard deleted:", cardId);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="FlashcardList">
      {cards.map((card) => (
        <div className="card-container" key={card.id}>
          <div className="card">
            <div className="front">
              <div className="eng">{card.eng}</div>
            </div>
            <div className="back"></div>
          </div>
          <button
            className="delete-button"
            onClick={() => handleDeleteCard(card.id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FlashcardList;
