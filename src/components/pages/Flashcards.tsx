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

import TextField from "@mui/material/TextField";
import IRecallButton from "../IRecallButton";
import IDontRecallButton from "../IDontRecallButton";
interface FlashcardsProps {
  userId: string;
}

function Flashcards({ userId }: FlashcardsProps) {
  const [cards, setCards] = useState<any[]>([]);
  const [currentCard, setCurrentCard] = useState<any>({});
  const [newCard, setNewCard] = useState<any>({
    eng: "",
    han: "",
    pin: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [, setRecalledCards] = useState<any[]>([]);
  const [, setNotRecalledCards] = useState<any[]>([]);

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

      if (!currentCard.eng || !currentCard.han || !currentCard.pin) {
        setCurrentCard(getRandomCard(flashcards));
      }
    });

    return () => unsubscribe();
  }, [flashcardsRef, userId, currentCard]);

  const getRandomCard = (currentCards: any[]): any => {
    if (currentCards.length === 0) {
      return null;
    }

    const filteredCards = currentCards.filter((card) => card !== currentCard);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    return filteredCards[randomIndex];
  };

  const updateCard = (isRecalled: boolean) => {
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

    if (isRecalled) {
      // Move the current card to recalledCards
      setRecalledCards((prevRecalled) => [...prevRecalled, currentCard]);
    } else {
      // Move the current card to notRecalledCards
      setNotRecalledCards((prevNotRecalled) => [
        ...prevNotRecalled,
        currentCard,
      ]);
    }

    setCurrentCard(getRandomCard(cards));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard({
      ...newCard,
      [e.target.name]: e.target.value,
    });
  };

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

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <div className="Flashcards">
      {showAlert && (
        <Alert onClose={closeAlert} severity="info">
          {alertMessage}
        </Alert>
      )}
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
        <div className="drawCard">
          <DrawButton drawCard={() => updateCard(false)} />
        </div>
        <div className="recallCard">
          <IRecallButton recallCard={() => updateCard(true)} />
        </div>
        <div className="dontRecallCard">
          <IDontRecallButton dontRecallCard={() => updateCard(false)} />
        </div>
        <br />
        <div className="addCardForm">
          <div className="addCardForm">
            <TextField
              id="eng"
              label="Front"
              value={newCard.eng}
              onChange={handleInputChange}
            />
            <TextField
              id="han"
              label="Back"
              value={newCard.han}
              onChange={handleInputChange}
            />
            <TextField
              id="pin"
              label="Description"
              value={newCard.pin}
              onChange={handleInputChange}
            />
            <button onClick={addCard}>Add Card</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcards;
