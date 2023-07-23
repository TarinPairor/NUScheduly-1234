import { render, screen, fireEvent } from "@testing-library/react";
import Message from "../components/Message";

test("renders message component with correct details", () => {
  const message = {
    id: "1",
    title: "Test Title",
    text: "Test Message",
    date: new Date("2023-07-22"), // Replace with the desired date.
    user: "Test User",
  };

  render(<Message message={message} onDelete={() => {}} />); // Add onDelete prop with a mock function.

  const titleElement = screen.getByText("Test Title");
  const textElement = screen.getByText("Test Message");
  const dateElement = screen.getByText("Date: 22/07/2023");

  expect(titleElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
  expect(dateElement).toBeInTheDocument();
});

test("calls onDelete function when delete button is clicked", () => {
  const message = {
    id: "1",
    title: "Test Title",
    text: "Test Message",
    date: new Date("2023-07-22"), // Replace with the desired date.
    user: "Test User",
  };

  const onDeleteMock = jest.fn();
  render(<Message message={message} onDelete={onDeleteMock} />);

  const deleteButton = screen.getByRole("button", { name: "Delete" });
  fireEvent.click(deleteButton);

  expect(onDeleteMock).toHaveBeenCalledWith("1");
});

test("displays formatted date correctly", () => {
  const message = {
    id: "1",
    title: "Test Title",
    text: "Test Message",
    date: new Date("2023-07-22"), // Replace with the desired date.
    user: "Test User",
  };

  render(<Message message={message} onDelete={() => {}} />); // Add onDelete prop with a mock function.

  const dateElement = screen.getByText("Date: 22/07/2023");
  expect(dateElement).toBeInTheDocument();
});
