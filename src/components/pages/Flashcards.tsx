import React from "react";
import { useState, useEffect } from "react";
import Card from "../Card";
import DrawButton from "../DrawButton";
import Alert from "../Alert";
import "firebase/database";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

// Interface for Flashcards component's props
interface FlashcardsProps {
  userId: string;
}

function Flashcards({ userId }: FlashcardsProps) {
  // State to store flashcard data
  const [cards, setCards] = useState<any[]>([]);
  const [currentCard, setCurrentCard] = useState<any>({});
  const [newCard, setNewCard] = useState<any>({
    eng: "",
    han: "",
    pin: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Firestore database reference and collection reference
  const db = getFirestore();
  const flashcardsRef = collection(db, `users/${userId}/flashcards`);

  useEffect(() => {
    // Fetch flashcards from Firestore and subscribe to real-time changes
    const unsubscribe = onSnapshot(flashcardsRef, (snapshot) => {
      const flashcards: any[] = [];
      snapshot.forEach((doc) => {
        const flashcard = { id: doc.id, ...doc.data() };
        flashcards.push(flashcard);
      });
      setCards(flashcards);

      // If currentCard is empty or not valid, update it with a random card
      if (!currentCard.eng || !currentCard.han || !currentCard.pin) {
        setCurrentCard(getRandomCard(flashcards));
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [flashcardsRef, userId, currentCard]);

  // Function to get a random card from the cards array
  const getRandomCard = (currentCards: any[]): any => {
    if (currentCards.length === 0) {
      return null;
    }

    const filteredCards = currentCards.filter((card) => card !== currentCard);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    return filteredCards[randomIndex];
  };

  // Function to update the current card
  const updateCard = () => {
    if (cards.length === 0) {
      setAlertMessage("Card list is empty!");
      setShowAlert(true);
      return;
    }
    if (cards.length === 1) {
      setAlertMessage("Add some more!");
      setShowAlert(true);
      return;
    }

    setCurrentCard(getRandomCard(cards));
    console.log(cards.length);
  };

  // Function to handle input change for new card form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard({
      ...newCard,
      [e.target.name]: e.target.value,
    });
  };

  // Function to add a new card to the database
  const addCard = async () => {
    if (!newCard.eng || !newCard.han || !newCard.pin) {
      setShowAlert(true);
      setAlertMessage("Please fill in all fields.");
      return;
    }

    try {
      const docRef = await addDoc(flashcardsRef, newCard);
      console.log("Flashcard added with ID:", docRef.id);
      setNewCard({ eng: "", han: "", pin: "" });
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  // Function to close the alert message
  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <div className="Flashcards">
      <div className="cardRow">
        {currentCard &&
        currentCard.eng &&
        currentCard.han &&
        currentCard.pin ? (
          <Card
            eng={currentCard.eng}
            han={currentCard.han}
            pin={currentCard.pin}
          />
        ) : (
          <div>Loading card...</div>
        )}
      </div>
      <div className="buttonRow">
        {showAlert && (
          <Alert onClose={closeAlert} severity="info">
            {alertMessage}
          </Alert>
        )}
        <div className="drawCard">
          <DrawButton drawCard={updateCard} />
        </div>
        <br></br>
        <div className="addCardForm">
          <input
            type="text"
            name="eng"
            value={newCard.eng}
            onChange={handleInputChange}
            placeholder="Front"
          />
          <input
            type="text"
            name="han"
            value={newCard.han}
            onChange={handleInputChange}
            placeholder="Back"
          />
          <input
            type="text"
            name="pin"
            value={newCard.pin}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <button onClick={addCard}>Add Card</button>
        </div>
      </div>
    </div>
  );
}

export default Flashcards;
