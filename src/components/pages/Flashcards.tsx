import { useState } from "react";
import "./Flashcards.css";
import { FlashcardList } from "../FlashcardList";

export default function Flashcards() {
  const [flashcards /*, setFlashcards*/] = useState(SAMPLE_FLASHCARDS);
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" data-testid="flashcard-list"></select>
        </div>
      </form>
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
    question: "What is 2 + 2",
    answer: "4",
    options: ["2", "3", "4"],
  },
  {
    id: 3,
    question: "What is 2 + 2",
    answer: "4",
    options: ["2", "3", "4"],
  },
];
