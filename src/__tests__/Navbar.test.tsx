import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";

test("renders Navbar component", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  // Check if the navbar logo is rendered
  const logoElement = screen.getByText("NUSCHEDULY");
  expect(logoElement).toBeInTheDocument();

  // Check if the home link is rendered
  const homeLinkElement = screen.getByText("Home");
  expect(homeLinkElement).toBeInTheDocument();

  // Check if the flashcards link is rendered
  const flashcardsLinkElement = screen.getByText("Flashcards");
  expect(flashcardsLinkElement).toBeInTheDocument();

  // Check if the collaborate link is rendered
  const collaborateLinkElement = screen.getByText("Collaborate");
  expect(collaborateLinkElement).toBeInTheDocument();

  // Check if the inbox link is rendered
  const inboxLinkElement = screen.getByText("Inbox");
  expect(inboxLinkElement).toBeInTheDocument();
});

test("toggles menu icon on click", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  // Check if the menu icon starts with fa-bars class
  const menuIconElement = screen.getByTestId("menu-icon");
  expect(menuIconElement).toHaveClass("fa-bars");

  // Click the menu icon
  fireEvent.click(menuIconElement);

  // Check if the menu icon updates to fa-times class
  expect(menuIconElement).toHaveClass("fa-times");
});

test("closes mobile menu on link click", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  // Click the menu icon to open the mobile menu
  const menuIconElement = screen.getByTestId("menu-icon");
  fireEvent.click(menuIconElement);

  // Click a nav link
  const homeLinkElement = screen.getByText("Home");
  fireEvent.click(homeLinkElement);

  // Check if the mobile menu closes (menu icon updates to fa-bars class)
  expect(menuIconElement).toHaveClass("fa-bars");
});
