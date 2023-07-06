import { useState, useEffect } from "react";
import FlashcardMainPage from "../../FlashcardComponents/FlashcardMainPage";
import SideBar from "../FlashcardContainer/SideBar";

function Flashcards() {
  const [userDecks, setUserDecks] = useState<
    {
      id: number;
      data: { name: string };
      content: { front: string; back: string }[];
    }[]
  >([]);
  const initialDeck = {
    id: 0,
    data: { name: "" },
    content: [],
  };

  const [selectedDeck, setSelectedDeck] = useState<{
    id: number;
    data: { name: string };
    content: { front: string; back: string }[];
  }>(initialDeck);
  const [addQuestionsView, setAddQuestionsView] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [cardSide, setCardSide] = useState("front");
  const [knowItCards, setKnowItCards] = useState<
    { front: string; back: string }[]
  >([]);
  const [dontKnowItCards, setDontKnowItCards] = useState<
    { front: string; back: string }[]
  >([]);

  const initialDecks = [
    {
      id: 0,
      data: { name: "I'm no math magician or anything" },
      content: [
        { front: "2+2", back: "4" },
        {
          front: "What is the pythagorean theorem?",
          back: "Sounds like it's just a theory to me!",
        },
        {
          front: "What is math?",
          back: "Well that's just like, your opinion, man.",
        },
        {
          front:
            "How many flaps per second for a 5 ounce swallow to carry a 1 pound coconut?",
          back: "An african swallow, or a European swallow?! ",
        },
      ],
    },
  ];

  // retrieves persisted decks through local storage
  useEffect(() => {
    const data = localStorage.getItem("deck-list");
    if (data) {
      setUserDecks(JSON.parse(data));
    } else {
      setUserDecks(initialDecks);
    }
  }, []);

  // persists decks to local storage
  useEffect(() => {
    localStorage.setItem("deck-list", JSON.stringify(userDecks));
  });

  //creates a new deck and adds it to the user deck list state: userDecks
  const createNewDeck = () => {
    const newDeck = {
      id: userDecks.length,
      data: { name: "Click title area to name your new deck" },
      content: [],
    };
    setUserDecks([...userDecks, newDeck]);
  };

  // Creates a new card, and adds it to the selected deck
  const addCard = () => {
    const newCard = { front: "Front Side", back: "Back Side" };
    const newCardList = [...selectedDeck.content, newCard];
    const index = selectedDeck.id;

    const updatedDeckData = {
      id: index,
      data: selectedDeck.data,
      content: newCardList,
    };

    setSelectedDeck(updatedDeckData);

    const newDecks = [...userDecks];

    newDecks
      .filter((deck) => deck.id !== selectedDeck.id)
      .splice(index, 1, updatedDeckData);

    setUserDecks(newDecks);
  };

  // Removes the selected card from the selected deck
  const deleteCard = (currentCard: { front: string }) => {
    const filteredCardList = selectedDeck.content.filter(
      (card) => card.front !== currentCard.front
    );
    userDecks.filter((deck) => deck.id !== selectedDeck.id);

    const newSelectedDeck = {
      id: selectedDeck.id,
      data: selectedDeck.data,
      content: filteredCardList,
    };
    setSelectedDeck(newSelectedDeck);

    const newDecks = [...userDecks];
    newDecks.splice(selectedDeck.id, 1, newSelectedDeck);

    setUserDecks(newDecks);
  };

  //Updates the selected card to user inputs
  const updateCard = (index: number, front: any, back: any) => {
    const newCardData = { front: front, back: back };

    const cardList = [...selectedDeck.content];
    cardList.splice(index, 1, newCardData);

    const newSelectedDeckData = {
      id: selectedDeck.id,
      data: selectedDeck.data,
      content: cardList,
    };
    setSelectedDeck(newSelectedDeckData);

    const newDecks = [...userDecks];

    newDecks.splice(selectedDeck.id, 1, newSelectedDeckData);

    setUserDecks(newDecks);
  };

  // Removes the selected deck from deck list state: userDecks
  const removeDeck = (deck: {
    id: string;
    data: {
      name: string;
    };
    content: any;
  }) => {
    const updatedDeckList = [...userDecks];
    const index = parseInt(deck.id, 10); // Convert id to a number
    updatedDeckList.splice(index, 1);
    setUserDecks(updatedDeckList);
  };

  return (
    <div className="App">
      <SideBar
        userDecks={userDecks}
        setUserDecks={setUserDecks}
        removeDeck={removeDeck}
        createNewDeck={createNewDeck}
        addQuestionsView={addQuestionsView}
        setAddQuestionsView={setAddQuestionsView}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
        addCard={addCard}
        quizMode={quizMode}
        setQuizMode={setQuizMode}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        cardSide={cardSide}
        setCardSide={setCardSide}
        deleteCard={deleteCard}
        updateCard={updateCard}
      />
      <FlashcardMainPage
        quizMode={quizMode}
        selectedDeck={selectedDeck}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        cardSide={cardSide}
        setCardSide={setCardSide}
        knowItCards={knowItCards}
        setKnowItCards={setKnowItCards}
        dontKnowItCards={dontKnowItCards}
        setDontKnowItCards={setDontKnowItCards}
      />
    </div>
  );
}

export default Flashcards;
