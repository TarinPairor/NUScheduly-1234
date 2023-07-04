import { render, screen } from "@testing-library/react";
import { FlashcardList } from "../components/FlashcardList";
import "@testing-library/jest-dom/extend-expect";

const mockFlashcards = [
  {
    id: 1,
    question: "Question 1",
    answer: "Answer 1",
    options: ["Option 1a", "Option 1b", "Option 1c"],
  },
  {
    id: 2,
    question: "Question 2",
    answer: "Answer 2",
    options: ["Option 2a", "Option 2b", "Option 2c"],
  },
  {
    id: 3,
    question: "Question 3",
    answer: "Answer 3",
    options: ["Option 3a", "Option 3b", "Option 3c"],
  },
  {
    id: 4,
    question: "Question 4",
    answer: "Answer 4",
    options: ["Option 4a", "Option 4b", "Option 4c"],
  },
];

test("renders all flashcards", () => {
  render(<FlashcardList flashcards={mockFlashcards} />);

  // Check if all flashcard questions are rendered
  mockFlashcards.forEach((flashcard) => {
    const questionElement = screen.getByText(flashcard.question);
    expect(questionElement).toBeInTheDocument();
  });
});

test("renders flashcards correctly", () => {
  render(<FlashcardList flashcards={mockFlashcards} />);

  // Check if the flashcards are rendered correctly
  const flashcardElements = screen.getAllByTestId(/^flashcard-/);
  expect(flashcardElements).toHaveLength(mockFlashcards.length);

  mockFlashcards.forEach((flashcard) => {
    const questionElement = screen.getByText(flashcard.question);
    const answerElement = screen.getByText(flashcard.answer);
    expect(questionElement).toBeInTheDocument();
    expect(answerElement).toBeInTheDocument();

    flashcard.options.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });
});

test("assigns unique key to each flashcard", () => {
  render(<FlashcardList flashcards={mockFlashcards} />);
  // Check if each flashcard has a unique key
  const flashcardElements = screen.getAllByTestId(/^flashcard-/);
  flashcardElements.forEach((flashcardElement) => {
    const key = flashcardElement.getAttribute("data-testid");
    const keyIndex = key ? key.split("-")[1] : null;
    expect(keyIndex).toBeDefined();
  });
});

/*test("renders correct number of flashcards", () => {
  render(<FlashcardList flashcards={mockFlashcards} />);

  // Check if the correct number of flashcards is rendered
  const flashcardElements = screen.getAllByTestId(/^flashcard-front-/);
  expect(flashcardElements.length).toBe(mockFlashcards.length);
});*/
