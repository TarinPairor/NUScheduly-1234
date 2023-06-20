import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("renders email input field", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();
});

test("renders password input field", () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText("Password");
  expect(passwordInput).toBeInTheDocument();
});

test("logs in when 'Log In' button is clicked", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByText("Log In");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(loginButton);

  // Add your assertions here based on the expected behavior after logging in
});

test("logs out when 'Log out' button is clicked", () => {
  render(<App />);
  const logoutButton = screen.getByText("Log out");

  fireEvent.click(logoutButton);

  // Add your assertions here based on the expected behavior after logging out
});

test("displays 'Sign in' link when not logged in", () => {
  render(<App />);
  const signInLink = screen.getByText("Sign in");
  expect(signInLink).toBeInTheDocument();
});

// Add more test cases based on the specific behavior you want to test
