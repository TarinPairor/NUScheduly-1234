import React, { useState } from "react";
import "./Card.css";

interface CardProps {
  eng: string;
  han: string;
  pin: string;
}

const Card: React.FC<CardProps> = ({ eng, han, pin }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`card-container ${flipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="card">
        <div className="front">
          <div className="eng">{eng}</div>
        </div>
        <div className="front back">
          <div className="han">{han}</div>
          <div className="pin">{pin}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
