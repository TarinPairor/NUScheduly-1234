import React from "react";
import "./DrawButton.css";

interface DrawButtonProps {
  drawCard: () => void;
}

const DrawButton: React.FC<DrawButtonProps> = ({ drawCard }) => {
  const handleDrawCard = () => {
    drawCard();
  };

  return (
    <div className="buttonContainer">
      <button className="btn" onClick={handleDrawCard}>
        Draw Card
      </button>
    </div>
  );
};

export default DrawButton;
