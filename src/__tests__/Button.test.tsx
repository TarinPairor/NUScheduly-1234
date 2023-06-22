import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Button from "../components/Button";
import "@testing-library/jest-dom/extend-expect";

test("renders button with children", () => {
  render(
    <Router>
      <Button>Click me</Button>
    </Router>
  );

  const buttonElement = screen.getByText("Click me");
  expect(buttonElement).toBeInTheDocument();
});

test("renders button with custom styles and size", () => {
  render(
    <Router>
      <Button buttonStyle="btn--outline" buttonSize="btn--large">
        Submit
      </Button>
    </Router>
  );

  const buttonElement = screen.getByText("Submit");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass("btn--outline");
  expect(buttonElement).toHaveClass("btn--large");
});

test("invokes onClick function when button is clicked", () => {
  const onClickMock = jest.fn();

  render(
    <Router>
      <Button onClick={onClickMock}>Click me</Button>
    </Router>
  );

  const buttonElement = screen.getByText("Click me");
  buttonElement.click();

  expect(onClickMock).toHaveBeenCalledTimes(1);
});
