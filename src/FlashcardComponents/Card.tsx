import { useState } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { GrEdit } from "react-icons/gr";
import EditCard from "./EditCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css";

interface CardProps {
  currentCard: {
    front: string;
    back: string; // Add 'back' property here
  };
  cardNumber: number;
  deleteCard: (card: { front: string }) => void;
  updateCard: (cardNumber: number, front: string, back: string) => void;
  setCardSide: (side: string) => void;
}

export default function Card({
  currentCard,
  cardNumber,
  deleteCard,
  updateCard,
  setCardSide,
}: CardProps) {
  const [editCard, setEditCard] = useState(false);

  // toggles card view or card edit mode
  const editToggle = () => {
    setEditCard(!editCard);
  };

  return (
    <div className="card-section">
      {editCard === false ? (
        <div className="small-card">
          <div className="small-card-buttons">
            <GrEdit className="edit-button" onClick={editToggle} />
            <div className="delete-button">
              <span
                title="Trash"
                onClick={() => {
                  setCardSide("front");
                  deleteCard(currentCard);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
            </div>
          </div>
          <p>{currentCard.front}</p>
        </div>
      ) : (
        <EditCard
          currentCard={currentCard}
          setEditCard={setEditCard}
          updateCard={updateCard}
          cardNumber={cardNumber}
        />
      )}
    </div>
  );
}
