import { useState } from "react";
import "./Flashcards.css";
import { FlashcardList } from "../FlashcardList";

export default function Flashcards() {
  const [flashcards] = useState(SAMPLE_FLASHCARDS);
  return (
    <>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}
const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2",
    answer: "4",
    options: ["2", "3", "4"],
  },
  {
    id: 2,
    question: "What is 2 + 3",
    answer: "5",
    options: ["3", "4", "5"],
  },
  {
    id: 3,
    question: "What is 2",
    answer: "a number",
    options: ["idk", "a string", "a number"],
  },
];
