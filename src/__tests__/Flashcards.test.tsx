import { render, screen } from "@testing-library/react";
import Flashcards from "../components/pages/Flashcards";
import "@testing-library/jest-dom/extend-expect";

test("renders category select element", () => {
  render(<Flashcards />);

  const categorySelect = screen.getByLabelText("Category");
  expect(categorySelect).toBeInTheDocument();
});

test("renders flashcard list", () => {
  render(<Flashcards />);

  const flashcardList = screen.getByTestId("flashcard-list");
  expect(flashcardList).toBeInTheDocument();
});
