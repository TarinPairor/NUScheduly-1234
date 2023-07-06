import { useState, ChangeEvent } from "react";
import { MdSwapVert } from "react-icons/md";

interface EditCardProps {
  currentCard: {
    front: string;
    back: string;
  };
  setEditCard: (editCard: boolean) => void;
  updateCard: (cardNumber: number, front: string, back: string) => void;
  cardNumber: number;
}

export default function EditCard({
  currentCard,
  setEditCard,
  updateCard,
  cardNumber,
}: EditCardProps) {
  const [cardFront, setCardFront] = useState(currentCard.front);
  const [cardBack, setCardBack] = useState(currentCard.back);

  // switches card front and card back
  const swapCardSides = () => {
    const frontSide = cardFront;
    setCardFront(cardBack);
    setCardBack(frontSide);
  };

  const handleCardFrontChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardFront(e.target.value);
  };

  const handleCardBackChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardBack(e.target.value);
  };

  return (
    <div className="small-card">
      <div className="small-card-front">
        <p className="edit-card-side-choice">Front</p>
        <input
          className="edit-card-input"
          type="text"
          value={cardFront}
          onChange={handleCardFrontChange}
        ></input>
      </div>

      <div className="edit-card-center">
        <div className="edit-card-separator"></div>
        <MdSwapVert className="swap-button" onClick={swapCardSides} />
        <div className="edit-card-separator"></div>
      </div>

      <div className="small-card-back">
        <p className="edit-card-side-choice">Back</p>
        <input
          className="edit-card-input"
          type="text"
          value={cardBack}
          onChange={handleCardBackChange}
        ></input>
      </div>
      <div className="edit-card-buttons">
        <button onClick={() => setEditCard(false)}>Cancel</button>
        <button
          onClick={() => {
            setEditCard(false);
            updateCard(cardNumber, cardFront, cardBack);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
