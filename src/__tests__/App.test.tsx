import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders login form when not logged in", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: "Log In" });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("renders logout button when logged in", () => {
  render(<App />);
  const logoutButton = screen.getByRole("button", { name: "Log out" });

  expect(logoutButton).toBeInTheDocument();
});
