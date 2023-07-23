import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../components/Card";

test("renders the front side of the card with English text", () => {
  const engText = "English Text";
  const hanText = "俚语";
  const pinText = "pin";

  render(<Card eng={engText} han={hanText} pin={pinText} />);

  const frontSide = screen.getByTestId("front-side");
  expect(frontSide).toHaveTextContent(engText);
  expect(frontSide).not.toHaveTextContent(hanText);
  expect(frontSide).not.toHaveTextContent(pinText);
});

test("flips the card when clicked and shows the back side with Han and Pin", () => {
  const engText = "English Text";
  const hanText = "俚语";
  const pinText = "pin";

  render(<Card eng={engText} han={hanText} pin={pinText} />);

  const cardContainer = screen.getByTestId("card-container");
  fireEvent.click(cardContainer);

  const backSide = screen.getByTestId("back-side");
  expect(backSide).toHaveTextContent(hanText);
  expect(backSide).toHaveTextContent(pinText);

  const frontSide = screen.getByTestId("front-side");
  expect(frontSide).not.toHaveTextContent(engText);
});

test("flips the card twice when clicked twice and shows the front side again", () => {
  const engText = "English Text";
  const hanText = "俚语";
  const pinText = "pin";

  render(<Card eng={engText} han={hanText} pin={pinText} />);

  const cardContainer = screen.getByTestId("card-container");
  fireEvent.click(cardContainer);

  let backSide = screen.getByTestId("back-side");
  expect(backSide).toHaveTextContent(hanText);

  fireEvent.click(cardContainer);

  backSide = screen.getByTestId("back-side");
  expect(backSide).toHaveTextContent(hanText);

  const frontSide = screen.getByTestId("front-side");
  expect(frontSide).toHaveTextContent(engText);
});
