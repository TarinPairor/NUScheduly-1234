import React from "react";
//import "./DontRecallButton.css";

interface IDontRecallButtonProps {
  dontRecallCard: () => void;
}

const IDontRecallButton: React.FC<IDontRecallButtonProps> = ({ dontRecallCard }) => {
  const handleDontRecallCard = () => {
    dontRecallCard();
  };

  return (
    <div className="buttonContainer">
      <button className="btn dont-recall" onClick={handleDontRecallCard}>
        I Don't Recall
      </button>
    </div>
  );
};

export default IDontRecallButton;
