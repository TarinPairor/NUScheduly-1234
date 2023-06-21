import { render, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import { Flashcard } from "../components/Flashcard";
import FlashcardProps from "../components/Flashcard";

const mockFlashcard: FlashcardProps = {
  flashcard: {
    id: 1,
    question: "What is 2 + 2",
    answer: "4",
    options: ["2", "3", "4"],
  },
};

test("renders the question on the front side", () => {
  render(<Flashcard {...mockFlashcard} />);
  const questionElement = screen.getByText(mockFlashcard.flashcard.question);
  expect(questionElement).toBeInTheDocument();
});

test("flips the card when clicked", () => {
  render(<Flashcard {...mockFlashcard} />);
  const cardElement = screen.getByTestId("flashcard");
  expect(cardElement).toHaveClass("flip");

  cardElement.click();
  expect(cardElement).not.toHaveClass("flip");
});
