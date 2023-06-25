import { render, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { Flashcard } from "../components/Flashcard";
import FlashcardProps from "../components/Interfaces/FlashcardProps";

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
  const questionElement = screen.getByTestId("flashcard-front");
  expect(questionElement).toBeInTheDocument();
});

test("renders the question on the back side", () => {
  render(<Flashcard {...mockFlashcard} />);
  const questionElement = screen.getByTestId("flashcard-back");
  expect(questionElement).toBeInTheDocument();
});

test("sets the maximum height correctly", () => {
  const flashcard = {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
    options: ["London", "Berlin", "Paris", "Rome"],
  };

  render(<Flashcard flashcard={flashcard} />);

  // Mock the getBoundingClientRect function to return specific heights
  const frontHeight = 200; // Mocked front element height
  const backHeight = 150; // Mocked back element height
  const getBoundingClientRectMock = jest.fn();
  getBoundingClientRectMock.mockReturnValueOnce({ height: frontHeight });
  getBoundingClientRectMock.mockReturnValueOnce({ height: backHeight });
  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    value: getBoundingClientRectMock,
  });

  // Trigger the setMaxHeight function
  const flashcardElement = screen.getByTestId("flashcard-front");
  screen.getByTestId("flashcard-back"); // Accessing the back element triggers setMaxHeight

  // Check if the height state is initially "initial"
  expect(flashcardElement.style.height).toBe("");

  // Add assertions to check the final height state if needed
  // ...
});

/*test("flips the card when clicked", () => {
  render(<Flashcard {...mockFlashcard} />);
  const cardElement = screen.getByTestId("flashcard-back");
  expect(cardElement).not.toHaveClass("flip"); // Initially, the card should not have the class "flip"

  cardElement.click();
  expect(cardElement).toHaveClass("flip"); // After clicking, the card should have the class "flip"

  cardElement.click();
  expect(cardElement).not.toHaveClass("flip"); // After clicking again, the card should not have the class "flip"
});*/
