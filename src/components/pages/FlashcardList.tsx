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

interface FlashcardListProps {
  userId: string;
}

function FlashcardList({ userId }: FlashcardListProps) {
  const [cards, setCards] = useState<any[]>([]);
  const db = getFirestore();
  const flashcardsRef = collection(db, `users/${userId}/flashcards`);

  useEffect(() => {
    const unsubscribe = onSnapshot(flashcardsRef, (snapshot) => {
      const flashcards: any[] = [];
      snapshot.forEach((doc) => {
        const flashcard = { id: doc.id, ...doc.data() };
        flashcards.push(flashcard);
      });
      setCards(flashcards);
    });

    return () => unsubscribe();
  }, [flashcardsRef, userId]);

  const handleDeleteCard = async (cardId: string) => {
    try {
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
              <div className="han">{card.han}</div>
              <div className="pin">{card.pin}</div>
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
