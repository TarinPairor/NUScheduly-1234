import { useState, ChangeEvent } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsBoxArrowInRight } from "react-icons/bs";

interface DeckProps {
  deck: {
    id: string;
    data: {
      name: string;
    };
    content: any; // Replace 'any' with the actual type of 'content'
  };
  removeDeck: (deck: {
    id: string;
    data: { name: string };
    content: any;
  }) => void;
  setAddQuestionsView: (view: boolean) => void;
  setSelectedDeck: (deck: {
    id: string;
    data: { name: string };
    content: any;
  }) => void;
  userDecks: Array<{ id: string; data: { name: string }; content: any }>;
  setUserDecks: (
    decks: Array<{ id: string; data: { name: string }; content: any }>
  ) => void;
  setQuizMode: (mode: boolean) => void;
  setQuestionNumber: (number: number) => void;
  setCardSide: (side: string) => void;
}

export default function Deck({
  deck,
  removeDeck,
  setAddQuestionsView,
  setSelectedDeck,
  userDecks,
  setUserDecks,
  setQuizMode,
  setQuestionNumber,
  setCardSide,
}: DeckProps) {
  const [deckTitle, setDeckTitle] = useState(deck.data.name);
  const [changingName, setChangingName] = useState(false);

  // sets ability to edit deck title
  const changeDeckName = () => {
    setChangingName(true);
  };

  // changes the current deck title
  const titleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(event.target.value);
  };

  // handles title submit and updates state of userDecks
  const titleSubmit = () => {
    setChangingName(false);
    const filteredDecks = userDecks.filter(
      (userDeck) => userDeck.id !== deck.id
    );
    const newDeckData = {
      id: deck.id,
      data: { name: deckTitle },
      content: deck.content,
    };
    const index = filteredDecks.findIndex(
      (userDeck) => userDeck.id === deck.id
    );
    filteredDecks[index] = newDeckData;
    setUserDecks(filteredDecks);
  };

  return (
    <div className="deck" key={`deck ${deck.id}`}>
      {changingName === false ? (
        <p onClick={changeDeckName} className="deck-title">
          {deckTitle}
        </p>
      ) : (
        <div className="edit-deck">
          <input
            className="edit-deck-name"
            type="text"
            value={deckTitle}
            onChange={titleChange}
          ></input>
          <button className="save-deck" onClick={titleSubmit} type="submit">
            Save
          </button>
        </div>
      )}
      <p
        className="add-cards-button"
        onClick={() => {
          setCardSide("front");
          setSelectedDeck(deck);
          setAddQuestionsView(true);
        }}
      >
        Add cards
      </p>

      <div className="deck-buttons">
        <div className="remove-deck-button">
          <span
            title="Trash"
            onClick={() => {
              removeDeck(deck);
              setQuizMode(false);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </div>
        <BsBoxArrowInRight
          className="view-deck-button"
          onClick={() => {
            setQuestionNumber(0);
            setCardSide("front");
            setSelectedDeck(deck);
            setQuizMode(true);
          }}
        />
      </div>
    </div>
  );
}
