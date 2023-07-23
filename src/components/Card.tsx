import React, { useState } from "react";
import "./Card.css";

// Interface to define the props for the Card component
interface CardProps {
  eng: string; // English text to display on the front of the card
  han: string; // Hanzi text to display on the back of the card
  pin: string; // Pinyin text to display on the back of the card
}

// Card component is a functional component that represents a flip card
const Card: React.FC<CardProps> = ({ eng, han, pin }) => {
  // State to keep track of whether the card is flipped or not
  const [flipped, setFlipped] = useState(false);

  // Function to handle the click event on the card and flip it
  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    // The card-container div is the main container for the flip card
    <div
      className={`card-container ${flipped ? "flipped" : ""}`}
      onClick={handleClick} // Click event to flip the card when it is clicked
    >
      {/* The card div represents the front and back of the card */}
      <div className="card">
        {/* The front div contains the English text */}
        <div className="front">
          <div className="eng">{eng}</div>
        </div>
        {/* The front back contains the Hanzi and Pinyin text, hidden initially */}
        <div className="front back">
          <div className="han">{han}</div>
          <div className="pin">{pin}</div>
        </div>
      </div>
    </div>
  );
};

// Export the Card component for use in other parts of the application
export default Card;
