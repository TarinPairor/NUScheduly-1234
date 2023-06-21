import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders email input field", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();
});
