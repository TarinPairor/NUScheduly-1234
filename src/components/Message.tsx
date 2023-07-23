import React from "react";
import Box from "@mui/material/Box";

// Interface to define the props for the Message component
interface MessageProps {
  message: {
    id: string;
    title: string;
    text: string;
    date: Date;
    user: string;
  };
  // Callback function to handle the delete action for a message
  onDelete: (messageId: string) => void;
}

// Helper function to format the date in the desired format (dd/mm/yyyy)
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

// Message component is a functional component that displays a single message
const Message: React.FC<MessageProps> = ({ message }) => {
  // Extract the properties from the message object
  const { title, text, date } = message;

  // Format the date using the formatDate helper function
  const formattedDate = formatDate(date);

  return (
    // Outer container for the message
    <div className="message">
      <Box>
        {/* Message title */}
        <h3>{title}</h3>

        {/* Message text */}
        <p>{text}</p>

        {/* Container for message details */}
        <div className="message-details">
          {/* Display the formatted date */}
          <p className="message-date">
            <strong>Date:</strong> {formattedDate}
          </p>
        </div>
      </Box>
    </div>
  );
};

// Export the Message component for use in other parts of the application
export default Message;
