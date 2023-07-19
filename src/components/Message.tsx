import React from "react";
import Box from "@mui/material/Box";
interface MessageProps {
  message: {
    id: string;
    title: string;
    text: string;
    date: Date;
    user: string;
  };
  onDelete: (messageId: string) => void;
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { title, text, date } = message;
  const formattedDate = formatDate(date);
  return (
    <div className="message">
      <Box>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="message-details">
          <p className="message-date">
            <strong>Date:</strong> {formattedDate}
          </p>
        </div>
      </Box>
    </div>
  );
};

export default Message;
