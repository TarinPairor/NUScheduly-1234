import { render } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import DatePickerValue from "../components/DateTimePickerValue";

test("renders DatePickerValue without errors", () => {
  render(<DatePickerValue />);
});

test("displays the provided value correctly", () => {
  const value = new Date(2023, 5, 21); // Create a valid Date object
  render(<DatePickerValue value={value} />);

  // Add assertions to check if the value is displayed correctly
});
