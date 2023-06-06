import { useState } from "react";
import "./Flashcards.css";
//import axios from "axios";
import { FlashcardList } from "../FlashcardList";

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  /*useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map(
          (
            questionItem: {
              correct_answer: any;
              incorrect_answers: any[];
              question: any;
            },
            index: any
          ) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((s) => decodeString(s)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          }
        )
      );
      console.log(res.data);
    });
  }, []);

  function decodeString(str: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }*/
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category"></select>
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
