import React from "react";
import "./DrawButton.css";

// Interface to define the props for the DrawButton component
interface DrawButtonProps {
  // Callback function to handle the draw card action
  drawCard: () => void;
}

// DrawButton component is a functional component that represents a button to draw a card
const DrawButton: React.FC<DrawButtonProps> = ({ drawCard }) => {
  // Event handler for the click event on the button
  const handleDrawCard = () => {
    // Call the drawCard prop function when the button is clicked
    drawCard();
  };

  return (
    // Outer container for the button
    <div className="buttonContainer">
      {/* The button element */}
      <button className="btn" onClick={handleDrawCard}>
        Draw Card
      </button>
    </div>
  );
};

// Export the DrawButton component for use in other parts of the application
export default DrawButton;
