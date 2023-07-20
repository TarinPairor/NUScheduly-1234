import React from "react";
//import "./RecallButton.css";

interface IRecallButtonProps {
  recallCard: () => void;
}

const IRecallButton: React.FC<IRecallButtonProps> = ({ recallCard }) => {
  const handleRecallCard = () => {
    recallCard();
  };

  return (
    <div className="buttonContainer">
      <button className="btn recall" onClick={handleRecallCard}>
        I Recall
      </button>
    </div>
  );
};

export default IRecallButton;
